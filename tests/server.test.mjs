import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createApplication } from '../server/app.mjs';

test('account lifecycle, tenant isolation, durable workspaces and conflict protection', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'codeforge-test-'));
  const messages = [];
  let databaseUrl = process.env.TEST_DATABASE_URL;
  const schema = 'test_' + randomUUID().replaceAll('-', '');
  let admin;
  if (databaseUrl) {
    const url = new URL(databaseUrl); url.hostname = url.hostname.replace('-pooler', ''); url.searchParams.set('sslmode', 'verify-full');
    admin = new Pool({ connectionString: url.toString(), max: 1 });
    await admin.query('CREATE SCHEMA ' + schema);
    url.searchParams.set('options', '-c search_path=' + schema); databaseUrl = url.toString();
  }
  const aliceEmail = 'alice-' + randomUUID() + '@example.test';
  const bobEmail = 'bob-' + randomUUID() + '@example.test';
  const config = { databaseUrl, databasePath: join(directory, 'test.sqlite'), deliver: async (message) => messages.push(message) };
  let server;
  let address;
  const start = async () => { server = createApplication(config); await server.ready; server.listen(0, '127.0.0.1'); await once(server, 'listening'); address = `http://127.0.0.1:${server.address().port}`; };
  const stop = () => new Promise((resolve, reject) => { server.close((error) => error ? reject(error) : resolve()); server.closeAllConnections(); });
  const request = async (path, { method = 'GET', data, cookie, origin = 'http://localhost:5173' } = {}) => {
    const response = await fetch(address + '/api' + path, { method, headers: { 'content-type': 'application/json', 'x-codeforge-request': '1', origin, ...(cookie ? { cookie } : {}) }, ...(method !== 'GET' ? { body: JSON.stringify(data || {}) } : {}) });
    return { status: response.status, body: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0], headers: response.headers };
  };
  const password = 'correct horse battery staple';
  async function account(email) {
    assert.equal((await request('/auth/register', { method: 'POST', data: { email, password } })).status, 200);
    assert.equal((await request('/auth/login', { method: 'POST', data: { email, password } })).status, 403);
    const code = messages.at(-1).text.match(/\b\d{6}\b/)[0];
    const verifications = await Promise.all([1, 2].map(() => request('/auth/verify', { method: 'POST', data: { email, otpCode: code } })));
    assert.deepEqual(verifications.map((result) => result.status).sort(), [200, 400]);
    const verified = verifications.find((result) => result.status === 200);
    assert.equal(verified.status, 200);
    assert.match(verified.headers.get('set-cookie'), /HttpOnly/);
    assert.match(verified.headers.get('set-cookie'), /SameSite=Strict/);
    assert.equal((await request('/auth/verify', { method: 'POST', data: { email, otpCode: code } })).status, 400);
    return verified.cookie;
  }
  try {
    await start();
    assert.equal((await request('/workspace')).status, 401);
    const a = await account(aliceEmail);
    const b = await account(bobEmail);
    const ticket = await request('/support', { method: 'POST', cookie: a, data: { category: 'Privacy', subject: 'Integration check', description: 'Disposable integration test request.' } });
    assert.equal(ticket.status, 200);
    assert.equal((await request('/support', { cookie: b })).body.length, 0);
    assert.equal((await request('/account/export', { method: 'POST', cookie: a, data: { password } })).body.supportRequests[0].id, ticket.body.id);
    assert.equal((await request('/account/export', { method: 'POST', cookie: a, data: { password: 'wrong' } })).status, 401);
    assert.equal((await request('/profile', { method: 'PATCH', cookie: a, data: { role: 'admin' } })).status, 400);
    assert.equal((await request('/auth/me', { cookie: a })).body.role, 'user');
    assert.equal((await request('/workspace', { method: 'PUT', cookie: a, origin: 'https://evil.example', data: {} })).status, 403);
    const source = { files: [{ path: 'src/App.jsx', content: 'export default () => "saved";' }], folders: ['src'], deps: [] };
    assert.equal((await request('/workspace', { method: 'PUT', cookie: a, data: { revision: 0, data: source, user_id: 'bob' } })).status, 400);
    assert.equal((await request('/workspace', { method: 'PUT', cookie: a, data: { revision: 0, data: { files: [{ path: '../secret', content: 'x' }] } } })).status, 400);
    assert.equal((await request('/workspace', { method: 'PUT', cookie: a, data: { revision: 0, data: source } })).status, 200);
    assert.equal((await request('/workspace', { cookie: b })).body.data, null);
    const concurrent = await Promise.all([1, 2].map(() => request('/workspace', { method: 'PUT', cookie: a, data: { revision: 1, data: source } })));
    assert.deepEqual(concurrent.map((r) => r.status).sort(), [200, 409]);
    await stop(); await start();
    const restored = await request('/workspace', { cookie: a });
    assert.equal(restored.body.revision, 2); assert.deepEqual(restored.body.data, source);
    assert.equal((await request('/auth/logout', { method: 'POST', cookie: a })).status, 200);
    assert.equal((await request('/workspace', { cookie: a })).status, 401);
    const login = await request('/auth/login', { method: 'POST', data: { email: aliceEmail, password } });
    assert.equal(login.status, 200);
    assert.deepEqual((await request('/workspace', { cookie: login.cookie })).body.data, source);
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: 'invalid', newPassword: password } })).status, 400);
    await request('/auth/reset-request', { method: 'POST', data: { email: aliceEmail } });
    const token = new URL(messages.at(-1).text.split(' ').at(-1)).searchParams.get('token');
    const newPassword = 'different correct horse battery';
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: token, newPassword } })).status, 200);
    assert.equal((await request('/auth/me', { cookie: login.cookie })).status, 401);
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: token, newPassword } })).status, 400);
    assert.equal((await request('/auth/login', { method: 'POST', data: { email: aliceEmail, password: newPassword } })).status, 200);
    assert.equal((await request('/auth/me', { cookie: b })).status, 200);
  } finally { if (server?.listening) await stop(); await rm(directory, { recursive: true, force: true }); if (admin) { await admin.query('DROP SCHEMA ' + schema + ' CASCADE'); await admin.end(); } }
});

test('production refuses a plaintext origin', () => {
  assert.throws(() => createApplication({ databasePath: ':memory:', production: true, origin: 'http://example.com', deliver() {} }), /HTTPS/);
});





test('registration-closed preview rejects account creation before storing data', async () => {
  const server = createApplication({ databasePath: ':memory:', registrationEnabled: false, deliver: async () => { throw new Error('Email must not be called'); } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = `http://127.0.0.1:${server.address().port}/api`;
  try {
    assert.deepEqual(await (await fetch(address + '/config')).json(), { registrationEnabled: false });
    const response = await fetch(address + '/auth/register', { method: 'POST', headers: { 'content-type': 'application/json', 'x-codeforge-request': '1' }, body: JSON.stringify({ email: 'closed@example.test', password: 'a long test-only password' }) });
    assert.equal(response.status, 503);
    assert.match((await response.json()).message, /not open/);
  } finally { await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }); }
});

test('production preview cannot open unrestricted registration', () => {
  assert.throws(() => createApplication({ databasePath: ':memory:', production: true, origin: 'https://example.test', deliver() {} }), /allowlist/);
});
