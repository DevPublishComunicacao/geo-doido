const { Pool } = require('pg');

// Constrói DATABASE_URL a partir das variáveis individuais (Render Blueprint)
const DB_URL = process.env.DATABASE_URL
  || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!DB_URL || DB_URL === 'postgresql://undefined:undefined@undefined:undefined/undefined') {
  console.error('========================================================');
  console.error('ERRO: DATABASE_URL não configurada!');
  console.error('Adicione DATABASE_URL nas env vars do Render.');
  console.error('Ou execute "Sync Blueprint" para restaurar env vars.');
  console.error('========================================================');
}

const pool = new Pool(
  DB_URL && DB_URL.startsWith('postgresql')
    ? { connectionString: DB_URL }
    : { host: 'localhost', port: 5432, database: 'geodoido', user: 'geodoido', password: 'geodoido123' }
);

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do PostgreSQL:', err.message);
});

// Testa conexão na inicialização
pool.query('SELECT 1')
  .then(() => console.log('Banco de dados conectado'))
  .catch(err => console.error('Falha na conexão com banco:', err.message));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
