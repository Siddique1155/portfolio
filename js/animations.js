/* ==========================================================
   Scroll-driven reveals, hover physics, and dynamic sections
   rendered from data.js.
   ========================================================== */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderEcosystem();
    renderWork();
    renderProcess();
    renderServices();
    renderTimeline();
    initTilt();
    initScrollProgress();
    initMagneticButtons();
    initRippleClicks();
    buildFooterParticles();
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      window.addEventListener('siddique:loaded', heroIntro, { once: true });
      initScrollReveals();
      initProcessFill();
    }
  });

  /* ---------- Hero intro ---------- */
  function heroIntro() {
    if (reduced) {
      document.querySelectorAll('.reveal-line span').forEach((el) => (el.style.transform = 'none'));
      return;
    }
    gsap.set('.reveal-line span', { yPercent: 130 });
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.reveal-line span', { yPercent: 0, duration: 1.1, stagger: 0.09 })
      .from('.hero-portrait', { opacity: 0, scale: 0.92, duration: 1 }, '-=0.7')
      .from('.nav', { y: -40, opacity: 0, duration: 0.8 }, '-=1');
  }

  /* ---------- Generic reveals ---------- */
  function initScrollReveals() {
    document.querySelectorAll('.reveal-up').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: () => el.classList.add('is-revealed'), once: true });
    });
    gsap.utils.toArray('.service-card, .work-card, .diagram-node, .skill-node').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%' }, delay: (i % 6) * 0.04,
      });
    });
    gsap.utils.toArray('section .section-head').forEach((head) => {
      gsap.fromTo(head, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 88%' } });
    });
    gsap.utils.toArray('.ecosystem-diagram, .architecture-stage, .timeline').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('main > section').forEach((section, i) => {
      if (i === 0) return;
      gsap.fromTo(section, { opacity: 0.4 }, { opacity: 1, duration: 1, ease: 'power1.out', scrollTrigger: { trigger: section, start: 'top 95%' } });
    });
  }

  function initProcessFill() {
    const line = document.getElementById('processLine');
    if (!line) return;
    gsap.to(line, { '--fill': '100%', ease: 'none', scrollTrigger: { trigger: line, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  }

  /* ---------- Tilt ---------- */
  function initTilt() {
    if (matchMedia('(hover:none), (pointer:coarse)').matches) return;
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('[data-tilt]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', (px - 0.5) * 10 + 'deg');
      card.style.setProperty('--rx', (0.5 - py) * 10 + 'deg');
    });
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mouseleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ---------- Scroll progress ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    const fill = bar?.querySelector('span');
    if (!bar || !fill) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      fill.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagneticButtons() {
    if (reduced || matchMedia('(hover:none), (pointer:coarse)').matches) return;
    document.querySelectorAll('.btn, .nav-logo-mark').forEach((el) => {
      let raf = null;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`; });
      });
      el.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        else el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Ripple ---------- */
  function initRippleClicks() {
    if (reduced) return;
    document.addEventListener('click', (e) => {
      const host = e.target.closest('.btn, .work-card, .service-card, .skill-node, .eco-node');
      if (!host) return;
      const r = host.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'nexa-ripple';
      const size = Math.max(r.width, r.height) * 1.4;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - r.left - size / 2 + 'px';
      ripple.style.top = e.clientY - r.top - size / 2 + 'px';
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.style.overflow = host.style.overflow || 'hidden';
      host.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const wrap = document.getElementById('skillsGroups');
    if (!wrap || typeof SKILLS === 'undefined') return;
    wrap.innerHTML = Object.entries(SKILLS).map(([group, items]) => `
      <div class="skill-group">
        <p class="skill-group-title">${group}</p>
        <div class="skill-nodes">${items.map((s) => `<span class="skill-node" data-tilt>${s}</span>`).join('')}</div>
      </div>
    `).join('');
  }

  /* ---------- Ecosystem hover diagram ---------- */
  function renderEcosystem() {
    const wrap = document.getElementById('ecosystemDiagram');
    if (!wrap || typeof ECOSYSTEM_NODES === 'undefined') return;
    const size = 560, cx = size / 2, cy = size / 2, radius = 220;

    const positioned = ECOSYSTEM_NODES.map((n) => {
      const rad = (n.angle * Math.PI) / 180;
      return { ...n, x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
    });

    const iconKeyFor = (id) => (id === 'website' ? 'web' : id); // 'website' node maps to the 'web' icon
    const svgLines = positioned.map((n, i) => `<path id="line-${n.id}" d="M${cx},${cy} L${n.x},${n.y}"/>`).join('');
    const nodesHtml = positioned.map((n) => `
      <button class="eco-node" style="left:${(n.x / size) * 100}%; top:${(n.y / size) * 100}%; transform:translate(-50%,-50%);"
        data-node="${n.id}" data-label="${n.label}" aria-label="${n.label}" data-icon="${iconKeyFor(n.id)}"></button>
    `).join('');

    wrap.innerHTML = `
      <svg class="eco-line" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">${svgLines}</svg>
      <div class="eco-core"><span>AI Agent</span><small>CORE</small></div>
      ${nodesHtml}
    `;
    mountIcons(wrap);

    const detailLabel = document.getElementById('ecosystemDetailLabel');
    const detailText = document.getElementById('ecosystemDetailText');
    wrap.querySelectorAll('.eco-node').forEach((btn) => {
      const id = btn.dataset.node;
      const activate = () => {
        wrap.querySelectorAll('.eco-node').forEach((b) => b.classList.remove('is-active'));
        wrap.querySelectorAll('.eco-line path').forEach((p) => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        wrap.querySelector(`#line-${id}`)?.classList.add('is-active');
        if (detailLabel) detailLabel.textContent = btn.dataset.label;
        if (detailText) detailText.textContent = ECOSYSTEM_DETAIL[id] || '';
      };
      btn.addEventListener('mouseenter', activate);
      btn.addEventListener('focus', activate);
      btn.addEventListener('click', activate);
    });
  }

  /* ---------- Work / Projects ---------- */
  function renderWork() {
    const grid = document.getElementById('workGrid');
    if (!grid || typeof PROJECTS === 'undefined') return;
    grid.innerHTML = PROJECTS.map((item, i) => `
      <article class="work-card ${item.isPrevious ? 'work-card-previous' : ''}" data-tilt data-work-index="${i}" tabindex="0" role="button"
        aria-label="View ${item.title} details">
        <img class="work-card-visual" src="assets/projects/${item.id}.svg" alt="" loading="lazy" width="800" height="1000" />
        <div class="work-card-scrim"></div>
        <div class="work-card-body">
          <span class="work-card-cat">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="work-card-tags">${item.tech.slice(0, 3).map((t) => `<span>${t}</span>`).join('')}</div>
          <div class="work-card-actions">
            <span class="work-card-view">View details →</span>
            ${item.liveUrl ? `<a href="${item.liveUrl}" target="_blank" rel="noopener" class="work-card-demo" data-cursor="link" data-no-card-open>${item.demoLabel} ↗</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.work-card').forEach((card) => {
      const open = () => openCaseModal(PROJECTS[+card.dataset.workIndex]);
      card.addEventListener('click', (e) => { if (e.target.closest('[data-no-card-open]')) return; open(); });
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });

    const modal = document.getElementById('caseModal');
    modal.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeCaseModal));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCaseModal(); });
  }

  function openCaseModal(item) {
    const modal = document.getElementById('caseModal');
    const body = document.getElementById('caseModalBody');
    const detailBlocks = item.isPrevious
      ? `<p class="section-sub">This is Muhammad's earlier personal portfolio, kept online as a record of past work. This current site is the active one.</p>`
      : `
      <div class="case-modal-grid">
        <div><h4>Problem</h4><p>${item.problem}</p></div>
        <div><h4>Solution</h4><p>${item.solution}</p></div>
        <div><h4>Architecture</h4><p>${item.architecture}</p></div>
        <div><h4>Status</h4><p>${item.result}</p></div>
      </div>`;
    body.innerHTML = `
      <img class="case-modal-visual" src="assets/projects/${item.id}.svg" alt="" loading="lazy" />
      <span class="work-card-cat">${item.category}</span>
      <h2 id="caseModalTitle">${item.title}</h2>
      <p class="section-sub">${item.summary}</p>
      ${detailBlocks}
      <div class="case-modal-tags">${item.tech.map((t) => `<span>${t}</span>`).join('')}</div>
      ${item.liveUrl ? `<a href="${item.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary case-modal-demo" data-cursor="link"><span>${item.demoLabel} ↗</span></a>` : ''}
    `;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- Process ---------- */
  function renderProcess() {
    const line = document.getElementById('processLine');
    if (!line || typeof PROCESS_STEPS === 'undefined') return;
    line.innerHTML = PROCESS_STEPS.map((s) => `
      <li><span class="pl-index">${s.n}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>
    `).join('');
  }

  /* ---------- Services ---------- */
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid || typeof SERVICES === 'undefined') return;
    grid.innerHTML = SERVICES.map((s) => `
      <article class="service-card" data-tilt>
        <span class="service-icon" data-icon="${s.icon}"></span>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </article>
    `).join('');
    mountIcons(grid);
  }

  /* ---------- Experience timeline ---------- */
  function renderTimeline() {
    const wrap = document.getElementById('timeline');
    if (!wrap || typeof EXPERIENCE === 'undefined') return;
    wrap.innerHTML = EXPERIENCE.map((e) => `
      <div class="timeline-item">
        <span class="timeline-period">${e.period}</span>
        <h3>${e.title}</h3>
        <span class="timeline-place">${e.place}</span>
        <p>${e.text}</p>
      </div>
    `).join('');
  }

  /* ---------- Footer particles ---------- */
  function buildFooterParticles() {
    const wrap = document.getElementById('footerParticles');
    if (!wrap) return;
    let html = '';
    for (let i = 0; i < 24; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 6;
      const size = 1 + Math.random() * 2;
      const dur = 6 + Math.random() * 8;
      html += `<span style="position:absolute;left:${left}%;bottom:-10px;width:${size}px;height:${size}px;border-radius:50%;background:${i % 2 ? '#38BDF8' : '#4E7CFF'};opacity:.5;animation:floatUp ${dur}s linear ${delay}s infinite;"></span>`;
    }
    wrap.innerHTML = html;
    if (!document.getElementById('floatUpKeyframes')) {
      const style = document.createElement('style');
      style.id = 'floatUpKeyframes';
      style.textContent = `@keyframes floatUp{ to{ transform:translateY(-420px); opacity:0; } }`;
      document.head.appendChild(style);
    }
  }
})();
