/* ============================================================
   TANISH'S UNIVERSE — 3D Solar System Flythrough
   
   The camera follows a path through a solar system.
   Scroll drives progress along the path.
   Each planet has a position; when the camera is near, an
   HTML overlay fades in.
   ============================================================ */

import * as THREE from 'three';

// ============================================================
// CONFIG
// ============================================================

const TOTAL_SCROLL = 12000;   // matches #scroll-driver height
const PATH_LENGTH  = 1400;    // z-depth of the entire flight path — spread out!
const SHOW_RADIUS  = 40;      // distance at which overlay starts showing
const PEAK_RADIUS  = 20;      // distance at which overlay is fully visible

// Planet definitions: name, position in 3D space, visual properties
const PLANETS = [
  {
    name: 'intro',
    pos: new THREE.Vector3(0, 0, 0),
    radius: 0,
    color: null,
    t: 0.0,
  },
  {
    name: 'mauritius',
    pos: new THREE.Vector3(25, -5, -140),
    radius: 5,
    color: 0x00d4ff,
    ringColor: 0x33dfff,
    t: 0.1,
  },
  {
    name: 'sikkim',
    pos: new THREE.Vector3(-22, 8, -280),
    radius: 4,
    color: 0x22c55e,
    t: 0.19,
  },
  {
    name: 'china',
    pos: new THREE.Vector3(28, -4, -420),
    radius: 6,
    color: 0xef4444,
    ringColor: 0xfbbf24,
    t: 0.28,
  },
  {
    name: 'uwc',
    pos: new THREE.Vector3(-25, 6, -560),
    radius: 4.5,
    color: 0xfbbf24,
    t: 0.37,
  },
  {
    name: 'vassar',
    pos: new THREE.Vector3(22, -6, -700),
    radius: 5.5,
    color: 0xa855f7,
    ringColor: 0xd8b4fe,
    t: 0.48,
  },
  {
    name: 'work',
    pos: new THREE.Vector3(-28, 4, -860),
    radius: 7,
    color: 0x00d4ff,
    ringColor: 0x00d4ff,
    t: 0.6,
  },
  {
    name: 'projects',
    pos: new THREE.Vector3(24, -5, -1000),
    radius: 5.5,
    color: 0xf472b6,
    ringColor: 0xa855f7,
    t: 0.72,
  },
  {
    name: 'about',
    pos: new THREE.Vector3(-20, 7, -1140),
    radius: 4.8,
    color: 0xfbbf24,
    t: 0.83,
  },
  {
    name: 'contact',
    pos: new THREE.Vector3(0, 0, -1320),
    radius: 8,
    color: 0x00d4ff,
    ringColor: 0xa855f7,
    t: 0.95,
  },
];

// ============================================================
// RENDERER SETUP
// ============================================================

const canvas = document.getElementById('cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x030308, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030308, 0.004);

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 30);

// ============================================================
// LIGHTING
// ============================================================

const ambient = new THREE.AmbientLight(0x111122, 0.8);
scene.add(ambient);

const sunLight = new THREE.PointLight(0xffffff, 2.5, 1500);
sunLight.position.set(50, 30, 20);
scene.add(sunLight);

const fillLight = new THREE.PointLight(0x00d4ff, 0.6, 1000);
fillLight.position.set(-40, -20, -400);
scene.add(fillLight);

// ============================================================
// STARFIELD
// ============================================================

function createStarfield() {
  const count = 5000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 300 + Math.random() * 900;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi) - PATH_LENGTH * 0.5;
    sizes[i] = Math.random() * 1.8 + 0.3;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float d = length(mv.xyz);
        vAlpha = clamp(1.0 - d / 700.0, 0.05, 1.0);
        gl_PointSize = size * (250.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(0.85, 0.88, 1.0), glow * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geo, mat);
}

const stars = createStarfield();
scene.add(stars);

// ============================================================
// DISTANT GALAXY / NEBULA SPRITES
// ============================================================

// Subtle dust particles along the path for depth
function addDustParticles() {
  const count = 1500;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 80;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = -Math.random() * PATH_LENGTH * 1.1;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x4466aa,
    size: 0.15,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(geo, mat));
}

addDustParticles();

// ============================================================
// PLANETS — 3D objects
// ============================================================

const planetMeshes = [];

