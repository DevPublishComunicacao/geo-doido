const PAISES = [
  {
    codigo: 'ZA', nome: 'África do Sul', bandeira: '/images/flags/za.png',
    atracoes: [
    { nome: 'Table Mountain', lat: -33.9628, lng: 18.4098 },
    { nome: 'Kruger National Park', lat: -24.0112, lng: 31.4853 },
    { nome: 'Victoria & Alfred Waterfront', lat: -33.9036, lng: 18.4212 },
    { nome: 'Robben Island', lat: -33.8076, lng: 18.3712 },
    { nome: 'Blyde River Canyon', lat: -24.5708, lng: 30.7970 }
  ],
    bounds: { latMin: -35, latMax: -22, lngMin: 16, lngMax: 33 }
  },
  {
    codigo: 'AL', nome: 'Albânia', bandeira: '/images/flags/al.png',
    atracoes: [
    { nome: 'Castelo de Krujë', lat: 41.5070, lng: 19.7930 },
    { nome: 'Butrinto', lat: 39.7460, lng: 20.0200 },
    { nome: 'Monte Dajti', lat: 41.3661, lng: 19.9269 },
    { nome: 'Riviera Albanesa', lat: 40.1067, lng: 19.7620 },
    { nome: 'Ponte de Komani', lat: 42.2510, lng: 19.8120 }
  ],
    bounds: { latMin: 39.6, latMax: 42.7, lngMin: 19.2, lngMax: 21.1 }
  },
  {
    codigo: 'DE', nome: 'Alemanha', bandeira: '/images/flags/de.png',
    atracoes: [
    { nome: 'Portão de Brandemburgo', lat: 52.5163, lng: 13.3777 },
    { nome: 'Castelo de Neuschwanstein', lat: 47.5576, lng: 10.7498 },
    { nome: 'Muro de Berlim (East Side Gallery)', lat: 52.5048, lng: 13.4428 },
    { nome: 'Catedral de Colônia', lat: 50.9413, lng: 6.9583 },
    { nome: 'Reichstag', lat: 52.5186, lng: 13.3762 }
  ],
    bounds: { latMin: 47.3, latMax: 55.1, lngMin: 5.9, lngMax: 15.1 }
  },
  {
    codigo: 'AO', nome: 'Angola', bandeira: '/images/flags/ao.png',
    atracoes: [
    { nome: 'Fortaleza de São Miguel', lat: -8.8080, lng: 13.2280 },
    { nome: 'Quedas de Kalandula', lat: -9.0708, lng: 16.0040 },
    { nome: 'Miradouro da Lua', lat: -9.0667, lng: 13.0083 },
    { nome: 'Ilha do Mussulo', lat: -8.9667, lng: 13.1500 },
    { nome: 'Parque Nacional da Kissama', lat: -9.7600, lng: 13.3500 }
  ],
    bounds: { latMin: -18, latMax: -5, lngMin: 11.7, lngMax: 24.1 }
  },
  {
    codigo: 'SA', nome: 'Arábia Saudita', bandeira: '/images/flags/sa.png',
    atracoes: [
    { nome: 'Al-Masjid al-Haram', lat: 21.4225, lng: 39.8262 },
    { nome: 'Mada\'in Saleh', lat: 26.8100, lng: 37.9470 },
    { nome: 'Centro Histórico de Jeddah', lat: 21.4833, lng: 39.1833 },
    { nome: 'Torre do Reino (Kingdom Centre)', lat: 24.7117, lng: 46.6749 },
    { nome: 'Al-Masjid an-Nabawi', lat: 24.4672, lng: 39.6111 }
  ],
    bounds: { latMin: 16.4, latMax: 32.2, lngMin: 34.5, lngMax: 55.7 }
  },
  {
    codigo: 'DZ', nome: 'Argélia', bandeira: '/images/flags/dz.png',
    atracoes: [
    { nome: 'Casbah de Argel', lat: 36.7850, lng: 3.0580 },
    { nome: 'Tassili n\'Ajjer', lat: 24.2500, lng: 9.5000 },
    { nome: 'Ruínas Romanas de Timgad', lat: 35.4840, lng: 6.4680 },
    { nome: 'Basílica de Santo Agostinho', lat: 36.8650, lng: 7.7470 },
    { nome: 'Monte Tahat', lat: 23.2889, lng: 5.5333 }
  ],
    bounds: { latMin: 18.9, latMax: 37.1, lngMin: -8.7, lngMax: 12 }
  },
  {
    codigo: 'AR', nome: 'Argentina', bandeira: '/images/flags/ar.png',
    atracoes: [
    { nome: 'Obelisco de Buenos Aires', lat: -34.6037, lng: -58.3816 },
    { nome: 'Cataratas do Iguaçu', lat: -25.6953, lng: -54.4367 },
    { nome: 'Glaciar Perito Moreno', lat: -50.5000, lng: -73.0000 },
    { nome: 'Caminito (La Boca)', lat: -34.6345, lng: -58.3634 },
    { nome: 'Cerro Catedral', lat: -41.1650, lng: -71.4490 }
  ],
    bounds: { latMin: -55, latMax: -21.8, lngMin: -73.5, lngMax: -53.6 }
  },
  {
    codigo: 'AM', nome: 'Armênia', bandeira: '/images/flags/am.png',
    atracoes: [
    { nome: 'Mosteiro de Geghard', lat: 40.1400, lng: 44.8180 },
    { nome: 'Mosteiro de Tatev', lat: 39.3794, lng: 46.2499 },
    { nome: 'Lago Sevan', lat: 40.5530, lng: 45.0160 },
    { nome: 'Catedral de Echmiadzin', lat: 40.1619, lng: 44.2911 },
    { nome: 'Templo de Garni', lat: 40.1126, lng: 44.7300 }
  ],
    bounds: { latMin: 38.8, latMax: 41.3, lngMin: 43.4, lngMax: 46.6 }
  },
  {
    codigo: 'AU', nome: 'Austrália', bandeira: '/images/flags/au.png',
    atracoes: [
    { nome: 'Ópera de Sydney', lat: -33.8568, lng: 151.2153 },
    { nome: 'Grande Barreira de Corais', lat: -16.5000, lng: 146.0000 },
    { nome: 'Uluru (Ayers Rock)', lat: -25.3444, lng: 131.0369 },
    { nome: 'Harbour Bridge', lat: -33.8523, lng: 151.2108 },
    { nome: 'Great Ocean Road', lat: -38.5500, lng: 143.4000 }
  ],
    bounds: { latMin: -44, latMax: -10, lngMin: 113, lngMax: 154 }
  },
  {
    codigo: 'AT', nome: 'Áustria', bandeira: '/images/flags/at.png',
    atracoes: [
    { nome: 'Palácio de Schönbrunn', lat: 48.1850, lng: 16.3127 },
    { nome: 'Castelo de Hohensalzburg', lat: 47.7957, lng: 13.0475 },
    { nome: 'Catedral de São Estêvão', lat: 48.2084, lng: 16.3731 },
    { nome: 'Hallstatt', lat: 47.5622, lng: 13.6493 },
    { nome: 'Palácio de Hofburg', lat: 48.2065, lng: 16.3655 }
  ],
    bounds: { latMin: 46.4, latMax: 49, lngMin: 9.5, lngMax: 17.2 }
  },
  {
    codigo: 'BS', nome: 'Bahamas', bandeira: '/images/flags/bs.png',
    atracoes: [
    { nome: 'Paradise Island', lat: 25.0830, lng: -77.3170 },
    { nome: 'Exuma Cays', lat: 24.2500, lng: -76.5000 },
    { nome: 'Cable Beach', lat: 25.0740, lng: -77.3970 },
    { nome: 'Pig Beach (Exuma)', lat: 23.9330, lng: -76.1830 },
    { nome: 'Queen\'s Staircase', lat: 25.0765, lng: -77.3350 }
  ],
    bounds: { latMin: 22.8, latMax: 27, lngMin: -79, lngMax: -72.7 }
  },
  {
    codigo: 'BD', nome: 'Bangladesh', bandeira: '/images/flags/bd.png',
    atracoes: [
    { nome: 'Lalbagh Fort', lat: 23.7180, lng: 90.3870 },
    { nome: 'Sundarbans', lat: 22.5000, lng: 89.5000 },
    { nome: 'Ahsan Manzil', lat: 23.7080, lng: 90.4060 },
    { nome: 'Cox\'s Bazar', lat: 21.4272, lng: 92.0058 },
    { nome: 'Catedral de Santa Maria', lat: 23.7180, lng: 90.4110 }
  ],
    bounds: { latMin: 20.6, latMax: 26.6, lngMin: 88, lngMax: 92.7 }
  },
  {
    codigo: 'BE', nome: 'Bélgica', bandeira: '/images/flags/be.png',
    atracoes: [
    { nome: 'Grand Place', lat: 50.8467, lng: 4.3525 },
    { nome: 'Atomium', lat: 50.8950, lng: 4.3400 },
    { nome: 'Catedral de São Bavo', lat: 51.0530, lng: 3.7270 },
    { nome: 'Castelo dos Condes de Flandres', lat: 51.0575, lng: 3.7207 },
    { nome: 'Manneken Pis', lat: 50.8450, lng: 4.3499 }
  ],
    bounds: { latMin: 49.5, latMax: 51.5, lngMin: 2.5, lngMax: 6.4 }
  },
  {
    codigo: 'BY', nome: 'Bielorrússia', bandeira: '/images/flags/by.png',
    atracoes: [
    { nome: 'Castelo de Mir', lat: 53.4510, lng: 26.4730 },
    { nome: 'Castelo de Nesvizh', lat: 53.2200, lng: 26.6900 },
    { nome: 'Catedral do Espírito Santo', lat: 53.9045, lng: 27.5580 },
    { nome: 'Fortaleza de Brest', lat: 52.0830, lng: 23.6570 },
    { nome: 'Biblioteca Nacional da Bielorrússia', lat: 53.9280, lng: 27.6450 }
  ],
    bounds: { latMin: 51.2, latMax: 56.2, lngMin: 23.2, lngMax: 32.8 }
  },
  {
    codigo: 'BO', nome: 'Bolívia', bandeira: '/images/flags/bo.png',
    atracoes: [
    { nome: 'Salar de Uyuni', lat: -20.1338, lng: -67.4891 },
    { nome: 'Lago Titicaca', lat: -15.7500, lng: -69.2500 },
    { nome: 'Tiwanaku', lat: -16.5548, lng: -68.6733 },
    { nome: 'Teleférico de La Paz', lat: -16.5000, lng: -68.1500 },
    { nome: 'Cidade de Potosí', lat: -19.5836, lng: -65.7531 }
  ],
    bounds: { latMin: -22.9, latMax: -9.7, lngMin: -69.6, lngMax: -57.5 }
  },
  {
    codigo: 'BA', nome: 'Bósnia e Herzegovina', bandeira: '/images/flags/ba.png',
    atracoes: [
    { nome: 'Stari Most', lat: 43.3370, lng: 17.8150 },
    { nome: 'Sebilj (Sarajevo)', lat: 43.8596, lng: 18.4310 },
    { nome: 'Cascata de Kravica', lat: 43.1560, lng: 17.6080 },
    { nome: 'Ponte Suada e Olga', lat: 43.8570, lng: 18.4050 },
    { nome: 'Túnel da Esperança (Túnel de Sarajevo)', lat: 43.8180, lng: 18.3340 }
  ],
    bounds: { latMin: 42.5, latMax: 45.3, lngMin: 15.7, lngMax: 19.6 }
  },
  {
    codigo: 'BW', nome: 'Botsuana', bandeira: '/images/flags/bw.png',
    atracoes: [
    { nome: 'Delta do Okavango', lat: -19.5280, lng: 23.5270 },
    { nome: 'Parque Nacional Chobe', lat: -17.9000, lng: 24.7000 },
    { nome: 'Colinas de Tsodilo', lat: -18.7500, lng: 21.7330 },
    { nome: 'Reserva Moremi', lat: -19.2500, lng: 23.4000 },
    { nome: 'Reserva Central de Kalahari', lat: -21.5000, lng: 23.5000 }
  ],
    bounds: { latMin: -26.9, latMax: -17.8, lngMin: 20, lngMax: 29.4 }
  },
  {
    codigo: 'BR', nome: 'Brasil', bandeira: '/images/flags/br.png',
    atracoes: [
    { nome: 'Cristo Redentor', lat: -22.9519, lng: -43.2105 },
    { nome: 'Pão de Açúcar', lat: -22.9487, lng: -43.1554 },
    { nome: 'Pelourinho (Salvador)', lat: -12.9714, lng: -38.5083 },
    { nome: 'Teatro Amazonas (Manaus)', lat: -3.1302, lng: -60.0255 },
    { nome: 'Igreja de São Francisco de Assis (Ouro Preto)', lat: -20.3853, lng: -43.5036 }
  ],
    bounds: { latMin: -34, latMax: 6, lngMin: -74, lngMax: -34 }
  },
  {
    codigo: 'BG', nome: 'Bulgária', bandeira: '/images/flags/bg.png',
    atracoes: [
    { nome: 'Catedral de Sofia', lat: 42.6970, lng: 23.3220 },
    { nome: 'Mosteiro de Rila', lat: 42.1330, lng: 23.3400 },
    { nome: 'Igreja de Boyana', lat: 42.6450, lng: 23.2660 },
    { nome: 'Praia do Sol (Slanchev Bryag)', lat: 42.6880, lng: 27.7100 },
    { nome: 'Cidade Velha de Plovdiv', lat: 42.1479, lng: 24.7483 }
  ],
    bounds: { latMin: 41.2, latMax: 44.2, lngMin: 22.4, lngMax: 28.7 }
  },
  {
    codigo: 'CM', nome: 'Camarões', bandeira: '/images/flags/cm.png',
    atracoes: [
    { nome: 'Monte Camarões', lat: 4.2170, lng: 9.1720 },
    { nome: 'Parque Nacional de Waza', lat: 11.3330, lng: 14.7170 },
    { nome: 'Praia de Kribi', lat: 2.9330, lng: 9.9080 },
    { nome: 'Chutes de la Lobé', lat: 2.8830, lng: 9.9000 },
    { nome: 'Mercado Mfoundi (Yaoundé)', lat: 3.8650, lng: 11.5170 }
  ],
    bounds: { latMin: 1.7, latMax: 13.1, lngMin: 8.5, lngMax: 16.2 }
  },
  {
    codigo: 'KH', nome: 'Camboja', bandeira: '/images/flags/kh.png',
    atracoes: [
    { nome: 'Angkor Wat', lat: 13.4125, lng: 103.8670 },
    { nome: 'Templo Bayon', lat: 13.4413, lng: 103.8590 },
    { nome: 'Ta Prohm', lat: 13.4346, lng: 103.8890 },
    { nome: 'Palácio Real de Phnom Penh', lat: 11.5647, lng: 104.9310 },
    { nome: 'Museu do Genocídio Tuol Sleng', lat: 11.5497, lng: 104.9170 }
  ],
    bounds: { latMin: 10.4, latMax: 14.7, lngMin: 102.3, lngMax: 107.6 }
  },
  {
    codigo: 'CA', nome: 'Canadá', bandeira: '/images/flags/ca.png',
    atracoes: [
    { nome: 'Torre CN', lat: 43.6426, lng: -79.3871 },
    { nome: 'Cataratas do Niágara', lat: 43.0799, lng: -79.0747 },
    { nome: 'Parque Nacional de Banff', lat: 51.4968, lng: -115.9281 },
    { nome: 'Château Frontenac (Quebec)', lat: 46.8117, lng: -71.2042 },
    { nome: 'Stanley Park (Vancouver)', lat: 49.3043, lng: -123.1444 }
  ],
    bounds: { latMin: 42, latMax: 83, lngMin: -141, lngMax: -52 }
  },
  {
    codigo: 'QA', nome: 'Catar', bandeira: '/images/flags/qa.png',
    atracoes: [
    { nome: 'Museu Nacional do Catar', lat: 25.2870, lng: 51.5300 },
    { nome: 'Souq Waqif', lat: 25.2867, lng: 51.5311 },
    { nome: 'Doha Corniche', lat: 25.3000, lng: 51.5200 },
    { nome: 'The Pearl-Qatar', lat: 25.3690, lng: 51.5490 },
    { nome: 'Museu de Arte Islâmica', lat: 25.2950, lng: 51.5380 }
  ],
    bounds: { latMin: 24.5, latMax: 26.2, lngMin: 50.7, lngMax: 51.7 }
  },
  {
    codigo: 'KZ', nome: 'Cazaquistão', bandeira: '/images/flags/kz.png',
    atracoes: [
    { nome: 'Torre Bayterek', lat: 51.1280, lng: 71.4300 },
    { nome: 'Catedral de Astana (Nur-Sultan)', lat: 51.1870, lng: 71.4040 },
    { nome: 'Lago Kaindy', lat: 42.9840, lng: 78.4520 },
    { nome: 'Patinação Medeu', lat: 43.1560, lng: 77.0560 },
    { nome: 'Cidade Velha de Shymkent', lat: 42.3160, lng: 69.5930 }
  ],
    bounds: { latMin: 40.9, latMax: 55.4, lngMin: 46.5, lngMax: 87.3 }
  },
  {
    codigo: 'CL', nome: 'Chile', bandeira: '/images/flags/cl.png',
    atracoes: [
    { nome: 'Ilha de Páscoa (Moais)', lat: -27.1127, lng: -109.3497 },
    { nome: 'Torres del Paine', lat: -51.0000, lng: -73.0000 },
    { nome: 'Deserto do Atacama (Valle de la Luna)', lat: -22.9111, lng: -68.3231 },
    { nome: 'Valparaíso', lat: -33.0472, lng: -71.6127 },
    { nome: 'Cavernas de Mármore', lat: -46.6667, lng: -72.6667 }
  ],
    bounds: { latMin: -56, latMax: -17.5, lngMin: -75.6, lngMax: -66.4 }
  },
  {
    codigo: 'CN', nome: 'China', bandeira: '/images/flags/cn.png',
    atracoes: [
    { nome: 'Grande Muralha', lat: 40.4319, lng: 116.5704 },
    { nome: 'Cidade Proibida', lat: 39.9163, lng: 116.3972 },
    { nome: 'Floresta Nacional de Zhangjiajie', lat: 29.1608, lng: 110.4161 },
    { nome: 'Templo do Céu', lat: 39.8822, lng: 116.4066 },
    { nome: 'Exército de Terracota', lat: 34.3844, lng: 109.2739 }
  ],
    bounds: { latMin: 18.2, latMax: 53.6, lngMin: 73.7, lngMax: 135 }
  },
  {
    codigo: 'CO', nome: 'Colômbia', bandeira: '/images/flags/co.png',
    atracoes: [
    { nome: 'Cartagena', lat: 10.4236, lng: -75.5253 },
    { nome: 'Catedral de Sal de Zipaquirá', lat: 5.0188, lng: -74.0093 },
    { nome: 'Ciudad Perdida', lat: 11.0330, lng: -73.9170 },
    { nome: 'Parque Nacional Tayrona', lat: 11.3000, lng: -74.0830 },
    { nome: 'Monserrate', lat: 4.6058, lng: -74.0558 }
  ],
    bounds: { latMin: -4.2, latMax: 12.5, lngMin: -79, lngMax: -66.9 }
  },
  {
    codigo: 'KR', nome: 'Coreia do Sul', bandeira: '/images/flags/kr.png',
    atracoes: [
    { nome: 'Palácio Gyeongbokgung', lat: 37.5796, lng: 126.9770 },
    { nome: 'N Seoul Tower', lat: 37.5512, lng: 126.9882 },
    { nome: 'Seongsan Ilchulbong', lat: 33.4585, lng: 126.9420 },
    { nome: 'Bukchon Hanok Village', lat: 37.5826, lng: 126.9860 },
    { nome: 'Ilha de Nami', lat: 37.7911, lng: 127.5256 }
  ],
    bounds: { latMin: 33, latMax: 38.5, lngMin: 125, lngMax: 130 }
  },
  {
    codigo: 'CI', nome: 'Costa do Marfim', bandeira: '/images/flags/ci.png',
    atracoes: [
    { nome: 'Basílica de Nossa Senhora da Paz', lat: 6.8120, lng: -5.2730 },
    { nome: 'Parque Nacional de Taï', lat: 5.7500, lng: -7.1170 },
    { nome: 'Parque Nacional de Comoé', lat: 9.1833, lng: -3.7000 },
    { nome: 'Grand-Bassam', lat: 5.2000, lng: -3.7333 },
    { nome: 'Catedral de São Paulo (Abidjan)', lat: 5.3500, lng: -4.0167 }
  ],
    bounds: { latMin: 4.3, latMax: 10.7, lngMin: -8.6, lngMax: -2.5 }
  },
  {
    codigo: 'CR', nome: 'Costa Rica', bandeira: '/images/flags/cr.png',
    atracoes: [
    { nome: 'Vulcão Arenal', lat: 10.4630, lng: -84.7030 },
    { nome: 'Parque Nacional Manuel Antonio', lat: 9.3756, lng: -84.1358 },
    { nome: 'Parque Nacional do Vulcão Poás', lat: 10.2000, lng: -84.2333 },
    { nome: 'Catarata La Paz', lat: 10.2017, lng: -84.1615 },
    { nome: 'Parque Nacional Corcovado', lat: 8.5500, lng: -83.5833 }
  ],
    bounds: { latMin: 8, latMax: 11.2, lngMin: -85.9, lngMax: -82.5 }
  },
  {
    codigo: 'HR', nome: 'Croácia', bandeira: '/images/flags/hr.png',
    atracoes: [
    { nome: 'Palácio de Diocleciano', lat: 43.5081, lng: 16.4402 },
    { nome: 'Lagos de Plitvice', lat: 44.8708, lng: 15.6005 },
    { nome: 'Cidade Antiga de Dubrovnik', lat: 42.6403, lng: 18.1083 },
    { nome: 'Arena de Pula', lat: 44.8731, lng: 13.8500 },
    { nome: 'Ilha de Hvar', lat: 43.1726, lng: 16.4424 }
  ],
    bounds: { latMin: 42.4, latMax: 46.6, lngMin: 13.5, lngMax: 19.4 }
  },
  {
    codigo: 'CU', nome: 'Cuba', bandeira: '/images/flags/cu.png',
    atracoes: [
    { nome: 'Malecón de Havana', lat: 23.1400, lng: -82.3820 },
    { nome: 'Castillo del Morro', lat: 23.1504, lng: -82.3567 },
    { nome: 'Praia de Varadero', lat: 23.1513, lng: -81.2605 },
    { nome: 'Plaza de la Revolución', lat: 23.1194, lng: -82.3920 },
    { nome: 'Vale de Viñales', lat: 22.6200, lng: -83.7300 }
  ],
    bounds: { latMin: 19.8, latMax: 23.3, lngMin: -85, lngMax: -74.1 }
  },
  {
    codigo: 'DK', nome: 'Dinamarca', bandeira: '/images/flags/dk.png',
    atracoes: [
    { nome: 'Pequena Sereia', lat: 55.6929, lng: 12.5992 },
    { nome: 'Jardins de Tivoli', lat: 55.6736, lng: 12.5683 },
    { nome: 'Nyhavn', lat: 55.6797, lng: 12.5906 },
    { nome: 'Castelo de Kronborg', lat: 56.0389, lng: 12.6133 },
    { nome: 'Palácio de Christiansborg', lat: 55.6761, lng: 12.5800 }
  ],
    bounds: { latMin: 54.6, latMax: 57.8, lngMin: 8, lngMax: 15.2 }
  },
  {
    codigo: 'EG', nome: 'Egito', bandeira: '/images/flags/eg.png',
    atracoes: [
    { nome: 'Pirâmides de Gizé', lat: 29.9792, lng: 31.1342 },
    { nome: 'Templo de Karnak', lat: 25.7196, lng: 32.6558 },
    { nome: 'Vale dos Reis', lat: 25.7464, lng: 32.6053 },
    { nome: 'Templo de Luxor', lat: 25.7000, lng: 32.6394 },
    { nome: 'Abu Simbel', lat: 22.3372, lng: 31.6258 }
  ],
    bounds: { latMin: 22, latMax: 31.7, lngMin: 24.7, lngMax: 37 }
  },
  {
    codigo: 'SV', nome: 'El Salvador', bandeira: '/images/flags/sv.png',
    atracoes: [
    { nome: 'Tazumal', lat: 13.9720, lng: -89.6740 },
    { nome: 'Vulcão de Santa Ana', lat: 13.8530, lng: -89.6300 },
    { nome: 'Lago de Coatepeque', lat: 13.8667, lng: -89.5500 },
    { nome: 'Rota das Flores', lat: 13.8167, lng: -89.7000 },
    { nome: 'Catedral Metropolitana de San Salvador', lat: 13.6983, lng: -89.1917 }
  ],
    bounds: { latMin: 13.1, latMax: 14.5, lngMin: -90.2, lngMax: -87.6 }
  },
  {
    codigo: 'AE', nome: 'Emirados Árabes', bandeira: '/images/flags/ae.png',
    atracoes: [
    { nome: 'Burj Khalifa', lat: 25.1972, lng: 55.2744 },
    { nome: 'Mesquita Sheikh Zayed', lat: 24.4120, lng: 54.4740 },
    { nome: 'Louvre Abu Dhabi', lat: 24.5330, lng: 54.4000 },
    { nome: 'Palm Jumeirah', lat: 25.1124, lng: 55.1390 },
    { nome: 'Dubai Mall', lat: 25.1986, lng: 55.2796 }
  ],
    bounds: { latMin: 22.6, latMax: 26.1, lngMin: 51.5, lngMax: 56.4 }
  },
  {
    codigo: 'EC', nome: 'Equador', bandeira: '/images/flags/ec.png',
    atracoes: [
    { nome: 'Mitad del Mundo', lat: -0.0022, lng: -78.4558 },
    { nome: 'Ilhas Galápagos', lat: -0.5000, lng: -90.5000 },
    { nome: 'Centro Histórico de Quito', lat: -0.2200, lng: -78.5125 },
    { nome: 'Vulcão Cotopaxi', lat: -0.6833, lng: -78.4333 },
    { nome: 'Basílica do Voto Nacional', lat: -0.2150, lng: -78.5090 }
  ],
    bounds: { latMin: -5, latMax: 1.5, lngMin: -81, lngMax: -75.2 }
  },
  {
    codigo: 'SK', nome: 'Eslováquia', bandeira: '/images/flags/sk.png',
    atracoes: [
    { nome: 'Castelo de Spiš', lat: 49.0010, lng: 20.7430 },
    { nome: 'Castelo de Bratislava', lat: 48.1417, lng: 17.1000 },
    { nome: 'Alto Tatra', lat: 49.1670, lng: 20.1330 },
    { nome: 'Castelo de Devín', lat: 48.1747, lng: 16.9772 },
    { nome: 'Catedral de São Martinho', lat: 48.1419, lng: 17.1051 }
  ],
    bounds: { latMin: 47.7, latMax: 49.6, lngMin: 16.8, lngMax: 22.6 }
  },
  {
    codigo: 'SI', nome: 'Eslovênia', bandeira: '/images/flags/si.png',
    atracoes: [
    { nome: 'Lago Bled', lat: 46.3618, lng: 14.0947 },
    { nome: 'Caverna de Postojna', lat: 45.7827, lng: 14.2037 },
    { nome: 'Castelo de Ljubljana', lat: 46.0471, lng: 14.5081 },
    { nome: 'Castelo de Predjama', lat: 45.8150, lng: 14.1283 },
    { nome: 'Cavernas de Škocjan', lat: 45.6650, lng: 13.9919 }
  ],
    bounds: { latMin: 45.4, latMax: 46.9, lngMin: 13.4, lngMax: 16.6 }
  },
  {
    codigo: 'ES', nome: 'Espanha', bandeira: '/images/flags/es.png',
    atracoes: [
    { nome: 'Sagrada Família', lat: 41.4036, lng: 2.1744 },
    { nome: 'Alhambra', lat: 37.1770, lng: -3.5940 },
    { nome: 'Parque Güell', lat: 41.4136, lng: 2.1528 },
    { nome: 'Museu do Prado', lat: 40.4138, lng: -3.6921 },
    { nome: 'Catedral de Sevilha', lat: 37.3860, lng: -5.9928 }
  ],
    bounds: { latMin: 36, latMax: 43.8, lngMin: -9.3, lngMax: 4.3 }
  },
  {
    codigo: 'US', nome: 'Estados Unidos', bandeira: '/images/flags/us.png',
    atracoes: [
    { nome: 'Estátua da Liberdade', lat: 40.6892, lng: -74.0445 },
    { nome: 'Grand Canyon', lat: 36.0566, lng: -112.1251 },
    { nome: 'Ponte Golden Gate', lat: 37.8199, lng: -122.4783 },
    { nome: 'Times Square', lat: 40.7580, lng: -73.9855 },
    { nome: 'Walt Disney World', lat: 28.3852, lng: -81.5639 }
  ],
    bounds: { latMin: 24.5, latMax: 49.5, lngMin: -125, lngMax: -66.5 }
  },
  {
    codigo: 'EE', nome: 'Estônia', bandeira: '/images/flags/ee.png',
    atracoes: [
    { nome: 'Cidade Velha de Tallinn', lat: 59.4370, lng: 24.7530 },
    { nome: 'Parque Nacional Lahemaa', lat: 59.5711, lng: 25.8003 },
    { nome: 'Palácio de Kadriorg', lat: 59.4386, lng: 24.7906 },
    { nome: 'Castelo de Toompea', lat: 59.4358, lng: 24.7367 },
    { nome: 'Catedral de Alexandre Nevsky', lat: 59.4358, lng: 24.7396 }
  ],
    bounds: { latMin: 57.5, latMax: 59.7, lngMin: 21.8, lngMax: 28.2 }
  },
  {
    codigo: 'ET', nome: 'Etiópia', bandeira: '/images/flags/et.png',
    atracoes: [
    { nome: 'Igrejas de Lalibela', lat: 12.0320, lng: 39.0400 },
    { nome: 'Montanhas Simien', lat: 13.1830, lng: 38.0670 },
    { nome: 'Aksum', lat: 14.1300, lng: 38.7200 },
    { nome: 'Castelo de Gondar', lat: 12.6000, lng: 37.4667 },
    { nome: 'Vale do Omo', lat: 5.5000, lng: 36.0000 }
  ],
    bounds: { latMin: 3.4, latMax: 14.9, lngMin: 33, lngMax: 48 }
  },
  {
    codigo: 'FJ', nome: 'Fiji', bandeira: '/images/flags/fj.png',
    atracoes: [
    { nome: 'Ilhas Mamanuca', lat: -17.6690, lng: 177.1450 },
    { nome: 'Cavernas Sawa-i-Lau', lat: -16.9000, lng: 177.5000 },
    { nome: 'Jardim do Gigante Adormecido', lat: -17.7667, lng: 177.4500 },
    { nome: 'Templo Sri Siva Subramaniya', lat: -17.8000, lng: 177.4167 },
    { nome: 'Suva', lat: -18.1416, lng: 178.4419 }
  ],
    bounds: { latMin: -19.2, latMax: -16, lngMin: 177, lngMax: 180 }
  },
  {
    codigo: 'PH', nome: 'Filipinas', bandeira: '/images/flags/ph.png',
    atracoes: [
    { nome: 'Terraços de Banaue', lat: 16.9375, lng: 121.1369 },
    { nome: 'Chocolate Hills', lat: 9.9167, lng: 124.1667 },
    { nome: 'Boracay', lat: 11.9674, lng: 121.9248 },
    { nome: 'Vulcão Mayon', lat: 13.2548, lng: 123.6856 },
    { nome: 'Intramuros (Manila)', lat: 14.5900, lng: 120.9770 }
  ],
    bounds: { latMin: 4.5, latMax: 21, lngMin: 116.9, lngMax: 126.6 }
  },
  {
    codigo: 'FI', nome: 'Finlândia', bandeira: '/images/flags/fi.png',
    atracoes: [
    { nome: 'Suomenlinna', lat: 60.1470, lng: 24.9840 },
    { nome: 'Catedral de Helsinki', lat: 60.1703, lng: 24.9522 },
    { nome: 'Santa Claus Village', lat: 66.5433, lng: 25.8475 },
    { nome: 'Catedral Uspenski', lat: 60.1683, lng: 24.9598 },
    { nome: 'Praça do Mercado (Helsinki)', lat: 60.1678, lng: 24.9567 }
  ],
    bounds: { latMin: 59.8, latMax: 70.1, lngMin: 20.6, lngMax: 31.6 }
  },
  {
    codigo: 'FR', nome: 'França', bandeira: '/images/flags/fr.png',
    atracoes: [
    { nome: 'Torre Eiffel', lat: 48.8584, lng: 2.2945 },
    { nome: 'Museu do Louvre', lat: 48.8603, lng: 2.3386 },
    { nome: 'Mont Saint-Michel', lat: 48.6360, lng: -1.5114 },
    { nome: 'Palácio de Versalhes', lat: 48.8047, lng: 2.1218 },
    { nome: 'Catedral de Notre-Dame', lat: 48.8530, lng: 2.3499 }
  ],
    bounds: { latMin: 42.3, latMax: 51.1, lngMin: -4.8, lngMax: 8.2 }
  },
  {
    codigo: 'GH', nome: 'Gana', bandeira: '/images/flags/gh.png',
    atracoes: [
    { nome: 'Castelo de Cape Coast', lat: 5.1030, lng: -1.2410 },
    { nome: 'Parque Nacional Kakum', lat: 5.3536, lng: -1.3833 },
    { nome: 'Castelo de Elmina', lat: 5.0828, lng: -1.3483 },
    { nome: 'Lago Volta', lat: 6.5000, lng: 0.0000 },
    { nome: 'Mercado Makola', lat: 5.5481, lng: -0.2100 }
  ],
    bounds: { latMin: 4.7, latMax: 11.2, lngMin: -3.2, lngMax: 1.2 }
  },
  {
    codigo: 'GE', nome: 'Geórgia', bandeira: '/images/flags/ge.png',
    atracoes: [
    { nome: 'Mosteiro de Gelati', lat: 42.2940, lng: 42.7010 },
    { nome: 'Igreja da Trindade de Gergeti', lat: 42.6625, lng: 44.6203 },
    { nome: 'Cidade Antiga de Tbilisi', lat: 41.6881, lng: 44.8089 },
    { nome: 'Catedral de Svetitskhoveli', lat: 41.8420, lng: 44.7200 },
    { nome: 'Mosteiro de Vardzia', lat: 41.3800, lng: 43.2830 }
  ],
    bounds: { latMin: 41.1, latMax: 43.6, lngMin: 40, lngMax: 46.7 }
  },
  {
    codigo: 'GR', nome: 'Grécia', bandeira: '/images/flags/gr.png',
    atracoes: [
    { nome: 'Parthenon', lat: 37.9715, lng: 23.7267 },
    { nome: 'Santorini (Oia)', lat: 36.4619, lng: 25.3754 },
    { nome: 'Meteora', lat: 39.7170, lng: 21.6330 },
    { nome: 'Torre Branca de Salônica', lat: 40.6261, lng: 22.9483 },
    { nome: 'Palácio de Knossos', lat: 35.2980, lng: 25.1630 }
  ],
    bounds: { latMin: 34.8, latMax: 41.7, lngMin: 19.4, lngMax: 29.7 }
  },
  {
    codigo: 'GT', nome: 'Guatemala', bandeira: '/images/flags/gt.png',
    atracoes: [
    { nome: 'Tikal', lat: 17.2220, lng: -89.6230 },
    { nome: 'Lago de Atitlán', lat: 14.7000, lng: -91.2000 },
    { nome: 'Antigua Guatemala', lat: 14.5611, lng: -90.7344 },
    { nome: 'Semuc Champey', lat: 15.2167, lng: -89.9333 },
    { nome: 'Chichicastenango', lat: 14.9500, lng: -91.1167 }
  ],
    bounds: { latMin: 13.7, latMax: 17.8, lngMin: -92.2, lngMax: -88.2 }
  },
  {
    codigo: 'NL', nome: 'Holanda', bandeira: '/images/flags/nl.png',
    atracoes: [
    { nome: 'Museu Van Gogh', lat: 52.3584, lng: 4.8811 },
    { nome: 'Casa de Anne Frank', lat: 52.3752, lng: 4.8839 },
    { nome: 'Rijksmuseum', lat: 52.3600, lng: 4.8853 },
    { nome: 'Keukenhof', lat: 52.2688, lng: 4.5468 },
    { nome: 'Canais de Amsterdam', lat: 52.3667, lng: 4.8833 }
  ],
    bounds: { latMin: 50.8, latMax: 53.5, lngMin: 3.3, lngMax: 7.2 }
  },
  {
    codigo: 'HK', nome: 'Hong Kong', bandeira: '/images/flags/hk.png',
    atracoes: [
    { nome: 'Victoria Peak', lat: 22.2757, lng: 114.1451 },
    { nome: 'Hong Kong Disneyland', lat: 22.3134, lng: 114.0457 },
    { nome: 'Grande Buda de Tian Tan', lat: 22.2539, lng: 113.9051 },
    { nome: 'Star Ferry', lat: 22.2936, lng: 114.1695 },
    { nome: 'Mercado Noturno de Temple Street', lat: 22.3053, lng: 114.1706 }
  ],
    bounds: { latMin: 22.1, latMax: 22.6, lngMin: 113.8, lngMax: 114.5 }
  },
  {
    codigo: 'HU', nome: 'Hungria', bandeira: '/images/flags/hu.png',
    atracoes: [
    { nome: 'Parlamento Húngaro', lat: 47.5069, lng: 19.0456 },
    { nome: 'Castelo de Buda', lat: 47.4962, lng: 19.0395 },
    { nome: 'Termas Széchenyi', lat: 47.5186, lng: 19.0819 },
    { nome: 'Bastião dos Pescadores', lat: 47.5019, lng: 19.0351 },
    { nome: 'Basílica de Santo Estêvão', lat: 47.5008, lng: 19.0539 }
  ],
    bounds: { latMin: 45.7, latMax: 48.6, lngMin: 16.1, lngMax: 22.9 }
  },
  {
    codigo: 'IN', nome: 'Índia', bandeira: '/images/flags/in.png',
    atracoes: [
    { nome: 'Taj Mahal', lat: 27.1751, lng: 78.0421 },
    { nome: 'Forte Vermelho', lat: 28.6562, lng: 77.2410 },
    { nome: 'Gate of India', lat: 18.9220, lng: 72.8347 },
    { nome: 'Palácio Mysore', lat: 12.3052, lng: 76.6555 },
    { nome: 'Hawa Mahal', lat: 26.9239, lng: 75.8267 }
  ],
    bounds: { latMin: 6.8, latMax: 35.5, lngMin: 68.2, lngMax: 97.4 }
  },
  {
    codigo: 'ID', nome: 'Indonésia', bandeira: '/images/flags/id.png',
    atracoes: [
    { nome: 'Borobudur', lat: -7.6079, lng: 110.2038 },
    { nome: 'Prambanan', lat: -7.7520, lng: 110.4920 },
    { nome: 'Templo Uluwatu', lat: -8.8291, lng: 115.0849 },
    { nome: 'Parque Nacional de Komodo', lat: -8.5500, lng: 119.5000 },
    { nome: 'Tana Toraja', lat: -2.9689, lng: 119.8993 }
  ],
    bounds: { latMin: -11, latMax: 6, lngMin: 95, lngMax: 141 }
  },
  {
    codigo: 'IE', nome: 'Irlanda', bandeira: '/images/flags/ie.png',
    atracoes: [
    { nome: 'Rochedo de Cashel', lat: 52.5202, lng: -7.8915 },
    { nome: 'Falésias de Moher', lat: 52.9705, lng: -9.4200 },
    { nome: 'Calçada dos Gigantes', lat: 55.2408, lng: -6.5116 },
    { nome: 'Anel de Kerry', lat: 51.9479, lng: -9.9161 },
    { nome: 'Temple Bar', lat: 53.3434, lng: -6.2635 }
  ],
    bounds: { latMin: 51.4, latMax: 55.4, lngMin: -10.5, lngMax: -5.9 }
  },
  {
    codigo: 'IS', nome: 'Islândia', bandeira: '/images/flags/is.png',
    atracoes: [
    { nome: 'Cachoeira Gullfoss', lat: 64.3273, lng: -20.1210 },
    { nome: 'Lagoa Azul', lat: 63.8804, lng: -22.4495 },
    { nome: 'Geysir', lat: 64.3138, lng: -20.2995 },
    { nome: 'Cachoeira Skógafoss', lat: 63.5321, lng: -19.5115 },
    { nome: 'Parque Nacional Thingvellir', lat: 64.2550, lng: -21.1307 }
  ],
    bounds: { latMin: 63.3, latMax: 66.6, lngMin: -24.5, lngMax: -13.5 }
  },
  {
    codigo: 'IL', nome: 'Israel', bandeira: '/images/flags/il.png',
    atracoes: [
    { nome: 'Muro das Lamentações', lat: 31.7767, lng: 35.2345 },
    { nome: 'Domo da Rocha', lat: 31.7780, lng: 35.2354 },
    { nome: 'Via Dolorosa', lat: 31.7794, lng: 35.2321 },
    { nome: 'Masada', lat: 31.3155, lng: 35.3536 },
    { nome: 'Jardins Bahá\'i', lat: 32.8094, lng: 34.9865 }
  ],
    bounds: { latMin: 29.5, latMax: 33.3, lngMin: 34.2, lngMax: 35.9 }
  },
  {
    codigo: 'IT', nome: 'Itália', bandeira: '/images/flags/it.png',
    atracoes: [
    { nome: 'Coliseu', lat: 41.8902, lng: 12.4922 },
    { nome: 'Fontana di Trevi', lat: 41.9009, lng: 12.4833 },
    { nome: 'Catedral de Santa Maria del Fiore', lat: 43.7733, lng: 11.2555 },
    { nome: 'Basílica de São Pedro', lat: 41.9022, lng: 12.4533 },
    { nome: 'Galeria Uffizi', lat: 43.7686, lng: 11.2553 }
  ],
    bounds: { latMin: 36.7, latMax: 47.1, lngMin: 6.6, lngMax: 18.5 }
  },
  {
    codigo: 'JM', nome: 'Jamaica', bandeira: '/images/flags/jm.png',
    atracoes: [
    { nome: 'Dunn\'s River Falls', lat: 18.4090, lng: -77.1270 },
    { nome: 'Seven Mile Beach', lat: 18.2500, lng: -78.3500 },
    { nome: 'Museu Bob Marley', lat: 18.0198, lng: -76.7798 },
    { nome: 'Blue Hole', lat: 18.4000, lng: -77.1000 },
    { nome: 'Rose Hall Great House', lat: 18.4667, lng: -77.9333 }
  ],
    bounds: { latMin: 17.7, latMax: 18.5, lngMin: -78.4, lngMax: -76.2 }
  },
  {
    codigo: 'JP', nome: 'Japão', bandeira: '/images/flags/jp.png',
    atracoes: [
    { nome: 'Torre de Tóquio', lat: 35.6586, lng: 139.7454 },
    { nome: 'Templo Senso-ji', lat: 35.7147, lng: 139.7968 },
    { nome: 'Pavilhão Dourado Kinkaku-ji', lat: 35.0395, lng: 135.7285 },
    { nome: 'Palácio Imperial de Tóquio', lat: 35.6836, lng: 139.7503 },
    { nome: 'Santuário Fushimi Inari', lat: 34.9671, lng: 135.7727 }
  ],
    bounds: { latMin: 30, latMax: 46, lngMin: 129, lngMax: 146 }
  },
  {
    codigo: 'JO', nome: 'Jordânia', bandeira: '/images/flags/jo.png',
    atracoes: [
    { nome: 'Petra', lat: 30.3300, lng: 35.4420 },
    { nome: 'Uádi Rum', lat: 29.5559, lng: 35.4075 },
    { nome: 'Mar Morto', lat: 31.5000, lng: 35.5000 },
    { nome: 'Ruínas de Jerash', lat: 32.2770, lng: 35.8900 },
    { nome: 'Cidadela de Amã', lat: 31.9500, lng: 35.9333 }
  ],
    bounds: { latMin: 29.2, latMax: 33.4, lngMin: 34.9, lngMax: 39.3 }
  },
  {
    codigo: 'LV', nome: 'Letônia', bandeira: '/images/flags/lv.png',
    atracoes: [
    { nome: 'Casa dos Cabeças Negras', lat: 56.9470, lng: 24.1060 },
    { nome: 'Catedral de Riga', lat: 56.9493, lng: 24.1050 },
    { nome: 'Igreja de São Pedro', lat: 56.9488, lng: 24.1094 },
    { nome: 'Monumento da Liberdade', lat: 56.9517, lng: 24.1133 },
    { nome: 'Mercado Central de Riga', lat: 56.9333, lng: 24.1167 }
  ],
    bounds: { latMin: 55.7, latMax: 58.1, lngMin: 20.9, lngMax: 28.2 }
  },
  {
    codigo: 'LB', nome: 'Líbano', bandeira: '/images/flags/lb.png',
    atracoes: [
    { nome: 'Ruínas de Baalbek', lat: 34.0060, lng: 36.2050 },
    { nome: 'Gruta de Jeita', lat: 33.9444, lng: 35.6494 },
    { nome: 'Byblos (Jbeil)', lat: 34.1211, lng: 35.6481 },
    { nome: 'Museu Nacional de Beirute', lat: 33.8781, lng: 35.5158 },
    { nome: 'Tiro (Sour)', lat: 33.2720, lng: 35.2035 }
  ],
    bounds: { latMin: 33.05, latMax: 34.7, lngMin: 35.1, lngMax: 36.6 }
  },
  {
    codigo: 'LT', nome: 'Lituânia', bandeira: '/images/flags/lt.png',
    atracoes: [
    { nome: 'Castelo de Trakai', lat: 54.6510, lng: 24.9330 },
    { nome: 'Colina das Cruzes', lat: 56.0153, lng: 23.4167 },
    { nome: 'Catedral de Vilnius', lat: 54.6859, lng: 25.2877 },
    { nome: 'Castelo de Gediminas', lat: 54.6867, lng: 25.2903 },
    { nome: 'Museu do KGB', lat: 54.6854, lng: 25.2775 }
  ],
    bounds: { latMin: 53.9, latMax: 56.5, lngMin: 20.9, lngMax: 26.9 }
  },
  {
    codigo: 'LU', nome: 'Luxemburgo', bandeira: '/images/flags/lu.png',
    atracoes: [
    { nome: 'Palácio Grão-Ducal', lat: 49.6110, lng: 6.1310 },
    { nome: 'Casamatas do Bock', lat: 49.6100, lng: 6.1370 },
    { nome: 'Catedral de Notre-Dame', lat: 49.6097, lng: 6.1316 },
    { nome: 'Ponte Adolphe', lat: 49.6083, lng: 6.1247 },
    { nome: 'Bairro Grund', lat: 49.6067, lng: 6.1367 }
  ],
    bounds: { latMin: 49.4, latMax: 50.2, lngMin: 5.7, lngMax: 6.5 }
  },
  {
    codigo: 'MO', nome: 'Macau', bandeira: '/images/flags/mo.png',
    atracoes: [
    { nome: 'Casino Lisboa', lat: 22.1670, lng: 113.5480 },
    { nome: 'Ruínas de São Paulo', lat: 22.1967, lng: 113.5410 },
    { nome: 'Torre de Macau', lat: 22.1797, lng: 113.5378 },
    { nome: 'Fortaleza do Monte', lat: 22.1967, lng: 113.5403 },
    { nome: 'The Venetian Macau', lat: 22.1483, lng: 113.5611 }
  ],
    bounds: { latMin: 22.1, latMax: 22.2, lngMin: 113.53, lngMax: 113.6 }
  },
  {
    codigo: 'MK', nome: 'Macedônia do Norte', bandeira: '/images/flags/mk.png',
    atracoes: [
    { nome: 'Praça da Macedônia', lat: 41.9960, lng: 21.4310 },
    { nome: 'Lago Ohrid', lat: 41.0833, lng: 20.7833 },
    { nome: 'Igreja de São João Kaneo', lat: 41.1125, lng: 20.7933 },
    { nome: 'Mosteiro de São Naum', lat: 40.9133, lng: 20.7425 },
    { nome: 'Ponte de Pedra (Skopje)', lat: 41.9972, lng: 21.4328 }
  ],
    bounds: { latMin: 40.8, latMax: 42.4, lngMin: 20.4, lngMax: 23.1 }
  },
  {
    codigo: 'MG', nome: 'Madagascar', bandeira: '/images/flags/mg.png',
    atracoes: [
    { nome: 'Avenue of the Baobabs', lat: -20.2490, lng: 44.4180 },
    { nome: 'Tsingy de Bemaraha', lat: -18.6667, lng: 44.7500 },
    { nome: 'Parque Nacional Isalo', lat: -22.4167, lng: 45.2833 },
    { nome: 'Nosy Be', lat: -13.3167, lng: 48.2500 },
    { nome: 'Ambohimanga', lat: -18.7592, lng: 47.5628 }
  ],
    bounds: { latMin: -25.6, latMax: -11.9, lngMin: 43.2, lngMax: 50.5 }
  },
  {
    codigo: 'MY', nome: 'Malásia', bandeira: '/images/flags/my.png',
    atracoes: [
    { nome: 'Petronas Towers', lat: 3.1578, lng: 101.7120 },
    { nome: 'Cavernas de Batu', lat: 3.2375, lng: 101.6839 },
    { nome: 'Monte Kinabalu', lat: 6.0750, lng: 116.5583 },
    { nome: 'Ilha de Langkawi', lat: 6.3500, lng: 99.8000 },
    { nome: 'Templo Kek Lok Si', lat: 5.3986, lng: 100.2833 }
  ],
    bounds: { latMin: 0.8, latMax: 6.5, lngMin: 99.6, lngMax: 119.3 }
  },
  {
    codigo: 'MT', nome: 'Malta', bandeira: '/images/flags/mt.png',
    atracoes: [
    { nome: 'Cidade de Valletta', lat: 35.8990, lng: 14.5140 },
    { nome: 'Templos de Mnajdra', lat: 35.8267, lng: 14.4367 },
    { nome: 'Mdina (Cidade Antiga)', lat: 35.8860, lng: 14.4030 },
    { nome: 'Praia de Golden Bay', lat: 35.9342, lng: 14.3417 },
    { nome: 'Gruta Azul', lat: 35.8200, lng: 14.4400 }
  ],
    bounds: { latMin: 35.8, latMax: 36.1, lngMin: 14.18, lngMax: 14.58 }
  },
  {
    codigo: 'MA', nome: 'Marrocos', bandeira: '/images/flags/ma.png',
    atracoes: [
    { nome: 'Mesquita Hassan II', lat: 33.6093, lng: -7.6322 },
    { nome: 'Praça Jemaa el-Fna', lat: 31.6258, lng: -7.9892 },
    { nome: 'Chefchaouen (Cidade Azul)', lat: 35.1689, lng: -5.2636 },
    { nome: 'Jardim Majorelle', lat: 31.6418, lng: -8.0031 },
    { nome: 'Medina de Fes', lat: 34.0614, lng: -4.9736 }
  ],
    bounds: { latMin: 27.7, latMax: 35.9, lngMin: -13.2, lngMax: -1 }
  },
  {
    codigo: 'MU', nome: 'Maurício', bandeira: '/images/flags/mu.png',
    atracoes: [
    { nome: 'Chamarel', lat: -20.4260, lng: 57.3910 },
    { nome: 'Jardim Botânico de Pamplemousses', lat: -20.1083, lng: 57.5750 },
    { nome: 'Ile aux Cerfs', lat: -20.2694, lng: 57.7917 },
    { nome: 'Port Louis (Mercado Central)', lat: -20.1639, lng: 57.5019 },
    { nome: 'Praia de Flic en Flac', lat: -20.2800, lng: 57.3667 }
  ],
    bounds: { latMin: -20.5, latMax: -19.9, lngMin: 57.3, lngMax: 57.8 }
  },
  {
    codigo: 'MX', nome: 'México', bandeira: '/images/flags/mx.png',
    atracoes: [
    { nome: 'Chichén Itzá', lat: 20.6843, lng: -88.5678 },
    { nome: 'Teotihuacán', lat: 19.6925, lng: -98.8438 },
    { nome: 'Tulum', lat: 20.2114, lng: -87.4653 },
    { nome: 'Palácio de Bellas Artes', lat: 19.4352, lng: -99.1413 },
    { nome: 'Catedral Metropolitana do México', lat: 19.4360, lng: -99.1333 }
  ],
    bounds: { latMin: 14.5, latMax: 32.7, lngMin: -118.4, lngMax: -86.7 }
  },
  {
    codigo: 'MM', nome: 'Mianmar', bandeira: '/images/flags/mm.png',
    atracoes: [
    { nome: 'Pagode Shwedagon', lat: 16.7980, lng: 96.1490 },
    { nome: 'Bagan', lat: 21.1667, lng: 94.8667 },
    { nome: 'Lago Inle', lat: 20.5500, lng: 96.9167 },
    { nome: 'Pagode Kyaiktiyo', lat: 17.4833, lng: 97.1000 },
    { nome: 'Palácio de Mandalay', lat: 22.0000, lng: 96.0833 }
  ],
    bounds: { latMin: 9.8, latMax: 28.5, lngMin: 92.2, lngMax: 101.2 }
  },
  {
    codigo: 'MZ', nome: 'Moçambique', bandeira: '/images/flags/mz.png',
    atracoes: [
    { nome: 'Ilha de Moçambique', lat: -15.0270, lng: 40.7360 },
    { nome: 'Parque Nacional da Gorongosa', lat: -18.7500, lng: 34.5000 },
    { nome: 'Arquipélago de Bazaruto', lat: -21.5833, lng: 35.4667 },
    { nome: 'Catedral de Maputo', lat: -25.9689, lng: 32.5731 },
    { nome: 'Reserva Especial de Maputo', lat: -26.5000, lng: 32.7500 }
  ],
    bounds: { latMin: -26.9, latMax: -10.4, lngMin: 30.2, lngMax: 40.9 }
  },
  {
    codigo: 'MD', nome: 'Moldova', bandeira: '/images/flags/md.png',
    atracoes: [
    { nome: 'Arco do Triunfo de Chișinău', lat: 47.0240, lng: 28.8310 },
    { nome: 'Adega Cricova', lat: 47.1167, lng: 28.8667 },
    { nome: 'Mosteiro de Orheiul Vechi', lat: 47.3000, lng: 28.9833 },
    { nome: 'Catedral da Natividade', lat: 47.0267, lng: 28.8317 },
    { nome: 'Parque Stefan cel Mare', lat: 47.0250, lng: 28.8278 }
  ],
    bounds: { latMin: 45.5, latMax: 48.5, lngMin: 26.6, lngMax: 30.2 }
  },
  {
    codigo: 'MC', nome: 'Mônaco', bandeira: '/images/flags/mc.png',
    atracoes: [
    { nome: 'Cassino de Monte Carlo', lat: 43.7396, lng: 7.4268 },
    { nome: 'Palácio do Príncipe', lat: 43.7310, lng: 7.4199 },
    { nome: 'Museu Oceanográfico', lat: 43.7300, lng: 7.4250 },
    { nome: 'Porto de Mônaco (Port Hercule)', lat: 43.7345, lng: 7.4261 },
    { nome: 'Catedral de Mônaco', lat: 43.7303, lng: 7.4228 }
  ],
    bounds: { latMin: 43.72, latMax: 43.75, lngMin: 7.4, lngMax: 7.44 }
  },
  {
    codigo: 'MN', nome: 'Mongólia', bandeira: '/images/flags/mn.png',
    atracoes: [
    { nome: 'Mosteiro Erdene Zuu', lat: 47.1980, lng: 102.8410 },
    { nome: 'Deserto de Gobi', lat: 43.5000, lng: 103.0000 },
    { nome: 'Lago Khövsgöl', lat: 51.1000, lng: 100.5000 },
    { nome: 'Praça Sükhbaatar', lat: 47.9189, lng: 106.9175 },
    { nome: 'Parque Nacional Terelj', lat: 47.9833, lng: 107.4833 }
  ],
    bounds: { latMin: 41.6, latMax: 52.1, lngMin: 87.8, lngMax: 119.9 }
  },
  {
    codigo: 'ME', nome: 'Montenegro', bandeira: '/images/flags/me.png',
    atracoes: [
    { nome: 'Baía de Kotor', lat: 42.4240, lng: 18.7710 },
    { nome: 'Cidade Antiga de Budva', lat: 42.2900, lng: 18.8430 },
    { nome: 'Parque Nacional Durmitor', lat: 43.1333, lng: 19.0333 },
    { nome: 'Ilha de Sveti Stefan', lat: 42.2580, lng: 18.8910 },
    { nome: 'Mosteiro de Ostrog', lat: 42.6750, lng: 19.0250 }
  ],
    bounds: { latMin: 41.8, latMax: 43.6, lngMin: 18.4, lngMax: 20.4 }
  },
  {
    codigo: 'NA', nome: 'Namíbia', bandeira: '/images/flags/na.png',
    atracoes: [
    { nome: 'Dunas de Sossusvlei', lat: -24.7400, lng: 15.2890 },
    { nome: 'Parque Nacional Etosha', lat: -18.9500, lng: 15.9000 },
    { nome: 'Fish River Canyon', lat: -27.5000, lng: 17.5833 },
    { nome: 'Swakopmund', lat: -22.6833, lng: 14.5333 },
    { nome: 'Dead Vlei', lat: -24.7628, lng: 15.2931 }
  ],
    bounds: { latMin: -28.9, latMax: -16.9, lngMin: 11.7, lngMax: 25.3 }
  },
  {
    codigo: 'NP', nome: 'Nepal', bandeira: '/images/flags/np.png',
    atracoes: [
    { nome: 'Patan Durbar Square', lat: 27.6720, lng: 85.3260 },
    { nome: 'Acampamento Base do Everest', lat: 28.0020, lng: 86.8519 },
    { nome: 'Swayambhunath (Templo dos Macacos)', lat: 27.7146, lng: 85.2900 },
    { nome: 'Praça Durbar (Kathmandu)', lat: 27.7042, lng: 85.3070 },
    { nome: 'Lumbini (Nascimento de Buda)', lat: 27.4669, lng: 83.2781 }
  ],
    bounds: { latMin: 26.4, latMax: 30.5, lngMin: 80, lngMax: 88.2 }
  },
  {
    codigo: 'NI', nome: 'Nicarágua', bandeira: '/images/flags/ni.png',
    atracoes: [
    { nome: 'Catedral de León', lat: 12.4350, lng: -86.8790 },
    { nome: 'Vulcão Masaya', lat: 11.9833, lng: -86.1500 },
    { nome: 'Ilhas de Granada (Las Isletas)', lat: 11.9333, lng: -85.9500 },
    { nome: 'Catedral de Granada', lat: 11.9333, lng: -85.9561 },
    { nome: 'Lago de Nicarágua', lat: 11.5000, lng: -85.5000 }
  ],
    bounds: { latMin: 11, latMax: 15, lngMin: -87.7, lngMax: -83.1 }
  },
  {
    codigo: 'NG', nome: 'Nigéria', bandeira: '/images/flags/ng.png',
    atracoes: [
    { nome: 'Zuma Rock', lat: 9.1300, lng: 7.6880 },
    { nome: 'Parque Nacional Yankari', lat: 9.7500, lng: 10.5000 },
    { nome: 'Olumo Rock', lat: 7.1333, lng: 3.3500 },
    { nome: 'Mercado de Lekki (Lagos)', lat: 6.4500, lng: 3.4500 },
    { nome: 'Igreja da Santa Cruz (Abuja)', lat: 9.0333, lng: 7.4833 }
  ],
    bounds: { latMin: 4.3, latMax: 13.9, lngMin: 2.7, lngMax: 14.7 }
  },
  {
    codigo: 'NO', nome: 'Noruega', bandeira: '/images/flags/no.png',
    atracoes: [
    { nome: 'Fiordes Noruegueses', lat: 60.8936, lng: 6.8586 },
    { nome: 'Bryggen (Bergen)', lat: 60.3971, lng: 5.3240 },
    { nome: 'Museu do Navio Viking (Oslo)', lat: 59.9044, lng: 10.6853 },
    { nome: 'Parque Vigeland', lat: 59.9272, lng: 10.7000 },
    { nome: 'Cabo Norte (Nordkapp)', lat: 71.1695, lng: 25.7856 }
  ],
    bounds: { latMin: 57.9, latMax: 71.2, lngMin: 4.6, lngMax: 31.1 }
  },
  {
    codigo: 'NZ', nome: 'Nova Zelândia', bandeira: '/images/flags/nz.png',
    atracoes: [
    { nome: 'Sky Tower', lat: -36.8485, lng: 174.7633 },
    { nome: 'Hobbiton', lat: -37.8682, lng: 175.6854 },
    { nome: 'Milford Sound', lat: -44.6667, lng: 167.9167 },
    { nome: 'Monte Cook / Aoraki', lat: -43.5951, lng: 170.1417 },
    { nome: 'Rotorua', lat: -38.1333, lng: 176.2500 }
  ],
    bounds: { latMin: -47.5, latMax: -34, lngMin: 166, lngMax: 179 }
  },
  {
    codigo: 'PA', nome: 'Panamá', bandeira: '/images/flags/pa.png',
    atracoes: [
    { nome: 'Canal do Panamá', lat: 9.0800, lng: -79.6800 },
    { nome: 'Cidade Antiga do Panamá', lat: 9.0083, lng: -79.4833 },
    { nome: 'Cerro Ancón', lat: 8.9583, lng: -79.5500 },
    { nome: 'Cinta Costeira', lat: 8.9667, lng: -79.5333 },
    { nome: 'Arquipélago de San Blas', lat: 9.5667, lng: -78.6667 }
  ],
    bounds: { latMin: 7.2, latMax: 9.7, lngMin: -83, lngMax: -77.2 }
  },
  {
    codigo: 'PY', nome: 'Paraguai', bandeira: '/images/flags/py.png',
    atracoes: [
    { nome: 'Palácio López', lat: -25.2940, lng: -57.6250 },
    { nome: 'Missões Jesuíticas de Trinidad', lat: -27.1333, lng: -55.7000 },
    { nome: 'Catedral de Assunção', lat: -25.2833, lng: -57.6333 },
    { nome: 'Lago Ypacaraí', lat: -25.3000, lng: -57.3500 },
    { nome: 'Salto del Monday', lat: -25.6333, lng: -54.6833 }
  ],
    bounds: { latMin: -27.6, latMax: -19.3, lngMin: -62.6, lngMax: -54.2 }
  },
  {
    codigo: 'PE', nome: 'Peru', bandeira: '/images/flags/pe.png',
    atracoes: [
    { nome: 'Machu Picchu', lat: -13.1631, lng: -72.5450 },
    { nome: 'Vale Sagrado (Cusco)', lat: -13.3333, lng: -72.0833 },
    { nome: 'Montanha Arco-Íris (Vinicunca)', lat: -13.8694, lng: -71.3031 },
    { nome: 'Plaza de Armas (Cusco)', lat: -13.5167, lng: -71.9781 },
    { nome: 'Huacachina', lat: -14.0833, lng: -75.7333 }
  ],
    bounds: { latMin: -18.4, latMax: -0.5, lngMin: -81.4, lngMax: -68.7 }
  },
  {
    codigo: 'PL', nome: 'Polônia', bandeira: '/images/flags/pl.png',
    atracoes: [
    { nome: 'Castelo de Wawel', lat: 50.0548, lng: 19.9354 },
    { nome: 'Mina de Sal de Wieliczka', lat: 49.9833, lng: 20.0500 },
    { nome: 'Auschwitz-Birkenau', lat: 50.0358, lng: 19.1778 },
    { nome: 'Cidade Velha de Varsóvia', lat: 52.2478, lng: 21.0122 },
    { nome: 'Floresta de Białowieża', lat: 52.7500, lng: 23.8667 }
  ],
    bounds: { latMin: 49, latMax: 55, lngMin: 14.1, lngMax: 24.2 }
  },
  {
    codigo: 'PR', nome: 'Porto Rico', bandeira: '/images/flags/pr.png',
    atracoes: [
    { nome: 'Castillo San Felipe', lat: 18.4670, lng: -66.1080 },
    { nome: 'El Yunque National Forest', lat: 18.3167, lng: -65.7667 },
    { nome: 'Praia de Flamenco (Culebra)', lat: 18.3070, lng: -65.3190 },
    { nome: 'Catedral de San Juan', lat: 18.4667, lng: -66.1167 },
    { nome: 'Paseo de la Princesa', lat: 18.4647, lng: -66.1147 }
  ],
    bounds: { latMin: 17.9, latMax: 18.5, lngMin: -67.3, lngMax: -65.2 }
  },
  {
    codigo: 'PT', nome: 'Portugal', bandeira: '/images/flags/pt.png',
    atracoes: [
    { nome: 'Torre de Belém', lat: 38.6916, lng: -9.2159 },
    { nome: 'Mosteiro dos Jerónimos', lat: 38.6979, lng: -9.2068 },
    { nome: 'Palácio Nacional da Pena (Sintra)', lat: 38.7878, lng: -9.3907 },
    { nome: 'Torre dos Clérigos (Porto)', lat: 41.1456, lng: -8.6140 },
    { nome: 'Livraria Lello (Porto)', lat: 41.1467, lng: -8.6147 }
  ],
    bounds: { latMin: 36.9, latMax: 42.2, lngMin: -9.5, lngMax: -6.2 }
  },
  {
    codigo: 'KE', nome: 'Quênia', bandeira: '/images/flags/ke.png',
    atracoes: [
    { nome: 'Masai Mara', lat: -1.4837, lng: 35.1055 },
    { nome: 'Monte Quênia', lat: -0.1500, lng: 37.3000 },
    { nome: 'Lago Nakuru', lat: -0.3667, lng: 36.0833 },
    { nome: 'Forte Jesus (Mombaça)', lat: -4.0667, lng: 39.6833 },
    { nome: 'Parque Nacional Amboseli', lat: -2.6500, lng: 37.2500 }
  ],
    bounds: { latMin: -4.7, latMax: 4.7, lngMin: 33.9, lngMax: 41.9 }
  },
  {
    codigo: 'GB', nome: 'Reino Unido', bandeira: '/images/flags/gb.png',
    atracoes: [
    { nome: 'Big Ben', lat: 51.5007, lng: -0.1246 },
    { nome: 'Torre de Londres', lat: 51.5081, lng: -0.0759 },
    { nome: 'Palácio de Buckingham', lat: 51.5015, lng: -0.1406 },
    { nome: 'London Eye', lat: 51.5033, lng: -0.1197 },
    { nome: 'Museu Britânico', lat: 51.5194, lng: -0.1270 }
  ],
    bounds: { latMin: 49.9, latMax: 60.9, lngMin: -8.2, lngMax: 1.8 }
  },
  {
    codigo: 'DO', nome: 'República Dominicana', bandeira: '/images/flags/do.png',
    atracoes: [
    { nome: 'Faro a Colón', lat: 18.4780, lng: -69.8820 },
    { nome: 'Zona Colonial (Santo Domingo)', lat: 18.4733, lng: -69.8833 },
    { nome: 'Punta Cana (Praia Bávaro)', lat: 18.6000, lng: -68.3833 },
    { nome: 'Parque Nacional Los Haitises', lat: 19.0000, lng: -69.6333 },
    { nome: 'Lago Enriquillo', lat: 18.5000, lng: -71.5000 }
  ],
    bounds: { latMin: 17.4, latMax: 20, lngMin: -72, lngMax: -68.3 }
  },
  {
    codigo: 'CZ', nome: 'República Tcheca', bandeira: '/images/flags/cz.png',
    atracoes: [
    { nome: 'Ponte Carlos', lat: 50.0865, lng: 14.4114 },
    { nome: 'Castelo de Praga', lat: 50.0909, lng: 14.4013 },
    { nome: 'Relógio Astronômico (Praça da Cidade Velha)', lat: 50.0869, lng: 14.4214 },
    { nome: 'Cidade Velha de Praga', lat: 50.0875, lng: 14.4210 },
    { nome: 'Český Krumlov', lat: 48.8100, lng: 14.3150 }
  ],
    bounds: { latMin: 48.5, latMax: 51.1, lngMin: 12.1, lngMax: 18.9 }
  },
  {
    codigo: 'RO', nome: 'Romênia', bandeira: '/images/flags/ro.png',
    atracoes: [
    { nome: 'Castelo de Bran', lat: 45.5150, lng: 25.3670 },
    { nome: 'Palácio do Parlamento (Bucareste)', lat: 44.4272, lng: 26.0875 },
    { nome: 'Mosteiro de Voroneț', lat: 47.5167, lng: 25.8667 },
    { nome: 'Castelo de Peleș', lat: 45.3500, lng: 25.5333 },
    { nome: 'Estrada Transfăgărășan', lat: 45.4333, lng: 24.7833 }
  ],
    bounds: { latMin: 43.6, latMax: 48.3, lngMin: 20.3, lngMax: 29.8 }
  },
  {
    codigo: 'RU', nome: 'Rússia', bandeira: '/images/flags/ru.png',
    atracoes: [
    { nome: 'Praça Vermelha', lat: 55.7541, lng: 37.6203 },
    { nome: 'Kremlin', lat: 55.7517, lng: 37.6178 },
    { nome: 'Catedral de São Basílio', lat: 55.7525, lng: 37.6231 },
    { nome: 'Palácio de Catarina', lat: 59.7158, lng: 30.3958 },
    { nome: 'Lago Baikal', lat: 53.5589, lng: 108.1650 }
  ],
    bounds: { latMin: 41.2, latMax: 81.9, lngMin: 19.6, lngMax: 190 }
  },
  {
    codigo: 'SN', nome: 'Senegal', bandeira: '/images/flags/sn.png',
    atracoes: [
    { nome: 'Ilha de Gorée', lat: 14.6670, lng: -17.3980 },
    { nome: 'Lago Rosa (Lac Retba)', lat: 14.8333, lng: -17.2333 },
    { nome: 'Grande Mesquita de Dakar', lat: 14.6833, lng: -17.4333 },
    { nome: 'Ilha de Saint-Louis', lat: 16.0333, lng: -16.5000 },
    { nome: 'Parque Nacional Niokolo-Koba', lat: 13.0000, lng: -13.5000 }
  ],
    bounds: { latMin: 12.3, latMax: 16.7, lngMin: -17.7, lngMax: -11.3 }
  },
  {
    codigo: 'RS', nome: 'Sérvia', bandeira: '/images/flags/rs.png',
    atracoes: [
    { nome: 'Fortaleza de Belgrado', lat: 44.8230, lng: 20.4500 },
    { nome: 'Templo de São Sava', lat: 44.7978, lng: 20.4680 },
    { nome: 'Rua Knez Mihailova', lat: 44.8175, lng: 20.4569 },
    { nome: 'Mosteiro de Studenica', lat: 43.4867, lng: 20.5350 },
    { nome: 'Fortaleza Petrovaradin (Novi Sad)', lat: 45.2500, lng: 19.8667 }
  ],
    bounds: { latMin: 42.2, latMax: 46.2, lngMin: 18.8, lngMax: 23 }
  },
  {
    codigo: 'SG', nome: 'Singapura', bandeira: '/images/flags/sg.png',
    atracoes: [
    { nome: 'Marina Bay Sands', lat: 1.2834, lng: 103.8607 },
    { nome: 'Gardens by the Bay', lat: 1.2817, lng: 103.8636 },
    { nome: 'Sentosa Island', lat: 1.2483, lng: 103.8300 },
    { nome: 'Templo de Sri Mariamman', lat: 1.2824, lng: 103.8456 },
    { nome: 'Chinatown (Singapura)', lat: 1.2825, lng: 103.8430 }
  ],
    bounds: { latMin: 1.2, latMax: 1.5, lngMin: 103.6, lngMax: 104.1 }
  },
  {
    codigo: 'LK', nome: 'Sri Lanka', bandeira: '/images/flags/lk.png',
    atracoes: [
    { nome: 'Templo do Dente', lat: 7.2930, lng: 80.6410 },
    { nome: 'Sigiriya (Rocha do Leão)', lat: 7.9570, lng: 80.7600 },
    { nome: 'Cidade Antiga de Polonnaruwa', lat: 7.9400, lng: 81.0000 },
    { nome: 'Templo Dourado de Dambulla', lat: 7.8560, lng: 80.6500 },
    { nome: 'Praia de Mirissa', lat: 5.9500, lng: 80.4500 }
  ],
    bounds: { latMin: 5.9, latMax: 9.9, lngMin: 79.6, lngMax: 81.9 }
  },
  {
    codigo: 'SE', nome: 'Suécia', bandeira: '/images/flags/se.png',
    atracoes: [
    { nome: 'Vasa Museum', lat: 59.3276, lng: 18.0910 },
    { nome: 'Gamla Stan (Cidade Velha de Estocolmo)', lat: 59.3250, lng: 18.0720 },
    { nome: 'Palácio Real de Estocolmo', lat: 59.3269, lng: 18.0728 },
    { nome: 'Ice Hotel (Jukkasjärvi)', lat: 67.8500, lng: 20.6000 },
    { nome: 'Catedral de Uppsala', lat: 59.8580, lng: 17.6350 }
  ],
    bounds: { latMin: 55.3, latMax: 69.1, lngMin: 11.1, lngMax: 24.2 }
  },
  {
    codigo: 'CH', nome: 'Suíça', bandeira: '/images/flags/ch.png',
    atracoes: [
    { nome: 'Matterhorn', lat: 45.9763, lng: 7.6586 },
    { nome: 'Jungfraujoch (Topo da Europa)', lat: 46.5475, lng: 7.9817 },
    { nome: 'Lago Genebra', lat: 46.4500, lng: 6.5500 },
    { nome: 'Castelo de Chillon', lat: 46.4144, lng: 6.9275 },
    { nome: 'Catedral de São Pedro (Genebra)', lat: 46.2017, lng: 6.1483 }
  ],
    bounds: { latMin: 45.8, latMax: 47.8, lngMin: 5.9, lngMax: 10.5 }
  },
  {
    codigo: 'TH', nome: 'Tailândia', bandeira: '/images/flags/th.png',
    atracoes: [
    { nome: 'Wat Phra Kaew', lat: 13.7514, lng: 100.4925 },
    { nome: 'Wat Pho (Buda Reclinado)', lat: 13.7467, lng: 100.4922 },
    { nome: 'Khao San Road', lat: 13.7597, lng: 100.4978 },
    { nome: 'Praia de Railay (Krabi)', lat: 8.0175, lng: 98.8389 },
    { nome: 'Grand Palace (Bangkok)', lat: 13.7500, lng: 100.4917 }
  ],
    bounds: { latMin: 5.6, latMax: 20.5, lngMin: 97.3, lngMax: 105.6 }
  },
  {
    codigo: 'TW', nome: 'Taiwan', bandeira: '/images/flags/tw.png',
    atracoes: [
    { nome: 'Taipei 101', lat: 25.0339, lng: 121.5646 },
    { nome: 'Desfiladeiro de Taroko', lat: 24.1667, lng: 121.3333 },
    { nome: 'Santuário Chiang Kai-shek', lat: 25.0333, lng: 121.5167 },
    { nome: 'Templo de Longshan', lat: 25.0367, lng: 121.5000 },
    { nome: 'Lago Sun Moon', lat: 23.8667, lng: 120.9167 }
  ],
    bounds: { latMin: 21.8, latMax: 25.5, lngMin: 119.5, lngMax: 122 }
  },
  {
    codigo: 'TZ', nome: 'Tanzânia', bandeira: '/images/flags/tz.png',
    atracoes: [
    { nome: 'Monte Kilimanjaro', lat: -3.0674, lng: 37.3556 },
    { nome: 'Parque Nacional Serengeti', lat: -2.3333, lng: 34.8333 },
    { nome: 'Cratera de Ngorongoro', lat: -3.1833, lng: 35.5500 },
    { nome: 'Zanzibar (Stone Town)', lat: -6.1667, lng: 39.2000 },
    { nome: 'Lago Manyara', lat: -3.5000, lng: 35.8333 }
  ],
    bounds: { latMin: -11.7, latMax: -1, lngMin: 29.3, lngMax: 40.4 }
  },
  {
    codigo: 'TN', nome: 'Tunísia', bandeira: '/images/flags/tn.png',
    atracoes: [
    { nome: 'Anfiteatro de El Jem', lat: 35.2960, lng: 10.7060 },
    { nome: 'Ruínas de Cartago', lat: 36.8531, lng: 10.3233 },
    { nome: 'Medina de Túnis', lat: 36.8000, lng: 10.1667 },
    { nome: 'Sidi Bou Said', lat: 36.8706, lng: 10.3419 },
    { nome: 'Parque Nacional de Ichkeul', lat: 37.1000, lng: 9.6667 }
  ],
    bounds: { latMin: 30.2, latMax: 37.5, lngMin: 7.5, lngMax: 11.6 }
  },
  {
    codigo: 'TR', nome: 'Turquia', bandeira: '/images/flags/tr.png',
    atracoes: [
    { nome: 'Hagia Sophia', lat: 41.0086, lng: 28.9802 },
    { nome: 'Capadócia (Göreme)', lat: 38.6386, lng: 34.8281 },
    { nome: 'Pamukkale', lat: 37.9167, lng: 29.1167 },
    { nome: 'Basílica Cisterna (Istambul)', lat: 41.0084, lng: 28.9773 },
    { nome: 'Palácio Topkapi', lat: 41.0115, lng: 28.9833 }
  ],
    bounds: { latMin: 36, latMax: 42.1, lngMin: 26, lngMax: 44.8 }
  },
  {
    codigo: 'UA', nome: 'Ucrânia', bandeira: '/images/flags/ua.png',
    atracoes: [
    { nome: 'Muralhas de Kiev', lat: 50.4547, lng: 30.5238 },
    { nome: 'Mosteiro das Cavernas (Kyiv Pechersk Lavra)', lat: 50.4333, lng: 30.5590 },
    { nome: 'Praça da Independência (Maidan)', lat: 50.4501, lng: 30.5234 },
    { nome: 'Castelo de Kamianets-Podilskyi', lat: 48.6719, lng: 26.5694 },
    { nome: 'Ópera de Odessa', lat: 46.4850, lng: 30.7380 }
  ],
    bounds: { latMin: 44.4, latMax: 52.4, lngMin: 22.1, lngMax: 40.2 }
  },
  {
    codigo: 'UY', nome: 'Uruguai', bandeira: '/images/flags/uy.png',
    atracoes: [
    { nome: 'Teatro Solís', lat: -34.9077, lng: -56.2000 },
    { nome: 'Punta del Este (La Mano)', lat: -34.9711, lng: -54.9500 },
    { nome: 'Colônia do Sacramento', lat: -34.4675, lng: -57.8333 },
    { nome: 'Mercado Agrícola (Montevidéu)', lat: -34.9067, lng: -56.2017 },
    { nome: 'Rambla de Montevidéu', lat: -34.9167, lng: -56.1667 }
  ],
    bounds: { latMin: -35, latMax: -30.1, lngMin: -58.5, lngMax: -53.1 }
  },
  {
    codigo: 'UZ', nome: 'Uzbequistão', bandeira: '/images/flags/uz.png',
    atracoes: [
    { nome: 'Registão de Samarcanda', lat: 39.6540, lng: 66.9750 },
    { nome: 'Itchan Kala (Khiva)', lat: 41.3833, lng: 60.3667 },
    { nome: 'Minarete Kalyan (Bukhara)', lat: 39.7750, lng: 64.4167 },
    { nome: 'Shah-i-Zinda (Samarcanda)', lat: 39.6600, lng: 66.9867 },
    { nome: 'Praça Amir Timur (Tashkent)', lat: 41.3097, lng: 69.2833 }
  ],
    bounds: { latMin: 37.2, latMax: 45.6, lngMin: 56, lngMax: 73.2 }
  },
  {
    codigo: 'VE', nome: 'Venezuela', bandeira: '/images/flags/ve.png',
    atracoes: [
    { nome: 'Salto Angel', lat: 5.9670, lng: -62.5360 },
    { nome: 'Monte Roraima', lat: 5.1333, lng: -60.7667 },
    { nome: 'Arquipélago Los Roques', lat: 11.8500, lng: -66.7500 },
    { nome: 'Catedral de Caracas', lat: 10.5050, lng: -66.9147 },
    { nome: 'Teleférico de Mérida', lat: 8.5333, lng: -71.0667 }
  ],
    bounds: { latMin: 0.6, latMax: 12.2, lngMin: -73.4, lngMax: -59.8 }
  },
  {
    codigo: 'VN', nome: 'Vietnã', bandeira: '/images/flags/vn.png',
    atracoes: [
    { nome: 'Baía de Ha Long', lat: 20.9101, lng: 107.1839 },
    { nome: 'Cidade Imperial de Huế', lat: 16.4633, lng: 107.5833 },
    { nome: 'Túneis de Cu Chi', lat: 11.0667, lng: 106.5333 },
    { nome: 'Hoi An (Cidade Antiga)', lat: 15.8775, lng: 108.3281 },
    { nome: 'Lago Hoan Kiem (Hanói)', lat: 21.0288, lng: 105.8519 }
  ],
    bounds: { latMin: 8.4, latMax: 23.4, lngMin: 102.1, lngMax: 109.5 }
  },
];

function getPaisPorCodigo(codigo) {
  return PAISES.find(p => p.codigo === codigo);
}
