import { DatabaseSync } from 'node:sqlite';
import { Pool } from 'pg';
import { resolve } from 'node:path';
const category = process.argv[2];
if (category && !['Privacy', 'Security', 'Account', 'Mission', 'Code Lab', 'Bug', 'Other'].includes(category)) throw new Error('Invalid support category.');
const fields = 'SELECT id,category,subject,description,status,created_at,user_id FROM support_requests';
if (process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  try { console.log(JSON.stringify((await pool.query(fields + (category ? ' WHERE category=$1' : '') + ' ORDER BY created_at', category ? [category] : [])).rows, null, 2)); }
  finally { await pool.end(); }
} else {
  const db = new DatabaseSync(resolve(process.env.DATABASE_PATH || '.data/codeforge.sqlite'), { readOnly: true });
  try { console.log(JSON.stringify(category ? db.prepare(fields + ' WHERE category=? ORDER BY created_at').all(category) : db.prepare(fields + ' ORDER BY created_at').all(), null, 2)); }
  finally { db.close(); }
}
