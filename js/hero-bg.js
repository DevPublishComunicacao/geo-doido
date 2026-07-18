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
    script.onerror = () => bg.style.display = 'none';
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

      intervaloRotacao = setInterval(() => {
        headingAtual = (headingAtual + 0.15) % 360;
        if (panorama && typeof panorama.setPov === 'function') {
          panorama.setPov({ heading: headingAtual, pitch: 0 });
        }
      }, 50);
    } catch (e) {
      bg.style.display = 'none';
    }
  }

  setTimeout(() => {
    carregarApiGoogle(iniciarStreetViewBg);
  }, 1000);
})();
