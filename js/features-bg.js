(() => {
  const LOCAIS = [
    { lat: 27.1751, lng: 78.0421, nome: 'Taj Mahal, Índia' },
    { lat: 48.8584, lng: 2.2945, nome: 'Torre Eiffel, França' },
    { lat: -22.9519, lng: -43.2105, nome: 'Cristo Redentor, Brasil' },
    { lat: 41.8902, lng: 12.4922, nome: 'Coliseu, Itália' },
    { lat: 37.8199, lng: -122.4783, nome: 'Ponte Golden Gate, EUA' },
    { lat: 51.1789, lng: -1.8262, nome: 'Stonehenge, Reino Unido' },
    { lat: -13.1631, lng: -72.5450, nome: 'Machu Picchu, Peru' },
    { lat: 29.9792, lng: 31.1342, nome: 'Pirâmides de Gizé, Egito' },
    { lat: -33.8568, lng: 151.2153, nome: 'Ópera de Sydney, Austrália' },
    { lat: 25.0343, lng: 121.5645, nome: 'Taipei 101, Taiwan' },
  ];

  const bg = document.getElementById('features-streetview');
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
    const nomeCallback = 'featuresBgMapsCallback_' + Date.now();
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

  function iniciarBg() {
    localAtual = LOCAIS[Math.floor(Math.random() * LOCAIS.length)];
    headingAtual = Math.random() * 360;

    try {
      panorama = new google.maps.StreetViewPanorama(bg, {
        position: localAtual,
        pov: { heading: headingAtual, pitch: -5 },
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
        headingAtual = (headingAtual + 0.08) % 360;
        if (panorama && typeof panorama.setPov === 'function') {
          panorama.setPov({ heading: headingAtual, pitch: -5 });
        }
      }, 50);
    } catch (e) {
      bg.style.display = 'none';
    }
  }

  setTimeout(() => {
    carregarApiGoogle(iniciarBg);
  }, 2000);
})();
