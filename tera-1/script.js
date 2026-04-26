/* =============================================
   TERA INSTALL — script.js
   ============================================= */

// ---- ANO DINÂMICO NO FOOTER ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- MENU HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Fecha menu ao clicar em link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Fecha menu ao clicar fora
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

// ---- HEADER SCROLL SHADOW ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,.14)'
    : '0 2px 12px rgba(0,0,0,.08)';
}, { passive: true });

// ---- ANIMAÇÃO DE ENTRADA (Intersection Observer) ----
const animTargets = document.querySelectorAll(
  '.card, .diferencial, .testimonial, .step, .faq__item, .sobre__card, .client-logo'
);

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

// ---- BOTÃO FLUTUANTE: esconde no topo (desktop) ----
const floatBtn = document.querySelector('.whatsapp-float');
window.addEventListener('scroll', () => {
  if (window.innerWidth >= 768) {
    floatBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    floatBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
  } else {
    floatBtn.style.opacity = '1';
    floatBtn.style.pointerEvents = 'auto';
  }
}, { passive: true });

// Inicializa estado do botão flutuante no desktop
if (window.innerWidth >= 768) {
  floatBtn.style.opacity = '0';
  floatBtn.style.pointerEvents = 'none';
}
floatBtn.style.transition = 'opacity .3s ease, transform .25s ease, box-shadow .25s ease';
