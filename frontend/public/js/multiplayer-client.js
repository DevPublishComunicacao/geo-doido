var mpSocket = null;
var mpSala = null;
var mpHost = false;
var mpPlayers = [];
var mpTotalRounds = 5;
var mpRound = 0;
var mpGuessConfirmed = false;
var mpWaitingGuesses = false;
var mpResultadosRodada = [];

function getUsuario() {
  try { return JSON.parse(localStorage.getItem('where-usuario') || '{}'); } catch(e) { return {}; }
}

function conectarMultiplayer() {
  mpSocket = io({ transports: ['websocket', 'polling'] });
  mpSocket.on('connect', function() {
    console.log('Socket conectado');
  });

  mpSocket.on('room_created', function(data) {
    mpSala = data.codigo;
    mpHost = data.host;
    mpPlayers = data.players;
    mostrarLobby();
  });

  mpSocket.on('room_joined', function(data) {
    mpSala = data.codigo;
    mpHost = data.host;
    mpPlayers = data.players;
    mostrarLobby();
  });

  mpSocket.on('join_error', function(msg) {
    alert(msg);
  });

  mpSocket.on('start_error', function(msg) {
    alert(msg);
  });

  mpSocket.on('players_update', function(data) {
    mpPlayers = data.players;
    if (data.newHost) mpHost = (mpSocket.id === data.newHost);
    atualizarListaJogadores();
  });

  mpSocket.on('game_starting', function(data) {
    mpTotalRounds = data.totalRounds;
    mpPlayers = data.players;
    document.getElementById('mp-lobby').classList.add('hidden');
    document.getElementById('mp-waiting').classList.remove('hidden');
    document.getElementById('mp-waiting-text').textContent = 'Partida começando...';
  });

  mpSocket.on('round_start', function(data) {
    mpRound = data.round;
    mpTotalRounds = data.totalRounds;
    mpGuessConfirmed = false;
    mpWaitingGuesses = false;
    mpResultadosRodada = [];
    mpSocket.guessData = { lat: data.lat, lng: data.lng };

    mostrarTelaJogoMulti();
    iniciarRodadaMulti({ lat: data.lat, lng: data.lng });
  });

  mpSocket.on('guess_result', function(data) {
    mpGuessConfirmed = true;
    if (typeof exibirResultadoPalpiteMulti === 'function') {
      exibirResultadoPalpiteMulti(data);
    }
  });

  mpSocket.on('player_guessed', function(data) {
    var el = document.getElementById('mp-guess-count');
    if (el) el.textContent = data.totalGuessed + '/' + data.totalPlayers + ' jogadores já palpitram';
  });

  mpSocket.on('round_end', function(data) {
    mpResultadosRodada = data.resultados;
    mostrarResultadoRodadaMulti(data);
  });

  mpSocket.on('game_end', function(data) {
    mostrarResultadoFinalMulti(data.ranking);
  });

  mpSocket.on('disconnect', function() {
    console.log('Socket desconectado');
  });
}

function criarSala() {
  if (mpSocket) mpSocket.disconnect();
  conectarMultiplayer();
  var usuario = getUsuario();
  mpSocket.on('connect', function check() {
    mpSocket.emit('create_room', {
      nome: usuario.nome || 'Anônimo',
      avatar_url: usuario.avatar_url || '',
    });
    mpSocket.off('connect', check);
  });
  if (mpSocket.connected) {
    mpSocket.emit('create_room', {
      nome: usuario.nome || 'Anônimo',
      avatar_url: usuario.avatar_url || '',
    });
  }
}

function entrarSala() {
  var codigo = document.getElementById('mp-codigo-input').value.trim().toUpperCase();
  if (!codigo || codigo.length !== 4) {
    alert('Digite um código de 4 caracteres.');
    return;
  }
  if (mpSocket) mpSocket.disconnect();
  conectarMultiplayer();
  var usuario = getUsuario();
  mpSocket.on('connect', function check() {
    mpSocket.emit('join_room', {
      codigo: codigo,
      nome: usuario.nome || 'Anônimo',
      avatar_url: usuario.avatar_url || '',
    });
    mpSocket.off('connect', check);
  });
  if (mpSocket.connected) {
    mpSocket.emit('join_room', {
      codigo: codigo,
      nome: usuario.nome || 'Anônimo',
      avatar_url: usuario.avatar_url || '',
    });
  }
}

