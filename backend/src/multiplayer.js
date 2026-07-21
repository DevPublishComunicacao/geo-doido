const https = require('https');
const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

const REGIOES_STREET_VIEW = [
  { nome: 'África do Sul', bounds: { latMin: -35, latMax: -22, lngMin: 16, lngMax: 33 } },
  { nome: 'Albânia', bounds: { latMin: 39.6, latMax: 42.7, lngMin: 19.2, lngMax: 21.1 } },
  { nome: 'Alemanha', bounds: { latMin: 47.3, latMax: 55.1, lngMin: 5.9, lngMax: 15.1 } },
  { nome: 'Angola', bounds: { latMin: -18, latMax: -5, lngMin: 11.7, lngMax: 24.1 } },
  { nome: 'Arábia Saudita', bounds: { latMin: 16.4, latMax: 32.2, lngMin: 34.5, lngMax: 55.7 } },
  { nome: 'Argélia', bounds: { latMin: 18.9, latMax: 37.1, lngMin: -8.7, lngMax: 12 } },
  { nome: 'Argentina', bounds: { latMin: -55, latMax: -21.8, lngMin: -73.5, lngMax: -53.6 } },
  { nome: 'Armênia', bounds: { latMin: 38.8, latMax: 41.3, lngMin: 43.4, lngMax: 46.6 } },
  { nome: 'Austrália', bounds: { latMin: -44, latMax: -10, lngMin: 113, lngMax: 154 } },
  { nome: 'Áustria', bounds: { latMin: 46.4, latMax: 49, lngMin: 9.5, lngMax: 17.2 } },
  { nome: 'Bahamas', bounds: { latMin: 22.8, latMax: 27, lngMin: -79, lngMax: -72.7 } },
  { nome: 'Bangladesh', bounds: { latMin: 20.6, latMax: 26.6, lngMin: 88, lngMax: 92.7 } },
  { nome: 'Bélgica', bounds: { latMin: 49.5, latMax: 51.5, lngMin: 2.5, lngMax: 6.4 } },
  { nome: 'Bielorrússia', bounds: { latMin: 51.2, latMax: 56.2, lngMin: 23.2, lngMax: 32.8 } },
  { nome: 'Bolívia', bounds: { latMin: -22.9, latMax: -9.7, lngMin: -69.6, lngMax: -57.5 } },
  { nome: 'Bósnia e Herzegovina', bounds: { latMin: 42.5, latMax: 45.3, lngMin: 15.7, lngMax: 19.6 } },
  { nome: 'Botsuana', bounds: { latMin: -26.9, latMax: -17.8, lngMin: 20, lngMax: 29.4 } },
  { nome: 'Brasil', bounds: { latMin: -34, latMax: 6, lngMin: -74, lngMax: -34 } },
  { nome: 'Bulgária', bounds: { latMin: 41.2, latMax: 44.2, lngMin: 22.4, lngMax: 28.7 } },
  { nome: 'Camarões', bounds: { latMin: 1.7, latMax: 13.1, lngMin: 8.5, lngMax: 16.2 } },
  { nome: 'Camboja', bounds: { latMin: 10.4, latMax: 14.7, lngMin: 102.3, lngMax: 107.6 } },
  { nome: 'Canadá', bounds: { latMin: 42, latMax: 83, lngMin: -141, lngMax: -52 } },
  { nome: 'Catar', bounds: { latMin: 24.5, latMax: 26.2, lngMin: 50.7, lngMax: 51.7 } },
  { nome: 'Cazaquistão', bounds: { latMin: 40.9, latMax: 55.4, lngMin: 46.5, lngMax: 87.3 } },
  { nome: 'Chile', bounds: { latMin: -56, latMax: -17.5, lngMin: -75.6, lngMax: -66.4 } },
  { nome: 'China', bounds: { latMin: 18.2, latMax: 53.6, lngMin: 73.7, lngMax: 135 } },
  { nome: 'Colômbia', bounds: { latMin: -4.2, latMax: 12.5, lngMin: -79, lngMax: -66.9 } },
  { nome: 'Coreia do Sul', bounds: { latMin: 33, latMax: 38.5, lngMin: 125, lngMax: 130 } },
  { nome: 'Costa do Marfim', bounds: { latMin: 4.3, latMax: 10.7, lngMin: -8.6, lngMax: -2.5 } },
  { nome: 'Costa Rica', bounds: { latMin: 8, latMax: 11.2, lngMin: -85.9, lngMax: -82.5 } },
  { nome: 'Croácia', bounds: { latMin: 42.4, latMax: 46.6, lngMin: 13.5, lngMax: 19.4 } },
  { nome: 'Cuba', bounds: { latMin: 19.8, latMax: 23.3, lngMin: -85, lngMax: -74.1 } },
  { nome: 'Dinamarca', bounds: { latMin: 54.6, latMax: 57.8, lngMin: 8, lngMax: 15.2 } },
  { nome: 'Egito', bounds: { latMin: 22, latMax: 31.7, lngMin: 24.7, lngMax: 37 } },
  { nome: 'El Salvador', bounds: { latMin: 13.1, latMax: 14.5, lngMin: -90.2, lngMax: -87.6 } },
  { nome: 'Emirados Árabes', bounds: { latMin: 22.6, latMax: 26.1, lngMin: 51.5, lngMax: 56.4 } },
  { nome: 'Equador', bounds: { latMin: -5, latMax: 1.5, lngMin: -81, lngMax: -75.2 } },
  { nome: 'Eslováquia', bounds: { latMin: 47.7, latMax: 49.6, lngMin: 16.8, lngMax: 22.6 } },
  { nome: 'Eslovênia', bounds: { latMin: 45.4, latMax: 46.9, lngMin: 13.4, lngMax: 16.6 } },
  { nome: 'Espanha', bounds: { latMin: 36, latMax: 43.8, lngMin: -9.3, lngMax: 4.3 } },
  { nome: 'Estados Unidos', bounds: { latMin: 24.5, latMax: 49.5, lngMin: -125, lngMax: -66.5 } },
  { nome: 'Estônia', bounds: { latMin: 57.5, latMax: 59.7, lngMin: 21.8, lngMax: 28.2 } },
  { nome: 'Etiópia', bounds: { latMin: 3.4, latMax: 14.9, lngMin: 33, lngMax: 48 } },
  { nome: 'Fiji', bounds: { latMin: -19.2, latMax: -16, lngMin: 177, lngMax: 180 } },
  { nome: 'Filipinas', bounds: { latMin: 4.5, latMax: 21, lngMin: 116.9, lngMax: 126.6 } },
  { nome: 'Finlândia', bounds: { latMin: 59.8, latMax: 70.1, lngMin: 20.6, lngMax: 31.6 } },
  { nome: 'França', bounds: { latMin: 42.3, latMax: 51.1, lngMin: -4.8, lngMax: 8.2 } },
  { nome: 'Gana', bounds: { latMin: 4.7, latMax: 11.2, lngMin: -3.2, lngMax: 1.2 } },
  { nome: 'Geórgia', bounds: { latMin: 41.1, latMax: 43.6, lngMin: 40, lngMax: 46.7 } },
  { nome: 'Grécia', bounds: { latMin: 34.8, latMax: 41.7, lngMin: 19.4, lngMax: 29.7 } },
  { nome: 'Guatemala', bounds: { latMin: 13.7, latMax: 17.8, lngMin: -92.2, lngMax: -88.2 } },
  { nome: 'Holanda', bounds: { latMin: 50.8, latMax: 53.5, lngMin: 3.3, lngMax: 7.2 } },
  { nome: 'Hong Kong', bounds: { latMin: 22.1, latMax: 22.6, lngMin: 113.8, lngMax: 114.5 } },
  { nome: 'Hungria', bounds: { latMin: 45.7, latMax: 48.6, lngMin: 16.1, lngMax: 22.9 } },
  { nome: 'Índia', bounds: { latMin: 6.8, latMax: 35.5, lngMin: 68.2, lngMax: 97.4 } },
  { nome: 'Indonésia', bounds: { latMin: -11, latMax: 6, lngMin: 95, lngMax: 141 } },
  { nome: 'Irlanda', bounds: { latMin: 51.4, latMax: 55.4, lngMin: -10.5, lngMax: -5.9 } },
  { nome: 'Islândia', bounds: { latMin: 63.3, latMax: 66.6, lngMin: -24.5, lngMax: -13.5 } },
  { nome: 'Israel', bounds: { latMin: 29.5, latMax: 33.3, lngMin: 34.2, lngMax: 35.9 } },
  { nome: 'Itália', bounds: { latMin: 36.7, latMax: 47.1, lngMin: 6.6, lngMax: 18.5 } },
  { nome: 'Jamaica', bounds: { latMin: 17.7, latMax: 18.5, lngMin: -78.4, lngMax: -76.2 } },
  { nome: 'Japão', bounds: { latMin: 30, latMax: 46, lngMin: 129, lngMax: 146 } },
  { nome: 'Jordânia', bounds: { latMin: 29.2, latMax: 33.4, lngMin: 34.9, lngMax: 39.3 } },
  { nome: 'Letônia', bounds: { latMin: 55.7, latMax: 58.1, lngMin: 20.9, lngMax: 28.2 } },
  { nome: 'Líbano', bounds: { latMin: 33.05, latMax: 34.7, lngMin: 35.1, lngMax: 36.6 } },
  { nome: 'Lituânia', bounds: { latMin: 53.9, latMax: 56.5, lngMin: 20.9, lngMax: 26.9 } },
  { nome: 'Luxemburgo', bounds: { latMin: 49.4, latMax: 50.2, lngMin: 5.7, lngMax: 6.5 } },
  { nome: 'Macau', bounds: { latMin: 22.1, latMax: 22.2, lngMin: 113.53, lngMax: 113.6 } },
  { nome: 'Macedônia do Norte', bounds: { latMin: 40.8, latMax: 42.4, lngMin: 20.4, lngMax: 23.1 } },
  { nome: 'Madagascar', bounds: { latMin: -25.6, latMax: -11.9, lngMin: 43.2, lngMax: 50.5 } },
  { nome: 'Malásia', bounds: { latMin: 0.8, latMax: 6.5, lngMin: 99.6, lngMax: 119.3 } },
  { nome: 'Malta', bounds: { latMin: 35.8, latMax: 36.1, lngMin: 14.18, lngMax: 14.58 } },
  { nome: 'Marrocos', bounds: { latMin: 27.7, latMax: 35.9, lngMin: -13.2, lngMax: -1 } },
  { nome: 'Maurício', bounds: { latMin: -20.5, latMax: -19.9, lngMin: 57.3, lngMax: 57.8 } },
  { nome: 'México', bounds: { latMin: 14.5, latMax: 32.7, lngMin: -118.4, lngMax: -86.7 } },
  { nome: 'Mianmar', bounds: { latMin: 9.8, latMax: 28.5, lngMin: 92.2, lngMax: 101.2 } },
  { nome: 'Moçambique', bounds: { latMin: -26.9, latMax: -10.4, lngMin: 30.2, lngMax: 40.9 } },
  { nome: 'Moldova', bounds: { latMin: 45.5, latMax: 48.5, lngMin: 26.6, lngMax: 30.2 } },
  { nome: 'Mônaco', bounds: { latMin: 43.72, latMax: 43.75, lngMin: 7.4, lngMax: 7.44 } },
  { nome: 'Mongólia', bounds: { latMin: 41.6, latMax: 52.1, lngMin: 87.8, lngMax: 119.9 } },
  { nome: 'Montenegro', bounds: { latMin: 41.8, latMax: 43.6, lngMin: 18.4, lngMax: 20.4 } },
  { nome: 'Namíbia', bounds: { latMin: -28.9, latMax: -16.9, lngMin: 11.7, lngMax: 25.3 } },
  { nome: 'Nepal', bounds: { latMin: 26.4, latMax: 30.5, lngMin: 80, lngMax: 88.2 } },
  { nome: 'Nicarágua', bounds: { latMin: 11, latMax: 15, lngMin: -87.7, lngMax: -83.1 } },
  { nome: 'Nigéria', bounds: { latMin: 4.3, latMax: 13.9, lngMin: 2.7, lngMax: 14.7 } },
  { nome: 'Noruega', bounds: { latMin: 57.9, latMax: 71.2, lngMin: 4.6, lngMax: 31.1 } },
  { nome: 'Nova Zelândia', bounds: { latMin: -47.5, latMax: -34, lngMin: 166, lngMax: 179 } },
  { nome: 'Panamá', bounds: { latMin: 7.2, latMax: 9.7, lngMin: -83, lngMax: -77.2 } },
  { nome: 'Paraguai', bounds: { latMin: -27.6, latMax: -19.3, lngMin: -62.6, lngMax: -54.2 } },
  { nome: 'Peru', bounds: { latMin: -18.4, latMax: -0.5, lngMin: -81.4, lngMax: -68.7 } },
  { nome: 'Polônia', bounds: { latMin: 49, latMax: 55, lngMin: 14.1, lngMax: 24.2 } },
  { nome: 'Porto Rico', bounds: { latMin: 17.9, latMax: 18.5, lngMin: -67.3, lngMax: -65.2 } },
  { nome: 'Portugal', bounds: { latMin: 36.9, latMax: 42.2, lngMin: -9.5, lngMax: -6.2 } },
  { nome: 'Quênia', bounds: { latMin: -4.7, latMax: 4.7, lngMin: 33.9, lngMax: 41.9 } },
  { nome: 'Reino Unido', bounds: { latMin: 49.9, latMax: 60.9, lngMin: -8.2, lngMax: 1.8 } },
  { nome: 'República Dominicana', bounds: { latMin: 17.4, latMax: 20, lngMin: -72, lngMax: -68.3 } },
  { nome: 'República Tcheca', bounds: { latMin: 48.5, latMax: 51.1, lngMin: 12.1, lngMax: 18.9 } },
  { nome: 'Romênia', bounds: { latMin: 43.6, latMax: 48.3, lngMin: 20.3, lngMax: 29.8 } },
  { nome: 'Rússia', bounds: { latMin: 41.2, latMax: 81.9, lngMin: 19.6, lngMax: 190 } },
  { nome: 'Senegal', bounds: { latMin: 12.3, latMax: 16.7, lngMin: -17.7, lngMax: -11.3 } },
  { nome: 'Sérvia', bounds: { latMin: 42.2, latMax: 46.2, lngMin: 18.8, lngMax: 23 } },
  { nome: 'Singapura', bounds: { latMin: 1.2, latMax: 1.5, lngMin: 103.6, lngMax: 104.1 } },
  { nome: 'Sri Lanka', bounds: { latMin: 5.9, latMax: 9.9, lngMin: 79.6, lngMax: 81.9 } },
  { nome: 'Suécia', bounds: { latMin: 55.3, latMax: 69.1, lngMin: 11.1, lngMax: 24.2 } },
  { nome: 'Suíça', bounds: { latMin: 45.8, latMax: 47.8, lngMin: 5.9, lngMax: 10.5 } },
  { nome: 'Tailândia', bounds: { latMin: 5.6, latMax: 20.5, lngMin: 97.3, lngMax: 105.6 } },
  { nome: 'Taiwan', bounds: { latMin: 21.8, latMax: 25.5, lngMin: 119.5, lngMax: 122 } },
  { nome: 'Tanzânia', bounds: { latMin: -11.7, latMax: -1, lngMin: 29.3, lngMax: 40.4 } },
  { nome: 'Tunísia', bounds: { latMin: 30.2, latMax: 37.5, lngMin: 7.5, lngMax: 11.6 } },
  { nome: 'Turquia', bounds: { latMin: 36, latMax: 42.1, lngMin: 26, lngMax: 44.8 } },
  { nome: 'Ucrânia', bounds: { latMin: 44.4, latMax: 52.4, lngMin: 22.1, lngMax: 40.2 } },
  { nome: 'Uruguai', bounds: { latMin: -35, latMax: -30.1, lngMin: -58.5, lngMax: -53.1 } },
  { nome: 'Uzbequistão', bounds: { latMin: 37.2, latMax: 45.6, lngMin: 56, lngMax: 73.2 } },
  { nome: 'Venezuela', bounds: { latMin: 0.6, latMax: 12.2, lngMin: -73.4, lngMax: -59.8 } },
  { nome: 'Vietnã', bounds: { latMin: 8.4, latMax: 23.4, lngMin: 102.1, lngMax: 109.5 } },
];

