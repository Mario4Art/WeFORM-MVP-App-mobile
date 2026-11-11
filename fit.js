// WeFORM · adatta il mockup a tutto lo schermo del dispositivo.
// - Versione telefono (disegnata a 390×844): sul telefono riempie lo schermo,
//   sul computer resta in una cornice centrata.
// - Versione tablet (disegnata a 820×1180): riempie lo schermo di qualsiasi
//   tablet, in verticale e in orizzontale; il layout si allarga o si stringe
//   e i testi mantengono una dimensione leggibile.
(function () {
  var cached = null;
  function findRoot() {
    if (cached && document.contains(cached)) return cached;
    var t = document.querySelector('[style*="height: 1180px"]');
    if (t) { t.dataset.wfTablet = '1'; return (cached = t); }
    return (cached = document.querySelector('[style*="width: 390px"][style*="height: 844px"]'));
  }
  function paintBg(root) {
    var bg = getComputedStyle(root).backgroundColor || '#FCF7F1';
    document.body.style.setProperty('background', bg);
    document.documentElement.style.setProperty('background', bg);
    document.body.style.setProperty('align-items', 'flex-start');
    document.body.style.setProperty('overflow', 'hidden');
  }
  function fitTablet(root, vw, vh) {
    // larghezza di progetto 820; in orizzontale si tiene almeno ~860 px di altezza utile
    var s = Math.min(vw / 820, vh / 860);
    if (vw < 600) s = vw / 820 * 1.6;            // aperta da telefono: resta leggibile
    s = Math.max(0.5, s);
    var landscape = vw / vh > 1.1;
    root.style.setProperty('zoom', String(s));
    root.style.setProperty('width', (vw / s) + 'px', 'important');
    root.style.setProperty('height', (vh / s) + 'px', 'important');
    root.style.setProperty('--cw', landscape ? '860px' : '600px');
    root.style.setProperty('border-radius', '0');
    root.style.setProperty('margin', '0');
    paintBg(root);
  }
  function fitPhone(root, vw, vh) {
    var phone = vw <= 600 || (window.matchMedia('(pointer: coarse)').matches && vw < 900);
    if (phone) {
      var s = vw / 390;
      root.style.setProperty('zoom', String(s));
      root.style.setProperty('height', (vh / s) + 'px', 'important');
      root.style.setProperty('border-radius', '0');
      root.style.setProperty('box-shadow', 'none');
      root.style.setProperty('margin', '0');
      paintBg(root);
    } else {
      var d = Math.min(1, (vh - 40) / 844);
      root.style.setProperty('zoom', String(d));
      root.style.setProperty('height', '844px', 'important');
      root.style.setProperty('border-radius', '40px');
      root.style.setProperty('box-shadow', '0 30px 80px rgba(14,73,55,0.18)');
      root.style.setProperty('margin', '20px 0');
      document.body.style.removeProperty('overflow');
    }
  }
  function fit() {
    var root = findRoot();
    if (!root) return false;
    // misura lo schermo reale: innerWidth/innerHeight si gonfiano se la pagina,
    // prima dell'adattamento, è più larga dello schermo
    var vv = window.visualViewport;
    var vw = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
    var vh = vv && vv.scale === 1 ? vv.height : Math.min(window.innerHeight, document.documentElement.clientHeight || window.innerHeight);
    if (vv && vv.scale === 1) vw = Math.min(vw, vv.width);
    if (/1180px/.test(root.getAttribute('style') || '') || root.dataset.wfTablet) {
      root.dataset.wfTablet = '1';
      fitTablet(root, vw, vh);
    } else {
      fitPhone(root, vw, vh);
    }
    return true;
  }
  function start() {
    if (fit()) return;
    var mo = new MutationObserver(function () { if (fit()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', function () { setTimeout(fit, 250); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
