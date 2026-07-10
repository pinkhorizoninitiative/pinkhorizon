/* ============================================================
   Pink Horizon Initiative — Motion Engine
   Single rAF-driven scroll loop. Honors prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ----------------------------------------------------------
     SPLIT TEXT — wrap each line in a mask span for reveal
     ---------------------------------------------------------- */
  function splitLines(el) {
    const html = el.innerHTML;
    // Preserve <br> as line breaks, wrap plain segments
    const parts = html.split(/<br\s*\/?>/i);
    // .line is display:block, so no <br> needed between them
    el.innerHTML = parts
      .map((p) => `<span class="line"><span>${p}</span></span>`)
      .join('');
  }

  document.querySelectorAll('[data-split]').forEach(splitLines);

  // Specular sheen on section headings only — the hero title keeps its
  // dawn accent word, so it is deliberately excluded.
  document.querySelectorAll('[data-split]').forEach((el) => {
    if (!el.classList.contains('hero__title')) el.classList.add('t-sheen');
  });

  /* ----------------------------------------------------------
     REVEAL ENGINE — IntersectionObserver
     ---------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '[data-reveal], [data-reveal-group] > [data-reveal], [data-stagger], [data-split]'
  );

  if (prefersReduced) {
    revealTargets.forEach((t) => t.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          // Stagger children within a group
          const group = el.closest('[data-reveal-group]');
          if (group && el.hasAttribute('data-reveal')) {
            const siblings = Array.from(
              group.querySelectorAll(':scope > [data-reveal]')
            );
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = `${idx * 0.1}s`;
          }
          // Reversible: toggle visibility as it enters/leaves the viewport
          if (entry.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach((t) => revealObserver.observe(t));
  }

  /* ----------------------------------------------------------
     HORIZON LINE — draw on intersect
     ---------------------------------------------------------- */
  const horizonLines = document.querySelectorAll('[data-horizon]');
  if (prefersReduced) {
    horizonLines.forEach((l) => l.classList.add('animate'));
  } else {
    const horizonObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reversible: line draws in on enter, retracts on leave
          if (entry.isIntersecting) entry.target.classList.add('animate');
          else entry.target.classList.remove('animate');
        });
      },
      { threshold: 0.5 }
    );
    horizonLines.forEach((l) => horizonObserver.observe(l));
  }

  /* ----------------------------------------------------------
     ANIMATED COUNTERS
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      // Bail if a reset invalidated this run
      if (el._countRun !== tick) return;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(eased * target);
      el.textContent = val.toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    el._countRun = tick;
    requestAnimationFrame(tick);
  }

  if (prefersReduced) {
    counters.forEach((el) => {
      el.textContent =
        (parseFloat(el.getAttribute('data-count')) || 0).toLocaleString('en-US') +
        (el.getAttribute('data-suffix') || '');
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Re-triggers each time it re-enters view
            animateCount(entry.target);
          } else {
            // Reset so it counts up again on the way back
            entry.target._countRun = null;
            entry.target.textContent = '0';
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ----------------------------------------------------------
     SCROLL-LINKED TYPOGRAPHY — [data-scroll-type]
     opacity tracks position in viewport
     ---------------------------------------------------------- */
  const scrollTypeEls = Array.from(document.querySelectorAll('[data-scroll-type]'));

  /* ----------------------------------------------------------
     PARALLAX — [data-parallax]
     ---------------------------------------------------------- */
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]')).map((el) => ({
    el,
    speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0.05,
  }));

  /* ----------------------------------------------------------
     HYBRID HORIZONTAL SCROLL — [data-horizontal]
     ---------------------------------------------------------- */
  const storySection = document.querySelector('.story');
  const storyTrack = document.querySelector('[data-horizontal]');
  let storyScrollDistance = 0;

  function measureStory() {
    if (!storySection || !storyTrack) return;

    // Reduced motion: fall back to a normal horizontal-scroll row (no pinning)
    if (prefersReduced) {
      storySection.style.height = 'auto';
      storyTrack.style.transform = 'none';
      return;
    }

    const trackWidth = storyTrack.scrollWidth;
    const overflow = trackWidth - window.innerWidth;
    storyScrollDistance = Math.max(overflow, 0);
    // Section height = pin height (100vh) + horizontal travel distance
    storySection.style.height = `${window.innerHeight + storyScrollDistance}px`;
  }

  /* ----------------------------------------------------------
     SINGLE SCROLL LOOP (rAF, ticked)
     ---------------------------------------------------------- */
  const heroProgress = document.querySelector('[data-hero-progress]');
  const lighting = document.querySelector('.lighting');
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function update() {
    const vh = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    // Document scroll progress (0 -> 1)
    const docHeight = document.documentElement.scrollHeight - vh;
    const docProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

    // Hero progress bar (0 -> 1 across first viewport)
    if (heroProgress) {
      const p = Math.min(scrollY / vh, 1);
      heroProgress.style.transform = `scaleX(${p})`;
      heroProgress.style.width = '100%';
    }

    // Dramatic scroll-linked lighting: the beam sweeps down the page and
    // its intensity oscillates so the canvas visibly brightens and darkens.
    if (lighting && !prefersReduced) {
      const wave = 0.5 - 0.5 * Math.cos(docProgress * Math.PI * 4); // 0..1, four swells
      const goldA = (0.04 + wave * 0.14).toFixed(3);
      const roseA = (0.02 + (1 - wave) * 0.10).toFixed(3);
      const yPos = (18 + docProgress * 48).toFixed(1); // sweep top -> bottom
      const xPos = (50 + Math.sin(docProgress * Math.PI * 2) * 18).toFixed(1);
      lighting.style.background =
        `radial-gradient(55vw 55vw at ${xPos}% ${yPos}%, rgba(245,195,64,${goldA}), transparent 68%),` +
        `radial-gradient(50vw 50vw at ${100 - xPos}% ${100 - yPos * 0.5}%, rgba(232,66,154,${roseA}), transparent 70%)`;
      // Subtle global contrast shift: page floor darkens at the swells
      document.body.style.backgroundColor =
        wave > 0.5 ? '#080807' : '#0c0b0a';
    }

    // Parallax
    if (!prefersReduced) {
      parallaxEls.forEach(({ el, speed }) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const offset = -center * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    }

    // Scroll-linked typography
    scrollTypeEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - vh / 2);
      const ratio = Math.max(0, 1 - dist / (vh * 0.5));
      el.style.opacity = (0.25 + ratio * 0.7).toFixed(3);
    });

    // Hybrid horizontal scroll
    if (storySection && storyTrack && storyScrollDistance > 0 && !prefersReduced) {
      const top = storySection.offsetTop;
      const raw = scrollY - top;
      const p = Math.max(0, Math.min(raw / storyScrollDistance, 1));
      const x = -p * storyScrollDistance;
      storyTrack.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    measureStory();
    update();
  });

  measureStory();
  update();

  // Re-measure once async resources (fonts, logo) settle, since they
  // change panel widths and therefore the horizontal scroll distance.
  window.addEventListener('load', () => {
    measureStory();
    update();
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measureStory();
      update();
    });
  }

  /* ----------------------------------------------------------
     SMOOTH INERTIAL SCROLL (eased)
     Keeps the real scroll position (so IntersectionObservers, sticky
     pinning, and the horizontal story track all stay in sync) but
     eases window.scrollY toward a target with a lerp — an easing
     curve applied to both vertical and, by extension, the horizontal
     story scroll (which is driven off scrollY).
     ---------------------------------------------------------- */
  const smooth = { enabled: false, target: 0, current: 0, running: false };

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }
  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function smoothStep() {
    const diff = smooth.target - smooth.current;
    if (Math.abs(diff) < 0.4) {
      smooth.current = smooth.target;
      window.scrollTo(0, Math.round(smooth.current));
      smooth.running = false;
      return;
    }
    smooth.current += diff * 0.06; // easing factor -> floaty glide
    window.scrollTo(0, Math.round(smooth.current));
    requestAnimationFrame(smoothStep);
  }

  function smoothKick() {
    if (!smooth.running) {
      smooth.running = true;
      requestAnimationFrame(smoothStep);
    }
  }

  function smoothTo(y) {
    smooth.target = clamp(y, 0, maxScroll());
    smoothKick();
  }

  if (!isTouch && !prefersReduced) {
    smooth.enabled = true;
    smooth.target = smooth.current = window.scrollY || window.pageYOffset;
    document.documentElement.style.scrollBehavior = 'auto';

    window.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) return; // let pinch-zoom through
        // Don't hijack wheeling inside the horizontal events strip
        if (e.target.closest && e.target.closest('.events__scroller')) return;
        e.preventDefault();
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16; // lines -> px
        else if (e.deltaMode === 2) delta *= window.innerHeight; // pages -> px
        smooth.target = clamp(smooth.target + delta, 0, maxScroll());
        smoothKick();
      },
      { passive: false }
    );

    // Keyboard scrolling, eased too
    window.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      const step = window.innerHeight;
      let handled = true;
      switch (e.key) {
        case 'ArrowDown': smooth.target = clamp(smooth.target + 80, 0, maxScroll()); break;
        case 'ArrowUp': smooth.target = clamp(smooth.target - 80, 0, maxScroll()); break;
        case 'PageDown': smooth.target = clamp(smooth.target + step * 0.9, 0, maxScroll()); break;
        case 'PageUp': smooth.target = clamp(smooth.target - step * 0.9, 0, maxScroll()); break;
        case 'Home': smooth.target = 0; break;
        case 'End': smooth.target = maxScroll(); break;
        case ' ':
          smooth.target = clamp(smooth.target + step * (e.shiftKey ? -0.9 : 0.9), 0, maxScroll());
          break;
        default: handled = false;
      }
      if (handled) { e.preventDefault(); smoothKick(); }
    });

    // Keep target in sync when scroll happens outside our loop
    // (scrollbar drag, focus jumps, etc.)
    window.addEventListener(
      'scroll',
      () => {
        if (!smooth.running) {
          smooth.target = smooth.current = window.scrollY || window.pageYOffset;
        }
      },
      { passive: true }
    );

    window.addEventListener('resize', () => {
      smooth.target = clamp(smooth.target, 0, maxScroll());
    });
  }

  /* ----------------------------------------------------------
     MOUSE-DRIVEN BACKGROUND PARALLAX
     Whole ambient field drifts toward the cursor; children keep
     their own float animations (parent + child transforms compose).
     ---------------------------------------------------------- */
  const ambient = document.querySelector('.ambient');
  if (ambient && !isTouch && !prefersReduced) {
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const MAX = 60; // px of drift at screen edge (stronger)

    window.addEventListener(
      'mousemove',
      (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2 * MAX;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2 * MAX;
      },
      { passive: true }
    );

    (function driftAmbient() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      ambient.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      requestAnimationFrame(driftAmbient);
    })();
  }

  /* ----------------------------------------------------------
     3D INTERACTIVE TILT — cards lean toward the cursor in depth
     ---------------------------------------------------------- */
  if (!isTouch && !prefersReduced) {
    const tiltCards = document.querySelectorAll('.founder, .event, .sdg__card');
    const MAX_TILT = 6; // degrees
    tiltCards.forEach((card) => {
      card.classList.add('tilt');
      card.addEventListener('mouseenter', () => card.classList.add('is-tilting'));
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const rotY = px * MAX_TILT * 2;
        const rotX = -py * MAX_TILT * 2;
        card.style.transform =
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(40px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     CURSOR (premium blob)
     ---------------------------------------------------------- */
  const cursorBlob = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursorBlob && cursorDot && !isTouch && !prefersReduced) {
    let mouseX = 0, mouseY = 0, blobX = 0, blobY = 0, dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      blobX += (mouseX - blobX) * 0.12;
      blobY += (mouseY - blobY) * 0.12;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      cursorBlob.style.left = blobX + 'px';
      cursorBlob.style.top = blobY + 'px';
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    document.querySelectorAll('a, button, .event, .focus__item, .metric, .founder').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorBlob.classList.add('cursor-hover');
        if (el.matches('.founder, .sdg__card, .event')) cursorBlob.classList.add('cursor-glass');
      });
      el.addEventListener('mouseleave', () => {
        cursorBlob.classList.remove('cursor-hover');
        cursorBlob.classList.remove('cursor-glass');
      });
    });

    // Jelly squish: center dot swells elastically while held, springs back on release
    const press = () => {
      cursorDot.classList.add('press');
      cursorBlob.classList.add('press');
    };
    const release = () => {
      cursorDot.classList.remove('press');
      cursorBlob.classList.remove('press');
    };
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup', release);
    window.addEventListener('blur', release);
  } else if (cursorBlob && cursorDot) {
    cursorBlob.style.display = 'none';
    cursorDot.style.display = 'none';
  }

  /* ----------------------------------------------------------
     NAVBAR scroll blur
     ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const navState = () => {
      if ((window.scrollY || window.pageYOffset) > 80) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', navState, { passive: true });
    navState();
  }

  /* ----------------------------------------------------------
     MOBILE MENU
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      mobileMenu.setAttribute('aria-hidden', expanded);
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      })
    );
  }

  /* ----------------------------------------------------------
     SMOOTH ANCHOR SCROLL
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        if (smooth.enabled) {
          const y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
          smoothTo(y);
        } else {
          target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
    });
  });
})();
