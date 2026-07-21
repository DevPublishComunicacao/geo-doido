require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { router: authRouter } = require('./auth');
const db = require('./db');

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', db: err.message });
  }
});

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'where-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

const FRONTEND_PUBLIC = path.join(__dirname, '..', '..', 'frontend', 'public');
app.use(express.static(FRONTEND_PUBLIC));

app.use((err, req, res, next) => {
  console.error('=== ERRO ===', err?.message || err, err?.stack);
  res.status(500).json({ erro: err?.message || 'Erro interno do servidor' });
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(FRONTEND_PUBLIC, 'game.html'));
});

app.get('/config', (req, res) => {
  res.sendFile(path.join(FRONTEND_PUBLIC, 'config.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_PUBLIC, 'index.html'));
});

// Inicializa banco e depois sobe servidor
db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`Where? rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Falha ao inicializar banco:', err.message);
  app.listen(PORT, () => {
    console.log(`Where? rodando (sem banco) em http://localhost:${PORT}`);
  });
});
