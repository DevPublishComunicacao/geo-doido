const jogo = new JogoGeoDoido();

let streetViewPanorama = null;
let mapaPalpite = null;
let marcadorPalpite = null;
let linhaDistancia = null;
let palpiteConfirmado = false;
let googleReady = false;
let googleLoading = false;
let usarGoogleMaps = false;
let streetViewService = null;
let gmapsMarkersExtra = [];

let configTempoRodada = 0;
let configRolezinho = false;
let timerInterval = null;
let timerSegundos = 0;

const pinSvg = (cor) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <circle cx="16" cy="16" r="14" fill="${cor}" stroke="#fff" stroke-width="2"/>
    <circle cx="16" cy="11" r="4.5" fill="#fff"/>
    <path d="M7 27 Q16 18 25 27" fill="#fff"/>
  </svg>
`;

function svgDataUri(svg) {
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const iconLocal = L.divIcon({
  html: pinSvg('#3a7bd5'),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  className: ''
});

const iconPalpite = L.divIcon({
  html: pinSvg('#ff4444'),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  className: ''
});

function $(id) { return document.getElementById(id); }

function mostrarTela(tela) {
  ['tela-inicial', 'tela-config-jogo', 'tela-jogo', 'tela-resultado'].forEach(t => {
    const el = $(t);
    if (!el) return;
    if (t === tela) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

function carregarGoogleMaps(callback) {
  if (googleReady && typeof google !== 'undefined' && google.maps) {
    if (callback) callback();
    return;
  }

  if (googleLoading) {
    setTimeout(() => carregarGoogleMaps(callback), 500);
    return;
  }

  const key = CONFIG.GOOGLE_MAPS_API_KEY;
  if (!key || key.length < 10) {
    iniciarJogoModoMapa(callback);
    return;
  }

  googleLoading = true;

  const callbackName = 'gMapsCallback_' + Date.now();

  const timeoutFallback = setTimeout(() => {
    if (!googleReady) {
      googleLoading = false;
      delete window[callbackName];
      iniciarJogoModoMapa(callback);
    }
  }, 8000);

  window[callbackName] = () => {
    googleReady = true;
    googleLoading = false;
    clearTimeout(timeoutFallback);
    delete window[callbackName];
    if (callback) callback();
  };

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callbackName}&v=weekly&language=pt-BR&region=BR`;
  script.async = true;
  script.defer = true;

  script.onerror = () => {
    googleLoading = false;
    clearTimeout(timeoutFallback);
    delete window[callbackName];
    iniciarJogoModoMapa(callback);
  };

  document.head.appendChild(script);
}

function iniciarJogoModoMapa(callback) {
  googleReady = false;
  usarGoogleMaps = false;
  if (callback) callback();
}

