import { backupDatabase } from './backup.mjs';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createApplication } from './app.mjs';
import { configureMail } from './mail.mjs';
const production = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;
const databasePath = resolve(process.env.DATABASE_PATH || '.data/codeforge.sqlite');
if (production && process.env.RENDER && !databaseUrl) throw new Error('Render requires an external DATABASE_URL. Ephemeral SQLite is not permitted.');
if (!databaseUrl) await mkdir(dirname(databasePath), { recursive: true });
const deliver = await configureMail();
const log = (event) => console.log(JSON.stringify({ at: new Date().toISOString(), ...event }));
const server = createApplication({ databasePath, databaseUrl, production, log, learningOptions: { enabled: process.env.LEARNING_CORE_ENABLED === 'true', verifiedEnabled: false, certificatesEnabled: false }, registrationAllowlist: (process.env.REGISTRATION_ALLOWLIST || '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean), registrationEnabled: process.env.REGISTRATION_ENABLED !== 'false', origin: process.env.APP_ORIGIN || process.env.RENDER_EXTERNAL_URL || 'http://localhost:5173', deliver });
await server.ready;
server.listen(Number(process.env.PORT || 3001), process.env.HOST || '127.0.0.1', () => log({ event: 'listening', port: Number(process.env.PORT || 3001), storage: databaseUrl ? 'postgres' : 'sqlite' }));
let backupTimer;
let backupInProgress = false;
async function runBackup() {
  if (backupInProgress) return;
  backupInProgress = true;
  try { await backupDatabase(databasePath, resolve(process.env.BACKUP_DIRECTORY), Number(process.env.BACKUP_RETENTION_DAYS || 7)); log({ event: 'backup_success' }); }
  catch { log({ event: 'backup_failed' }); }
  finally { backupInProgress = false; }
}
if (process.env.BACKUP_DIRECTORY && !databaseUrl) { await runBackup(); backupTimer = setInterval(runBackup, 86400000); backupTimer.unref(); }
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { clearInterval(backupTimer); server.close(); });
