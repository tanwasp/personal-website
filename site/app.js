/* ============================================================
   TANISH'S UNIVERSE — 3D Scene + Interactions
   ============================================================ */

import * as THREE from 'three';

// ============================================================
// 1. THREE.JS SCENE SETUP
// ============================================================

const canvas = document.getElementById('cosmos');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050510, 1);

// ============================================================
// 2. STARFIELD
// ============================================================

function createStarfield() {
  const count = 3000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const colorPalette = [
    new THREE.Color(0x00d4ff),  // cyan
    new THREE.Color(0xa855f7),  // violet
    new THREE.Color(0xf472b6),  // rose
    new THREE.Color(0xffffff),  // white
    new THREE.Color(0xffd700),  // gold
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 200 + Math.random() * 800;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    sizes[i] = Math.random() * 2 + 0.5;
    
    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3]     = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = length(mvPosition.xyz);
        vOpacity = clamp(1.0 - dist / 800.0, 0.1, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Points(geo, mat);
}

const stars = createStarfield();
scene.add(stars);

// ============================================================
// 3. NEBULA CLOUDS
// ============================================================

function createNebula() {
  const group = new THREE.Group();
  const nebulaColors = [
    { color: 0x00d4ff, opacity: 0.03 },
    { color: 0xa855f7, opacity: 0.025 },
    { color: 0xf472b6, opacity: 0.02 },
  ];

  nebulaColors.forEach((config, i) => {
    const geo = new THREE.PlaneGeometry(300, 300);
    const mat = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: config.opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 150,
      -300 - i * 100
    );
    mesh.rotation.z = Math.random() * Math.PI;
    group.add(mesh);
  });

  return group;
}

const nebula = createNebula();
scene.add(nebula);

// ============================================================
// 4. FLOATING GEOMETRIC OBJECTS (Planets/Islands)
// ============================================================

const floatingObjects = [];

function createFloatingObject(geometry, color, position, scale = 1) {
  const mat = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.copy(position);
  mesh.scale.setScalar(scale);
  mesh.userData.initialY = position.y;
  mesh.userData.floatSpeed = 0.3 + Math.random() * 0.5;
  mesh.userData.floatAmp = 0.2 + Math.random() * 0.3;
  mesh.userData.rotSpeed = 0.1 + Math.random() * 0.3;
  scene.add(mesh);
  floatingObjects.push(mesh);
  return mesh;
}

// Create objects scattered through the scene
// Objects placed far at the edges — large x/y offsets
// They serve as peripheral eye-candy, never near center
const objects = [
  { geo: new THREE.IcosahedronGeometry(2.5, 1), color: 0x00d4ff, pos: new THREE.Vector3(-35, 18, -50) },
  { geo: new THREE.OctahedronGeometry(2, 0), color: 0xa855f7, pos: new THREE.Vector3(38, -15, -70) },
  { geo: new THREE.TorusGeometry(1.5, 0.4, 12, 32), color: 0xf472b6, pos: new THREE.Vector3(-30, -20, -90) },
  { geo: new THREE.TetrahedronGeometry(2.2, 0), color: 0x00d4ff, pos: new THREE.Vector3(35, 22, -110) },
  { geo: new THREE.DodecahedronGeometry(1.8, 0), color: 0xa855f7, pos: new THREE.Vector3(-40, 12, -130) },
  { geo: new THREE.IcosahedronGeometry(3, 0), color: 0xffd700, pos: new THREE.Vector3(30, -18, -150) },
  { geo: new THREE.TorusKnotGeometry(1.2, 0.4, 64, 16), color: 0x00d4ff, pos: new THREE.Vector3(-25, 25, -170) },
  { geo: new THREE.OctahedronGeometry(2.2, 0), color: 0xf472b6, pos: new THREE.Vector3(32, -10, -190) },
  { geo: new THREE.IcosahedronGeometry(1.5, 1), color: 0xa855f7, pos: new THREE.Vector3(-38, -15, -210) },
  { geo: new THREE.DodecahedronGeometry(2.5, 0), color: 0x00d4ff, pos: new THREE.Vector3(28, 20, -230) },
];

objects.forEach(o => createFloatingObject(o.geo, o.color, o.pos));

// ============================================================
// 5. CONNECTING PATH (particle trail)
// ============================================================

function createPath() {
  const count = 500;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const i3 = i * 3;
    positions[i3]     = Math.sin(t * Math.PI * 4) * 8 + (Math.random() - 0.5) * 4;
    positions[i3 + 1] = Math.cos(t * Math.PI * 3) * 6 + (Math.random() - 0.5) * 3;
    positions[i3 + 2] = -t * 140;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  return new THREE.Points(geo, mat);
}

const path = createPath();
scene.add(path);

// ============================================================
// 6. SCROLL-DRIVEN CAMERA MOVEMENT
// ============================================================

