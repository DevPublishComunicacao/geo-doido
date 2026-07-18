const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'geodoido.db');
let db;

function init() {
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      google_id TEXT UNIQUE,
      avatar_url TEXT,
      senha_hash TEXT,
      criado_em TEXT DEFAULT (datetime('now'))
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS tokens_reset_senha (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      token TEXT NOT NULL,
      expira_em TEXT NOT NULL,
      usado INTEGER DEFAULT 0,
      criado_em TEXT DEFAULT (datetime('now'))
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS partidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      pontuacao INTEGER NOT NULL DEFAULT 0,
      distancia_km REAL NOT NULL DEFAULT 0,
      modo TEXT NOT NULL DEFAULT 'MUNDO',
      pais_codigo TEXT,
      criado_em TEXT DEFAULT (datetime('now'))
    )
  `);

  console.log('Banco: SQLite (better-sqlite3)');
}

function convertParams(sql) {
  let s = sql.replace(/\$(\d+)/g, '?');
  s = s.replace(/::\w+/g, '');
  s = s.replace(/NOW\(\)\s*-\s*INTERVAL\s+'([^']+)'/gi, (_, interval) => {
    return `datetime('now', '-${interval}')`;
  });
  s = s.replace(/\bNOW\(\)/gi, "datetime('now')");
  return s;
}

function getTable(sql) {
  const m = sql.match(/INSERT\s+INTO\s+(\w+)/i);
  return m ? m[1] : null;
}

function extractReturningCols(sql) {
  const m = sql.match(/RETURNING\s+(.+)$/ims);
  if (!m) return null;
  return m[1].split(',').map(c => c.trim().split(/\s+AS\s+/i).pop());
}

function query(text, params) {
  if (!db) init();

  const sql = convertParams(text);

  // INSERT with RETURNING
  if (/RETURNING\s/i.test(sql)) {
    const table = getTable(sql);
    const cols = extractReturningCols(sql);
    const sqlNoReturn = sql.replace(/\s+RETURNING\s+.+$/ims, '');

    const stmt = db.prepare(sqlNoReturn);
    const info = stmt.run(params);
    const id = info.lastInsertRowid;

    if (!id || !table) return { rows: [] };

    const row = db.prepare(`SELECT ${cols.join(',')} FROM ${table} WHERE id = ?`).get(id);
    return { rows: row ? [row] : [] };
  }

  // SELECT
  if (/^\s*SELECT/i.test(sql) || /^\s*WITH/i.test(sql)) {
    const rows = db.prepare(sql).all(params);
    return { rows };
  }

  // INSERT/UPDATE/DELETE
  db.prepare(sql).run(params);
  return { rows: [] };
}

module.exports = { query };
