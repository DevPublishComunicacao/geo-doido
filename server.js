require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { router: authRouter } = require('./auth');
const migrate = require('./migrate');

const app = express();
const PORT = process.env.PORT || 3000;

migrate();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'geo-doido-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

app.use(express.static(path.join(__dirname)));

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/config', (req, res) => {
  res.sendFile(path.join(__dirname, 'config.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`GeoDoido rodando em http://localhost:${PORT}`);
});
