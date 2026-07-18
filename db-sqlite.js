const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'geodoido.db');

function convertQuery(sql) {
  let r = sql.replace(/\$(\d+)/g, '?');
  r = r.replace(/::\w+/g, '');
  r = r.replace(/NOW\(\)\s*-\s*INTERVAL\s+'([^']+)'/gi, (_, interval) => {
    return `datetime('now', '-${interval}')`;
  });
  r = r.replace(/\bNOW\(\)/gi, "datetime('now')");
  return r;
}

function getTableFromInsert(sql) {
  const m = sql.match(/INSERT\s+INTO\s+(\w+)/i);
  return m ? m[1] : null;
}

function extractReturningCols(sql) {
  const m = sql.match(/RETURNING\s+(.+)$/ims);
  if (!m) return null;
  return m[1].split(',').map(c => c.trim().split(/\s+AS\s+/i).pop());
}

function hasReturning(sql) {
  return /RETURNING\s/i.test(sql);
}

function stripReturning(sql) {
  return sql.replace(/\s+RETURNING\s+.+$/ims, '');
}

async function initSQLite() {
  const SQL = await initSqlJs();

  let db;
  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha_hash TEXT,
      google_id TEXT UNIQUE,
      avatar_url TEXT,
      criado_em TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tokens_reset_senha (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      token TEXT NOT NULL,
      expira_em TEXT NOT NULL,
      usado INTEGER DEFAULT 0,
      criado_em TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
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

  function save() {
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }

  function query(sql, params) {
    const converted = convertQuery(sql);
    const returning = hasReturning(sql);

    if (returning) {
      const table = getTableFromInsert(sql);
      const cols = extractReturningCols(sql);
      const cleanSql = stripReturning(converted);
      db.run(cleanSql, params);
      save();

      const lastId = db.exec('SELECT last_insert_rowid() AS id');
      if (!table || !lastId.length) return { rows: [] };

      const id = lastId[0].values[0][0];
      const colList = cols ? cols.join(',') : '*';
      const rowResult = db.exec(`SELECT ${colList} FROM ${table} WHERE id = ${id}`);
      if (!rowResult.length) return { rows: [] };

      const r = rowResult[0];
      const obj = {};
      r.columns.forEach((c, i) => { obj[c] = r.values[0][i]; });
      return { rows: [obj] };
    }

    if (converted.trim().toUpperCase().startsWith('SELECT') || converted.trim().toUpperCase().startsWith('WITH')) {
      const stmt = db.prepare(converted);
      if (params && params.length > 0) stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return { rows };
    }

    db.run(converted, params);
    save();
    return { rows: [] };
  }

  console.log('Banco: SQLite (' + DB_PATH + ')');
  return { query, close: () => { save(); db.close(); }, type: 'sqlite' };
}

module.exports = initSQLite;
