const REGIOES_STREET_VIEW = [
  { nome: 'Estados Unidos', bounds: { latMin: 24.5, latMax: 49.5, lngMin: -125, lngMax: -66.5 } },
  { nome: 'Brasil', bounds: { latMin: -34, latMax: 6, lngMin: -74, lngMax: -34 } },
  { nome: 'Canadá', bounds: { latMin: 42, latMax: 83, lngMin: -141, lngMax: -52 } },
  { nome: 'México', bounds: { latMin: 14.5, latMax: 32.7, lngMin: -118.4, lngMax: -86.7 } },
  { nome: 'Argentina', bounds: { latMin: -55, latMax: -21.8, lngMin: -73.5, lngMax: -53.6 } },
  { nome: 'Chile', bounds: { latMin: -56, latMax: -17.5, lngMin: -75.6, lngMax: -66.4 } },
  { nome: 'Europa Ocidental', bounds: { latMin: 36, latMax: 60, lngMin: -10, lngMax: 30 } },
  { nome: 'Austrália', bounds: { latMin: -44, latMax: -10, lngMin: 113, lngMax: 154 } },
  { nome: 'Nova Zelândia', bounds: { latMin: -47.5, latMax: -34, lngMin: 166, lngMax: 179 } },
  { nome: 'Japão', bounds: { latMin: 30, latMax: 46, lngMin: 129, lngMax: 146 } },
  { nome: 'Coreia do Sul', bounds: { latMin: 33, latMax: 38.5, lngMin: 125, lngMax: 130 } },
  { nome: 'Taiwan', bounds: { latMin: 21.8, latMax: 25.5, lngMin: 119.5, lngMax: 122 } },
  { nome: 'Singapura', bounds: { latMin: 1.2, latMax: 1.5, lngMin: 103.6, lngMax: 104.1 } },
  { nome: 'Hong Kong', bounds: { latMin: 22.1, latMax: 22.6, lngMin: 113.8, lngMax: 114.5 } },
  { nome: 'África do Sul', bounds: { latMin: -35, latMax: -22, lngMin: 16, lngMax: 33 } },
  { nome: 'Quênia', bounds: { latMin: -4.7, latMax: 4.7, lngMin: 33.9, lngMax: 41.9 } },
  { nome: 'Tailândia', bounds: { latMin: 5.6, latMax: 20.5, lngMin: 97.3, lngMax: 105.6 } },
  { nome: 'Malásia', bounds: { latMin: 0.8, latMax: 6.5, lngMin: 99.6, lngMax: 119.3 } },
  { nome: 'Indonésia', bounds: { latMin: -11, latMax: 6, lngMin: 95, lngMax: 141 } },
  { nome: 'Filipinas', bounds: { latMin: 4.5, latMax: 21, lngMin: 116.9, lngMax: 126.6 } },
];

function gerarCoordenadaAleatoria(bounds) {
  const lat = bounds.latMin + Math.random() * (bounds.latMax - bounds.latMin);
  const lng = bounds.lngMin + Math.random() * (bounds.lngMax - bounds.lngMin);
  return { lat, lng };
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

function setupMultiplayer(io) {
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
        enviarRodada(sala);
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
  io.to(sala.codigo).emit('round_start', {
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

  io.to(sala.codigo).emit('round_end', {
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

  io.to(sala.codigo).emit('game_end', { ranking });
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
