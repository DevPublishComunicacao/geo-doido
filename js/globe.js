(() => {
  const canvas = document.getElementById('hero-globe');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let rotacao = 0;
  let animId = null;
  let imagemMundo = null;

  function dpr(n) {
    return n * (window.devicePixelRatio || 1);
  }

  function redimensionar() {
    const size = Math.min(500, window.innerWidth * 0.45);
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = dpr(size);
    canvas.height = dpr(size);
  }

  function desenharGlobo() {
    if (!imagemMundo) {
      imagemMundo = new Image();
      imagemMundo.crossOrigin = 'anonymous';
      imagemMundo.src = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
      animId = requestAnimationFrame(desenharGlobo);
      return;
    }

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const raio = size * 0.48;

    ctx.clearRect(0, 0, size, size);

    // Glow externo
    const grad = ctx.createRadialGradient(cx, cy, raio * 0.8, cx, cy, raio * 1.4);
    grad.addColorStop(0, 'rgba(0, 210, 255, 0.1)');
    grad.addColorStop(0.4, 'rgba(58, 123, 213, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, raio * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Fundo
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.fillStyle = '#0d1117';
    ctx.fill();
    ctx.strokeStyle = 'rgba(58, 123, 213, 0.2)';
    ctx.lineWidth = dpr(1);
    ctx.stroke();

    // Clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.clip();

    // Desenhar textura rotacionada
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

    // Sombra esférica
    const sombra = ctx.createRadialGradient(cx, cy, raio * 0.3, cx, cy, raio);
    sombra.addColorStop(0, 'rgba(0,0,0,0)');
    sombra.addColorStop(0.6, 'rgba(0,0,0,0.1)');
    sombra.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = sombra;
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.fill();

    // Brilho
    const brilho = ctx.createRadialGradient(cx - raio * 0.3, cy - raio * 0.3, 0, cx, cy, raio);
    brilho.addColorStop(0, 'rgba(0, 210, 255, 0.08)');
    brilho.addColorStop(0.5, 'rgba(58, 123, 213, 0.03)');
    brilho.addColorStop(1, 'transparent');
    ctx.fillStyle = brilho;
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    rotacao += 0.003;
    animId = requestAnimationFrame(desenharGlobo);
  }

  redimensionar();
  window.addEventListener('resize', redimensionar);
  desenharGlobo();
})();
