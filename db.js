const initSQLite = require('./db-sqlite');

const DB_URL = process.env.DATABASE_URL
  || (process.env.DB_HOST ? `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` : null);

let db;

async function init() {
  if (DB_URL) {
    try {
      const { Pool } = require('pg');
      const pool = new Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
      await pool.query('SELECT 1');
      pool.on('error', (err) => console.error('Erro no pool PostgreSQL:', err.message));
      db = {
        query: (text, params) => pool.query(text, params),
        close: () => pool.end(),
        type: 'postgres',
      };
      console.log('Banco: PostgreSQL conectado');
      return;
    } catch (err) {
      console.error('PostgreSQL indisponível, fallback para SQLite:', err.message);
    }
  }

  db = await initSQLite();
}

async function query(text, params) {
  if (!db) await init();
  return db.query(text, params);
}

module.exports = {
  query,
  init,
};
