import { renderEmail } from './email-template.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import nodemailer from 'nodemailer';
export async function configureMail(env = process.env, fetcher = fetch) {
  if (env.BREVO_API_KEY && env.MAIL_FROM) {
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(env.MAIL_FROM)) throw new Error('MAIL_FROM must be a verified plain email address.');
    return async ({ to, kind, text }) => {
      const message = renderEmail({ kind, text });
      const response = await fetcher('https://api.brevo.com/v3/smtp/email', {
        method: 'POST', signal: AbortSignal.timeout(10000),
        headers: { 'content-type': 'application/json', 'api-key': env.BREVO_API_KEY },
        body: JSON.stringify({ sender: { name: 'CodeForge', email: env.MAIL_FROM }, to: [{ email: to }], subject: message.subject, textContent: message.text, htmlContent: message.html }),
      });
      if (!response.ok) throw new Error('Email provider rejected delivery.');
    };
  }
  if (env.SMTP_URL && env.MAIL_FROM) {
    const transport = nodemailer.createTransport(env.SMTP_URL);
    return ({ to, kind, text }) => transport.sendMail({ from: { name: 'CodeForge', address: env.MAIL_FROM }, to, ...renderEmail({ kind, text }) });
  }
  if (env.NODE_ENV === 'production') {
    if (env.REGISTRATION_ENABLED !== 'false') throw new Error('Configure email delivery before enabling registration.');
    return async () => { throw new Error('Email delivery is not configured.'); };
  }
  await mkdir('.data/outbox', { recursive: true });
  return (message) => writeFile(`.data/outbox/${Date.now()}-${randomUUID()}.json`, JSON.stringify(message, null, 2), { mode: 0o600 });
}
