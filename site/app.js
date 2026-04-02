/* ============================================================
   TANISH'S UNIVERSE v3 — Physics Sim + Relativistic FX + Star Map
   
   Navigation: scroll = thrust, star map for direct travel,
   autopilot to fly to any planet. Free exploration.
   
   Physics: Newtonian mechanics with relativistic visual effects
   at high velocity. c ≈ 200 units/s so you can reach ~0.5c.
   
   Relativity: star aberration, Doppler color shift, time dilation.
   ============================================================ */

import * as THREE from 'three';

// ============================================================
// CONSTANTS
// ============================================================

const C = 200;              // speed of light in scene units/s
const DRAG = 0.985;         // velocity drag per frame (gentle coast)
const THRUST_ACCEL = 120;   // acceleration from scroll (units/s²)
const AUTOPILOT_SPEED = 80; // cruise speed during autopilot
const SHOW_RADIUS = 30;     // info card show distance
const PLANET_RENDER_DIST = 160;

// ============================================================
// PLANET DATA
// ============================================================

const PLANET_DATA = [
  {
    name: 'mauritius', label: 'ORIGIN PLANET', title: 'Mauritius',
    pos: [40, -8, -200], radius: 6, color: 0x00d4ff, ringColor: 0x33dfff, sub: '',
    desc: 'Born on a volcanic island in the Indian Ocean. Started tinkering with computers when most kids were tinkering with Legos. Both are valid engineering pursuits.',
    mapDesc: 'Where it all started',
  },
  {
    name: 'sikkim', label: 'CHAPTER II', title: 'Sikkim, India',
    pos: [-35, 12, -400], radius: 5, color: 0x22c55e, sub: '',
    desc: 'Moved to the foothills of the Himalayas. Learned that altitude and ambition both take your breath away.',
    mapDesc: 'Himalayan foothills',
  },
  {
    name: 'china', label: 'CHAPTER III', title: 'China',
    pos: [45, -5, -600], radius: 7, color: 0xef4444, ringColor: 0xfbbf24, sub: '',
    desc: 'Another country, another language to butcher. Continued building things and collecting passport stamps.',
    mapDesc: 'Passport stamp #3',
  },
  {
    name: 'uwc', label: 'CHAPTER IV', title: 'UWC Mahindra, India',
    pos: [-40, 10, -800], radius: 5.5, color: 0xfbbf24, sub: 'IB Diploma',
    desc: 'International Baccalaureate with HL Math, Physics, and Econ. Surrounded by people from 80+ countries. My worldview expanded faster than my code compiled.',
    mapDesc: 'Where the worldview expanded',
  },
  {
    name: 'vassar', label: 'CHAPTER V', title: 'Vassar College',
    pos: [35, -10, -1000], radius: 6.5, color: 0xa855f7, ringColor: 0xd8b4fe,
    sub: 'B.A. — CS + Economics | 3.97 GPA',
    desc: 'Double major in Computer Science and Economics, double minor in Physics and Applied Math. Yes, I like learning. No, I don\'t sleep.',
    mapDesc: 'CS + Economics double major',
  },
  {
    name: 'work', label: 'CURRENT ORBIT', title: 'Work',
    pos: [-45, 8, -1250], radius: 8, color: 0x3b82f6, ringColor: 0x60a5fa, sub: '',
    body: `<h3>Uber <span class="role-tag">Software Engineer</span></h3>
<p>Building an MCP server for semantic trace analysis on Jaeger. LLM-driven debugging over 10B+ daily spans. Also built a real-time span leak mitigation system that cut trace noise by 40%.</p>
<div class="tags"><span>Go</span><span>Distributed Systems</span><span>LLMs</span><span>Observability</span></div>
<h3>Google Research &amp; Brown <span class="role-tag">Research</span></h3>
<p>Trained Stable Diffusion v1.5 to synthesize novel 3D objects from 51,000+ geometry images. My GPU still hasn't forgiven me.</p>
<div class="tags"><span>Diffusion Models</span><span>3D ML</span><span>Python</span></div>`,
    mapDesc: 'Uber + Research',
  },
  {
    name: 'projects', label: 'SIDE QUESTS', title: 'Projects',
    pos: [38, -6, -1450], radius: 6.5, color: 0xf472b6, ringColor: 0xa855f7, sub: '',
    body: `<a href="https://github.com/Bankminer78/cortex" target="_blank" rel="noopener" class="project-link">
<h3>🧠 Cortex</h3>
<p>AI productivity monitor for macOS. Captures your screen, classifies activity via LLMs, and intervenes when you start doomscrolling.</p>
<span class="mono">SwiftUI · ScreenCaptureKit · OpenAI</span>
</a>
<a href="https://github.com/tanwasp/lenz-ai" target="_blank" rel="noopener" class="project-link">
<h3>🔮 Lenz AI</h3>
<p>Rewrites web content in real-time based on your personal knowledge profile. The internet, adapted to you.</p>
<span class="mono">Electron · React · FastAPI · OpenAI</span>
</a>
<a href="https://thelunchboxapp.com" target="_blank" rel="noopener" class="project-link">
<h3>🍱 LunchBox</h3>
<p>Social platform for restaurant tracking. Because spreadsheets of restaurant names deserve a better home.</p>
<span class="mono">React Native · Firebase · Node.js</span>
</a>`,
    mapDesc: 'Cortex, Lenz AI, LunchBox',
  },
  {
    name: 'about', label: 'EVIDENCE I TOUCH GRASS', title: 'Beyond the Code',
    pos: [-32, 14, -1650], radius: 5.5, color: 0xfbbf24, sub: '',
    body: `<div class="about-item"><strong>🎸 Guitar</strong> — Currently learning. My neighbors are very patient people.</div>
<div class="about-item"><strong>🏃 Running</strong> — Chasing a sub-20 5K. The only race condition I actually want to debug.</div>
<div class="about-item"><strong>🛶 Kayaking</strong> — Frequently capsize. Always blame the current.</div>
<div class="about-item"><strong>🍳 Cooking</strong> — Japanese curry specialist. Thai green curry enthusiast. Hotpot evangelist.</div>
<div class="about-item"><strong>💪 Fitness</strong> — Working toward 10 clean pull-ups and visible abs. The pull-ups are going better.</div>
<div class="about-item"><strong>🌍 Travel</strong> — 6 countries before 22. Collecting cultures faster than npm packages.</div>`,
    mapDesc: 'Hobbies & interests',
  },
  {
    name: 'contact', label: 'TRANSMISSION OPEN', title: "Let's Talk",
    pos: [0, 0, -1900], radius: 9, color: 0x00d4ff, ringColor: 0xa855f7, sub: '',
    body: `<p>I'm always up for conversations about distributed systems, ML, side projects, or which NYC restaurant deserves a spot in my LunchBox.</p>
<div class="contact-btns">
<a href="mailto:tanishwas@gmail.com" class="btn btn--primary">tanishwas@gmail.com</a>
<a href="https://github.com/tanwasp" target="_blank" rel="noopener" class="btn btn--ghost">GitHub</a>
<a href="https://www.linkedin.com/in/tanish-pradhan-wong-ah-sui" target="_blank" rel="noopener" class="btn btn--ghost">LinkedIn</a>
</div>
<a href="./magic-portfolio" class="boring-link mono">Looking for the boring version? →</a>`,
    mapDesc: 'Get in touch',
  },
];