function initMiniMapa() {
  if (mapaPalpite) {
    if (usarGoogleMaps && typeof mapaPalpite.setCenter === 'function') {
      mapaPalpite.setCenter({ lat: 20, lng: 0 });
    }
    return;
  }

  const container = $('mini-map');
  if (!container) return;

  usarGoogleMaps = googleReady && typeof google !== 'undefined' && google.maps;

  if (usarGoogleMaps) {
    mapaPalpite = new google.maps.Map(container, {
      zoom: 2,
      center: { lat: 20, lng: 0 },
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
      zoomControl: true,
      scaleControl: true,
    });

    mapaPalpite.addListener('click', onMiniMapaClick);
    google.maps.event.trigger(mapaPalpite, 'resize');

    const miniMapContainer = $('mini-map-container');
    if (miniMapContainer) {
      miniMapContainer.addEventListener('transitionend', resizeMiniMapa);
    }
  } else {
    mapaPalpite = L.map('mini-map', {
      zoomControl: true,
      attributionControl: true,
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(mapaPalpite);

    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(mapaPalpite);

    mapaPalpite.on('click', onMiniMapaClick);

    requestAnimationFrame(() => {
      if (mapaPalpite && typeof mapaPalpite.invalidateSize === 'function') {
        mapaPalpite.invalidateSize();
      }
    });
  }
}

function onMiniMapaClick(e) {
  if (palpiteConfirmado) return;

  let lat, lng;

  if (usarGoogleMaps) {
    lat = e.latLng.lat();
    lng = e.latLng.lng();
    if (marcadorPalpite) marcadorPalpite.setMap(null);
    const svg = pinSvg('#ff4444');
    marcadorPalpite = new google.maps.Marker({
      position: { lat, lng },
      map: mapaPalpite,
      icon: {
        url: svgDataUri(svg),
        anchor: new google.maps.Point(16, 16),
      },
      title: 'Seu palpite',
      zIndex: 100,
    });
  } else {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    if (marcadorPalpite) mapaPalpite.removeLayer(marcadorPalpite);
    marcadorPalpite = L.marker([lat, lng], { icon: iconPalpite }).addTo(mapaPalpite);
  }

  $('btn-palpite').disabled = false;
}

function initStreetView(lat, lng) {
  const container = $('street-view');
  if (!container) return;

  if (!googleReady || typeof google === 'undefined' || !google.maps) {
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#666;gap:1rem;background:#0f0f1a;padding:2rem;">
        <div style="font-size:3rem;">🗺️</div>
        <p style="font-size:1.1rem;color:#aaa;">Modo Mapa</p>
        <p style="font-size:0.85rem;max-width:400px;text-align:center;color:#777;">
          Use o mini-mapa no canto inferior direito para fazer seu palpite.
        </p>
      </div>
    `;
    return;
  }

  if (!streetViewService) {
    streetViewService = new google.maps.StreetViewService();
  }

  const rolezinhoOpts = configRolezinho
    ? { clickToGo: true, linksControl: true }
    : { clickToGo: false, linksControl: false };

  if (streetViewPanorama && typeof streetViewPanorama.setOptions === 'function') {
    streetViewPanorama.setOptions(rolezinhoOpts);
  }

  streetViewService.getPanorama({
    location: { lat, lng },
    radius: 200,
    source: google.maps.StreetViewSource.OUTDOOR
  }, (data, status) => {
    if (status === google.maps.StreetViewStatus.OK && data && data.location) {
      const pos = data.location.latLng;
      if (streetViewPanorama && typeof streetViewPanorama.setPosition === 'function') {
        streetViewPanorama.setPosition(pos);
        streetViewPanorama.setPov({ heading: Math.random() * 360, pitch: 0 });
        return;
      }
      try {
        streetViewPanorama = new google.maps.StreetViewPanorama(container, {
          position: pos,
          pov: { heading: Math.random() * 360, pitch: 0 },
          zoom: 0,
          enableCloseButton: false,
          addressControl: false,
          fullscreenControl: false,
          motionTrackingControl: false,
          panControl: false,
          showRoadLabels: true,
          visible: true,
          zoomControl: true,
          ...rolezinhoOpts,
        });
      } catch (e) {
        mostrarFalhaStreetView(container);
      }
    } else {
      streetViewService.getPanorama({
        location: { lat, lng },
        radius: 500,
      }, (data2, status2) => {
        if (status2 === google.maps.StreetViewStatus.OK && data2 && data2.location) {
          const pos = data2.location.latLng;
          if (streetViewPanorama && typeof streetViewPanorama.setPosition === 'function') {
            streetViewPanorama.setPosition(pos);
            streetViewPanorama.setPov({ heading: Math.random() * 360, pitch: 0 });
            return;
          }
          try {
            streetViewPanorama = new google.maps.StreetViewPanorama(container, {
              position: pos,
              pov: { heading: Math.random() * 360, pitch: 0 },
              zoom: 0,
              enableCloseButton: false,
              addressControl: false,
              fullscreenControl: false,
              motionTrackingControl: false,
              panControl: false,
              showRoadLabels: true,
              visible: true,
              zoomControl: true,
              ...rolezinhoOpts,
            });
          } catch (e) {
            mostrarFalhaStreetView(container);
          }
        } else {
          mostrarFalhaStreetView(container);
        }
      });
    }
  });
}

function mostrarFalhaStreetView(container) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#666;gap:1rem;background:#0f0f1a;padding:2rem;">
      <div style="font-size:3rem;">🗺️</div>
      <p style="font-size:1.1rem;color:#aaa;">Street View indisponível neste local</p>
      <p style="font-size:0.85rem;color:#777;">Use o mini-mapa para fazer seu palpite</p>
    </div>
  `;
}

function resizeMiniMapa() {
  if (!mapaPalpite) return;
  if (usarGoogleMaps && typeof google !== 'undefined' && google.maps) {
    google.maps.event.trigger(mapaPalpite, 'resize');
  } else if (typeof mapaPalpite.invalidateSize === 'function') {
    mapaPalpite.invalidateSize();
  }
}

function limparCamadas() {
  if (usarGoogleMaps) {
    if (marcadorPalpite) { marcadorPalpite.setMap(null); marcadorPalpite = null; }
    if (linhaDistancia) { linhaDistancia.setMap(null); linhaDistancia = null; }
    gmapsMarkersExtra.forEach(m => { if (m) m.setMap(null); });
    gmapsMarkersExtra = [];
  } else {
    if (marcadorPalpite && mapaPalpite) {
      mapaPalpite.removeLayer(marcadorPalpite);
      marcadorPalpite = null;
    }
    if (linhaDistancia && mapaPalpite) {
      mapaPalpite.removeLayer(linhaDistancia);
      linhaDistancia = null;
    }
  }
}

function iniciarRodada() {
  const local = jogo.getRodadaAtual();
  if (!local) return;

  palpiteConfirmado = false;
  limparCamadas();
  pararTimer();

  $('round-atual').textContent = jogo.rodadaAtual + 1;
  $('round-total').textContent = jogo.totalRodadas;
  $('pontuacao-atual').textContent = jogo.pontuacao.toLocaleString('pt-BR');

  $('btn-palpite').classList.remove('hidden');
  $('btn-palpite').disabled = true;
  $('btn-proxima').classList.add('hidden');
  $('palpite-info').classList.add('hidden');

  initStreetView(local.lat, local.lng);

  if (mapaPalpite) {
    if (usarGoogleMaps) {
      mapaPalpite.setZoom(2);
      mapaPalpite.setCenter({ lat: 20, lng: 0 });
      google.maps.event.trigger(mapaPalpite, 'resize');
    } else {
      mapaPalpite.setView([20, 0], 2);
      requestAnimationFrame(() => {
        if (mapaPalpite && typeof mapaPalpite.invalidateSize === 'function') {
          mapaPalpite.invalidateSize();
        }
      });
    }

    const mmContainer = $('mini-map-container');
    if (mmContainer) {
      mmContainer.addEventListener('transitionend', resizeMiniMapa);
    }
  }

  if (configTempoRodada > 0) {
    iniciarTimer(configTempoRodada);
  }
}

function iniciarTimer(segundos) {
  pararTimer();
  timerSegundos = segundos;
  const display = $('timer-display');
  const valor = $('timer-valor');
  display.classList.remove('hidden', 'alerta');
  atualizarTimerDisplay();

  timerInterval = setInterval(() => {
    timerSegundos--;
    atualizarTimerDisplay();

    if (timerSegundos <= 10) {
      display.classList.add('alerta');
    }

    if (timerSegundos <= 0) {
      pararTimer();
      if (!palpiteConfirmado) {
        if (!marcadorPalpite) {
          const lat = Math.random() * 180 - 90;
          const lng = Math.random() * 360 - 180;
          if (usarGoogleMaps) {
            marcadorPalpite = new google.maps.Marker({
              position: { lat, lng },
              map: mapaPalpite,
              icon: { url: svgDataUri(pinSvg('#ff4444')), anchor: new google.maps.Point(16, 16) },
              title: 'Seu palpite',
              zIndex: 100,
            });
          } else {
            marcadorPalpite = L.marker([lat, lng], { icon: iconPalpite }).addTo(mapaPalpite);
          }
        }
        confirmarPalpite();
      }
    }
  }, 1000);
}

function pararTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  $('timer-display').classList.add('hidden');
}

function atualizarTimerDisplay() {
  const min = Math.floor(timerSegundos / 60);
  const seg = timerSegundos % 60;
  $('timer-valor').textContent = `${min}:${seg.toString().padStart(2, '0')}`;
}

function confirmarPalpite() {
  if (!marcadorPalpite || palpiteConfirmado) return;
  palpiteConfirmado = true;
  $('btn-palpite').disabled = true;
  pararTimer();

  const localAtual = jogo.getRodadaAtual();
  let lat, lng;

  if (usarGoogleMaps) {
    lat = marcadorPalpite.getPosition().lat();
    lng = marcadorPalpite.getPosition().lng();
  } else {
    const pos = marcadorPalpite.getLatLng();
    lat = pos.lat;
    lng = pos.lng;
  }

  const resultado = jogo.fazerPalpite(lat, lng);
  if (!resultado) return;

  const prePoints = resultado.pontos;
  $('pontos-rodada').textContent = '0';
  let currentDisplay = 0;
  const step = Math.max(1, Math.floor(prePoints / 25));
  const interval = setInterval(() => {
    currentDisplay += step;
    if (currentDisplay >= prePoints) {
      currentDisplay = prePoints;
      clearInterval(interval);
    }
    $('pontos-rodada').textContent = currentDisplay;
  }, 40);

  const distLabel = jogo.getDistanciaLabel(resultado.distancia);
  $('distancia-valor').textContent = distLabel;
  $('palpite-info').classList.remove('hidden');

  if (usarGoogleMaps) {
    linhaDistancia = new google.maps.Polyline({
      path: [
        { lat, lng },
        { lat: localAtual.lat, lng: localAtual.lng }
      ],
      geodesic: true,
      strokeColor: '#ff4444',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      map: mapaPalpite,
    });

    const svgLocal = pinSvg('#3a7bd5');
    const marcadorLocal = new google.maps.Marker({
      position: { lat: localAtual.lat, lng: localAtual.lng },
      map: mapaPalpite,
      icon: {
        url: svgDataUri(svgLocal),
        anchor: new google.maps.Point(16, 16),
      },
      title: 'Local correto',
      zIndex: 100,
    });
    gmapsMarkersExtra.push(marcadorLocal);

    const latCenter = (lat + localAtual.lat) / 2;
    const lngCenter = (lng + localAtual.lng) / 2;
    const latDiff = Math.abs(lat - localAtual.lat);
    const lngDiff = Math.abs(lng - localAtual.lng);
    const zoom = Math.max(2, Math.min(6, 8 - Math.max(latDiff, lngDiff) * 3));
    mapaPalpite.setCenter({ lat: latCenter, lng: lngCenter });
    mapaPalpite.setZoom(zoom);
  } else {
    linhaDistancia = L.polyline(
      [[lat, lng], [localAtual.lat, localAtual.lng]],
      { color: '#ff4444', weight: 2, dashArray: '6,6', opacity: 0.6 }
    ).addTo(mapaPalpite);

    L.marker([localAtual.lat, localAtual.lng], { icon: iconLocal }).addTo(mapaPalpite);

    const latCenter = (lat + localAtual.lat) / 2;
    const lngCenter = (lng + localAtual.lng) / 2;
    const latDiff = Math.abs(lat - localAtual.lat);
    const lngDiff = Math.abs(lng - localAtual.lng);
    const zoom = Math.max(2, Math.min(4, 7 - Math.max(latDiff, lngDiff) * 2));
    mapaPalpite.setView([latCenter, lngCenter], zoom);
  }

  $('btn-palpite').classList.add('hidden');
  $('btn-proxima').classList.remove('hidden');
  $('btn-proxima').textContent = jogo.rodadaAtual + 1 >= jogo.totalRodadas ? 'Resultado' : 'Próxima';
}

function proximaRodada() {
  const proximo = jogo.proximaRodada();
  if (!proximo) {
    mostrarResultado();
    return;
  }
  iniciarRodada();
}

function mostrarResultado() {
  pararTimer();
  mostrarTela('tela-resultado');
  $('pontuacao-final').textContent = jogo.pontuacao.toLocaleString('pt-BR');

  const container = $('lista-rodadas');
  container.innerHTML = '';

  jogo.palpites.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'rodada-item';
    const distLabel = jogo.getDistanciaLabel(r.distancia);
    div.innerHTML = `
      <span class="rodada-num">Rodada ${i + 1}: ${r.local.nome.split(',')[0]}</span>
      <span class="rodada-distancia">${distLabel}</span>
      <span class="rodada-pontos">${r.pontos} pts</span>
    `;
    container.appendChild(div);
  });

  const msg = $('mensagem-final');
  if (jogo.pontuacao >= 20000) msg.textContent = 'Impressionante! Você é um verdadeiro geógrafo!';
  else if (jogo.pontuacao >= 15000) msg.textContent = 'Muito bom! Você conhece o mundo muito bem!';
  else if (jogo.pontuacao >= 10000) msg.textContent = 'Bom trabalho! Continue explorando!';
  else if (jogo.pontuacao >= 5000) msg.textContent = 'Está no caminho! Estude mais os mapas!';
  else msg.textContent = 'O mundo é grande! Tente novamente!';

  if (typeof localStorage === 'undefined') return;
  const total = parseInt($('total-jogadas').textContent) + 1;
  $('total-jogadas').textContent = total;
  const melhor = parseInt($('melhor-pontuacao').textContent);
  if (jogo.pontuacao > melhor) {
    $('melhor-pontuacao').textContent = jogo.pontuacao;
  }
  try {
    localStorage.setItem('geo-doido-total-jogadas', total);
    localStorage.setItem('geo-doido-melhor-pontuacao', Math.max(melhor, jogo.pontuacao));
  } catch (e) {}
}

