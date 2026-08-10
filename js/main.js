/* ==========================================================
   Muhammad Siddique — core app wiring
   ========================================================== */
(function () {
  'use strict';
  const API_BASE = window.SIDDIQUE_API_BASE || '';

  document.addEventListener('DOMContentLoaded', () => {
    mountIcons();
    initLoader();
    initSmoothScroll();
    initNav();
    initCursor();
    initForms();
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  function initLoader() {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loaderProgress');
    let pct = 0;
    const tick = setInterval(() => {
      pct += Math.random() * 18;
      if (pct >= 100) {
        pct = 100;
        clearInterval(tick);
        bar.style.width = '100%';
        setTimeout(() => {
          loader.classList.add('is-hidden');
          window.dispatchEvent(new CustomEvent('siddique:loaded'));
        }, 350);
        return;
      }
      bar.style.width = pct + '%';
    }, 120);
  }

  let lenisInstance = null;
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenisInstance = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
    function raf(time) { lenisInstance.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.siddiqueLenis = lenisInstance;
  }

  function initNav() {
    const nav = document.getElementById('siteNav');
    const burger = document.getElementById('navBurger');
    const mobile = document.getElementById('navMobile');

    window.addEventListener('scroll', () => nav.classList.toggle('is-scrolled', window.scrollY > 40), { passive: true });

    burger.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        mobile.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        if (lenisInstance) lenisInstance.scrollTo(target, { offset: -70 });
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ---------- Custom cursor with contextual states ----------
     normal -> dot only
     interactive (data-cursor="link") -> ring expands
     .work-card -> ring shows "VIEW"
     [target="_blank"]/external link -> ring shows "OPEN"          */
  function initCursor() {
    if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const label = document.getElementById('cursorLabel');
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();

    const setState = (state, text) => {
      ring.classList.remove('is-active', 'is-project', 'is-link');
      if (state) ring.classList.add(state);
      label.textContent = text || '';
    };

    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.work-card');
      const external = e.target.closest('a[target="_blank"]');
      const link = e.target.closest('[data-cursor="link"]');
      if (card) setState('is-project', 'View');
      else if (external) setState('is-link', 'Open');
      else if (link) setState('is-active', '');
    });
    document.addEventListener('mouseout', (e) => {
      const stillOver = e.relatedTarget && (e.relatedTarget.closest?.('.work-card, a[target="_blank"], [data-cursor="link"]'));
      if (!stillOver) setState(null, '');
    });
  }

  function initForms() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('cfStatus');
    const submitBtn = document.getElementById('cfSubmit');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.className = 'form-status';
      submitBtn.setAttribute('disabled', 'true');

      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');
        status.textContent = 'Message sent — I usually reply within a day.';
        status.classList.add('is-success');
        form.reset();
      } catch (err) {
        status.textContent = 'Could not send right now — email m.siddiq1137@gmail.com directly.';
        status.classList.add('is-error');
      } finally {
        submitBtn.removeAttribute('disabled');
      }
    });
  }
})();
