// Ficks Auto — interactions

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav state
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 12) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile burger menu
const burger = document.getElementById('navBurger');
const links = document.getElementById('navLinks');
const setMenu = (open) => {
  burger.setAttribute('aria-expanded', String(open));
  links.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  setMenu(open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Close menu on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter animation (hero trust)
const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });
counterEls.forEach(el => counterObserver.observe(el));

// Soft parallax on hero logo
const heroLogoWrap = document.querySelector('.hero-logo-wrap');
if (heroLogoWrap && window.matchMedia('(hover: hover)').matches) {
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    heroLogoWrap.style.transform = `translate3d(${x}px, ${y - 4}px, 0)`;
  });
  hero.addEventListener('mouseleave', () => {
    heroLogoWrap.style.transform = '';
  });
}

// Smooth anchor offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