function carregarStats() {
  if (typeof localStorage === 'undefined') return;
  try {
    const total = localStorage.getItem('geo-doido-total-jogadas');
    const melhor = localStorage.getItem('geo-doido-melhor-pontuacao');
    if (total) $('total-jogadas').textContent = total;
    if (melhor) $('melhor-pontuacao').textContent = melhor;
  } catch (e) {}
}

async function iniciarJogo() {
  limparCamadas();
  mostrarTela('tela-jogo');
  $('loading-overlay').classList.remove('hidden');

  try {
    await jogo.iniciarJogo();
    $('loading-overlay').classList.add('hidden');
    initMiniMapa();
    iniciarRodada();
  } catch (e) {
    $('loading-overlay').classList.add('hidden');
    console.error('Erro ao iniciar jogo:', e);
    alert('Erro ao gerar locais. Tente novamente.');
    voltarMenu();
  }
}

function voltarMenu() {
  pararTimer();
  limparCamadas();
  if (mapaPalpite && usarGoogleMaps) {
    mapaPalpite.setZoom(2);
    mapaPalpite.setCenter({ lat: 20, lng: 0 });
  }
  mostrarTela('tela-inicial');
}

function tentarIniciarJogo() {
  mostrarTela('tela-config-jogo');
  $('opcao-tempo').querySelector('[data-value="0"] input').checked = true;
  $('opcao-rolezinho').querySelector('[data-value="sim"] input').checked = true;
}

