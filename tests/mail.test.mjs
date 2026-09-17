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
import { renderEmail, emailTitles } from '../server/email-template.mjs';
test('transactional HTML preserves text and escapes untrusted content for every template', () => {
  const text = '<script>alert("x")</script> & private link';
  for (const kind of Object.keys(emailTitles)) {
    const result = renderEmail({kind, text});
    assert.equal(result.text, text);
    assert.ok(result.html.includes('&lt;script&gt;'));
    assert.ok(!result.html.includes('<script>'));
    assert.ok(result.html.includes('CodeForge'));
    assert.ok(!result.html.includes('<img'));
  }
  assert.throws(() => renderEmail({kind:'unsupported', text}), /Unknown/);
});

test('reset email provides an escaped HTTPS action and rejects prototype names', () => {
  const message = renderEmail({kind:'reset',text:'Reset: https://example.test/reset?token=example&next=test'});
  assert.ok(message.html.includes('href="https://example.test/reset?token=example&amp;next=test"'));
  assert.ok(message.html.includes('Reset password</a>'));
  assert.throws(() => renderEmail({kind:'constructor',text:''}), /Unknown/);
  assert.ok(!renderEmail({kind:'reset',text:'javascript:alert(1)'}).html.includes('<a '));
});
