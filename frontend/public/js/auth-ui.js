(function() {
  function getEl(id) { return document.getElementById(id); }

  var isGamePage = window.location.pathname === '/game';
  var isLandingPage = window.location.pathname === '/' || window.location.pathname === '/index.html';

  function getInitials(nome) {
    if (!nome) return '?';
    return nome.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  }

  function atualizarAuthUI() {
    try {
      var token = localStorage.getItem('where-token');
      var usuarioStr = localStorage.getItem('where-usuario');
      var usuario = null;
      if (usuarioStr) {
        try { usuario = JSON.parse(usuarioStr); } catch(e) { usuario = null; }
      }

      var logado = token && usuario;

      if (logado && isLandingPage) {
        window.location.href = '/game';
        return true;
      }

      if (!logado && isGamePage) {
        window.location.href = '/';
        return false;
      }

      if (isGamePage) {
        var nomeEl = getEl('nav-user-nome');
        var avatarEl = getEl('nav-avatar');
        if (nomeEl && usuario) nomeEl.textContent = usuario.nome || 'Usuário';
        if (avatarEl) {
          if (usuario && usuario.avatar_url) {
            avatarEl.innerHTML = '<img src="' + usuario.avatar_url + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">';
          } else {
            avatarEl.textContent = getInitials(usuario && usuario.nome);
          }
        }
      }

      document.body.classList.add('landing-active');
      return logado;
    } catch(e) {
      console.error('Erro auth-ui:', e);
      return false;
    }
  }

  function buscarRanking() {
    var token = localStorage.getItem('where-token');
    if (!token) return;
    var badgeEl = getEl('nav-ranking-badge');
    if (!badgeEl) return;

    fetch('/api/auth/ranking', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.ranking) {
        var coinEl = document.getElementById('ranking-coin');
        var nameEl = document.getElementById('ranking-name');
        if (coinEl) { coinEl.className = 'coin coin-' + data.ranking.toLowerCase().replace(/[^a-z0-9]/g, '-'); coinEl.textContent = ''; }
        if (nameEl) nameEl.textContent = data.ranking;
        badgeEl.classList.remove('hidden');
      }
    })
    .catch(function() {});
  }

  function init() {
    var logado = atualizarAuthUI();
    if (logado && isGamePage) buscarRanking();

    var menu = getEl('nav-user-menu');
    var dropdown = getEl('nav-dropdown');
    if (menu && dropdown) {
      menu.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });
      menu.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('hidden');
        }
      });
      document.addEventListener('click', function() {
        dropdown.classList.add('hidden');
      });
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    var btnLogout = getEl('nav-btn-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', function() {
        localStorage.removeItem('where-token');
        localStorage.removeItem('where-usuario');
        window.location.href = '/';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
