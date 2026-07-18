const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL
  || (process.env.DB_HOST ? `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` : null);

if (!DB_URL) {
  console.error('===========================================================');
  console.error('  ERRO: DATABASE_URL não configurada!');
  console.error('  O banco PostgreSQL do Render não está acessível.');
  console.error('  Execute o DEPLOY DO BLUEPRINT no Render Dashboard:');
  console.error('  https://dashboard.render.com → Blueprints → Deploy Blueprint');
  console.error('===========================================================');
}

const pool = DB_URL
  ? new Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } })
  : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('Erro no pool PostgreSQL:', err.message);
  });

  pool.query('SELECT 1')
    .then(() => console.log('Banco de dados conectado'))
    .catch(err => console.error('Falha na conexão com banco:', err.message));
}

module.exports = {
  query: async (text, params) => {
    if (!pool) throw new Error('Banco de dados não configurado. Adicione DATABASE_URL nas env vars do Render.');
    return pool.query(text, params);
  },
  pool,
};
