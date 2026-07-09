/* main.js - Pink Horizon Initiative */

/* Cursor trailing effect */
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) scale(1)`;
  });

  document.addEventListener('mouseenter', e => {
    if (e.target.closest('a, button')) {
      cursor.classList.add('active');
    }
  });

  document.addEventListener('mouseleave', e => {
    if (e.target.closest('a, button')) {
      cursor.classList.remove('active');
    }
  });
}

/* Magnetic button effect */
document.querySelectorAll('.focus-magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (x - centerX) * 0.015;
    const offsetY = (y - centerY) * 0.015;
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0,0)';
  });
});

/* IntersectionObserver for scroll reveals */
const revealElements = document.querySelectorAll('.reveal, .reveal-from-top, .reveal-from-left, .reveal-from-right, .reveal-scale');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

/* Horizon line animations */
const horizonLines = document.querySelectorAll('.horizon__line');
horizonLines.forEach(line => {
  line.style.animationPlayState = 'paused';
});

const horizonObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      line.style.animationPlayState = 'running';
      horizonObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

horizonLines.forEach(line => {
  horizonObserver.observe(line);
});

/* Nav scroll effect */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* Mobile menu toggle */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    mobileMenu.setAttribute('aria-hidden', expanded);
    mobileMenu.classList.toggle('active');
  });
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Staggered reveals for impact items */
const impactItems = document.querySelectorAll('.impact__rail li, .focus__item');
impactItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
  item.classList.add('reveal-from-right');
});

/* Event cards staggered reveal */
const events = document.querySelectorAll('.event');
events.forEach((event, index) => {
  event.style.animationDelay = `${index * 0.15}s`;
  event.classList.add('reveal-from-left');
});

/* Hero content staggered */
const heroElements = document.querySelector('.hero__content') ?
  document.querySelectorAll('.hero__content > *') : [];
heroElements.forEach((el, index) => {
  el.style.animationDelay = `${index * 0.2}s`;
  el.classList.add('reveal-from-left');
});

/* Cursor hide on scroll */
let lastScrollY = window.scrollY;
const cursorHide = () => {
  if (window.scrollY > 100 && Math.abs(window.scrollY - lastScrollY) < 5) {
    cursor.classList.add('hidden');
  } else {
    cursor.classList.remove('hidden');
  }
  lastScrollY = window.scrollY;
};

window.addEventListener('scroll', cursorHide);

/* Auto-hide cursor on touch devices */
if ('ontouchstart' in window) {
  cursor.classList.add('hidden');
}