PLANETS.forEach(p => {
  if (!p.color || p.radius === 0) return;

  const group = new THREE.Group();
  group.position.copy(p.pos);

  // Main sphere — custom shader for glow effect
  const geo = new THREE.SphereGeometry(p.radius, 48, 48);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
        float rim = fresnel * 0.7;
        float core = max(dot(vNormal, vec3(0.5, 0.5, 0.3)), 0.0) * 0.4;
        float pulse = 0.9 + 0.1 * sin(uTime * 0.8);
        vec3 col = uColor * (core + rim + 0.15) * pulse;
        gl_FragColor = vec4(col, 0.85);
      }
    `,
    uniforms: {
      uColor: { value: new THREE.Color(p.color) },
      uTime: { value: 0 },
    },
    transparent: true,
    side: THREE.FrontSide,
  });

  const sphere = new THREE.Mesh(geo, mat);
  group.add(sphere);

  // Atmosphere glow
  const glowGeo = new THREE.SphereGeometry(p.radius * 1.25, 32, 32);
  const glowMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vViewDir), 2.5);
        gl_FragColor = vec4(uColor, intensity * 0.5);
      }
    `,
    uniforms: {
      uColor: { value: new THREE.Color(p.color) },
    },
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  group.add(glowMesh);

  // Rings (if defined)
  if (p.ringColor) {
    const ringGeo = new THREE.TorusGeometry(p.radius * 1.8, 0.15, 2, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: p.ringColor,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.45;
    ring.rotation.y = Math.random() * 0.5;
    group.add(ring);
  }

  // Small orbiting moons
  const moonCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < moonCount; i++) {
    const moonGeo = new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 12, 12);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.6,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.userData.orbitRadius = p.radius * 2 + i * 1.5;
    moon.userData.orbitSpeed = 0.3 + Math.random() * 0.5;
    moon.userData.orbitOffset = Math.random() * Math.PI * 2;
    moon.userData.orbitTilt = (Math.random() - 0.5) * 0.6;
    group.add(moon);
  }

  scene.add(group);
  group.visible = false; // hidden until camera is near
  planetMeshes.push({ group, planet: p, sphere, mat });
});

// ============================================================
// ASTEROID BELT (between journey and work sections)
// ============================================================

function createAsteroidBelt() {
  const count = 300;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const beltZ = -780; // between vassar and work
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 15 + Math.random() * 25;
    const i3 = i * 3;
    positions[i3]     = Math.cos(angle) * r;
    positions[i3 + 1] = (Math.random() - 0.5) * 5;
    positions[i3 + 2] = beltZ + (Math.random() - 0.5) * 30;
    sizes[i] = 0.3 + Math.random() * 0.8;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.6,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  });

  const belt = new THREE.Points(geo, mat);
  scene.add(belt);
  return belt;
}

const asteroidBelt = createAsteroidBelt();

// ============================================================
// CAMERA PATH — smooth curve through the solar system
// ============================================================

// Build a CatmullRom spline through key waypoints
// The camera will follow this path based on scroll progress
const pathPoints = [];

// Start: slightly in front of origin
pathPoints.push(new THREE.Vector3(0, 0, 30));

// For each planet, create an approach point (fly near it, not into it)
PLANETS.forEach(p => {
  if (p.name === 'intro') return;
  // Camera approaches from slightly to the left of the planet
  const offset = new THREE.Vector3(
    p.pos.x < 0 ? p.pos.x + p.radius + 12 : p.pos.x - p.radius - 12,
    p.pos.y + 2,
    p.pos.z + 5
  );
  pathPoints.push(offset);
});

// End: past the last planet
pathPoints.push(new THREE.Vector3(0, 0, -PATH_LENGTH - 20));

const cameraPath = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.3);

// ============================================================
// SCROLL → CAMERA POSITION
// ============================================================

let scrollProgress = 0;
let targetScrollProgress = 0;

function updateScroll() {
  const maxScroll = TOTAL_SCROLL - window.innerHeight;
  const rawProgress = window.scrollY / maxScroll;
  targetScrollProgress = Math.max(0, Math.min(1, rawProgress));
}

window.addEventListener('scroll', updateScroll, { passive: true });

// ============================================================
// OVERLAY VISIBILITY
// ============================================================

const overlays = {};
document.querySelectorAll('.overlay').forEach(el => {
  overlays[el.dataset.planet] = el;
});

// Set overlay card position: if planet is on the right (x > 0), 
// put the card on the left, and vice versa
PLANETS.forEach(p => {
  const el = overlays[p.name];
  if (!el || p.name === 'intro') return;
  // Planet on the right → card on the left (default), planet on left → card on right
  if (Math.abs(p.pos.x) < 5) {
    el.dataset.side = 'center';
  } else {
    el.dataset.side = p.pos.x > 0 ? 'left' : 'right';
  }
});

function updateOverlays(camPos) {
  let closestPlanet = null;
  let closestDist = Infinity;

  PLANETS.forEach(p => {
    const dist = camPos.distanceTo(p.pos);
    if (dist < closestDist) {
      closestDist = dist;
      closestPlanet = p;
    }
  });

  PLANETS.forEach(p => {
    const el = overlays[p.name];
    if (!el) return;

    const dist = camPos.distanceTo(p.pos);
    const showDist = p.name === 'intro' ? 35 : SHOW_RADIUS;
    const peakDist = p.name === 'intro' ? 15 : PEAK_RADIUS;

    if (dist < showDist && closestPlanet === p) {
      const alpha = 1 - Math.max(0, Math.min(1, (dist - peakDist) / (showDist - peakDist)));
      el.style.opacity = alpha;
      el.classList.toggle('visible', alpha > 0.1);
    } else {
      el.style.opacity = 0;
      el.classList.remove('visible');
    }
  });
}

