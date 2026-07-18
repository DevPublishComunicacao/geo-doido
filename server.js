require('dotenv').config();
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
  secret: process.env.SESSION_SECRET || 'geo-doido-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

app.use(express.static(path.join(__dirname)));

app.use((err, req, res, next) => {
  console.error('=== ERRO ===', err?.message || err, err?.stack);
  res.status(500).json({ erro: err?.message || 'Erro interno do servidor' });
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/config', (req, res) => {
  res.sendFile(path.join(__dirname, 'config.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicializa banco e depois sobe servidor
db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`GeoDoido rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Falha ao inicializar banco:', err.message);
  app.listen(PORT, () => {
    console.log(`GeoDoido rodando (sem banco) em http://localhost:${PORT}`);
  });
});
