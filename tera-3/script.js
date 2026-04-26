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

// ---- CARROSSEL ----
(function () {
  const track    = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const btnPrev  = document.querySelector('.carousel__btn--prev');
  const btnNext  = document.querySelector('.carousel__btn--next');
  const slides   = track.querySelectorAll('.carousel__slide');
  const total    = slides.length;
  let current    = 0;

  function getSlidesVisible() {
    if (window.innerWidth < 768)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  // Cria dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.carousel__dot');

  function goTo(index) {
    const visible = getSlidesVisible();
    const max = total - visible;
    current = Math.max(0, Math.min(index, max));
    // usa largura real do slide em px — correto em qualquer tela
    const slideW = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideW * current}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Autoplay
  let timer = setInterval(() => goTo(current + 1 > total - getSlidesVisible() ? 0 : current + 1), 4000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  track.parentElement.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1 > total - getSlidesVisible() ? 0 : current + 1), 4000);
  });

  // Swipe touch
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Recalcula ao redimensionar
  window.addEventListener('resize', () => { current = 0; goTo(0); });
})();
