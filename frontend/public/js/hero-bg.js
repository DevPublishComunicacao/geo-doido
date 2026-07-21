(() => {
  const LOCAIS_STREET_VIEW = [
    { lat: 40.7580, lng: -73.9855, nome: 'Times Square, NY' },
    { lat: 48.8566, lng: 2.3522, nome: 'Paris, França' },
    { lat: 51.5074, lng: -0.1278, nome: 'Londres, Reino Unido' },
    { lat: 35.6762, lng: 139.6503, nome: 'Tóquio, Japão' },
    { lat: -33.8688, lng: 151.2093, nome: 'Sydney, Austrália' },
    { lat: -23.5505, lng: -46.6333, nome: 'São Paulo, Brasil' },
    { lat: 37.7749, lng: -122.4194, nome: 'São Francisco, EUA' },
    { lat: 55.7558, lng: 37.6173, nome: 'Moscou, Rússia' },
    { lat: 41.9028, lng: 12.4964, nome: 'Roma, Itália' },
    { lat: 27.1751, lng: 78.0421, nome: 'Taj Mahal, Índia' },
  ];

  const bg = document.getElementById('hero-streetview');
  if (!bg) return;

  const key = (typeof CONFIG !== 'undefined') ? CONFIG.GOOGLE_MAPS_API_KEY : null;
  if (!key || key.length < 10) return;

  let panorama = null;
  let intervaloRotacao = null;
  let headingAtual = 0;
  let localAtual = null;
  let loadingOculto = false;
  let globeAnimId = null;

  let loading = document.getElementById('bg-loading');
  let loadingCanvas = null;

  if (!loading) {
    loading = document.createElement('div');
    loading.id = 'bg-loading';
    loading.innerHTML = `
      <div id="bg-loading-globe-wrap">
        <canvas id="bg-loading-canvas"></canvas>
      </div>
      <p id="bg-loading-text">Explorando o mundo...</p>
    `;
    const app = document.getElementById('app') || document.body;
    app.prepend(loading);
  }
  loadingCanvas = document.getElementById('bg-loading-canvas');

  function esconderLoading() {
    if (loadingOculto) return;
    loadingOculto = true;
    if (globeAnimId) {
      cancelAnimationFrame(globeAnimId);
      globeAnimId = null;
    }
    if (loading) {
      loading.classList.add('hidden');
    }
  }

  function iniciarGloboLoading() {
    if (!loadingCanvas || !loadingCanvas.getContext) return;
    const ctx = loadingCanvas.getContext('2d');
    let rotacao = 0;
    let imagemMundo = null;

    function dpr(n) {
      return n * (window.devicePixelRatio || 1);
    }

    function redimensionar() {
      const wrap = document.getElementById('bg-loading-globe-wrap');
      if (!wrap) return;
      const size = wrap.clientWidth;
      loadingCanvas.width = dpr(size);
      loadingCanvas.height = dpr(size);
      loadingCanvas.style.width = size + 'px';
      loadingCanvas.style.height = size + 'px';
    }

    function desenhar() {
      if (loadingOculto) return;
      if (!imagemMundo) {
        imagemMundo = new Image();
        imagemMundo.crossOrigin = 'anonymous';
        imagemMundo.src = '/images/earth-blue-marble.jpg';
        globeAnimId = requestAnimationFrame(desenhar);
        return;
      }

      const size = loadingCanvas.width / (window.devicePixelRatio || 1);
      const cx = size / 2;
      const cy = size / 2;
      const raio = size * 0.44;

      ctx.clearRect(0, 0, loadingCanvas.width, loadingCanvas.height);

      ctx.save();
      ctx.scale(dpr(1), dpr(1));

      const grad = ctx.createRadialGradient(cx, cy, raio * 0.5, cx, cy, raio * 1.3);
      grad.addColorStop(0, 'rgba(0, 210, 255, 0.12)');
      grad.addColorStop(0.5, 'rgba(58, 123, 213, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, raio * 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.fillStyle = '#0d1117';
      ctx.fill();
      ctx.strokeStyle = 'rgba(58, 123, 213, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.clip();

      const escala = raio / 90;
      const deslocX = (rotacao * 180 / Math.PI * 0.5) % 360;
      ctx.drawImage(imagemMundo,
        cx - 180 * escala + deslocX * escala,
        cy - 90 * escala,
        360 * escala,
        180 * escala
      );
      ctx.drawImage(imagemMundo,
        cx - 180 * escala + deslocX * escala - 360 * escala,
        cy - 90 * escala,
        360 * escala,
        180 * escala
      );

      const sombra = ctx.createRadialGradient(cx, cy, raio * 0.3, cx, cy, raio);
      sombra.addColorStop(0, 'rgba(0,0,0,0)');
      sombra.addColorStop(0.6, 'rgba(0,0,0,0.1)');
      sombra.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = sombra;
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();

      rotacao += 0.004;
      globeAnimId = requestAnimationFrame(desenhar);
    }

    redimensionar();
    window.addEventListener('resize', redimensionar);
    desenhar();
  }

  function carregarApiGoogle(callback) {
    if (window.google && window.google.maps) {
      callback();
      return;
    }
    const nomeCallback = 'heroBgMapsCallback_' + Date.now();
    window[nomeCallback] = () => {
      delete window[nomeCallback];
      callback();
    };
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${nomeCallback}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      esconderLoading();
      bg.style.display = 'none';
    };
    document.head.appendChild(script);
  }

  function iniciarStreetViewBg() {
    localAtual = LOCAIS_STREET_VIEW[Math.floor(Math.random() * LOCAIS_STREET_VIEW.length)];
    headingAtual = Math.random() * 360;

    try {
      panorama = new google.maps.StreetViewPanorama(bg, {
        position: localAtual,
        pov: { heading: headingAtual, pitch: 0 },
        zoom: 0,
        enableCloseButton: false,
        addressControl: false,
        fullscreenControl: false,
        motionTrackingControl: false,
        panControl: false,
        showRoadLabels: false,
        visible: true,
        zoomControl: false,
        clickToGo: false,
        linksControl: false,
        scrollwheel: false,
        disableDefaultUI: true,
      });

      const onCarregado = () => {
        if (panorama) {
          google.maps.event.clearListeners(panorama, 'pano_changed');
          google.maps.event.clearListeners(panorama, 'position_changed');
        }
        esconderLoading();
      };

      google.maps.event.addListenerOnce(panorama, 'pano_changed', onCarregado);
      google.maps.event.addListenerOnce(panorama, 'position_changed', onCarregado);

      setTimeout(esconderLoading, 12000);

      intervaloRotacao = setInterval(() => {
        headingAtual = (headingAtual + 0.15) % 360;
        if (panorama && typeof panorama.setPov === 'function') {
          panorama.setPov({ heading: headingAtual, pitch: 0 });
        }
      }, 50);
    } catch (e) {
      esconderLoading();
      bg.style.display = 'none';
    }
  }

  iniciarGloboLoading();

  carregarApiGoogle(iniciarStreetViewBg);
})();
