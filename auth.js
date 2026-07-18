const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
const router = express.Router();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query('SELECT id, nome, email, avatar_url FROM usuarios WHERE id = $1', [id]);
    done(null, result.rows[0] || null);
  } catch (err) {
    done(err, null);
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'geo-doido-jwt-secret-dev';
const JWT_EXPIRES = '7d';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

// CADASTRO
router.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }
    if (senha.length < 6) {
      return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const existente = await db.query('SELECT id FROM usuarios WHERE email = $1', [email.toLowerCase()]);
    if (existente.rows.length > 0) {
      return res.status(409).json({ erro: 'Este email já está cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const result = await db.query(
      `INSERT INTO usuarios (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email, criado_em`,
      [nome, email.toLowerCase(), senhaHash]
    );

    const usuario = result.rows[0];
    const token = gerarToken(usuario);

    res.status(201).json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// LOGIN
router.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const result = await db.query(
      'SELECT id, nome, email, senha_hash, avatar_url FROM usuarios WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const usuario = result.rows[0];
    if (!usuario.senha_hash) {
      return res.status(401).json({
        erro: 'Esta conta usa login do Google. Faça login com Google.',
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = gerarToken(usuario);
    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, avatar_url: usuario.avatar_url },
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// LOGIN VIA FORM (redirect-based, mais confiável)
router.post('/api/auth/login-form', express.urlencoded({ extended: false }), async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.redirect('/login.html?erro=login_empty');
    }

    const result = await db.query(
      'SELECT id, nome, email, senha_hash FROM usuarios WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0 || !result.rows[0].senha_hash) {
      return res.redirect('/login.html?erro=login_invalid');
    }

    const senhaValida = await bcrypt.compare(senha, result.rows[0].senha_hash);
    if (!senhaValida) {
      return res.redirect('/login.html?erro=login_invalid');
    }

    const usuario = result.rows[0];
    const token = gerarToken(usuario);
    const nomeEncoded = encodeURIComponent(usuario.nome);
    res.redirect(`/login.html?token=${token}&nome=${nomeEncoded}&r=/game`);
  } catch (err) {
    console.error('Erro no login-form:', err);
    res.redirect('/login.html?erro=login_error');
  }
});

// CADASTRO VIA FORM
router.post('/api/auth/register-form', express.urlencoded({ extended: false }), async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.redirect('/login.html?erro=register_empty');
    }
    if (senha.length < 6) {
      return res.redirect('/login.html?erro=register_password_short');
    }

    const existente = await db.query('SELECT id FROM usuarios WHERE email = $1', [email.toLowerCase()]);
    if (existente.rows.length > 0) {
      return res.redirect('/login.html?erro=register_exists');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const result = await db.query(
      `INSERT INTO usuarios (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email`,
      [nome, email.toLowerCase(), senhaHash]
    );

    const usuario = result.rows[0];
    const token = gerarToken(usuario);
    const nomeEncoded = encodeURIComponent(usuario.nome);
    res.redirect(`/login.html?token=${token}&nome=${nomeEncoded}&r=/game`);
  } catch (err) {
    console.error('Erro no register-form:', err);
    res.redirect('/login.html?erro=register_error');
  }
});

// ESQUECI SENHA - enviar email com token
router.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ erro: 'Email é obrigatório' });
    }

    const result = await db.query('SELECT id, nome FROM usuarios WHERE email = $1', [email.toLowerCase()]);
    if (result.rows.length === 0) {
      // Não revelar se o email existe ou não (segurança)
      return res.json({ mensagem: 'Se o email estiver cadastrado, você receberá um link de recuperação.' });
    }

    const usuario = result.rows[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expiraEm = new Date(Date.now() + 3600000); // 1 hora

    await db.query(
      `INSERT INTO tokens_reset_senha (usuario_id, token, expira_em)
       VALUES ($1, $2, $3)`,
      [usuario.id, token, expiraEm]
    );

    const resetLink = `${FRONTEND_URL}/reset-password.html?token=${token}`;

    // Tenta enviar email (se nodemailer configurado)
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"GeoDoido" <noreply@geodoido.com>',
        to: usuario.nome + ' <' + email + '>',
        subject: 'Recuperação de Senha - GeoDoido',
        html: `<p>Olá ${usuario.nome},</p>
               <p>Recebemos um pedido de recuperação de senha.</p>
               <p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>
               <p>Este link expira em 1 hora.</p>
               <p>Se você não solicitou, ignore este email.</p>`,
      });
    } catch (emailErr) {
      console.warn('Email não enviado (SMTP não configurado):', emailErr.message);
    }

    res.json({
      mensagem: 'Se o email estiver cadastrado, você receberá um link de recuperação.',
      // Em desenvolvimento, retornamos o token para testes
      ...(process.env.NODE_ENV !== 'production' && { token_dev: token }),
    });
  } catch (err) {
    console.error('Erro no forgot-password:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// REDEFINIR SENHA
router.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, senha } = req.body;
    if (!token || !senha) {
      return res.status(400).json({ erro: 'Token e nova senha são obrigatórios' });
    }
    if (senha.length < 6) {
      return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const result = await db.query(
      `SELECT usuario_id, expira_em, usado
       FROM tokens_reset_senha
       WHERE token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ erro: 'Token inválido' });
    }

    const tokenData = result.rows[0];
    if (tokenData.usado) {
      return res.status(400).json({ erro: 'Este token já foi utilizado' });
    }
    if (new Date() > new Date(tokenData.expira_em)) {
      return res.status(400).json({ erro: 'Token expirado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await db.query('UPDATE usuarios SET senha_hash = $1 WHERE id = $2', [
      senhaHash,
      tokenData.usuario_id,
    ]);
    await db.query('UPDATE tokens_reset_senha SET usado = TRUE WHERE token = $1', [token]);

    res.json({ mensagem: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error('Erro no reset-password:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PEGAR DADOS DO USUÁRIO LOGADO
router.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, nome, email, avatar_url, criado_em FROM usuarios WHERE id = $1',
      [req.usuario.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json({ usuario: result.rows[0] });
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// --- GOOGLE OAUTH ---

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id;
      const email = profile.emails?.[0]?.value || `${googleId}@google.com`;
      const nome = profile.displayName || 'Usuário Google';
      const avatarUrl = profile.photos?.[0]?.value || null;

      // Tenta achar usuário pelo google_id
      let result = await db.query('SELECT id, nome, email, avatar_url FROM usuarios WHERE google_id = $1', [googleId]);
      if (result.rows.length > 0) {
        return done(null, result.rows[0]);
      }

      // Tenta achar pelo email
      result = await db.query('SELECT id, nome, email, avatar_url FROM usuarios WHERE email = $1', [email.toLowerCase()]);
      if (result.rows.length > 0) {
        // Vincula o google_id à conta existente
        await db.query('UPDATE usuarios SET google_id = $1, avatar_url = COALESCE($2, avatar_url) WHERE id = $3',
          [googleId, avatarUrl, result.rows[0].id]);
        return done(null, result.rows[0]);
      }

      // Cria novo usuário
      result = await db.query(
        `INSERT INTO usuarios (nome, email, google_id, avatar_url)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nome, email, avatar_url`,
        [nome, email.toLowerCase(), googleId, avatarUrl]
      );

      done(null, result.rows[0]);
    } catch (err) {
      done(err, null);
    }
  }));
} else {
  console.warn('Google OAuth não configurado. Defina GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET.');
  // Rotas dummy quando Google não configurado
  router.get('/api/auth/google', (req, res) => {
    res.redirect('/login.html?erro=google_not_configured');
  });
  router.get('/api/auth/google/callback', (req, res) => {
    res.redirect('/login.html?erro=google_not_configured');
  });
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const googleCallbackURL = (req) => `${req.protocol}://${req.get('host')}/api/auth/google/callback`;

  // Iniciar login Google
  router.get('/api/auth/google',
    (req, res, next) => {
      const cbURL = googleCallbackURL(req);
      console.log('=== GOOGLE INIT === protocol:', req.protocol, 'host:', req.get('host'), 'callbackURL:', cbURL);
      passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
        callbackURL: cbURL,
      })(req, res, next);
    }
  );

  // Callback do Google
  router.get('/api/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', {
        session: false,
        failureRedirect: '/login.html?erro=google',
        callbackURL: googleCallbackURL(req),
      })(req, res, next);
    },
    (req, res) => {
      const token = gerarToken(req.user);
      res.redirect(`/login.html?token=${token}&nome=${encodeURIComponent(req.user.nome)}&r=/game`);
    }
  );

  // Tratamento de erro do passport (Google OAuth)
  router.use('/api/auth/google', (err, req, res, next) => {
    console.error('=== GOOGLE AUTH ERROR ===', err?.message, err?.stack);
    res.status(500).json({ erro: 'Falha na autenticação Google', detalhe: err?.message });
  });
}

