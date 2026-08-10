/* ==========================================================
   Hero WebGL scene — a central AI-agent core with channel
   nodes orbiting it, connected by lines that pulse particles
   along them. Represents the WhatsApp → AI Agent → n8n → CRM →
   Sheets → Email → Website → YouTube ecosystem described in
   the brief, as ambient background rather than literal labels
   (labels live in the accessible #ecosystem section instead).
   ========================================================== */
(function () {
  'use strict';
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let renderer, scene, camera, core, nodeGroup, particleLines = [];
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0, scrollT = 0, raf = null;

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    resize();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 11);

    // Central AI-agent core
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x4e7cff, wireframe: true, transparent: true, opacity: 0.6 });
    core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(3.2, 0.4, -1);
    scene.add(core);

    const coreGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 40),
      new THREE.MeshBasicMaterial({ color: 0x4e7cff, transparent: true, opacity: 0.08 })
    );
    coreGlow.position.copy(core.position);
    coreGlow.position.z -= 0.5;
    scene.add(coreGlow);

    // Orbiting channel nodes (small spheres) with connecting lines back to the core
    nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    const nodeCount = window.innerWidth < 700 ? 5 : 8;
    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 4.2 + (i % 2) * 0.6;
      const x = core.position.x + Math.cos(angle) * radius;
      const y = core.position.y + Math.sin(angle) * radius * 0.6;
      const z = core.position.z + Math.sin(angle * 2) * 1.2;

      const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0xffb454 });
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.set(x, y, z);
      node.userData = { baseAngle: angle, radius, speed: 0.08 + Math.random() * 0.05 };
      nodeGroup.add(node);

      // connecting line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([core.position, node.position]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x2a355c, transparent: true, opacity: 0.4 });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      // traveling particle along the line
      const particleMat = new THREE.MeshBasicMaterial({ color: 0x9fc3ff });
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), particleMat);
      scene.add(particle);
      particleLines.push({ node, line, particle, t: Math.random() });
    }

    // ambient particle field
    const count = window.innerWidth < 480 ? 0 : window.innerWidth < 900 ? 400 : 900;
    if (count > 0) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x8ea3d6, size: 0.024, transparent: true, opacity: 0.4 });
      scene.add(new THREE.Points(pGeo, pMat));
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    animate();
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    if (camera) { camera.aspect = w / h; camera.updateProjectionMatrix(); }
  }
  function onMouseMove(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  function onScroll() {
    const heroHeight = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
    scrollT = Math.min(window.scrollY / heroHeight, 1.4);
  }

  function animate() {
    raf = requestAnimationFrame(animate);
    mouseX += (targetX - mouseX) * 0.04;
    mouseY += (targetY - mouseY) * 0.04;

    core.rotation.y += 0.004;
    core.rotation.x += 0.0015;

    nodeGroup.children.forEach((node) => {
      node.userData.baseAngle += node.userData.speed * 0.01;
      const a = node.userData.baseAngle;
      node.position.x = core.position.x + Math.cos(a) * node.userData.radius;
      node.position.y = core.position.y + Math.sin(a) * node.userData.radius * 0.6;
    });

    particleLines.forEach((pl) => {
      pl.t += 0.006;
      if (pl.t > 1) pl.t = 0;
      pl.particle.position.lerpVectors(core.position, pl.node.position, pl.t);
      pl.line.geometry.setFromPoints([core.position, pl.node.position]);
    });

    camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
    camera.position.z = 11 - scrollT * 2;
    camera.lookAt(1.5, 0, -1);

    renderer.render(scene, camera);
  }

  const heroEl = document.querySelector('.hero');
  if ('IntersectionObserver' in window && heroEl) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!renderer) return;
        if (entry.isIntersecting && !raf) animate();
        if (!entry.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.05 });
    io.observe(heroEl);
  }

  init();
})();