function gerarCoordenadaAleatoria(bounds) {
  const lat = bounds.latMin + Math.random() * (bounds.latMax - bounds.latMin);
  const lng = bounds.lngMin + Math.random() * (bounds.lngMax - bounds.lngMin);
  return { lat, lng };
}

function verificarCoberturaStreetView(lat, lng) {
  return new Promise((resolve) => {
    if (!MAPS_API_KEY || MAPS_API_KEY.length < 20) {
      resolve({ ok: true, lat, lng });
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${MAPS_API_KEY}`;
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'OK' && json.location) {
            resolve({ ok: true, lat: json.location.lat, lng: json.location.lng });
          } else if (json.status === 'ZERO_RESULTS') {
            resolve({ ok: false });
          } else {
            resolve({ ok: true, lat, lng });
          }
        } catch (e) {
          resolve({ ok: true, lat, lng });
        }
      });
    });
    req.on('error', () => {
      resolve({ ok: true, lat, lng });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve({ ok: true, lat, lng });
    });
  });
}

function calcularDistancia(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calcularPontos(distancia) {
  if (distancia < 0.01) return 5000;
  return Math.round(5000 * Math.exp(-distancia / 2000));
}

function gerarLocais(quantidade) {
  const locais = [];
  for (let i = 0; i < quantidade; i++) {
    const regiao = REGIOES_STREET_VIEW[Math.floor(Math.random() * REGIOES_STREET_VIEW.length)];
    const coords = gerarCoordenadaAleatoria(regiao.bounds);
    locais.push({
      lat: +coords.lat.toFixed(6),
      lng: +coords.lng.toFixed(6),
    });
  }
  return locais;
}

function gerarCodigoSala() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = '';
  for (let i = 0; i < 4; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}

const salas = new Map();
let ioInstance = null;

function setupMultiplayer(io) {
  ioInstance = io;
  io.on('connection', (socket) => {
    let salaAtual = null;

    socket.on('create_room', (data) => {
      const { nome, avatar_url } = data;
      let codigo;
      do {
        codigo = gerarCodigoSala();
      } while (salas.has(codigo));

      const sala = {
        codigo,
        host: socket.id,
        players: [],
        state: 'lobby',
        round: 0,
        totalRounds: 5,
        locations: [],
        guesses: {},
        roundStartTime: null,
      };

      const player = {
        id: socket.id,
        nome: nome || 'Anônimo',
        avatar_url: avatar_url || '',
        pontuacao: 0,
        ready: false,
        guessed: false,
      };

      sala.players.push(player);
      salas.set(codigo, sala);
      socket.join(codigo);
      salaAtual = codigo;

      socket.emit('room_created', {
        codigo,
        players: formatPlayers(sala.players),
        host: true,
      });
    });

    socket.on('join_room', (data) => {
      const { codigo, nome, avatar_url } = data;
      const sala = salas.get(codigo.toUpperCase());
      if (!sala) {
        socket.emit('join_error', 'Sala não encontrada.');
        return;
      }
      if (sala.state !== 'lobby') {
        socket.emit('join_error', 'A partida já começou.');
        return;
      }
      if (sala.players.length >= 5) {
        socket.emit('join_error', 'Sala cheia (máx. 5 jogadores).');
        return;
      }

      const player = {
        id: socket.id,
        nome: nome || 'Anônimo',
        avatar_url: avatar_url || '',
        pontuacao: 0,
        ready: false,
        guessed: false,
      };

      sala.players.push(player);
      socket.join(codigo.toUpperCase());
      salaAtual = codigo.toUpperCase();

      socket.emit('room_joined', {
        codigo: sala.codigo,
        players: formatPlayers(sala.players),
        host: false,
      });

      io.to(sala.codigo).emit('players_update', {
        players: formatPlayers(sala.players),
      });
    });

    socket.on('player_ready', () => {
      if (!salaAtual) return;
      const sala = salas.get(salaAtual);
      if (!sala) return;

      const player = sala.players.find(p => p.id === socket.id);
      if (player) {
        player.ready = !player.ready;
      }

      io.to(sala.codigo).emit('players_update', {
        players: formatPlayers(sala.players),
      });
    });

    socket.on('start_game', () => {
      if (!salaAtual) return;
      const sala = salas.get(salaAtual);
      if (!sala) return;
      if (sala.host !== socket.id) return;
      if (sala.players.length < 2) {
        socket.emit('start_error', 'Precisa de pelo menos 2 jogadores.');
        return;
      }

      const allReady = sala.players.every(p => p.ready);
      if (!allReady) {
        socket.emit('start_error', 'Aguardando todos os jogadores ficarem prontos.');
        return;
      }

      sala.state = 'playing';
      sala.round = 0;
      sala.locations = gerarLocais(sala.totalRounds);
      sala.guesses = {};
      sala.players.forEach(p => {
        p.pontuacao = 0;
        p.guessed = false;
      });

      io.to(sala.codigo).emit('game_starting', {
        totalRounds: sala.totalRounds,
        players: formatPlayers(sala.players),
      });

    setTimeout(() => {
      try {
        console.log('enviarRodada chamado para sala ' + sala.codigo + ', round=' + sala.round + ', locations=' + sala.locations.length);
        enviarRodada(sala);
      } catch (err) {
        console.error('Erro ao enviar rodada:', err);
      }
    }, 2000);
    });

    socket.on('submit_guess', (data) => {
      if (!salaAtual) return;
      const sala = salas.get(salaAtual);
      if (!sala) return;
      if (sala.state !== 'playing') return;

      const { lat, lng } = data;
      const local = sala.locations[sala.round];
      if (!local) return;

      const distancia = calcularDistancia(lat, lng, local.lat, local.lng);
      const pontos = calcularPontos(distancia);

      sala.guesses[socket.id] = {
        lat,
        lng,
        distancia: Math.round(distancia),
        pontos,
      };

      const player = sala.players.find(p => p.id === socket.id);
      if (player) {
        player.guessed = true;
        player.pontuacao += pontos;
      }

      socket.emit('guess_result', {
        pontos,
        distancia: Math.round(distancia),
      });

      io.to(sala.codigo).emit('player_guessed', {
        playerId: socket.id,
        playerNome: player ? player.nome : '?',
        totalGuessed: Object.keys(sala.guesses).length,
        totalPlayers: sala.players.length,
      });

      if (Object.keys(sala.guesses).length >= sala.players.length) {
        finalizarRodada(sala);
      }
    });

    socket.on('request_new_location', async (data) => {
      if (!salaAtual) return;
      const sala = salas.get(salaAtual);
      if (!sala) return;
      if (sala.state !== 'playing') return;

      let encontrou = false;
      for (let tentativa = 0; tentativa < 10; tentativa++) {
        const bounds = REGIOES_STREET_VIEW[Math.floor(Math.random() * REGIOES_STREET_VIEW.length)].bounds;
        const coords = gerarCoordenadaAleatoria(bounds);
        const resultado = await verificarCoberturaStreetView(coords.lat, coords.lng);
        if (resultado.ok) {
          sala.locations[sala.round] = {
            lat: +resultado.lat.toFixed(6),
            lng: +resultado.lng.toFixed(6),
          };
          encontrou = true;
          break;
        }
      }

      if (!encontrou) {
        const bounds = REGIOES_STREET_VIEW[Math.floor(Math.random() * REGIOES_STREET_VIEW.length)].bounds;
        const coords = gerarCoordenadaAleatoria(bounds);
        sala.locations[sala.round] = {
          lat: +coords.lat.toFixed(6),
          lng: +coords.lng.toFixed(6),
        };
      }

      sala.guesses = {};
      sala.players.forEach(p => { p.guessed = false; });

      ioInstance.to(sala.codigo).emit('round_start', {
        round: sala.round + 1,
        totalRounds: sala.totalRounds,
        lat: sala.locations[sala.round].lat,
        lng: sala.locations[sala.round].lng,
      });
    });

    socket.on('next_round', () => {
      if (!salaAtual) return;
      const sala = salas.get(salaAtual);
      if (!sala) return;
      if (sala.host !== socket.id) return;

      sala.round++;
      sala.guesses = {};
      sala.players.forEach(p => { p.guessed = false; });

      if (sala.round >= sala.totalRounds) {
        finalizarJogo(sala);
      } else {
        enviarRodada(sala);
      }
    });

    socket.on('leave_room', () => {
      if (salaAtual) {
        const sala = salas.get(salaAtual);
        if (sala) {
          const idx = sala.players.findIndex(p => p.id === socket.id);
          if (idx !== -1) sala.players.splice(idx, 1);
          socket.leave(sala.codigo);
          if (sala.players.length === 0) {
            salas.delete(salaAtual);
          } else {
            if (sala.host === socket.id) sala.host = sala.players[0].id;
            if (sala.state === 'lobby') {
              io.to(sala.codigo).emit('players_update', { players: formatPlayers(sala.players), newHost: sala.host });
            }
          }
        }
        salaAtual = null;
      }
    });

    socket.on('disconnect', () => {
      if (salaAtual) {
        const sala = salas.get(salaAtual);
        if (sala) {
          const idx = sala.players.findIndex(p => p.id === socket.id);
          if (idx !== -1) sala.players.splice(idx, 1);
          if (sala.players.length === 0) {
            salas.delete(salaAtual);
          } else {
            if (sala.host === socket.id) sala.host = sala.players[0].id;
            io.to(sala.codigo).emit('players_update', { players: formatPlayers(sala.players), newHost: sala.host });
          }
        }
      }
    });
  });
}

function enviarRodada(sala) {
  const local = sala.locations[sala.round];
  ioInstance.to(sala.codigo).emit('round_start', {
    round: sala.round + 1,
    totalRounds: sala.totalRounds,
    lat: local.lat,
    lng: local.lng,
  });
}

function finalizarRodada(sala) {
  const local = sala.locations[sala.round];
  const resultados = sala.players.map(p => {
    const g = sala.guesses[p.id];
    return {
      playerId: p.id,
      nome: p.nome,
      avatar_url: p.avatar_url,
      distancia: g ? g.distancia : 0,
      pontos: g ? g.pontos : 0,
      palpite: g ? { lat: g.lat, lng: g.lng } : null,
      totalPontos: p.pontuacao,
    };
  });

  resultados.sort((a, b) => b.pontos - a.pontos);

  ioInstance.to(sala.codigo).emit('round_end', {
    round: sala.round + 1,
    local,
    resultados,
    players: formatPlayers(sala.players),
  });
}

function finalizarJogo(sala) {
  const ranking = sala.players.map(p => ({
    playerId: p.id,
    nome: p.nome,
    avatar_url: p.avatar_url,
    pontuacao: p.pontuacao,
  }));

  ranking.sort((a, b) => b.pontuacao - a.pontuacao);

  ioInstance.to(sala.codigo).emit('game_end', { ranking });
  salas.delete(sala.codigo);
}

function formatPlayers(players) {
  return players.map(p => ({
    id: p.id,
    nome: p.nome,
    avatar_url: p.avatar_url,
    ready: p.ready,
    guessed: p.guessed,
    pontuacao: p.pontuacao,
  }));
}

module.exports = { setupMultiplayer };
