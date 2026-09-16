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
  const config = { databasePath: join(directory, 'test.sqlite'), deliver: async (message) => messages.push(message) };
  let server;
  let address;
  const start = async () => { server = createApplication(config); server.listen(0, '127.0.0.1'); await once(server, 'listening'); address = `http://127.0.0.1:${server.address().port}`; };
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
    const verified = await request('/auth/verify', { method: 'POST', data: { email, otpCode: code } });
    assert.equal(verified.status, 200);
    assert.match(verified.headers.get('set-cookie'), /HttpOnly/);
    assert.match(verified.headers.get('set-cookie'), /SameSite=Strict/);
    assert.equal((await request('/auth/verify', { method: 'POST', data: { email, otpCode: code } })).status, 400);
    return verified.cookie;
  }
  try {
    await start();
    assert.equal((await request('/workspace')).status, 401);
    const a = await account('alice@example.test');
    const b = await account('bob@example.test');
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
    const login = await request('/auth/login', { method: 'POST', data: { email: 'alice@example.test', password } });
    assert.equal(login.status, 200);
    assert.deepEqual((await request('/workspace', { cookie: login.cookie })).body.data, source);
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: 'invalid', newPassword: password } })).status, 400);
    await request('/auth/reset-request', { method: 'POST', data: { email: 'alice@example.test' } });
    const token = new URL(messages.at(-1).text.split(' ').at(-1)).searchParams.get('token');
    const newPassword = 'different correct horse battery';
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: token, newPassword } })).status, 200);
    assert.equal((await request('/auth/me', { cookie: login.cookie })).status, 401);
    assert.equal((await request('/auth/reset', { method: 'POST', data: { resetToken: token, newPassword } })).status, 400);
    assert.equal((await request('/auth/login', { method: 'POST', data: { email: 'alice@example.test', password: newPassword } })).status, 200);
    assert.equal((await request('/auth/me', { cookie: b })).status, 200);
  } finally { if (server?.listening) await stop(); await rm(directory, { recursive: true, force: true }); }
});

test('production refuses a plaintext origin', () => {
  assert.throws(() => createApplication({ databasePath: ':memory:', production: true, origin: 'http://example.com', deliver() {} }), /HTTPS/);
});
