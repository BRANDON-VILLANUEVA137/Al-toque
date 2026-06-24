document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function closeNav() {
    toggles.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    if(navLinks) navLinks.classList.remove('open');
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(navLinks) navLinks.classList.toggle('open');
    });
  });

  // Close nav when clicking a link (mobile)
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.topnav')) {
      closeNav();
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  const backToTop = document.querySelector('.back-to-top');
  const toggleVisible = () => {
    if(!backToTop) return;
    if(window.scrollY > 320) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };

  toggleVisible();
  window.addEventListener('scroll', toggleVisible, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});