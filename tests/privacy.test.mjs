import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createApplication } from '../server/app.mjs';
import { backupDatabase, restoreDatabase } from '../server/backup.mjs';

test('privacy operations are owned, reauthenticated, durable and recoverable from backup', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'codeforge-privacy-'));
  const messages = [];
  const databasePath = join(directory, 'live.sqlite');
  let server;
  let address;
  async function start(path = databasePath) { server = createApplication({ databasePath: path, deliver: async (message) => messages.push(message) }); server.listen(0, '127.0.0.1'); await once(server, 'listening'); address = `http://127.0.0.1:${server.address().port}/api`; }
  async function stop() { await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }); }
  async function request(path, method = 'GET', data = {}, cookie = '') { const response = await fetch(address + path, { method, headers: { cookie, 'content-type': 'application/json', 'x-codeforge-request': '1' }, ...(method === 'GET' ? {} : { body: JSON.stringify(data) }) }); return { status: response.status, body: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] }; }
  const password = 'this is a disposable test password';
  async function account(email) { assert.equal((await request('/auth/register', 'POST', { email, password })).status, 200); return (await request('/auth/verify', 'POST', { email, otpCode: messages.at(-1).text.match(/\d{6}/)[0] })).cookie; }
  try {
    await start();
    const alice = await account('alice@privacy.test');
    const bob = await account('bob@privacy.test');
    const profile = (await request('/auth/me', 'GET', {}, alice)).body;
    const workspace = { files: [{ path: 'App.jsx', content: 'my important source' }] };
    await request('/workspace', 'PUT', { revision: 0, data: workspace }, alice);
    const ticket = await request('/support', 'POST', { category: 'Privacy', subject: 'Export help', description: 'Please explain my export fields.' }, alice);
    assert.equal(ticket.status, 200);
    assert.equal((await request('/support', 'GET', {}, bob)).body.length, 0);
    assert.equal((await request('/support')).status, 401);
    assert.equal((await request('/account/export', 'POST', { password: 'wrong' }, alice)).status, 401);
    const exported = await request('/account/export', 'POST', { password }, alice);
    assert.equal(exported.status, 200);
    assert.equal(exported.body.profile.id, profile.id);
    assert.equal(exported.body.supportRequests[0].id, ticket.body.id);
    assert.deepEqual(exported.body.workspace.data, workspace);
    assert.ok(!JSON.stringify(exported.body).includes(password));
    assert.ok(!('password' in exported.body.profile));
    const backup = await backupDatabase(databasePath, join(directory, 'backups'));
    const restored = join(directory, 'restored.sqlite');
    await restoreDatabase(backup, restored);
    await assert.rejects(restoreDatabase(backup, restored), /EEXIST/);
    await stop(); await start(restored);
    assert.deepEqual((await request('/workspace', 'GET', {}, alice)).body.data, workspace);
    assert.equal((await request('/support', 'GET', {}, alice)).body[0].id, ticket.body.id);
    assert.equal((await request('/account', 'DELETE', { password, confirmation: 'no' }, alice)).status, 400);
    assert.equal((await request('/account', 'DELETE', { password: 'incorrect', confirmation: 'DELETE' }, alice)).status, 401);
    assert.equal((await request('/account', 'DELETE', { password, confirmation: 'DELETE' }, alice)).status, 200);
    assert.equal((await request('/workspace', 'GET', {}, alice)).status, 401);
    assert.equal((await request('/auth/me', 'GET', {}, bob)).status, 200);
    await stop(); await start(restored);
    assert.equal((await request('/auth/login', 'POST', { email: 'alice@privacy.test', password })).status, 401);
  } finally { if (server?.listening) await stop(); await rm(directory, { recursive: true, force: true }); }
});
