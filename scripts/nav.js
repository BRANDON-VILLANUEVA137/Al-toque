document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(navLinks) navLinks.classList.toggle('open');
    });
  });

  const backToTop = document.querySelector('.back-to-top');
  const toggleVisible = () => {
    if(!backToTop) return;
    if(window.scrollY > 320) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };

  toggleVisible();
  window.addEventListener('scroll', toggleVisible);
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