// ============================================================
// NAV DOTS
// ============================================================

const navPips = document.querySelectorAll('.nav-pip');

navPips.forEach(pip => {
  pip.addEventListener('click', () => {
    const targetName = pip.dataset.planet;
    const planet = PLANETS.find(p => p.name === targetName);
    if (!planet) return;

    // Scroll to the right position
    const maxScroll = TOTAL_SCROLL - window.innerHeight;
    const targetScroll = planet.t * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  });
});

function updateNav() {
  // Find which planet we're closest to
  let activeName = 'intro';
  let minDist = Infinity;

  PLANETS.forEach(p => {
    const dist = Math.abs(scrollProgress - p.t);
    if (dist < minDist) {
      minDist = dist;
      activeName = p.name;
    }
  });

  navPips.forEach(pip => {
    pip.classList.toggle('active', pip.dataset.planet === activeName);
  });
}

// Progress bar
const progressBar = document.getElementById('progress-bar');

// ============================================================
// MOUSE PARALLAX
// ============================================================

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ============================================================
// EASTER EGGS
// ============================================================

function initEasterEggs() {
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  const overlay = document.createElement('div');
  overlay.id = 'easter-egg';
  overlay.innerHTML = `
    <div>
      <h2>🎮 Achievement Unlocked</h2>
      <p>You found the Konami Code easter egg.</p>
      <p style="color: #00d4ff; margin-top: 1rem;">
        "The answer to the ultimate question of life,<br/>
        the universe, and everything is 42."
      </p>
      <p class="close-hint">Press Escape or click anywhere to close</p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.addEventListener('keydown', e => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        overlay.classList.add('show');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
    if (e.key === 'Escape') overlay.classList.remove('show');
  });

  overlay.addEventListener('click', () => overlay.classList.remove('show'));

  console.log(
    '%c🚀 Hey, you found the console! ',
    'font-size: 16px; font-weight: bold; color: #00d4ff; background: #030308; padding: 10px; border-radius: 4px;'
  );
  console.log(
    '%cIf you\'re reading this, you\'re probably a developer. We should talk.\ntanishwas@gmail.com',
    'font-size: 12px; color: #a855f7; background: #030308; padding: 6px;'
  );
}

initEasterEggs();

// ============================================================
// ANIMATION LOOP
// ============================================================

const clock = new THREE.Clock();
const lookAtTarget = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  const dt = clock.getDelta();

  // Smooth scroll interpolation
  scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

  // Get camera position from path
  const t = Math.max(0.0001, Math.min(0.9999, scrollProgress));
  const point = cameraPath.getPointAt(t);
  const lookAhead = cameraPath.getPointAt(Math.min(t + 0.02, 0.9999));

  // Apply mouse parallax
  const parallaxX = mouseX * 1.5;
  const parallaxY = mouseY * 1.0;

  camera.position.set(
    point.x + parallaxX,
    point.y + parallaxY,
    point.z
  );

  // Look ahead along the path
  lookAtTarget.lerp(lookAhead, 0.08);
  camera.lookAt(lookAtTarget);

  // Slowly rotate stars
  stars.rotation.y = elapsed * 0.003;

  // Rotate asteroid belt
  asteroidBelt.rotation.y = elapsed * 0.02;

  // Update planet shaders and moons
  planetMeshes.forEach(({ group, planet, sphere, mat }) => {
    // Show/hide based on camera distance
    const dist = camera.position.distanceTo(planet.pos);
    group.visible = dist < 120;

    if (!group.visible) return;

    mat.uniforms.uTime.value = elapsed;

    // Slow planet rotation
    sphere.rotation.y = elapsed * 0.15;

    // Animate moons
    group.children.forEach(child => {
      if (child.userData.orbitRadius) {
        const angle = elapsed * child.userData.orbitSpeed + child.userData.orbitOffset;
        child.position.x = Math.cos(angle) * child.userData.orbitRadius;
        child.position.z = Math.sin(angle) * child.userData.orbitRadius;
        child.position.y = Math.sin(angle * 0.7) * child.userData.orbitTilt * child.userData.orbitRadius;
      }
    });
  });

  // Move sun light with camera (so planets are always lit)
  sunLight.position.set(
    camera.position.x + 40,
    camera.position.y + 25,
    camera.position.z + 30
  );

  // Update overlays
  updateOverlays(camera.position);

  // Update nav
  updateNav();

  // Progress bar
  progressBar.style.width = (scrollProgress * 100) + '%';

  renderer.render(scene, camera);
}

// ============================================================
// RESIZE
// ============================================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================
// INIT
// ============================================================

updateScroll();
animate();
