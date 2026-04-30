// nav.js — gedeeld script voor alle pagina's
document.addEventListener('DOMContentLoaded', () => {

  // Hamburger menu
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Actieve pagina markeren
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const isCurrent = a.getAttribute('href') === page;
    a.classList.toggle('active', isCurrent);
    if (isCurrent) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Taalknop actief markeren
  const isEN = page.includes('_en');
  document.querySelectorAll('.nav-lang a').forEach(a => {
    const isActiveLang = (isEN && a.dataset.lang === 'en') || (!isEN && a.dataset.lang === 'nl');
    a.classList.toggle('active', isActiveLang);
    if (isActiveLang) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Skill bars animeren zodra ze zichtbaar zijn
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-fill').forEach(el => observer.observe(el));

});
