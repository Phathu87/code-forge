import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { AsyncLocalStorage } from 'node:async_hooks';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';

const migration = ['0001.sql', '0002.sql', '0003.sql', '0004.sql'].map(file => readFileSync(new URL(`./migrations/${file}`, import.meta.url), 'utf8')).join('\n');
export function openDatabase({ databasePath, databaseUrl }) {
  if (!databaseUrl) {
    const db = new DatabaseSync(databasePath);
    db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;');
    db.exec(migration);
    let tail = Promise.resolve();
    return { ...methods(db), ready: Promise.resolve(), postgres: false,
      run: (work) => { const next = tail.then(work); tail = next.catch(() => {}); return next; },
      close: () => db.close() };
  }
  const connection = new URL(databaseUrl);
  connection.searchParams.set('sslmode', 'verify-full');
  const pool = new Pool({ connectionString: connection.toString(), max: 5, connectionTimeoutMillis: 10000, idleTimeoutMillis: 10000, query_timeout: 15000 });
  pool.on('error', () => { /* Failed idle connections are removed by the pool; requests report their own failures. */ });
  const storage = new AsyncLocalStorage();
  const ready = drizzle(pool).transaction(async (tx) => {
    await tx.execute(sql`SELECT pg_advisory_xact_lock(81724501)`);
    await tx.execute(sql.raw(migration));
  });
  const query = async (statement, values = []) => {
    let position = 0;
    const text = statement.replace(/\?/g, () => `$${++position}`).replace('BEGIN IMMEDIATE', 'BEGIN');
    return (storage.getStore() || pool).query(text, values);
  };
  return {
    ready, postgres: true,
    prepare: (statement) => ({
      get: async (...values) => (await query(statement, values)).rows[0],
      all: async (...values) => (await query(statement, values)).rows,
      run: async (...values) => ({ changes: (await query(statement, values)).rowCount }),
    }),
    exec: (statement) => query(statement),
    run: async (work) => { await ready; const client = await pool.connect(); try { return await storage.run(client, work); } finally { client.release(); } },
    close: () => pool.end(),
  };
}
function methods(db) { return { prepare: (statement) => db.prepare(statement), exec: (statement) => db.exec(statement) }; }
