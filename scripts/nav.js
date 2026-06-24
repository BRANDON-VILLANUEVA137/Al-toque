document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    const navLinks = document.getElementById('nav-links');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(navLinks) navLinks.classList.toggle('open');
    });
  });
});
