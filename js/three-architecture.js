/* ==========================================================
   System Architecture section — a bigger, dedicated 3D scene:
   a central AI-agent sphere with every platform node orbiting
   it in a ring, connected by lines with particles streaming
   both directions (request out, response back). Lazy-started
   via IntersectionObserver like the other scenes in this site.
   ========================================================== */
(function () {
  'use strict';
  const canvas = document.getElementById('architectureCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const LABELS = ['WhatsApp', 'Facebook', 'Telegram', 'YouTube', 'Website', 'Email', 'CRM', 'Sheets'];
  let renderer, scene, camera, core, group, streams = [];
  let started = false;

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create the scene/camera BEFORE resize(). The old order called
    // resize() while camera was still undefined, which stopped the
    // architecture animation and left the entire panel blank.
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(48, 1, 0.1, 50);
    camera.position.set(0, 1.6, 8.5);
    camera.lookAt(0, 0, 0);
    resize();

    // central agent
    const coreGeo = new THREE.IcosahedronGeometry(1, 2);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x4e7cff, wireframe: true, transparent: true, opacity: 0.65 });
    core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);
    const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color: 0xffb454, wireframe: true, transparent: true, opacity: 0.4 }));
    core.add(innerCore);

    group = new THREE.Group();
    scene.add(group);

    const nodeCount = window.innerWidth < 480 ? 6 : LABELS.length;
    const nodeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3.4;
      const pos = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.9, Math.sin(angle) * radius);
      const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0xffb454 });
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.copy(pos);
      group.add(node);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x2a355c, transparent: true, opacity: 0.5 });
      group.add(new THREE.Line(lineGeo, lineMat));

      const outParticle = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0x9fc3ff }));
      const inParticle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd39a }));
      group.add(outParticle, inParticle);
      streams.push({ target: pos, outParticle, inParticle, tOut: Math.random(), tIn: Math.random() });
    }

    window.addEventListener('resize', resize);
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function animate() {
    requestAnimationFrame(animate);
    core.rotation.y += 0.003;
    core.rotation.x += 0.0012;
    group.rotation.y += 0.0016;

    streams.forEach((s) => {
      s.tOut += 0.008; if (s.tOut > 1) s.tOut = 0;
      s.tIn += 0.008; if (s.tIn > 1) s.tIn = 0;
      s.outParticle.position.lerpVectors(new THREE.Vector3(0, 0, 0), s.target, s.tOut);
      s.inParticle.position.lerpVectors(s.target, new THREE.Vector3(0, 0, 0), s.tIn);
    });

    renderer.render(scene, camera);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) { started = true; init(); animate(); }
      });
    }, { threshold: 0.15 });
    const target = document.getElementById('architecture');
    if (target) io.observe(target);
  }
})();
