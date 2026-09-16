import test from 'node:test';
import assert from 'node:assert/strict';
import { configureMail } from '../server/mail.mjs';

test('Brevo adapter sends plain-text verification through HTTPS and rejects provider errors', async () => {
  let sent;
  const config = { NODE_ENV: 'production', BREVO_API_KEY: 'test-key', MAIL_FROM: 'operator@example.test' };
  const deliver = await configureMail(config, async (url, options) => { sent = { url, options }; return { ok: true }; });
  await deliver({ to: 'learner@example.test', kind: 'verify', text: 'Test code 123456' });
  assert.equal(sent.url, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(sent.options.headers['api-key'], 'test-key');
  assert.deepEqual(JSON.parse(sent.options.body).sender, { name: 'CodeForge', email: 'operator@example.test' });
  assert.equal(JSON.parse(sent.options.body).textContent, 'Test code 123456');
  const failed = await configureMail(config, async () => ({ ok: false }));
  await assert.rejects(failed({ to: 'learner@example.test', kind: 'verify', text: 'test' }), /rejected/);
});

test('production requires mail unless registration is explicitly closed', async () => {
  await assert.rejects(configureMail({ NODE_ENV: 'production' }), /Configure email/);
  const closed = await configureMail({ NODE_ENV: 'production', REGISTRATION_ENABLED: 'false' });
  await assert.rejects(closed({}), /not configured/);
});