// ============================================================
// RENDERER
// ============================================================

const canvas = document.getElementById('cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x030308, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030308, 0.003);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 0, 30);
camera.lookAt(0, 0, -100);

// Forward direction
const forward = new THREE.Vector3(0, 0, -1);

// ============================================================
// LIGHTING
// ============================================================

scene.add(new THREE.AmbientLight(0x111122, 0.8));
const sunLight = new THREE.PointLight(0xffffff, 2.5, 2000);
sunLight.position.set(50, 30, 20);
scene.add(sunLight);

// ============================================================
// STARFIELD — custom shader with aberration support
// ============================================================

const STAR_COUNT = 6000;
const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(STAR_COUNT * 3);
const starBasePositions = new Float32Array(STAR_COUNT * 3); // original positions for aberration
const starColors = new Float32Array(STAR_COUNT * 3);
const starSizes = new Float32Array(STAR_COUNT);

const starColorChoices = [
  [0.85, 0.88, 1.0],   // white-blue
  [1.0, 0.95, 0.8],    // warm white
  [0.7, 0.8, 1.0],     // blue
  [1.0, 0.85, 0.7],    // orange-ish
];

for (let i = 0; i < STAR_COUNT; i++) {
  const i3 = i * 3;
  // Distribute in a sphere centered on origin, shifted to cover path
  const r = 250 + Math.random() * 800;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi) - 900; // center on midpoint of journey

  starPositions[i3] = starBasePositions[i3] = x;
  starPositions[i3 + 1] = starBasePositions[i3 + 1] = y;
  starPositions[i3 + 2] = starBasePositions[i3 + 2] = z;

  const col = starColorChoices[Math.floor(Math.random() * starColorChoices.length)];
  starColors[i3] = col[0];
  starColors[i3 + 1] = col[1];
  starColors[i3 + 2] = col[2];

  starSizes[i] = 0.4 + Math.random() * 2.0;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starMat = new THREE.ShaderMaterial({
  uniforms: {
    uBeta: { value: 0 },           // v/c
    uForward: { value: forward.clone() },
  },
  vertexShader: `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    varying float vAlpha;
    uniform float uBeta;
    uniform vec3 uForward;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float d = length(mv.xyz);
      vAlpha = clamp(1.0 - d / 800.0, 0.05, 1.0);

      // Doppler color shift: blueshift ahead, redshift behind
      vec3 toStar = normalize(position - cameraPosition);
      float cosTheta = dot(toStar, uForward);
      float dopplerFactor = 1.0 + uBeta * cosTheta * 0.6;
      vColor = color * dopplerFactor;

      // Size boost for stars ahead at high speed (aberration bunching)
      float aberrationBoost = 1.0 + max(cosTheta, 0.0) * uBeta * 1.5;
      gl_PointSize = size * aberrationBoost * (250.0 / max(-mv.z, 1.0));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if (d > 0.5) discard;
      float glow = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(vColor, glow * vAlpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Dust particles
(function addDust() {
  const count = 2000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 100;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
    pos[i * 3 + 2] = -Math.random() * 2000;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x334466, size: 0.12, transparent: true, opacity: 0.3,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(geo, mat));
})();

// ============================================================
// PLANETS — 3D objects
// ============================================================

const planets = []; // { group, data, sphere, mat }

PLANET_DATA.forEach(p => {
  const group = new THREE.Group();
  group.position.set(...p.pos);
  group.visible = false;

  // Sphere with glow shader
  const geo = new THREE.SphereGeometry(p.radius, 48, 48);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal; varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uTime;
      varying vec3 vNormal; varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
        float rim = fresnel * 0.7;
        float core = max(dot(vNormal, vec3(0.5, 0.5, 0.3)), 0.0) * 0.4;
        float pulse = 0.9 + 0.1 * sin(uTime * 0.8);
        gl_FragColor = vec4(uColor * (core + rim + 0.15) * pulse, 0.85);
      }`,
    uniforms: { uColor: { value: new THREE.Color(p.color) }, uTime: { value: 0 } },
    transparent: true,
  });
  const sphere = new THREE.Mesh(geo, mat);
  group.add(sphere);

  // Atmosphere
  const glowGeo = new THREE.SphereGeometry(p.radius * 1.25, 32, 32);
  const glowMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec3 vNormal; varying vec3 vViewDir;
      void main() { vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position,1.0); vViewDir = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; varying vec3 vNormal; varying vec3 vViewDir;
      void main() { float i = pow(0.65 - dot(vNormal, vViewDir), 2.5);
      gl_FragColor = vec4(uColor, i * 0.5); }`,
    uniforms: { uColor: { value: new THREE.Color(p.color) } },
    transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  // Rings
  if (p.ringColor) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(p.radius * 1.8, 0.15, 2, 80),
      new THREE.MeshBasicMaterial({ color: p.ringColor, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI * 0.45;
    group.add(ring);
  }

  // Moons
  const moonCount = 1 + Math.floor(Math.random() * 2);
  for (let m = 0; m < moonCount; m++) {
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.25 + Math.random() * 0.3, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.6 })
    );
    moon.userData = {
      orbitR: p.radius * 2 + m * 1.5,
      orbitSpeed: 0.3 + Math.random() * 0.5,
      orbitOff: Math.random() * Math.PI * 2,
      orbitTilt: (Math.random() - 0.5) * 0.6,
    };
    group.add(moon);
  }

  scene.add(group);
  planets.push({ group, data: p, sphere, mat });
});

// Asteroid belt
(function addBelt() {
  const count = 300;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const beltZ = -1120;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 30;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
    pos[i * 3 + 2] = beltZ + (Math.random() - 0.5) * 40;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const belt = new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0x888888, size: 0.5, transparent: true, opacity: 0.4, depthWrite: false,
  }));
  scene.add(belt);
})();

// ============================================================
// PHYSICS STATE
// ============================================================

let velocity = 0;           // current scalar speed (units/s)
let shipTime = 0;           // proper time (dilated)
let thrust = 0;             // current thrust input
let autopilot = null;       // { target: Vector3, name: string } or null

// ============================================================
// SCROLL → THRUST
// ============================================================

let scrollAccum = 0;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  // Down scroll = forward thrust, up = brake
  scrollAccum += e.deltaY * 0.8;
}, { passive: false });

// ============================================================
// MOUSE LOOK (subtle)
// ============================================================

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ============================================================
// HUD ELEMENTS
// ============================================================

const hudVel = document.getElementById('hud-vel');
const hudVelBar = document.getElementById('hud-vel-bar');
const hudGamma = document.getElementById('hud-gamma');
const hudTau = document.getElementById('hud-tau');
const hudNearest = document.getElementById('hud-nearest');
const hudDist = document.getElementById('hud-dist');
const hudHeading = document.getElementById('hud-heading');
const hudHint = document.getElementById('hud-hint');

// ============================================================
// INTRO OVERLAY
// ============================================================

const introOverlay = document.getElementById('intro-overlay');
let introVisible = true;

// ============================================================
// PLANET INFO CARD
// ============================================================

const planetInfoEl = document.getElementById('planet-info');
const infoCard = document.getElementById('info-card');
const infoLabel = document.getElementById('info-label');
const infoTitle = document.getElementById('info-title');
const infoSub = document.getElementById('info-sub');
const infoBody = document.getElementById('info-body');

let currentInfoPlanet = null;

function showPlanetInfo(pData) {
  if (currentInfoPlanet === pData.name) return;
  currentInfoPlanet = pData.name;

  infoLabel.textContent = pData.label;
  infoTitle.textContent = pData.title;
  infoSub.textContent = pData.sub || '';
  infoSub.style.display = pData.sub ? 'block' : 'none';
  infoBody.innerHTML = pData.body || `<p>${pData.desc}</p>`;

  // Position card on opposite side of planet
  const px = pData.pos[0];
  if (px > 5) {
    infoCard.classList.add('info-card--left');
  } else if (px < -5) {
    infoCard.classList.remove('info-card--left');
  } else {
    infoCard.classList.remove('info-card--left');
  }

  planetInfoEl.classList.remove('hidden');
}

function hidePlanetInfo() {
  planetInfoEl.classList.add('hidden');
  currentInfoPlanet = null;
}

// ============================================================
// STAR MAP
// ============================================================

const starmapEl = document.getElementById('starmap');
const starmapGrid = document.getElementById('starmap-grid');
let starmapOpen = false;

function buildStarMap() {
  starmapGrid.innerHTML = '';
  PLANET_DATA.forEach(p => {
    const dist = camera.position.distanceTo(new THREE.Vector3(...p.pos));
    const ly = (dist / 50).toFixed(1); // arbitrary units → "light-years"

    const item = document.createElement('div');
    item.className = 'starmap-item';
    item.innerHTML = `
      <div>
        <span class="starmap-item__dot" style="color:#${new THREE.Color(p.color).getHexString()};background:#${new THREE.Color(p.color).getHexString()}"></span>
        <span class="starmap-item__name">${p.title}</span>
      </div>
      <p class="starmap-item__desc">${p.mapDesc}</p>
      <p class="starmap-item__dist">${ly} ly away</p>
    `;
    item.addEventListener('click', () => {
      startAutopilot(p);
      toggleStarMap(false);
    });
    starmapGrid.appendChild(item);
  });
}

function toggleStarMap(show) {
  starmapOpen = typeof show === 'boolean' ? show : !starmapOpen;
  if (starmapOpen) {
    buildStarMap();
    starmapEl.classList.remove('hidden');
  } else {
    starmapEl.classList.add('hidden');
  }
}

document.getElementById('map-btn').addEventListener('click', () => toggleStarMap());
document.getElementById('starmap-close').addEventListener('click', () => toggleStarMap(false));

document.addEventListener('keydown', e => {
  if (e.key === 'm' || e.key === 'M') toggleStarMap();
  if (e.key === 'Escape') {
    if (starmapOpen) toggleStarMap(false);
    if (document.getElementById('easter-egg').classList.contains('hidden') === false)
      document.getElementById('easter-egg').classList.add('hidden');
  }
});

// ============================================================
// AUTOPILOT
// ============================================================

const apIndicator = document.getElementById('autopilot-indicator');
const apDest = document.getElementById('ap-dest');

function startAutopilot(pData) {
  autopilot = {
    target: new THREE.Vector3(...pData.pos).add(
      // Stop a bit before the planet (not inside it)
      new THREE.Vector3(pData.pos[0] > 0 ? -pData.radius - 15 : pData.radius + 15, 2, pData.radius + 10)
    ),
    name: pData.title,
  };
  apDest.textContent = pData.title.toUpperCase();
  apIndicator.classList.remove('hidden');
}

function stopAutopilot() {
  autopilot = null;
  apIndicator.classList.add('hidden');
}

document.getElementById('ap-cancel').addEventListener('click', stopAutopilot);

// ============================================================
// EASTER EGGS
// ============================================================

(function initEasterEggs() {
  const konamiCode = [38,38,40,40,37,39,37,39,66,65];
  let ki = 0;
  const ee = document.getElementById('easter-egg');
  document.addEventListener('keydown', e => {
    if (e.keyCode === konamiCode[ki]) { ki++; if (ki === konamiCode.length) { ee.classList.remove('hidden'); ki = 0; } }
    else ki = 0;
  });
  ee.addEventListener('click', () => ee.classList.add('hidden'));

  console.log('%c🚀 Welcome to the console! ', 'font-size:16px;color:#00d4ff;background:#030308;padding:10px;border-radius:4px;font-weight:bold;');
  console.log('%ctanishwas@gmail.com — let\'s talk.', 'font-size:12px;color:#a855f7;background:#030308;padding:6px;');
})();

// ============================================================
// ANIMATION LOOP
// ============================================================

const clock = new THREE.Clock();
const camLook = new THREE.Vector3(0, 0, -100);

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.05); // cap dt
  const elapsed = clock.getElapsedTime();

  // --- THRUST from scroll ---
  thrust = scrollAccum * 2;
  scrollAccum *= 0.85; // decay scroll input

  // --- AUTOPILOT ---
  if (autopilot) {
    const dir = autopilot.target.clone().sub(camera.position);
    const dist = dir.length();
    if (dist < 8) {
      stopAutopilot();
      velocity *= 0.3; // decelerate on arrival
    } else {
      dir.normalize();
      forward.lerp(dir, 0.03).normalize();
      // Ramp speed based on distance
      const targetSpeed = Math.min(AUTOPILOT_SPEED, dist * 0.5);
      velocity += (targetSpeed - velocity) * 0.05;
    }
  } else {
    // --- MANUAL FLIGHT ---
    if (thrust > 0) {
      velocity += THRUST_ACCEL * dt * (thrust / 100);
    } else if (thrust < 0) {
      velocity += THRUST_ACCEL * dt * (thrust / 100) * 0.5; // brake weaker
    }
  }

  // Clamp velocity
  velocity = Math.max(0, Math.min(velocity, C * 0.95));
  velocity *= DRAG;
  if (velocity < 0.01) velocity = 0;

  // --- RELATIVISTIC CALCULATIONS ---
  const beta = velocity / C;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const properDt = dt / gamma; // time dilation
  shipTime += properDt;

  // --- MOVE CAMERA ---
  camera.position.addScaledVector(forward, velocity * dt);

  // Mouse look (subtle yaw/pitch)
  const lookOffset = new THREE.Vector3(mouseX * 2, -mouseY * 1.5, 0);
  camLook.copy(camera.position).add(forward.clone().multiplyScalar(50)).add(lookOffset);
  camera.lookAt(camLook);

  // Move sun with camera
  sunLight.position.set(camera.position.x + 40, camera.position.y + 25, camera.position.z + 30);

  // --- STAR ABERRATION SHADER ---
  starMat.uniforms.uBeta.value = beta;
  starMat.uniforms.uForward.value.copy(forward);

  // Slowly rotate starfield
  stars.rotation.y = elapsed * 0.002;

  // --- PLANET UPDATES ---
  let nearestPlanet = null;
  let nearestDist = Infinity;

  planets.forEach(({ group, data, sphere, mat }) => {
    const pPos = new THREE.Vector3(...data.pos);
    const dist = camera.position.distanceTo(pPos);

    group.visible = dist < PLANET_RENDER_DIST;
    if (!group.visible) return;

    mat.uniforms.uTime.value = elapsed;
    sphere.rotation.y = elapsed * 0.12;

    // Moons
    group.children.forEach(child => {
      if (!child.userData.orbitR) return;
      const a = elapsed * child.userData.orbitSpeed + child.userData.orbitOff;
      child.position.x = Math.cos(a) * child.userData.orbitR;
      child.position.z = Math.sin(a) * child.userData.orbitR;
      child.position.y = Math.sin(a * 0.7) * child.userData.orbitTilt * child.userData.orbitR;
    });

    if (dist < nearestDist) {
      nearestDist = dist;
      nearestPlanet = data;
    }
  });

  // --- INTRO OVERLAY ---
  if (introVisible && velocity > 2) {
    introOverlay.style.opacity = '0';
    introVisible = false;
    setTimeout(() => { introOverlay.style.pointerEvents = 'none'; }, 800);
  }
  if (!introVisible && velocity < 0.5 && camera.position.z > 10) {
    introOverlay.style.opacity = '1';
    introOverlay.style.pointerEvents = '';
    introVisible = true;
  }

  // --- PLANET INFO CARD ---
  if (nearestPlanet && nearestDist < SHOW_RADIUS && velocity < 15) {
    showPlanetInfo(nearestPlanet);
  } else {
    hidePlanetInfo();
  }

  // --- HUD ---
  hudVel.textContent = beta.toFixed(3) + 'c';
  hudVelBar.style.width = (beta * 100 / 0.95) + '%';
  hudGamma.textContent = gamma.toFixed(3);

  // Format ship time as mm:ss.f
  const totalSec = shipTime;
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  hudTau.textContent = String(mins).padStart(2, '0') + ':' + secs.toFixed(1).padStart(4, '0');

  if (nearestPlanet) {
    hudNearest.textContent = nearestPlanet.title;
    const ly = (nearestDist / 50).toFixed(1);
    hudDist.textContent = ly + ' ly';
  } else {
    hudNearest.textContent = '—';
    hudDist.textContent = '— ly';
  }

  // Heading (yaw angle)
  const yaw = Math.atan2(forward.x, -forward.z) * (180 / Math.PI);
  hudHeading.textContent = ((yaw + 360) % 360).toFixed(0).padStart(3, '0') + '°';

  // Hint text updates
  if (velocity > 5 && !autopilot) {
    hudHint.textContent = beta > 0.3
      ? '⚡ RELATIVISTIC — stars compress ahead (aberration)'
      : 'CRUISING — scroll up to brake';
  } else if (autopilot) {
    hudHint.textContent = `AUTOPILOT to ${autopilot.name}`;
  } else {
    hudHint.textContent = 'SCROLL to thrust · M for star map · click planets to autopilot';
  }

  // Color the velocity value based on beta
  if (beta > 0.5) {
    hudVel.style.color = '#f472b6'; // rose at high velocity
    hudVel.style.textShadow = '0 0 12px rgba(244,114,182,0.5)';
  } else if (beta > 0.2) {
    hudVel.style.color = '#a855f7'; // violet at medium
    hudVel.style.textShadow = '0 0 10px rgba(168,85,247,0.4)';
  } else {
    hudVel.style.color = '#00d4ff'; // cyan at low
    hudVel.style.textShadow = '0 0 10px rgba(0,212,255,0.4)';
  }

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

animate();
