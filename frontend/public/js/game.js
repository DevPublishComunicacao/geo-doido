// Países/regiões com boa cobertura Street View (bounding boxes aproximados)
const REGIOES_STREET_VIEW = [
  { nome: 'Estados Unidos', bounds: { latMin: 24.5, latMax: 49.5, lngMin: -125, lngMax: -66.5 } },
  { nome: 'Brasil', bounds: { latMin: -34, latMax: 6, lngMin: -74, lngMax: -34 } },
  { nome: 'Canadá', bounds: { latMin: 42, latMax: 83, lngMin: -141, lngMax: -52 } },
  { nome: 'México', bounds: { latMin: 14.5, latMax: 32.7, lngMin: -118.4, lngMax: -86.7 } },
  { nome: 'Argentina', bounds: { latMin: -55, latMax: -21.8, lngMin: -73.5, lngMax: -53.6 } },
  { nome: 'Chile', bounds: { latMin: -56, latMax: -17.5, lngMin: -75.6, lngMax: -66.4 } },
  { nome: 'Colômbia', bounds: { latMin: -4.5, latMax: 13, lngMin: -79, lngMax: -66.9 } },
  { nome: 'Peru', bounds: { latMin: -18.5, latMax: -0.5, lngMin: -81.5, lngMax: -68.5 } },
  { nome: 'Uruguai', bounds: { latMin: -35, latMax: -30, lngMin: -58.5, lngMax: -53 } },
  { nome: 'Costa Rica', bounds: { latMin: 8, latMax: 11.3, lngMin: -86, lngMax: -82.5 } },
  { nome: 'Equador', bounds: { latMin: -5, latMax: 1.5, lngMin: -81, lngMax: -75 } },
  { nome: 'Bolívia', bounds: { latMin: -23, latMax: -9.7, lngMin: -69.7, lngMax: -57.5 } },
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

function gerarCoordenadaProximidade(centro, raioKm) {
  const lat = centro.lat + (Math.random() - 0.5) * (raioKm / 111) * 2;
  const lng = centro.lng + (Math.random() - 0.5) * (raioKm / 111) * 2 / Math.cos(centro.lat * Math.PI / 180);
  return { lat, lng };
}

class JogoWhere {
  constructor() {
    this.pontuacao = 0;
    this.rodadaAtual = 0;
    this.totalRodadas = 5;
    this.locaisRodada = [];
    this.palpites = [];
    this.estado = 'menu';
    this.streetViewService = null;
  }

  async iniciarJogo(pais, modo) {
    this.pontuacao = 0;
    this.rodadaAtual = 0;
    this.palpites = [];
    this.pais = pais || null;
    this.modo = modo || 'mundo';
    
    if (typeof google !== 'undefined' && google.maps && google.maps.StreetViewService) {
      this.streetViewService = new google.maps.StreetViewService();
    }
    
    this.locaisRodada = await this.gerarLocaisAleatorios(this.totalRodadas);
    this.estado = 'jogando';
    return this.getRodadaAtual();
  }

  async gerarLocaisAleatorios(quantidade) {
    const locais = [];
    const paisesUsados = this.pais ? null : new Set();
    const tentativasMax = quantidade * 50;
    let tentativas = 0;
    const pendentes = [];
    
    while (locais.length < quantidade && tentativas < tentativasMax) {
      tentativas++;
      
      let coords;
      let regiao;
      let nomeLocal;

      if (this.modo === 'pontos-turisticos') {
        const idx = Math.floor(Math.random() * PAISES.length);
        const pais = PAISES[idx];
        const atracoes = pais.atracoes || [{ nome: pais.atracao || 'Desconhecido', lat: pais.lat, lng: pais.lng }];
        const atracao = atracoes[Math.floor(Math.random() * atracoes.length)];
        coords = { lat: atracao.lat, lng: atracao.lng };
        regiao = { nome: pais.nome, bounds: pais.bounds };
        nomeLocal = atracao.nome;
      } else if (this.pais) {
        const raio = Math.min(200, Math.max(30, (this.pais.bounds.latMax - this.pais.bounds.latMin) * 50));
        const atr = this.pais.atracoes && this.pais.atracoes[0] ? this.pais.atracoes[0] : { lat: 0, lng: 0 };
        coords = gerarCoordenadaProximidade({ lat: atr.lat, lng: atr.lng }, raio);
        regiao = { nome: this.pais.nome, bounds: this.pais.bounds };
        nomeLocal = this.pais.nome;
      } else {
        const regioes = typeof PAISES !== 'undefined' ? PAISES : REGIOES_STREET_VIEW;
        regiao = regioes[Math.floor(Math.random() * regioes.length)];
        coords = gerarCoordenadaAleatoria(regiao.bounds);
        nomeLocal = regiao.nome;
      }
      
      pendentes.push(
        this.verificarCoberturaStreetView(coords.lat, coords.lng).then(tem => {
          if (tem && (!paisesUsados || !paisesUsados.has(regiao.nome))) {
            const jaExiste = locais.some(l => 
              this.calcularDistancia(l.lat, l.lng, coords.lat, coords.lng) < 5
            );
            if (!jaExiste) {
              if (paisesUsados) paisesUsados.add(regiao.nome);
              locais.push({
                lat: coords.lat,
                lng: coords.lng,
                nome: nomeLocal,
                desc: this.modo === 'pontos-turisticos' ? `${regiao.nome} - ${nomeLocal}` : nomeLocal
              });
            }
          }
        })
      );
      
      if (pendentes.length >= 10 || tentativas >= tentativasMax) {
        await Promise.all(pendentes.splice(0));
      }
    }
    
    if (pendentes.length > 0) {
      await Promise.all(pendentes);
    }
    
    if (locais.length < quantidade) {
      console.warn(`Só conseguiu gerar ${locais.length} de ${quantidade} locais com Street View`);
    }
    
    return locais;
  }

  verificarCoberturaStreetView(lat, lng) {
    return new Promise((resolve) => {
      if (!this.streetViewService) {
        resolve(true);
        return;
      }
      
      this.streetViewService.getPanorama({
        location: { lat, lng },
        radius: 100,
        source: google.maps.StreetViewSource.OUTDOOR
      }, (data, status) => {
        resolve(status === google.maps.StreetViewStatus.OK && data && data.location);
      });
    });
  }

  getRodadaAtual() {
    return this.locaisRodada[this.rodadaAtual];
  }

  fazerPalpite(lat, lng) {
    const local = this.getRodadaAtual();
    if (!local) return null;

    const distancia = this.calcularDistancia(lat, lng, local.lat, local.lng);
    const pontos = this.pais
      ? this.calcularPontosPaises(distancia)
      : this.calcularPontos(distancia);

    const resultado = {
      local,
      palpite: { lat, lng },
      distancia: Math.round(distancia),
      pontos,
    };

    this.palpites.push(resultado);
    this.pontuacao += pontos;
    return resultado;
  }

  proximaRodada() {
    this.rodadaAtual++;
    if (this.rodadaAtual >= this.totalRodadas) {
      this.estado = 'finalizado';
      return null;
    }
    return this.getRodadaAtual();
  }

  calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRad(deg) {
    return deg * (Math.PI / 180);
  }

  calcularPontos(distancia) {
    if (distancia < 0.01) return 5000;
    return Math.round(5000 * Math.exp(-distancia / 2000));
  }

  calcularPontosPaises(distancia) {
    if (distancia < 0.01) return 5000;
    if (distancia < 1) return Math.round(5000 - distancia * 500);
    return Math.max(1, Math.round(5000 * Math.exp(-distancia / 20)));
  }

  getDistanciaLabel(distancia) {
    if (distancia < 1) return `${Math.round(distancia * 1000)}m`;
    if (distancia < 10) return `${distancia.toFixed(1)} km`;
    return `${distancia.toLocaleString('pt-BR')} km`;
  }
}