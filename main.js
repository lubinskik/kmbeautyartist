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
  onScroll();
})();


// ── HAMBURGER MENU ────────────────────────────────────────
(function initHamburger() {
  const btn      = document.getElementById('hamburger');
  const drawer   = document.getElementById('nav-mobile');
  if (!btn || !drawer) return;

  // Otwieranie / zamykanie szuflady
  btn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Zamknij po kliknięciu w link (nie w toggle rodzica)
  drawer.querySelectorAll('a:not(.mobile-parent-link)').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Zamknij po kliknięciu poza szufladą
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !btn.contains(e.target)) {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


// ── MOBILE DROPDOWN TOGGLE ────────────────────────────────
(function initMobileDropdowns() {
  document.querySelectorAll('.mobile-parent').forEach(parent => {
    parent.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const sub    = parent.closest('li').querySelector('.mobile-sub');
      const isOpen = sub.classList.toggle('open');
      parent.classList.toggle('open', isOpen);
    });
  });
})();


// ── REVEAL: animacja pojawiania się elementów ─────────────
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );
  items.forEach(el => observer.observe(el));
})();


// ── SMOOTH SCROLL dla kotwic ──────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('nav')?.offsetHeight ?? 76;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
