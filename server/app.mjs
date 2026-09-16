import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
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

export function createApplication({ databasePath, origin = 'http://localhost:5173', production = false, deliver, dist = resolve('dist') }) {
  if (production && !origin.startsWith('https://')) throw new Error('Production APP_ORIGIN must use HTTPS.');
  if (!deliver) throw new Error('Email delivery must be configured.');
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', role TEXT NOT NULL DEFAULT 'user', verified INTEGER NOT NULL DEFAULT 0, onboarding TEXT NOT NULL DEFAULT '{}');
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS challenges (user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, kind TEXT NOT NULL, token TEXT NOT NULL, expires INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(user_id, kind));
    CREATE TABLE IF NOT EXISTS workspaces (user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, revision INTEGER NOT NULL, data TEXT NOT NULL, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  const dummyPassword = '00000000000000000000000000000000:' + '0'.repeat(128);
  function limit(key, max = 20) {
    const now = Date.now();
    db.prepare('DELETE FROM limits WHERE expires < ?').run(now);
    db.prepare('INSERT INTO limits VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(hash(key), now + 15 * 60_000);
    if (db.prepare('SELECT count FROM limits WHERE key=?').get(hash(key)).count > max) throw failure(429, 'Too many attempts. Try again in 15 minutes.');
  }
  function cookie(res, value, maxAge) {
    res.setHeader('Set-Cookie', `codeforge_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${production ? '; Secure' : ''}`);
  }
  function session(req) {
    const token = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
    if (!token) throw failure(401, 'Sign in to continue.');
    const row = db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token=? AND sessions.expires>?').get(hash(token), Date.now());
    if (!row) throw failure(401, 'Your session has expired. Sign in again.');
    return row;
  }
  function issueSession(req, res, userId) {
    const previous = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
    if (previous) db.prepare('DELETE FROM sessions WHERE token=?').run(hash(previous));
    db.prepare('DELETE FROM sessions WHERE expires < ?').run(Date.now());
    const token = randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(hash(token), userId, Date.now() + 7 * 86400_000);
    cookie(res, token, 7 * 86400);
  }
  async function sendChallenge(user, kind) {
    const token = kind === 'verify' ? String(randomInt(100000, 1000000)) : randomBytes(32).toString('hex');
    db.prepare('INSERT INTO challenges VALUES (?, ?, ?, ?, 0) ON CONFLICT(user_id, kind) DO UPDATE SET token=excluded.token, expires=excluded.expires, attempts=0').run(user.id, kind, hash(token), Date.now() + 15 * 60_000);
    try { await deliver({ to: user.email, kind, text: kind === 'verify' ? `Your CodeForge verification code is ${token}. It expires in 15 minutes.` : `Reset your CodeForge password: ${origin}/reset-password?token=${token}` }); }
    catch { throw failure(503, 'Email delivery failed. Please try again.'); }
  }
  async function body(req) {
    let raw = '';
    for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 2_000_000) throw failure(413, 'Request is too large.'); }
    try { return JSON.parse(raw || '{}'); } catch { throw failure(400, 'Invalid JSON.'); }
  }
  async function api(req, res, path) {
    if (req.method !== 'GET') {
      if (req.headers.origin && req.headers.origin !== origin && !(!production && origin === 'http://localhost:5173' && req.headers.origin === 'http://127.0.0.1:5173')) throw failure(403, 'Request origin is not allowed.');
      if (req.headers['x-codeforge-request'] !== '1') throw failure(403, 'Request header is missing.');
      if (!req.headers['content-type']?.startsWith('application/json')) throw failure(415, 'JSON is required.');
    }
    if (path === '/api/health' && req.method === 'GET') return { status: 'ok' };
    const data = req.method === 'GET' ? {} : await body(req);
    if (path.startsWith('/api/auth/') && req.method === 'POST') {
      limit(`ip:${req.socket.remoteAddress}` , 60);
      if (data.email) limit(`account:${emailOf(data.email)}`, 15);
    }
    if (path === '/api/auth/register' && req.method === 'POST') {
      const email = emailOf(data.email); checkPassword(data.password);
      if (db.prepare('SELECT id FROM users WHERE email=?').get(email)) throw failure(409, 'Unable to register. Try signing in or recovering your account.');
      const password = await passwordHash(data.password);
      const id = randomUUID();
      try { db.prepare('INSERT INTO users (id,email,password) VALUES (?,?,?)').run(id, email, password); }
      catch { throw failure(409, 'Unable to register. Try signing in.'); }
      await sendChallenge({ id, email }, 'verify');
      return { verificationRequired: true };
    }
    if (path === '/api/auth/verify' && req.method === 'POST') {
      const user = db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email));
      const challenge = user && db.prepare("SELECT * FROM challenges WHERE user_id=? AND kind='verify'").get(user.id);
      if (!challenge || challenge.expires < Date.now() || challenge.attempts >= 5) throw failure(400, 'Verification code is invalid or expired.');
      db.prepare("UPDATE challenges SET attempts=attempts+1 WHERE user_id=? AND kind='verify'").run(user.id);
      if (typeof data.otpCode !== 'string' || hash(data.otpCode) !== challenge.token) throw failure(400, 'Verification code is invalid or expired.');
      db.prepare('UPDATE users SET verified=1 WHERE id=?').run(user.id);
      db.prepare("DELETE FROM challenges WHERE user_id=? AND kind='verify'").run(user.id);
      issueSession(req, res, user.id); return { verified: true };
    }
    if (path === '/api/auth/resend' && req.method === 'POST') {
      const user = db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email));
      if (user && !user.verified) await sendChallenge(user, 'verify');
      return { sent: true };
    }
    if (path === '/api/auth/login' && req.method === 'POST') {
      const user = db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email));
      const valid = await passwordMatches(data.password, user?.password || dummyPassword);
      if (!user || !valid) throw failure(401, 'Email or password is incorrect.');
      if (!user.verified) throw failure(403, 'Verify your email before signing in.');
      issueSession(req, res, user.id); return publicUser(user);
    }
    if (path === '/api/auth/logout' && req.method === 'POST') {
      const token = /(?:^|;\s*)codeforge_session=([^;]+)/.exec(req.headers.cookie || '')?.[1];
      if (token) db.prepare('DELETE FROM sessions WHERE token=?').run(hash(token));
      cookie(res, '', 0); return { signedOut: true };
    }
    if (path === '/api/auth/reset-request' && req.method === 'POST') {
      const user = db.prepare('SELECT * FROM users WHERE email=?').get(emailOf(data.email));
      if (user) await sendChallenge(user, 'reset');
      return { sent: true };
    }
    if (path === '/api/auth/reset' && req.method === 'POST') {
      checkPassword(data.newPassword);
      if (typeof data.resetToken !== 'string') throw failure(400, 'Reset link is invalid or expired.');
      const challenge = db.prepare("SELECT * FROM challenges WHERE kind='reset' AND token=? AND expires>?").get(hash(data.resetToken), Date.now());
      if (!challenge) throw failure(400, 'Reset link is invalid or expired.');
      const password = await passwordHash(data.newPassword);
      // Recheck after hashing so concurrent token redemption cannot succeed twice.
      db.exec('BEGIN IMMEDIATE');
      try {
        const used = db.prepare("DELETE FROM challenges WHERE kind='reset' AND token=? AND expires>?").run(hash(data.resetToken), Date.now());
        if (!used.changes) throw failure(400, 'Reset link is invalid or expired.');
        db.prepare('UPDATE users SET password=? WHERE id=?').run(password, challenge.user_id);
        db.prepare('DELETE FROM sessions WHERE user_id=?').run(challenge.user_id);
        db.exec('COMMIT');
      } catch (error) { db.exec('ROLLBACK'); throw error; }
      return { reset: true };
    }
    const user = session(req);
    if (path === '/api/auth/me' && req.method === 'GET') return publicUser(user);
    if (path === '/api/profile' && req.method === 'PATCH') {
      if (Object.keys(data).some((key) => !['name', 'onboarding'].includes(key))) throw failure(400, 'Unsupported profile field.');
      const name = data.name ?? user.name;
      if (typeof name !== 'string' || name.length > 120 || JSON.stringify(data.onboarding || {}).length > 5000) throw failure(400, 'Invalid profile.');
      db.prepare('UPDATE users SET name=?, onboarding=? WHERE id=?').run(name, JSON.stringify(data.onboarding ?? JSON.parse(user.onboarding)), user.id);
      return publicUser(db.prepare('SELECT * FROM users WHERE id=?').get(user.id));
    }
    if (path === '/api/workspace' && req.method === 'GET') {
      const row = db.prepare('SELECT * FROM workspaces WHERE user_id=?').get(user.id);
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
        ? db.prepare('INSERT INTO workspaces VALUES (?,1,?,?) ON CONFLICT(user_id) DO NOTHING').run(user.id, json, now)
        : db.prepare('UPDATE workspaces SET revision=revision+1,data=?,updated_at=? WHERE user_id=? AND revision=?').run(json, now, user.id, data.revision);
      if (!result.changes) throw failure(409, 'A newer workspace exists. Download your draft before reloading.');
      return { revision: data.revision + 1, updatedAt: now };
    }
    throw failure(404, 'API route not found.');
  }
  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY');
    try {
      const path = new URL(req.url, origin).pathname;
      if (path.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-store'); res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(await api(req, res, path))); return;
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
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' })[extension] || 'application/octet-stream');
      res.setHeader('Cache-Control', extension === '.html' ? 'no-cache' : 'public, max-age=3600');
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch (error) {
      res.statusCode = error.status || 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: error.status ? error.message : 'The server could not complete the request.' }));
    }
  });
  server.on('close', () => db.close());
  return server;
}
