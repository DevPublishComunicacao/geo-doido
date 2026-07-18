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
    try {
      fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
    } catch (e) {
      console.error('=== SQLITE SAVE ERROR ===', DB_PATH, e.message);
    }
  }

  function query(sql, params) {
    const converted = convertQuery(sql);
    const returning = hasReturning(sql);

    if (returning) {
      const table = getTableFromInsert(sql);
      const cols = extractReturningCols(sql);
      const cleanSql = stripReturning(converted);
      try {
        console.log('=== SQLITE INSERT ===', cleanSql, JSON.stringify(params));
        db.run(cleanSql, params);
      } catch (e) {
        console.error('=== SQLITE INSERT ERROR ===', cleanSql, JSON.stringify(params), e.message);
        throw e;
      }
      save();

      let lastIdResult;
      try {
        lastIdResult = db.exec('SELECT last_insert_rowid() AS id');
        console.log('=== SQLITE LAST ID ===', JSON.stringify(lastIdResult));
      } catch (e) {
        console.error('=== SQLITE LAST ID ERROR ===', e.message);
        throw new Error('Falha ao obter último ID: ' + e.message);
      }

      if (!table || !lastIdResult || !lastIdResult.length) {
        throw new Error('Falha ao obter último ID inserido');
      }

      const id = lastIdResult[0].values[0][0];
      if (!id) throw new Error('INSERT não gerou ID (last_insert_rowid=' + id + ')');

      const colList = cols ? cols.join(',') : '*';
      const rowResult = db.exec(`SELECT ${colList} FROM ${table} WHERE id = ${id}`);
      if (!rowResult || !rowResult.length) {
        throw new Error(`Registro inserido mas não encontrado (id=${id})`);
      }

      const r = rowResult[0];
      const obj = {};
      r.columns.forEach((c, i) => { obj[c] = r.values[0][i]; });
      return { rows: [obj] };
    }

    if (converted.trim().toUpperCase().startsWith('SELECT') || converted.trim().toUpperCase().startsWith('WITH')) {
      const stmt = db.prepare(converted);
      if (params && params.length > 0) stmt.bind(params);
      const rows = [];
      let err;
      while (true) {
        try { if (!stmt.step()) break; }
        catch (e) { err = e; break; }
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      if (err) throw err;
      return { rows };
    }

    try {
      db.run(converted, params);
    } catch (e) {
      console.error('=== SQLITE EXEC ERROR ===', converted, JSON.stringify(params), e.message);
      throw e;
    }
    save();
    return { rows: [] };
  }

  console.log('Banco: SQLite (' + DB_PATH + ')');
  return { query, close: () => { save(); db.close(); }, type: 'sqlite' };
}

module.exports = initSQLite;