function toggleReady() {
  if (mpSocket) mpSocket.emit('player_ready');
}

function iniciarPartida() {
  if (mpSocket) mpSocket.emit('start_game');
}

function sairDaSala() {
  if (mpSocket) {
    mpSocket.emit('leave_room');
    mpSocket.disconnect();
  }
  mpSocket = null;
  mpSala = null;
  mpHost = false;
  document.getElementById('mp-panel').classList.add('hidden');
  document.getElementById('mp-lobby').classList.add('hidden');
  document.getElementById('mp-waiting').classList.add('hidden');
  document.getElementById('multiplayer-bar').classList.add('hidden');
  document.getElementById('multiplayer-resultado').classList.add('hidden');
}

function mostrarLobby() {
  document.getElementById('mp-panel').classList.add('hidden');
  document.getElementById('mp-lobby').classList.remove('hidden');
  document.getElementById('mp-lobby').querySelector('.mp-codigo-display').textContent = mpSala;
  atualizarListaJogadores();
}

function atualizarListaJogadores() {
  var lista = document.getElementById('mp-player-list');
  if (!lista) return;
  lista.innerHTML = '';
  mpPlayers.forEach(function(p) {
    var div = document.createElement('div');
    div.className = 'mp-player-item';
    var avatarHtml = p.avatar_url
      ? '<img src="' + p.avatar_url + '" class="mp-player-avatar" alt="">'
      : '<div class="mp-player-avatar mp-player-avatar-initials">' + (p.nome ? p.nome.charAt(0).toUpperCase() : '?') + '</div>';
    var badge = p.ready ? '<span class="mp-ready-badge">✓ Pronto</span>' : '<span class="mp-ready-badge mp-not-ready">Aguardando</span>';
    var hostTag = (mpSocket && p.id === mpSocket.id) ? ' <span class="mp-voce-tag">(você)</span>' : '';
    div.innerHTML = avatarHtml + '<span class="mp-player-nome">' + p.nome + hostTag + '</span>' + badge;
    lista.appendChild(div);
  });
  var hostControls = document.getElementById('mp-host-controls');
  if (hostControls) {
    if (mpHost && mpPlayers.length >= 2) {
      hostControls.classList.remove('hidden');
    } else {
      hostControls.classList.add('hidden');
    }
  }
}

function mostrarTelaJogoMulti() {
  document.getElementById('mp-lobby').classList.add('hidden');
  document.getElementById('mp-waiting').classList.add('hidden');
  document.getElementById('mp-round-panel').classList.remove('hidden');
  document.getElementById('multiplayer-bar').classList.remove('hidden');
  var el = document.getElementById('mp-round-label');
  if (el) el.textContent = 'Round ' + mpRound + '/' + mpTotalRounds;
  var countEl = document.getElementById('mp-guess-count');
  if (countEl) countEl.textContent = '0/' + mpPlayers.length + ' jogadores já palpitram';
  mostrarTela('tela-jogo');
  initMiniMapa();
  buildRoundTracker();
  atualizarPlacarAoVivo();
}

function atualizarPlacarAoVivo() {
  var el = document.getElementById('mp-scoreboard');
  if (!el) return;
  var sorted = [].concat(mpPlayers).sort(function(a, b) { return b.pontuacao - a.pontuacao; });
  el.innerHTML = '';
  sorted.forEach(function(p, i) {
    var div = document.createElement('div');
    div.className = 'mp-score-item';
    if (mpSocket && p.id === mpSocket.id) div.classList.add('mp-score-destaque');
    var posClass = i === 0 ? 'mp-score-top1' : i === 1 ? 'mp-score-top2' : i === 2 ? 'mp-score-top3' : '';
    div.innerHTML = '<span class="mp-score-pos ' + posClass + '">' + (i + 1) + 'º</span>'
      + '<span class="mp-score-nome">' + p.nome + '</span>'
      + '<span class="mp-score-pts">' + p.pontuacao + '</span>';
    el.appendChild(div);
  });
}

