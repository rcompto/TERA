/* TERA INSTALL — tera-3/script.js */

document.getElementById('year').textContent = new Date().getFullYear();

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,.12)'
    : '0 1px 3px rgba(0,0,0,.08)';
}, { passive: true });

const animTargets = document.querySelectorAll('.card, .diferencial, .testimonial, .step, .faq__item, .sobre__card, .client-logo, .hero__card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

const floatBtn = document.querySelector('.whatsapp-float');
floatBtn.style.transition = 'opacity .3s ease, transform .25s ease';
window.addEventListener('scroll', () => {
  if (window.innerWidth >= 768) {
    floatBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    floatBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
  }
}, { passive: true });
if (window.innerWidth >= 768) { floatBtn.style.opacity = '0'; floatBtn.style.pointerEvents = 'none'; }
