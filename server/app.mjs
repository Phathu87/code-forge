import { seedCurriculum, readCurriculum } from './curriculum.mjs';
import { importRepository } from './github.mjs';
import { learningPath } from '../src/lib/curriculum.js';
import { compilePreview } from './preview.mjs';
import { createServer } from 'node:http';
import { openDatabase } from './database.mjs';
import { randomBytes, randomInt, scrypt, timingSafeEqual, createHash, randomUUID } from 'node:crypto';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const derive = promisify(scrypt);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const failure = (status, message) => Object.assign(new Error(message), { status });
const emailOf = (value) => {
  if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) throw failure(400, 'Enter a valid email address.');
  return value.toLowerCase().trim();
};
const checkPassword = (value) => {
  if (typeof value !== 'string' || value.length < 12 || value.length > 128) throw failure(400, 'Use a password between 12 and 128 characters.');
};
async function passwordHash(password) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${Buffer.from(await derive(password, salt, 64)).toString('hex')}`;
}
async function passwordMatches(password, stored) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const [salt, expected] = stored.split(':');
  const actual = Buffer.from(await derive(password, salt, 64));
  return timingSafeEqual(actual, Buffer.from(expected, 'hex'));
}
const publicUser = (row) => ({ id: row.id, email: row.email, full_name: row.name, role: row.role, verified: Boolean(row.verified), onboarding: JSON.parse(row.onboarding) });

export function createApplication({ databasePath, databaseUrl, registrationEnabled = true, registrationAllowlist = [], origin = 'http://localhost:5173', production = false, deliver, githubFetch = fetch, log = () => {}, dist = resolve('dist') }) {
  if (production && !origin.startsWith('https://')) throw new Error('Production APP_ORIGIN must use HTTPS.');
  if (!deliver) throw new Error('Email delivery must be configured.');
  if (production && registrationEnabled && !registrationAllowlist.length) throw new Error('Production preview registration requires an explicit tester allowlist.');
  const db = openDatabase({ databasePath, databaseUrl });
  const curriculumReady = db.ready.then(() => db.run(() => seedCurriculum(db)));
  curriculumReady.catch(() => {}); // server.ready reports startup failure; avoid an unhandled background rejection.
  const dummyPassword = '00000000000000000000000000000000:' + '0'.repeat(128);
  async function limit(key, max = 20) {
    const now = Date.now();
    (await db.prepare('DELETE FROM limits WHERE expires < ?').run(now));
    (await db.prepare('INSERT INTO limits VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count=limits.count+1').run(hash(key), now + 15 * 60_000));
    if ((await db.prepare('SELECT count FROM limits WHERE key=?').get(hash(key))).count > max) throw failure(429, 'Too many attempts. Try again in 15 minutes.');
  }
  function cookie(res, value, maxAge) {
    res.setHeader('Set-Cookie', `codeforge_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${production ? '; Secure' : ''}`);
  }
  async function session(req) {
    const token = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
    if (!token) throw failure(401, 'Sign in to continue.');
    const row = (await db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token=? AND sessions.expires>?').get(hash(token), Date.now()));
    if (!row) throw failure(401, 'Your session has expired. Sign in again.');
    return row;
  }
  async function issueSession(req, res, userId, expectedPassword) {
    await db.exec('BEGIN IMMEDIATE');
    const token = randomBytes(32).toString('hex');
    try {
      const current = await db.prepare('SELECT password FROM users WHERE id=?' + (db.postgres ? ' FOR UPDATE' : '')).get(userId);
      if (!current || current.password !== expectedPassword) throw failure(401, 'Account credentials changed. Sign in again.');
      const previous = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
      if (previous) await db.prepare('DELETE FROM sessions WHERE token=?').run(hash(previous));
      await db.prepare('DELETE FROM sessions WHERE expires < ?').run(Date.now());
      await db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(hash(token), userId, Date.now() + 7 * 86400_000);
      await db.exec('COMMIT');
    } catch (error) { await db.exec('ROLLBACK'); throw error; }
    cookie(res, token, 7 * 86400);
  }
  async function sendChallenge(user, kind) {
    const token = kind === 'verify' ? String(randomInt(100000, 1000000)) : randomBytes(32).toString('hex');
    (await db.prepare('INSERT INTO challenges VALUES (?, ?, ?, ?, 0) ON CONFLICT(user_id, kind) DO UPDATE SET token=excluded.token, expires=excluded.expires, attempts=0').run(user.id, kind, hash(token), Date.now() + 15 * 60_000));
    try { await deliver({ to: user.email, kind, text: kind === 'verify' ? `Your CodeForge verification code is ${token}. It expires in 15 minutes.` : `Reset your CodeForge password: ${origin}/reset-password?token=${token}` }); }
    catch { throw failure(503, 'Email delivery failed. Please try again.'); }
  }
  async function body(req) {
    let raw = '';
    for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 2_000_000) throw failure(413, 'Request is too large.'); }
    try { const parsed = JSON.parse(raw || '{}'); if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error(); return parsed; } catch { throw failure(400, 'Invalid JSON.'); }
  }
  async function api(req, res, path) {
    if (req.method !== 'GET') {
      if (req.headers.origin && req.headers.origin !== origin && !(!production && origin === 'http://localhost:5173' && req.headers.origin === 'http://127.0.0.1:5173')) throw failure(403, 'Request origin is not allowed.');
      if (req.headers['x-codeforge-request'] !== '1') throw failure(403, 'Request header is missing.');
      if (!req.headers['content-type']?.startsWith('application/json')) throw failure(415, 'JSON is required.');
    }
    if (path === '/api/health' && req.method === 'GET') { (await db.prepare('SELECT 1').get()); return { status: 'ok', version: '0.1.0', commit: process.env.RENDER_GIT_COMMIT || 'local' }; }
    if (path === '/api/curriculum' && req.method === 'GET') { await curriculumReady; return readCurriculum(db); }
    if (path === '/api/config' && req.method === 'GET') return { registrationEnabled };
    const data = req.method === 'GET' ? {} : await body(req);
    if (path.startsWith('/api/auth/') && req.method === 'POST') {
      (await limit(`ip:${req.socket.remoteAddress}` , 60));
      if (data.email) (await limit(`account:${emailOf(data.email)}`, 15));
    }
    if (path === '/api/auth/register' && req.method === 'POST') {
      if (!registrationEnabled) throw failure(503, 'Registration is not open yet. Email delivery is being configured.');
      const email = emailOf(data.email); checkPassword(data.password);
      if (production && !registrationAllowlist.includes(email)) throw failure(403, 'Registration is limited to invited testers.');
      if ((await db.prepare('SELECT id FROM users WHERE email=?').get(email))) throw failure(409, 'Unable to register. Try signing in or recovering your account.');
      const password = await passwordHash(data.password);
      const id = randomUUID();
      try { (await db.prepare('INSERT INTO users (id,email,password) VALUES (?,?,?)').run(id, email, password)); }
      catch { throw failure(409, 'Unable to register. Try signing in.'); }
      await sendChallenge({ id, email }, 'verify');
      return { verificationRequired: true };
    }
    if (path === '/api/auth/verify' && req.method === 'POST') {
      const user = (await db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email)));
      const challenge = user && (await db.prepare("SELECT * FROM challenges WHERE user_id=? AND kind='verify'").get(user.id));
      if (!challenge || challenge.expires < Date.now() || challenge.attempts >= 5) throw failure(400, 'Verification code is invalid or expired.');
      (await db.prepare("UPDATE challenges SET attempts=attempts+1 WHERE user_id=? AND kind='verify'").run(user.id));
      if (typeof data.otpCode !== 'string' || hash(data.otpCode) !== challenge.token) throw failure(400, 'Verification code is invalid or expired.');
      await db.exec('BEGIN IMMEDIATE');
      try {
        const consumed = await db.prepare("DELETE FROM challenges WHERE user_id=? AND kind='verify' AND token=? AND expires>? AND attempts<=5").run(user.id, challenge.token, Date.now());
        if (!consumed.changes) throw failure(400, 'Verification code is invalid or expired.');
        await db.prepare('UPDATE users SET verified=1 WHERE id=?').run(user.id);
        await db.exec('COMMIT');
      } catch (error) { await db.exec('ROLLBACK'); throw error; }
      (await issueSession(req, res, user.id, user.password)); return { verified: true };
    }
    if (path === '/api/auth/resend' && req.method === 'POST') {
      const user = (await db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email)));
      if (user && !user.verified) await sendChallenge(user, 'verify');
      return { sent: true };
    }
    if (path === '/api/auth/login' && req.method === 'POST') {
      const user = (await db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email)));
      const valid = await passwordMatches(data.password, user?.password || dummyPassword);
      if (!user || !valid || (await db.prepare('SELECT password FROM users WHERE id=?').get(user.id))?.password !== user.password) throw failure(401, 'Email or password is incorrect.');
      if (!user.verified) throw failure(403, 'Verify your email before signing in.');
      (await issueSession(req, res, user.id, user.password)); return publicUser(user);
    }
    if (path === '/api/auth/logout' && req.method === 'POST') {
      const token = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
      if (token) (await db.prepare('DELETE FROM sessions WHERE token=?').run(hash(token)));
      cookie(res, '', 0); return { signedOut: true };
    }
    if (path === '/api/auth/reset-request' && req.method === 'POST') {
      const user = (await db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email)));
      if (user) await sendChallenge(user, 'reset');
      return { sent: true };
    }
    if (path === '/api/auth/reset' && req.method === 'POST') {
      checkPassword(data.newPassword);
      if (typeof data.resetToken !== 'string') throw failure(400, 'Reset link is invalid or expired.');
      const challenge = (await db.prepare("SELECT * FROM challenges WHERE kind='reset' AND token=? AND expires>?").get(hash(data.resetToken), Date.now()));
      if (!challenge) throw failure(400, 'Reset link is invalid or expired.');
      const password = await passwordHash(data.newPassword);
      // Recheck after hashing so concurrent token redemption cannot succeed twice.
      (await db.exec('BEGIN IMMEDIATE'));
      try {
        const used = (await db.prepare("DELETE FROM challenges WHERE kind='reset' AND token=? AND expires>?").run(hash(data.resetToken), Date.now()));
        if (!used.changes) throw failure(400, 'Reset link is invalid or expired.');
        (await db.prepare('UPDATE users SET password=? WHERE id=?').run(password, challenge.user_id));
        (await db.prepare('DELETE FROM sessions WHERE user_id=?').run(challenge.user_id));
        (await db.exec('COMMIT'));
      } catch (error) { (await db.exec('ROLLBACK')); throw error; }
      return { reset: true };
    }
    const user = (await session(req));
    if (path === '/api/learning/focus' && req.method === 'GET') return { milestone: (await db.prepare('SELECT milestone FROM learning_focus WHERE user_id=?').get(user.id))?.milestone || learningPath.milestones[0].id };
    if (path === '/api/learning/focus' && req.method === 'PUT') {
      if (!learningPath.milestones.some(item => item.id === data.milestone) || Object.keys(data).length !== 1) throw failure(400, 'Choose an available milestone.');
      await db.prepare('INSERT INTO learning_focus VALUES (?,?) ON CONFLICT(user_id) DO UPDATE SET milestone=excluded.milestone').run(user.id, data.milestone);
      return { milestone: data.milestone };
    }
    if (path === '/api/projects' && req.method === 'GET') return (await db.prepare('SELECT id,snapshot FROM github_imports WHERE user_id=? ORDER BY created_at DESC').all(user.id)).map(row => ({ id: row.id, ...JSON.parse(row.snapshot) }));
    if (path === '/api/projects/github' && req.method === 'POST') {
      await limit('github-import:' + user.id, 3);
      if (data.confirmRights !== true || Object.keys(data).some(key => !['url','confirmRights'].includes(key))) throw failure(400, 'Confirm you own this work or have permission to import it.');
      if ((await db.prepare('SELECT COUNT(*) AS count FROM github_imports WHERE user_id=?').get(user.id)).count >= 10) throw failure(409, 'This preview supports up to 10 imported snapshots per account.');
      const snapshot = await importRepository(data.url, githubFetch);
      await session(req);
      const id = randomUUID();
      await db.prepare('INSERT INTO github_imports VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,repo,commit_sha) DO NOTHING').run(id,user.id,snapshot.repo,snapshot.commit,JSON.stringify(snapshot),Date.now());
      const row = await db.prepare('SELECT id,snapshot FROM github_imports WHERE user_id=? AND repo=? AND commit_sha=?').get(user.id,snapshot.repo,snapshot.commit);
      return { id: row.id, ...JSON.parse(row.snapshot) };
    }
    if (path === '/api/preview' && req.method === 'POST') { (await limit('preview:' + user.id, 30)); return compilePreview(data.files); }
    if (path === '/api/auth/me' && req.method === 'GET') return publicUser(user);
    if (path === '/api/account/export' && req.method === 'POST') {
      (await limit(`reauth:${user.id}`, 10));
      if (!await passwordMatches(data.password, user.password)) throw failure(401, 'Password is incorrect.');
      (await session(req));
      const workspace = (await db.prepare('SELECT revision,data,updated_at FROM workspaces WHERE user_id=?').get(user.id));
      return { learningFocus: (await db.prepare('SELECT milestone FROM learning_focus WHERE user_id=?').get(user.id))?.milestone || null, importedProjects: (await db.prepare('SELECT snapshot FROM github_imports WHERE user_id=?').all(user.id)).map(row => JSON.parse(row.snapshot)), schemaVersion: 1, exportedAt: new Date().toISOString(), profile: publicUser(user),
        workspace: workspace ? { ...workspace, data: JSON.parse(workspace.data) } : null,
        supportRequests: (await db.prepare('SELECT id,category,subject,description,status,created_at FROM support_requests WHERE user_id=? ORDER BY created_at').all(user.id)) };
    }
    if (path === '/api/account' && req.method === 'DELETE') {
      (await limit(`reauth:${user.id}`, 10));
      if (data.confirmation !== 'DELETE') throw failure(400, 'Type DELETE to confirm.');
      if (!await passwordMatches(data.password, user.password)) throw failure(401, 'Password is incorrect.');
      // Hashing yields: reject a request if a concurrent reset revoked this session.
      (await session(req));
      const deleted = await db.prepare('DELETE FROM users WHERE id=? AND password=?').run(user.id, user.password);
      if (!deleted.changes) throw failure(409, 'Account changed. Sign in again before deleting it.');
      cookie(res, '', 0);
      return { deleted: true };
    }
    if (path === '/api/support' && req.method === 'GET') {
      return (await db.prepare('SELECT id,category,subject,description,status,created_at FROM support_requests WHERE user_id=? ORDER BY created_at DESC').all(user.id));
    }
    if (path === '/api/support' && req.method === 'POST') {
      (await limit(`support:${user.id}`, 5));
      if (!['Account', 'Mission', 'Code Lab', 'Bug', 'Privacy', 'Security', 'Other'].includes(data.category) ||
          typeof data.subject !== 'string' || data.subject.trim().length < 3 || data.subject.length > 160 ||
          typeof data.description !== 'string' || data.description.trim().length < 10 || data.description.length > 10000)
        throw failure(400, 'Choose a category and provide a subject and description (10–10,000 characters).');
      const id = randomUUID();
      db.prepare('INSERT INTO support_requests (id,user_id,category,subject,description,created_at) VALUES (?,?,?,?,?,?)')
        .run(id, user.id, data.category, data.subject.trim(), data.description.trim(), new Date().toISOString());
      return { id, status: 'open' };
    }
    if (path === '/api/profile' && req.method === 'PATCH') {
      if (Object.keys(data).some((key) => !['name', 'onboarding'].includes(key))) throw failure(400, 'Unsupported profile field.');
      const name = data.name ?? user.name;
      if (typeof name !== 'string' || name.length > 120 || JSON.stringify(data.onboarding || {}).length > 5000) throw failure(400, 'Invalid profile.');
      (await db.prepare('UPDATE users SET name=?, onboarding=? WHERE id=?').run(name, JSON.stringify(data.onboarding ?? JSON.parse(user.onboarding)), user.id));
      return publicUser((await db.prepare('SELECT * FROM users WHERE id=?').get(user.id)));
    }
    if (path === '/api/workspace' && req.method === 'GET') {
      const row = (await db.prepare('SELECT * FROM workspaces WHERE user_id=?').get(user.id));
      return row ? { revision: row.revision, data: JSON.parse(row.data), updatedAt: row.updated_at } : { revision: 0, data: null };
    }
    if (path === '/api/workspace' && req.method === 'PUT') {
      if (Object.keys(data).some((key) => !['revision', 'data'].includes(key))) throw failure(400, 'Unsupported workspace field.');
      const workspace = data.data;
      if (!Number.isSafeInteger(data.revision) || data.revision < 0 || !workspace || !Array.isArray(workspace.files) || workspace.files.length > 100) throw failure(400, 'Invalid workspace.');
      const paths = new Set();
      for (const file of workspace.files) {
        if (typeof file.path !== 'string' || !/^[\w./ -]{1,200}$/.test(file.path) || file.path.startsWith('/') || file.path.split('/').includes('..') || paths.has(file.path) || typeof file.content !== 'string' || file.content.length > 500_000) throw failure(400, 'Invalid source file.');
        paths.add(file.path);
      }
      const now = new Date().toISOString();
      const json = JSON.stringify(workspace);
      const result = data.revision === 0
        ? (await db.prepare('INSERT INTO workspaces VALUES (?,1,?,?) ON CONFLICT(user_id) DO NOTHING').run(user.id, json, now))
        : (await db.prepare('UPDATE workspaces SET revision=revision+1,data=?,updated_at=? WHERE user_id=? AND revision=?').run(json, now, user.id, data.revision));
      if (!result.changes) throw failure(409, 'A newer workspace exists. Download your draft before reloading.');
      return { revision: data.revision + 1, updatedAt: now };
    }
    throw failure(404, 'API route not found.');
  }
  const server = createServer(async (req, res) => {
    const started = performance.now();
    const requestId = randomUUID();
    res.setHeader('X-Request-Id', requestId);
    res.on('finish', () => log({ event: 'request', requestId, method: req.method, status: res.statusCode, durationMs: Math.round(performance.now() - started) }));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY');
    try {
      const path = new URL(req.url, origin).pathname;
      if (path.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-store'); res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(await db.run(() => api(req, res, path)))); return;
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') throw failure(405, 'Method not allowed.');
      const relative = decodeURIComponent(path).replace(/^\/+/, '');
      if (relative.split(/[\\/]/).some((part) => part.startsWith('.')) || relative.includes('\\')) throw failure(404, 'Not found.');
      const file = resolve(dist, relative || 'index.html');
      if (!file.startsWith(resolve(dist) + '/'.replace('/', process.platform === 'win32' ? '\\' : '/'))) throw failure(404, 'Not found.');
      let content;
      let extension = extname(file);
      try { content = await readFile(file); }
      catch { if (extension) throw failure(404, 'Not found.'); content = await readFile(resolve(dist, 'index.html')); extension = '.html'; }
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' })[extension] || 'application/octet-stream');
      res.setHeader('Cache-Control', extension === '.html' ? 'no-cache' : 'public, max-age=3600');
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch (error) {
      res.statusCode = error.status || 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: error.status ? error.message : 'The server could not complete the request.' }));
    }
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 5000;
  server.on('close', () => { Promise.resolve(db.close()).catch(() => {}); });
  server.ready = curriculumReady;
  return server;
}