function enviarPalpiteMulti(lat, lng) {
  if (!mpSocket || mpGuessConfirmed) return;
  mpSocket.emit('submit_guess', { lat, lng });
  mpWaitingGuesses = true;
}

function proximaRodadaMulti() {
  if (mpSocket && mpHost) {
    mpSocket.emit('next_round');
  }
}

function mostrarResultadoRodadaMulti(data) {
  mpPlayers = data.players;
  var container = document.getElementById('mp-round-result');
  if (!container) return;
  container.classList.remove('hidden');
  var lista = container.querySelector('.mp-round-result-list');
  if (!lista) return;
  lista.innerHTML = '';
  data.resultados.forEach(function(r, i) {
    var div = document.createElement('div');
    div.className = 'mp-round-result-item';
    if (mpSocket && r.playerId === mpSocket.id) div.classList.add('mp-score-destaque');
    var avatarHtml = r.avatar_url
      ? '<img src="' + r.avatar_url + '" class="mp-player-avatar" alt="">'
      : '<div class="mp-player-avatar mp-player-avatar-initials">' + r.nome.charAt(0).toUpperCase() + '</div>';
    div.innerHTML = '<span class="mp-round-result-pos">' + (i + 1) + 'º</span>'
      + avatarHtml
      + '<span class="mp-round-result-nome">' + r.nome + '</span>'
      + '<span class="mp-round-result-dist">' + r.distancia.toLocaleString('pt-BR') + ' km</span>'
      + '<span class="mp-round-result-pts">+' + r.pontos + '</span>';
    lista.appendChild(div);
  });
  atualizarPlacarAoVivo();

  // Mostrar local correto no mini-mapa
  if (typeof mapaPalpite !== 'undefined' && mapaPalpite && data.local) {
    var localAtual = { lat: data.local.lat, lng: data.local.lng };
    var meuPalpite = null;
    if (data.resultados) {
      data.resultados.forEach(function(r) {
        if (mpSocket && r.playerId === mpSocket.id && r.palpite) {
          meuPalpite = r.palpite;
        }
      });
    }
    if (usarGoogleMaps) {
      var svgLocal = pinSvg('#3a7bd5');
      var marcadorLocal = new google.maps.Marker({
        position: { lat: localAtual.lat, lng: localAtual.lng },
        map: mapaPalpite,
        icon: { url: svgDataUri(svgLocal), anchor: new google.maps.Point(16, 16) },
        title: 'Local correto',
        zIndex: 100,
      });
      gmapsMarkersExtra.push(marcadorLocal);
      if (meuPalpite) {
        if (!linhaDistancia) {
          linhaDistancia = new google.maps.Polyline({
            path: [{ lat: meuPalpite.lat, lng: meuPalpite.lng }, { lat: localAtual.lat, lng: localAtual.lng }],
            geodesic: true, strokeColor: '#ff4444', strokeOpacity: 0.6, strokeWeight: 2, map: mapaPalpite,
          });
        }
        var latCenter = (meuPalpite.lat + localAtual.lat) / 2;
        var lngCenter = (meuPalpite.lng + localAtual.lng) / 2;
        var latDiff = Math.abs(meuPalpite.lat - localAtual.lat);
        var lngDiff = Math.abs(meuPalpite.lng - localAtual.lng);
        var zoom = Math.max(2, Math.min(6, 8 - Math.max(latDiff, lngDiff) * 3));
        mapaPalpite.setCenter({ lat: latCenter, lng: lngCenter });
        mapaPalpite.setZoom(zoom);
      }
    } else {
      if (!linhaDistancia) {
        linhaDistancia = L.polyline([], { color: '#ff4444', weight: 2, dashArray: '6,6', opacity: 0.6 });
      }
      L.marker([localAtual.lat, localAtual.lng], { icon: iconLocal }).addTo(mapaPalpite);
      if (meuPalpite) {
        linhaDistancia.setLatLngs([[meuPalpite.lat, meuPalpite.lng], [localAtual.lat, localAtual.lng]]);
        linhaDistancia.addTo(mapaPalpite);
        var latCenter = (meuPalpite.lat + localAtual.lat) / 2;
        var lngCenter = (meuPalpite.lng + localAtual.lng) / 2;
        var latDiff = Math.abs(meuPalpite.lat - localAtual.lat);
        var lngDiff = Math.abs(meuPalpite.lng - localAtual.lng);
        var zoom = Math.max(2, Math.min(4, 7 - Math.max(latDiff, lngDiff) * 2));
        mapaPalpite.setView([latCenter, lngCenter], zoom);
      }
    }
  }

  if (mpHost) {
    container.querySelector('.mp-next-round-btn').classList.remove('hidden');
  }
}

