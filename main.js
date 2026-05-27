/* ============================================================
   KM BEAUTY ARTIST — main.js
   ============================================================ */

// ── NAVBAR: cień po scroll ────────────────────────────────
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // stan początkowy
})();


// ── REVEAL: animacja pojawiania się elementów ─────────────
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // lekkie opóźnienie kaskadowe dla elementów w tym samym rzucie
        const delay = i * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((el) => observer.observe(el));
})();


// ── SMOOTH SCROLL dla kotwic ──────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = document.querySelector('nav')?.offsetHeight ?? 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
