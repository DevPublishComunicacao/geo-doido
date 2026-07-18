const fs = require('fs');
const path = require('path');
const db = require('./db');

async function migrate() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.query(sql);
    console.log('Migration executada com sucesso');
  } catch (err) {
    console.error('Erro na migration:', err.message);
  }
}

module.exports = migrate;
