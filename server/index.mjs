import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import nodemailer from 'nodemailer';
import { createApplication } from './app.mjs';
const production = process.env.NODE_ENV === 'production';
const databasePath = resolve(process.env.DATABASE_PATH || '.data/codeforge.sqlite');
await mkdir(dirname(databasePath), { recursive: true });
let deliver;
if (process.env.SMTP_URL && process.env.MAIL_FROM) {
  const transport = nodemailer.createTransport(process.env.SMTP_URL);
  deliver = ({ to, kind, text }) => transport.sendMail({ from: process.env.MAIL_FROM, to, subject: kind === 'verify' ? 'Verify your CodeForge email' : 'Reset your CodeForge password', text });
} else if (!production) {
  await mkdir('.data/outbox', { recursive: true });
  deliver = (message) => writeFile(`.data/outbox/${Date.now()}-${randomUUID()}.json`, JSON.stringify(message, null, 2), { mode: 0o600 });
  console.log('Development email is saved to .data/outbox.');
} else throw new Error('Production requires SMTP_URL and MAIL_FROM.');
const server = createApplication({ databasePath, production, origin: process.env.APP_ORIGIN || 'http://localhost:5173', deliver });
server.listen(Number(process.env.PORT || 3001), process.env.HOST || '127.0.0.1', () => console.log(`CodeForge API listening on port ${process.env.PORT || 3001}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