function mostrarResultadoFinalMulti(ranking) {
  document.getElementById('mp-round-panel').classList.add('hidden');
  document.getElementById('multiplayer-bar').classList.add('hidden');
  document.getElementById('mp-round-result').classList.add('hidden');
  var container = document.getElementById('multiplayer-resultado');
  container.classList.remove('hidden');
  var lista = container.querySelector('.mp-final-list');
  lista.innerHTML = '';
  ranking.forEach(function(r, i) {
    var div = document.createElement('div');
    div.className = 'mp-final-item';
    if (mpSocket && r.playerId === mpSocket.id) div.classList.add('mp-score-destaque');
    var medalha = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + 'º';
    div.innerHTML = '<span class="mp-final-pos">' + medalha + '</span>'
      + '<span class="mp-final-nome">' + r.nome + '</span>'
      + '<span class="mp-final-pts">' + r.pontuacao.toLocaleString('pt-BR') + ' pts</span>';
    lista.appendChild(div);
  });
}

function iniciarRodadaMulti(local) {
  mpGuessConfirmed = false;
  mpWaitingGuesses = false;
  document.getElementById('mp-round-result').classList.add('hidden');
  document.getElementById('mp-round-result').querySelector('.mp-next-round-btn').classList.add('hidden');

  if (typeof jogo !== 'undefined') {
    jogo.rodadaAtual = mpRound - 1;
    jogo.totalRodadas = mpTotalRounds;
    jogo.locaisRodada = [local];
    jogo.pontuacao = 0;
    jogo.palpites = [];
    jogo.estado = 'jogando';
    jogo.pais = null;
    jogo.modo = 'multiplayer';
  }

  if (typeof iniciarRodada === 'function') {
    iniciarRodada();
  }

  updateRoundTrackerMulti();
}

function updateRoundTrackerMulti() {
  var steps = document.querySelectorAll('.round-step');
  steps.forEach(function(s) { s.classList.remove('ativo', 'concluido'); });
  for (var i = 0; i < mpRound - 1; i++) {
    if (steps[i]) steps[i].classList.add('concluido');
  }
  if (steps[mpRound - 1]) steps[mpRound - 1].classList.add('ativo');
  var label = document.getElementById('rd-round-label');
  if (label) label.textContent = 'Round ' + mpRound.toString().padStart(2, '0');
}

function exibirResultadoPalpiteMulti(data) {
  var pontosEl = document.getElementById('pontos-rodada');
  var distEl = document.getElementById('distancia-valor');
  if (pontosEl) pontosEl.textContent = data.pontos;
  if (distEl) distEl.textContent = data.distancia.toLocaleString('pt-BR') + ' km';
  document.getElementById('palpite-info').classList.remove('hidden');
  document.getElementById('btn-palpite').classList.add('hidden');
  document.getElementById('btn-proxima').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
  var btnCriar = document.getElementById('mp-btn-criar');
  var btnEntrar = document.getElementById('mp-btn-entrar');
  if (btnCriar) btnCriar.addEventListener('click', criarSala);
  if (btnEntrar) btnEntrar.addEventListener('click', entrarSala);
  var btnReady = document.getElementById('mp-btn-ready');
  if (btnReady) btnReady.addEventListener('click', toggleReady);
  var btnStart = document.getElementById('mp-btn-start');
  if (btnStart) btnStart.addEventListener('click', iniciarPartida);
  var btnSair = document.getElementById('mp-btn-sair-sala');
  if (btnSair) btnSair.addEventListener('click', sairDaSala);
  var btnNextRound = document.getElementById('mp-btn-next-round');
  if (btnNextRound) btnNextRound.addEventListener('click', proximaRodadaMulti);
  var codigoInput = document.getElementById('mp-codigo-input');
  if (codigoInput) {
    codigoInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') entrarSala();
    });
  }
});
