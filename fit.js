// WeFORM · adatta il mockup (disegnato a 390×844) a tutto lo schermo del telefono.
// Su telefono: larghezza piena e altezza piena. Su computer: cornice centrata.
(function () {
  var W = 390, H = 844;
  function findRoot() {
    return document.querySelector('[style*="width: 390px"][style*="height: 844px"]');
  }
  function fit() {
    var root = findRoot();
    if (!root) return false;
    var vw = window.innerWidth, vh = window.innerHeight;
    var phone = vw <= 600 || window.matchMedia('(pointer: coarse)').matches && vw < 900;
    var b = document.body.style;
    if (phone) {
      var s = vw / W;
      root.style.setProperty('zoom', String(s));
      root.style.setProperty('height', (vh / s) + 'px', 'important');
      root.style.setProperty('border-radius', '0');
      root.style.setProperty('box-shadow', 'none');
      root.style.setProperty('margin', '0');
      b.setProperty('background', getComputedStyle(root).backgroundColor || '#FCF7F1');
      document.documentElement.style.setProperty('background', getComputedStyle(root).backgroundColor || '#FCF7F1');
      b.setProperty('align-items', 'flex-start');
      b.setProperty('overflow', 'hidden');
    } else {
      var d = Math.min(1, (vh - 40) / H);
      root.style.setProperty('zoom', String(d));
      root.style.setProperty('height', H + 'px', 'important');
      root.style.setProperty('border-radius', '40px');
      root.style.setProperty('box-shadow', '0 30px 80px rgba(14,73,55,0.18)');
      root.style.setProperty('margin', '20px 0');
      b.removeProperty('overflow');
    }
    return true;
  }
  function start() {
    if (fit()) return;
    var mo = new MutationObserver(function () { if (fit()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', function () { setTimeout(fit, 200); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
