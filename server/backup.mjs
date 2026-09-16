import { DatabaseSync, backup } from 'node:sqlite';
import { mkdir, readdir, stat, unlink, copyFile, chmod } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { constants } from 'node:fs';

export async function backupDatabase(source, directory, retentionDays = 7) {
  if (!Number.isInteger(retentionDays) || retentionDays < 1) throw new Error('Retention must be a positive number of days.');
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(source, { readOnly: true });
  const target = join(directory, `codeforge-${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID()}.sqlite`);
  try { await backup(db, target); } finally { db.close(); }
  await chmod(target, 0o600);
  verifyDatabase(target);
  // Only rotate this tool's named backups, after the new backup has passed verification.
  for (const name of await readdir(directory)) {
    if (!/^codeforge-[\dTZ-]+-[0-9a-f-]{36}\.sqlite$/.test(name)) continue;
    const file = join(directory, name);
    if ((await stat(file)).mtimeMs < Date.now() - retentionDays * 86400000) await unlink(file);
  }
  return target;
}
export function verifyDatabase(path) {
  const db = new DatabaseSync(path, { readOnly: true });
  try {
    const result = db.prepare('PRAGMA integrity_check').get();
    if (result.integrity_check !== 'ok') throw new Error('Database integrity check failed.');
    if (db.prepare('PRAGMA foreign_key_check').all().length) throw new Error('Database contains broken references.');
  } finally { db.close(); }
}
export async function restoreDatabase(source, target) {
  verifyDatabase(source);
  await mkdir(dirname(resolve(target)), { recursive: true, mode: 0o700 });
  // Never overwrite a live database or any pre-existing file.
  await copyFile(source, target, constants.COPYFILE_EXCL);
  await chmod(target, 0o600);
  verifyDatabase(target);
}