function lerConfigJogo() {
  const tempoEl = $('opcao-tempo').querySelector('input[name="tempo"]:checked');
  const rolezinhoEl = $('opcao-rolezinho').querySelector('input[name="rolezinho"]:checked');
  configTempoRodada = parseInt(tempoEl ? tempoEl.value : 0);
  configRolezinho = rolezinhoEl ? rolezinhoEl.value === 'sim' : true;
  return true;
}

function entrarJogo() {
  lerConfigJogo();
  carregarGoogleMaps(() => {
    iniciarJogo();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  carregarStats();

  $('btn-jogar').addEventListener('click', tentarIniciarJogo);

  $('btn-instrucoes').addEventListener('click', () => {
    $('modal-instrucoes').classList.remove('hidden');
  });

  const fecharModal = () => {
    $('modal-instrucoes').classList.add('hidden');
  };

  document.querySelector('.modal-close').addEventListener('click', fecharModal);
  $('modal-instrucoes').addEventListener('click', (e) => {
    if (e.target === $('modal-instrucoes')) fecharModal();
  });

  $('btn-palpite').addEventListener('click', confirmarPalpite);
  $('btn-proxima').addEventListener('click', proximaRodada);
  $('btn-sair').addEventListener('click', voltarMenu);
  $('btn-jogar-novamente').addEventListener('click', tentarIniciarJogo);
  $('btn-voltar-menu').addEventListener('click', voltarMenu);
  $('btn-entrar-jogo').addEventListener('click', entrarJogo);
});
