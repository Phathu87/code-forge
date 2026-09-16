import { resolve } from 'node:path';
import { backupDatabase, restoreDatabase } from '../server/backup.mjs';
const [command, source, target] = process.argv.slice(2);
if (!source || !target || !['backup', 'restore'].includes(command)) {
  console.error('Usage: node scripts/database.mjs backup <database> <backup-directory> | restore <backup> <new-database>');
  process.exitCode = 1;
} else if (command === 'backup') {
  console.log(await backupDatabase(resolve(source), resolve(target), Number(process.env.BACKUP_RETENTION_DAYS || 7)));
} else {
  await restoreDatabase(resolve(source), resolve(target));
  console.log('Restore verified. Start the service with DATABASE_PATH pointing to the restored file.');
}