let scrollProgress = 0;
const maxZ = -130;

function updateCameraFromScroll() {
  const scrollContainer = document.getElementById('scroll-container');
  const scrollHeight = scrollContainer.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY || window.pageYOffset;
  scrollProgress = Math.min(scrollTop / scrollHeight, 1);

  // Camera moves forward through the scene
  camera.position.z = 5 + scrollProgress * maxZ;
  camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.5;
  camera.position.y = Math.cos(scrollProgress * Math.PI * 1.5) * 0.8;
  
  // Slight rotation based on scroll
  camera.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.02;
}

window.addEventListener('scroll', updateCameraFromScroll, { passive: true });

// ============================================================
// 7. SECTION REVEAL ON SCROLL
// ============================================================

function initScrollReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  // Section content reveals
  document.querySelectorAll('.section__content').forEach(el => observer.observe(el));

  // Journey stops
  const stopObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.journey-stop').forEach(el => stopObserver.observe(el));
}

// ============================================================
// 8. FLOATING NAV
// ============================================================

function initFloatingNav() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('.section');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.dataset.target;
      const section = document.querySelector(`[data-section="${target}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update active dot on scroll
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section;
          dots.forEach(d => d.classList.remove('active'));
          const activeDot = document.querySelector(`.nav-dot[data-target="${sectionName}"]`);
          if (activeDot) activeDot.classList.add('active');
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => navObserver.observe(section));
}

// ============================================================
// 9. MOUSE PARALLAX
// ============================================================

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ============================================================
// 10. EASTER EGGS
// ============================================================

function initEasterEggs() {
  // Konami Code
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'easter-egg-overlay';
  overlay.innerHTML = `
    <div class="easter-egg-content">
      <h2>🎮 Achievement Unlocked</h2>
      <p>You found the Konami Code easter egg.</p>
      <p style="margin-top: 1rem; color: var(--color-accent);">
        "The answer to the ultimate question of life,<br/>
        the universe, and everything is 42."
      </p>
      <p style="margin-top: 2rem; font-size: 0.75rem; color: var(--color-text-faint);">
        Press Escape or click anywhere to close
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        overlay.classList.add('show');
        konamiIndex = 0;

        // Trigger celebration particles
        celebrateParticles();
      }
    } else {
      konamiIndex = 0;
    }

    // Escape to close
    if (e.key === 'Escape') {
      overlay.classList.remove('show');
    }
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
  });

  // Secret console message
  console.log(
    '%c🚀 Hey, you found the console! ',
    'font-size: 16px; font-weight: bold; color: #00d4ff; background: #050510; padding: 10px; border-radius: 4px;'
  );
  console.log(
    '%cIf you\'re reading this, you\'re probably a developer. We should talk.\ntanishwas@gmail.com',
    'font-size: 12px; color: #a855f7; background: #050510; padding: 6px; border-radius: 4px;'
  );
}

function celebrateParticles() {
  // Add a burst of particles to the scene
  const count = 200;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = [];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = camera.position.x;
    positions[i3 + 1] = camera.position.y;
    positions[i3 + 2] = camera.position.z - 5;
    velocities.push(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3
    );
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xffd700,
    size: 0.15,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  let frame = 0;
  function animateBurst() {
    frame++;
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3]     += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
    }
    particles.geometry.attributes.position.needsUpdate = true;
    mat.opacity = Math.max(0, 1 - frame / 100);

    if (frame < 100) {
      requestAnimationFrame(animateBurst);
    } else {
      scene.remove(particles);
      geo.dispose();
      mat.dispose();
    }
  }
  animateBurst();
}

// ============================================================
// 11. ANIMATION LOOP
// ============================================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Rotate starfield slowly
  stars.rotation.y = elapsed * 0.01;
  stars.rotation.x = elapsed * 0.005;

  // Mouse parallax on stars
  stars.rotation.y += mouseX * 0.0003;
  stars.rotation.x += mouseY * 0.0003;

  // Nebula drift
  nebula.rotation.z = elapsed * 0.002;

  // Animate floating objects
  floatingObjects.forEach(obj => {
    obj.position.y = obj.userData.initialY + 
      Math.sin(elapsed * obj.userData.floatSpeed) * obj.userData.floatAmp;
    obj.rotation.x += obj.userData.rotSpeed * 0.005;
    obj.rotation.y += obj.userData.rotSpeed * 0.008;
  });

  // Path shimmer
  path.material.opacity = 0.25 + Math.sin(elapsed * 2) * 0.15;

  renderer.render(scene, camera);
}

// ============================================================
// 12. RESIZE
// ============================================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================
// 13. INIT
// ============================================================

initScrollReveals();
initFloatingNav();
initEasterEggs();
updateCameraFromScroll();
animate();