// RANKINGS
const RANKINGS = [
  { nome: 'PLATINA',           emoji: '🏆', partidasMin: 20, pontosMin: 70000 },
  { nome: 'DIAMANTE',          emoji: '💎', partidasMin: 18, pontosMin: 60000 },
  { nome: 'OURO',              emoji: '🥇', partidasMin: 16, pontosMin: 50000 },
  { nome: 'PRATA',             emoji: '🥈', partidasMin: 12, pontosMin: 30000 },
  { nome: 'BRONZE',            emoji: '🥉', partidasMin: 8,  pontosMin: 15000 },
  { nome: 'FERRO',             emoji: '⛓️', partidasMin: 3,  pontosMin: 10000 },
];

function calcularRanking(partidas, pontos) {
  for (const r of RANKINGS) {
    if (partidas >= r.partidasMin && pontos >= r.pontosMin) {
      return r;
    }
  }
  return { nome: 'ANALFABETO GEOGRÁFICO', emoji: '📖', partidasMin: 0, pontosMin: 0 };
}

// SALVAR PARTIDA
router.post('/api/auth/save-game', authMiddleware, async (req, res) => {
  try {
    const { pontuacao, modo, paisCodigo } = req.body;
    if (pontuacao == null || typeof pontuacao !== 'number') {
      return res.status(400).json({ erro: 'Pontuação é obrigatória' });
    }
    const modosValidos = ['mundo', 'paises', 'pontos-turisticos'];
    const modoVal = modosValidos.includes(modo) ? modo : 'mundo';
    const paisVal = modoVal === 'paises' && paisCodigo ? paisCodigo : null;
    await db.query(
      'INSERT INTO partidas (usuario_id, pontuacao, modo, pais_codigo) VALUES ($1, $2, $3, $4)',
      [req.usuario.id, Math.round(pontuacao), modoVal, paisVal]
    );
    res.json({ mensagem: 'Partida salva!' });
  } catch (err) {
    console.error('Erro ao salvar partida:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PEGAR RANKING DO USUÁRIO
router.get('/api/auth/ranking', authMiddleware, async (req, res) => {
  try {
    const modoRank = ['mundo', 'paises', 'pontos-turisticos'].includes(req.query.modo) ? req.query.modo : 'mundo';
    const result = await db.query(
      `SELECT COUNT(*)::int AS total_partidas, COALESCE(SUM(pontuacao), 0)::int AS total_pontos
       FROM partidas
       WHERE usuario_id = $1 AND modo = $2
         AND criado_em >= NOW() - INTERVAL '30 days'`,
      [req.usuario.id, modoRank]
    );

    const { total_partidas, total_pontos } = result.rows[0];
    const ranking = calcularRanking(total_partidas, total_pontos);

    res.json({
      total_partidas,
      total_pontos,
      ranking: ranking.nome,
      emoji: ranking.emoji,
    });
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// RECORDE GERAL
router.get('/api/auth/recorde-geral', async (req, res) => {
  try {
    const modo = req.query.modo;
    let sql = 'SELECT COALESCE(MAX(pontuacao), 0)::int AS recorde FROM partidas';
    const params = [];
    if (['mundo', 'paises', 'pontos-turisticos'].includes(modo)) {
      sql += ' WHERE modo = $1';
      params.push(modo);
    }
    const result = await db.query(sql, params);
    res.json({ recorde: result.rows[0].recorde });
  } catch (err) {
    console.error('Erro ao buscar recorde geral:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// ESTATÍSTICAS DO USUÁRIO
router.get('/api/auth/stats', authMiddleware, async (req, res) => {
  try {
    const modo = req.query.modo;
    let sql = `SELECT COUNT(*)::int AS total_partidas,
                      COALESCE(MAX(pontuacao), 0)::int AS melhor_pontuacao
               FROM partidas
               WHERE usuario_id = $1`;
    const params = [req.usuario.id];
    if (['mundo', 'paises', 'pontos-turisticos'].includes(modo)) {
      sql += ' AND modo = $2';
      params.push(modo);
    }
    const result = await db.query(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar stats:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// ESTATÍSTICAS DO USUÁRIO POR PAÍS (MODO PAÍSES)
router.get('/api/auth/stats/pais/:codigo', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*)::int AS total_partidas,
              COALESCE(MAX(pontuacao), 0)::int AS melhor_pontuacao
       FROM partidas
       WHERE usuario_id = $1 AND modo = 'paises' AND pais_codigo = $2`,
      [req.usuario.id, req.params.codigo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar stats do país:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// RECORDE GERAL POR PAÍS (MODO PAÍSES)
router.get('/api/auth/recorde/pais/:codigo', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COALESCE(MAX(pontuacao), 0)::int AS recorde
       FROM partidas
       WHERE modo = 'paises' AND pais_codigo = $1`,
      [req.params.codigo]
    );
    res.json({ recorde: result.rows[0].recorde });
  } catch (err) {
    console.error('Erro ao buscar recorde do país:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// RANKING GLOBAL POR MODO
router.get('/api/auth/ranking/global', async (req, res) => {
  try {
    const modoRank = ['mundo', 'paises', 'pontos-turisticos'].includes(req.query.modo) ? req.query.modo : 'mundo';
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const result = await db.query(
      `SELECT u.nome, u.avatar_url,
              COUNT(p.id)::int AS partidas,
              MAX(p.pontuacao)::int AS melhor_pontuacao,
              COALESCE(SUM(p.pontuacao), 0)::int AS total_pontos
       FROM partidas p
       JOIN usuarios u ON u.id = p.usuario_id
       WHERE p.modo = $1
       GROUP BY u.id, u.nome, u.avatar_url
       ORDER BY melhor_pontuacao DESC
       LIMIT $2`,
      [modoRank, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar ranking global:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// RANKING POR PAÍS (MODO PAÍSES)
router.get('/api/auth/ranking/pais/:codigo', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const result = await db.query(
      `SELECT u.nome, u.avatar_url,
              COUNT(p.id)::int AS partidas,
              MAX(p.pontuacao)::int AS melhor_pontuacao,
              COALESCE(SUM(p.pontuacao), 0)::int AS total_pontos
       FROM partidas p
       JOIN usuarios u ON u.id = p.usuario_id
       WHERE p.modo = 'paises' AND p.pais_codigo = $1
       GROUP BY u.id, u.nome, u.avatar_url
       ORDER BY melhor_pontuacao DESC
       LIMIT $2`,
      [req.params.codigo, limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar ranking do país:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// LISTA DE PAÍSES COM MELHORES PONTUAÇÕES
router.get('/api/auth/ranking/paises', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT pais_codigo, COUNT(*)::int AS total_partidas,
              MAX(pontuacao)::int AS melhor_pontuacao
       FROM partidas
       WHERE modo = 'paises' AND pais_codigo IS NOT NULL
       GROUP BY pais_codigo
       ORDER BY melhor_pontuacao DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar lista de países:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

module.exports = { router, authMiddleware };
