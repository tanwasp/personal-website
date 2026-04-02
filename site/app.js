/* ============================================================
   TANISH'S UNIVERSE v4 — Multi-System Galaxy
   
   Architecture: 6 star systems arranged in 3D space.
   Each system is a cluster of planets. Galaxy map shows 3D
   overview of all systems. Warp jump between systems.
   
   Controls: scroll=thrust, arrow keys=steer, M=map,
   WASD also works. Shift=brake.
   
   Journey system has a guided auto-tour option.
   ============================================================ */

import * as THREE from 'three';

// ============================================================
// CONSTANTS
// ============================================================

const C = 200;
const DRAG = 0.988;
const THRUST_ACCEL = 100;
const AUTOPILOT_SPEED = 90;
const SHOW_RADIUS = 35;
const PLANET_RENDER_DIST = 180;
const WARP_SPEED = 600;
const SYSTEM_RADIUS = 280;  // how far planets spread within a system

// ============================================================
// SYSTEM & PLANET DATA
// ============================================================

const SYSTEMS = [
  {
    id: 'journey',
    name: 'The Journey',
    desc: 'A guided tour through the origin story',
    color: 0x00d4ff,
    pos: [0, 0, 0],        // center of galaxy
    hasTour: true,
    planets: [
      {
        name: 'mauritius', label: 'ORIGIN PLANET', title: 'Mauritius',
        pos: [35, -5, -80], radius: 6, color: 0x00d4ff, ringColor: 0x33dfff,
        desc: 'Born on a volcanic island in the Indian Ocean. Started tinkering with computers when most kids were tinkering with Legos. Both are valid engineering pursuits.',
        mapDesc: 'Where it all started', tourOrder: 0,
      },
      {
        name: 'sikkim', label: 'CHAPTER II', title: 'Sikkim, India',
        pos: [-30, 12, -220], radius: 5, color: 0x22c55e,
        desc: 'Moved to the foothills of the Himalayas. Learned that altitude and ambition both take your breath away.',
        mapDesc: 'Himalayan foothills', tourOrder: 1,
      },
      {
        name: 'china', label: 'CHAPTER III', title: 'China',
        pos: [40, -8, -370], radius: 7, color: 0xef4444, ringColor: 0xfbbf24,
        desc: 'Another country, another language to butcher. Continued building things and collecting passport stamps.',
        mapDesc: 'Passport stamp #3', tourOrder: 2,
      },
      {
        name: 'uwc', label: 'CHAPTER IV', title: 'UWC Mahindra',
        pos: [-35, 8, -520], radius: 5.5, color: 0xfbbf24,
        sub: 'IB Diploma',
        desc: 'International Baccalaureate with HL Math, Physics, and Econ. Surrounded by people from 80+ countries. My worldview expanded faster than my code compiled.',
        mapDesc: 'Where the worldview expanded', tourOrder: 3,
      },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    desc: 'The academic chapters',
    color: 0xa855f7,
    pos: [900, 150, -400],
    planets: [
      {
        name: 'vassar', label: 'ALMA MATER', title: 'Vassar College',
        pos: [25, -8, -80], radius: 7, color: 0xa855f7, ringColor: 0xd8b4fe,
        sub: 'B.A. — CS + Economics | 3.97 GPA',
        desc: 'Double major in Computer Science and Economics, double minor in Physics and Applied Math. Yes, I like learning. No, I don\'t sleep.',
        mapDesc: 'CS + Economics double major',
        body: `<p>Double major in Computer Science and Economics, double minor in Physics and Applied Math. Yes, I like learning. No, I don't sleep.</p>
<h3>Highlights</h3>
<div class="about-item"><strong>📊 3.97 GPA</strong> — Phi Beta Kappa, CS + Econ departmental honors</div>
<div class="about-item"><strong>🔬 Research</strong> — ML research with Prof. Rui Li on 3D shape generation</div>
<div class="about-item"><strong>🏆 Dean's List</strong> — Every semester, including the ones I probably shouldn't have survived</div>`,
      },
      {
        name: 'uwc-edu', label: 'IB DIPLOMA', title: 'UWC Mahindra, India',
        pos: [-30, 10, -230], radius: 5, color: 0xfbbf24,
        sub: 'International Baccalaureate',
        desc: 'HL Math, Physics, and Econ at a school with 80+ nationalities. Extended Essay on market microstructure. Wrote more code than essays.',
        mapDesc: 'IB · 80+ nationalities',
      },
    ],
  },
  {
    id: 'work',
    name: 'Work Experience',
    desc: 'Where code meets production',
    color: 0x3b82f6,
    pos: [-800, -100, -600],
    planets: [
      {
        name: 'uber', label: 'CURRENT ORBIT', title: 'Uber',
        pos: [30, -5, -90], radius: 8, color: 0x3b82f6, ringColor: 0x60a5fa,
        sub: 'Software Engineer',
        mapDesc: 'Distributed systems + LLMs',
        body: `<p>Building an MCP server for semantic trace analysis on Jaeger. LLM-driven debugging over 10B+ daily spans.</p>
<p>Also built a real-time span leak mitigation system that cut trace noise by 40%.</p>
<div class="tags"><span>Go</span><span>Distributed Systems</span><span>LLMs</span><span>Observability</span></div>`,
      },
      {
        name: 'google', label: 'RESEARCH', title: 'Google Research & Brown',
        pos: [-35, 10, -250], radius: 6, color: 0x22c55e, ringColor: 0x86efac,
        sub: 'ML Research',
        mapDesc: '3D diffusion models',
        body: `<p>Trained Stable Diffusion v1.5 to synthesize novel 3D objects from 51,000+ geometry images. My GPU still hasn't forgiven me.</p>
<div class="tags"><span>Diffusion Models</span><span>3D ML</span><span>Python</span><span>PyTorch</span></div>`,
      },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    desc: 'Side quests and passion builds',
    color: 0xf472b6,
    pos: [600, -200, -1000],
    planets: [
      {
        name: 'cortex', label: 'AI PRODUCTIVITY', title: 'Cortex',
        pos: [25, -5, -80], radius: 5.5, color: 0xf472b6, ringColor: 0xa855f7,
        mapDesc: 'macOS AI productivity monitor',
        body: `<p>AI productivity monitor for macOS. Captures your screen, classifies activity via LLMs, and intervenes when you start doomscrolling.</p>
<div class="tags"><span>SwiftUI</span><span>ScreenCaptureKit</span><span>OpenAI</span></div>
<a href="https://github.com/Bankminer78/cortex" target="_blank" rel="noopener" class="project-ext-link mono">View on GitHub →</a>`,
      },
      {
        name: 'lenz', label: 'WEB REWRITER', title: 'Lenz AI',
        pos: [-30, 8, -200], radius: 5, color: 0x8b5cf6,
        mapDesc: 'Web content rewriter',
        body: `<p>Rewrites web content in real-time based on your personal knowledge profile. The internet, adapted to you.</p>
<div class="tags"><span>Electron</span><span>React</span><span>FastAPI</span><span>OpenAI</span></div>
<a href="https://github.com/tanwasp/lenz-ai" target="_blank" rel="noopener" class="project-ext-link mono">View on GitHub →</a>`,
      },
      {
        name: 'lunchbox', label: 'FOOD SOCIAL', title: 'LunchBox',
        pos: [20, -10, -320], radius: 5.5, color: 0xfbbf24, ringColor: 0xfcd34d,
        mapDesc: 'Restaurant tracker',
        body: `<p>Social platform for restaurant tracking. Because spreadsheets of restaurant names deserve a better home.</p>
<div class="tags"><span>React Native</span><span>Firebase</span><span>Node.js</span></div>
<a href="https://thelunchboxapp.com" target="_blank" rel="noopener" class="project-ext-link mono">Visit →</a>`,
      },
    ],
  },
  {
    id: 'life',
    name: 'Beyond the Code',
    desc: 'Evidence I occasionally touch grass',
    color: 0xfbbf24,
    pos: [-500, 250, -300],
    planets: [
      {
        name: 'hobbies', label: 'HUMAN ACTIVITIES', title: 'The Analog Life',
        pos: [0, 0, -120], radius: 7, color: 0xfbbf24, ringColor: 0xfcd34d,
        mapDesc: 'Hobbies & interests',
        body: `<div class="about-item"><strong>🎸 Guitar</strong> — Currently learning. My neighbors are very patient people.</div>
<div class="about-item"><strong>🏃 Running</strong> — Chasing a sub-20 5K. The only race condition I actually want to debug.</div>
<div class="about-item"><strong>🛶 Kayaking</strong> — Frequently capsize. Always blame the current.</div>
<div class="about-item"><strong>🍳 Cooking</strong> — Japanese curry specialist. Thai green curry enthusiast. Hotpot evangelist.</div>
<div class="about-item"><strong>💪 Fitness</strong> — Working toward 10 clean pull-ups and visible abs. The pull-ups are going better.</div>
<div class="about-item"><strong>🌍 Travel</strong> — 6 countries before 22. Collecting cultures faster than npm packages.</div>`,
      },
    ],
  },
  {
    id: 'contact',
    name: "Let's Talk",
    desc: 'Open a transmission',
    color: 0x00d4ff,
    pos: [200, -300, -800],
    planets: [
      {
        name: 'contact', label: 'TRANSMISSION OPEN', title: "Let's Talk",
        pos: [0, 0, -100], radius: 9, color: 0x00d4ff, ringColor: 0xa855f7,
        mapDesc: 'Get in touch',
        body: `<p>I'm always up for conversations about distributed systems, ML, side projects, or which NYC restaurant deserves a spot in my LunchBox.</p>
<div class="contact-btns">
<a href="mailto:tanishwas@gmail.com" class="btn btn--primary">tanishwas@gmail.com</a>
<a href="https://github.com/tanwasp" target="_blank" rel="noopener" class="btn btn--ghost">GitHub</a>
<a href="https://www.linkedin.com/in/tanish-pradhan-wong-ah-sui" target="_blank" rel="noopener" class="btn btn--ghost">LinkedIn</a>
</div>
<a href="./magic-portfolio" class="boring-link mono">Looking for the boring version? →</a>`,
      },
    ],
  },
];

// Flatten all planets with absolute world positions
const allPlanets = [];
SYSTEMS.forEach(sys => {
  sys.planets.forEach(p => {
    const wp = [
      p.pos[0] + sys.pos[0],
      p.pos[1] + sys.pos[1],
      p.pos[2] + sys.pos[2],
    ];
    allPlanets.push({ ...p, worldPos: wp, systemId: sys.id, systemName: sys.name });
  });
});

// ============================================================
// RENDERER
// ============================================================

const canvas = document.getElementById('cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x030308, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030308, 0.0015);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 0, 60);

// Forward direction (yaw/pitch steerable)
const forward = new THREE.Vector3(0, 0, -1);
let yaw = 0;    // radians
let pitch = 0;  // radians

function updateForwardFromAngles() {
  forward.set(
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    -Math.cos(yaw) * Math.cos(pitch)
  ).normalize();
}

// ============================================================
// LIGHTING
// ============================================================

scene.add(new THREE.AmbientLight(0x111122, 0.8));
const sunLight = new THREE.PointLight(0xffffff, 2.5, 3000);
sunLight.position.set(50, 30, 20);
scene.add(sunLight);

// ============================================================
// STARFIELD — custom shader with aberration
// ============================================================

const STAR_COUNT = 8000;
const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(STAR_COUNT * 3);
const starColors = new Float32Array(STAR_COUNT * 3);
const starSizes = new Float32Array(STAR_COUNT);

const starColorChoices = [
  [0.85, 0.88, 1.0], [1.0, 0.95, 0.8], [0.7, 0.8, 1.0], [1.0, 0.85, 0.7],
];

for (let i = 0; i < STAR_COUNT; i++) {
  const i3 = i * 3;
  const r = 400 + Math.random() * 1500;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  // Center stars around the rough midpoint of all systems
  starPositions[i3]     = r * Math.sin(phi) * Math.cos(theta);
  starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  starPositions[i3 + 2] = r * Math.cos(phi) - 400;

  const col = starColorChoices[Math.floor(Math.random() * starColorChoices.length)];
  starColors[i3] = col[0]; starColors[i3 + 1] = col[1]; starColors[i3 + 2] = col[2];
  starSizes[i] = 0.4 + Math.random() * 2.0;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starMat = new THREE.ShaderMaterial({
  uniforms: {
    uBeta: { value: 0 },
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
      vAlpha = clamp(1.0 - d / 1200.0, 0.05, 1.0);
      vec3 toStar = normalize(position - cameraPosition);
      float cosTheta = dot(toStar, uForward);
      float dopplerFactor = 1.0 + uBeta * cosTheta * 0.6;
      vColor = color * dopplerFactor;
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
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
});

const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Dust
(function addDust() {
  const count = 3000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 2000;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 1000;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 2000;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0x334466, size: 0.12, transparent: true, opacity: 0.25,
    depthWrite: false, blending: THREE.AdditiveBlending,
  })));
})();

// ============================================================
// SYSTEM BEACONS — visible glowing clusters for each system
// ============================================================

const systemBeacons = [];

SYSTEMS.forEach(sys => {
  const group = new THREE.Group();
  group.position.set(...sys.pos);

  // Central glow sphere
  const glowGeo = new THREE.SphereGeometry(25, 24, 24);
  const glowMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec3 vNormal; varying vec3 vViewDir;
      void main() { vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position,1.0); vViewDir = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; varying vec3 vNormal; varying vec3 vViewDir;
      void main() { float i = pow(0.7 - dot(vNormal, vViewDir), 2.0);
      gl_FragColor = vec4(uColor, i * 0.25); }`,
    uniforms: { uColor: { value: new THREE.Color(sys.color) } },
    transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  // Cluster particles around system center
  const pCount = 60;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 10 + Math.random() * 40;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pPos[i*3]   = r * Math.sin(p) * Math.cos(t);
    pPos[i*3+1] = r * Math.sin(p) * Math.sin(t);
    pPos[i*3+2] = r * Math.cos(p);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: sys.color, size: 1.5, transparent: true, opacity: 0.6,
    depthWrite: false, blending: THREE.AdditiveBlending,
  })));

  scene.add(group);
  systemBeacons.push({ group, sys, glowMat });
});

// ============================================================
// PLANETS — 3D objects (all systems)
// ============================================================

const planetObjects = []; // { group, data, sphere, mat, worldPos }

allPlanets.forEach(p => {
  const group = new THREE.Group();
  group.position.set(...p.worldPos);
  group.visible = false;

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
  const aGeo = new THREE.SphereGeometry(p.radius * 1.25, 32, 32);
  const aMat = new THREE.ShaderMaterial({
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
  group.add(new THREE.Mesh(aGeo, aMat));

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
  const mc = 1 + Math.floor(Math.random() * 2);
  for (let m = 0; m < mc; m++) {
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
  planetObjects.push({ group, data: p, sphere, mat, worldPos: new THREE.Vector3(...p.worldPos) });
});

// ============================================================
// PHYSICS STATE
// ============================================================

let velocity = 0;
let shipTime = 0;
let thrust = 0;
let autopilot = null;    // { target: Vector3, name: string, onArrive?: fn }
let warpTarget = null;   // { target: Vector3, name: string }
let isWarping = false;
let warpProgress = 0;
let warpOrigin = null;

// Track current system
let currentSystem = SYSTEMS[0];

function findCurrentSystem() {
  let nearest = SYSTEMS[0];
  let nd = Infinity;
  SYSTEMS.forEach(sys => {
    const d = camera.position.distanceTo(new THREE.Vector3(...sys.pos));
    if (d < nd) { nd = d; nearest = sys; }
  });
  return nearest;
}

// ============================================================
// INPUT: Scroll → Thrust
// ============================================================

let scrollAccum = 0;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollAccum += e.deltaY * 0.8;
}, { passive: false });

// ============================================================
// INPUT: Arrow Keys / WASD → Steering
// ============================================================

const keysDown = new Set();

document.addEventListener('keydown', e => {
  keysDown.add(e.key.toLowerCase());

  if (e.key === 'm' || e.key === 'M') toggleStarMap();
  if (e.key === 'Escape') {
    if (starmapOpen) toggleStarMap(false);
    if (!document.getElementById('easter-egg').classList.contains('hidden'))
      document.getElementById('easter-egg').classList.add('hidden');
  }
});

document.addEventListener('keyup', e => {
  keysDown.delete(e.key.toLowerCase());
});

const STEER_SPEED = 1.8; // radians/s

function processKeyboardSteering(dt) {
  if (starmapOpen) return;

  let steerYaw = 0;
  let steerPitch = 0;

  if (keysDown.has('arrowleft') || keysDown.has('a'))  steerYaw -= STEER_SPEED * dt;
  if (keysDown.has('arrowright') || keysDown.has('d')) steerYaw += STEER_SPEED * dt;
  if (keysDown.has('arrowup') || keysDown.has('w'))    steerPitch += STEER_SPEED * dt * 0.7;
  if (keysDown.has('arrowdown') || keysDown.has('s'))  steerPitch -= STEER_SPEED * dt * 0.7;

  // Shift = brake
  if (keysDown.has('shift')) {
    velocity *= 0.95;
  }

  // Space = boost thrust forward
  if (keysDown.has(' ')) {
    velocity += THRUST_ACCEL * dt * 0.5;
  }

  if (steerYaw !== 0 || steerPitch !== 0) {
    yaw += steerYaw;
    pitch = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, pitch + steerPitch));
    updateForwardFromAngles();
    if (autopilot) stopAutopilot(); // manual input cancels autopilot
  }
}

// ============================================================
// MOUSE LOOK (subtle sway)
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
const hudSystem = document.getElementById('hud-system');

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

  const px = pData.worldPos[0] - camera.position.x;
  if (px > 5) {
    infoCard.classList.add('info-card--left');
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
// STAR MAP — 3D Galaxy Overview
// ============================================================

const starmapEl = document.getElementById('starmap');
const starmapGrid = document.getElementById('starmap-grid');
let starmapOpen = false;

function buildStarMap() {
  starmapGrid.innerHTML = '';

  SYSTEMS.forEach(sys => {
    const sysPos = new THREE.Vector3(...sys.pos);
    const dist = camera.position.distanceTo(sysPos);
    const ly = (dist / 50).toFixed(1);
    const isCurrent = sys.id === currentSystem.id;

    const card = document.createElement('div');
    card.className = 'starmap-system' + (isCurrent ? ' starmap-system--current' : '');
    card.innerHTML = `
      <div class="starmap-system__header">
        <span class="starmap-system__dot" style="background:#${new THREE.Color(sys.color).getHexString()};box-shadow:0 0 8px #${new THREE.Color(sys.color).getHexString()}"></span>
        <span class="starmap-system__name">${sys.name}</span>
        ${isCurrent ? '<span class="starmap-system__here mono">YOU ARE HERE</span>' : ''}
      </div>
      <p class="starmap-system__desc">${sys.desc}</p>
      <p class="starmap-system__info mono">${sys.planets.length} planet${sys.planets.length > 1 ? 's' : ''} · ${ly} ly</p>
      <div class="starmap-system__planets">
        ${sys.planets.map(p => {
          const pDist = camera.position.distanceTo(new THREE.Vector3(...p.worldPos || [p.pos[0]+sys.pos[0], p.pos[1]+sys.pos[1], p.pos[2]+sys.pos[2]]));
          return `<div class="starmap-planet" data-system="${sys.id}" data-planet="${p.name}">
            <span class="starmap-planet__dot" style="background:#${new THREE.Color(p.color).getHexString()}"></span>
            <span class="starmap-planet__name">${p.title}</span>
            <span class="starmap-planet__dist mono">${(pDist/50).toFixed(1)} ly</span>
          </div>`;
        }).join('')}
      </div>
      ${!isCurrent ? `<button class="starmap-warp-btn mono" data-system="${sys.id}">⚡ WARP TO SYSTEM</button>` : ''}
      ${isCurrent && sys.hasTour ? `<button class="starmap-tour-btn mono" data-system="${sys.id}">▶ BEGIN GUIDED TOUR</button>` : ''}
    `;
    starmapGrid.appendChild(card);
  });

  // Warp button listeners
  starmapGrid.querySelectorAll('.starmap-warp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sys = SYSTEMS.find(s => s.id === btn.dataset.system);
      if (sys) {
        startWarp(sys);
        toggleStarMap(false);
      }
    });
  });

  // Tour button listener
  starmapGrid.querySelectorAll('.starmap-tour-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sys = SYSTEMS.find(s => s.id === btn.dataset.system);
      if (sys) {
        startGuidedTour(sys);
        toggleStarMap(false);
      }
    });
  });

  // Planet click → autopilot
  starmapGrid.querySelectorAll('.starmap-planet').forEach(el => {
    el.addEventListener('click', () => {
      const pName = el.dataset.planet;
      const p = allPlanets.find(x => x.name === pName);
      if (p) {
        // If planet is in a different system, warp first then autopilot
        const sys = SYSTEMS.find(s => s.id === el.dataset.system);
        if (sys && sys.id !== currentSystem.id) {
          startWarp(sys, p);
        } else {
          startAutopilot(p);
        }
        toggleStarMap(false);
      }
    });
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

// ============================================================
// AUTOPILOT
// ============================================================

const apIndicator = document.getElementById('autopilot-indicator');
const apDest = document.getElementById('ap-dest');

function startAutopilot(pData, onArrive) {
  const offset = new THREE.Vector3(
    pData.worldPos[0] > camera.position.x ? -pData.radius - 15 : pData.radius + 15,
    2,
    pData.radius + 10
  );
  autopilot = {
    target: new THREE.Vector3(...pData.worldPos).add(offset),
    name: pData.title,
    onArrive: onArrive || null,
  };
  apDest.textContent = pData.title.toUpperCase();
  apIndicator.classList.remove('hidden');
}

function stopAutopilot() {
  const cb = autopilot?.onArrive;
  autopilot = null;
  apIndicator.classList.add('hidden');
  if (cb) setTimeout(cb, 1500); // slight delay before next leg
}

document.getElementById('ap-cancel').addEventListener('click', () => {
  autopilot = null;
  apIndicator.classList.add('hidden');
  tourActive = false;
  const tourInd = document.getElementById('tour-indicator');
  if (tourInd) tourInd.classList.add('hidden');
});

// ============================================================
// WARP — inter-system jump
// ============================================================

const warpOverlay = document.getElementById('warp-overlay');
const warpDestName = document.getElementById('warp-dest-name');

function startWarp(sys, thenAutopilotTo) {
  warpTarget = {
    target: new THREE.Vector3(...sys.pos).add(new THREE.Vector3(0, 0, 80)),
    name: sys.name,
    thenPlanet: thenAutopilotTo || null,
  };
  warpOrigin = camera.position.clone();
  isWarping = true;
  warpProgress = 0;
  warpDestName.textContent = sys.name.toUpperCase();
  warpOverlay.classList.remove('hidden');
  velocity = 0;
}

function updateWarp(dt) {
  if (!isWarping || !warpTarget) return;

  warpProgress += dt * 0.5; // ~2 second warp
  const t = Math.min(warpProgress, 1);
  // Smooth ease in-out
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  camera.position.lerpVectors(warpOrigin, warpTarget.target, ease);

  // Update forward to face the target
  const dir = warpTarget.target.clone().sub(camera.position);
  if (dir.length() > 1) {
    dir.normalize();
    forward.lerp(dir, 0.1).normalize();
    yaw = Math.atan2(forward.x, -forward.z);
    pitch = Math.asin(forward.y);
  }

  if (t >= 1) {
    isWarping = false;
    warpOverlay.classList.add('hidden');
    currentSystem = findCurrentSystem();

    if (warpTarget.thenPlanet) {
      startAutopilot(warpTarget.thenPlanet);
    }
    warpTarget = null;
    warpOrigin = null;
  }
}

// ============================================================
// GUIDED TOUR (Journey system)
// ============================================================

let tourActive = false;
let tourQueue = [];
const tourIndicator = document.getElementById('tour-indicator');
const tourProgress = document.getElementById('tour-progress');

function startGuidedTour(sys) {
  const sorted = [...sys.planets].filter(p => p.tourOrder !== undefined).sort((a, b) => a.tourOrder - b.tourOrder);
  if (sorted.length === 0) return;

  tourActive = true;
  tourQueue = sorted.map(p => allPlanets.find(ap => ap.name === p.name)).filter(Boolean);
  tourIndicator.classList.remove('hidden');
  flyToNextTourStop();
}

function flyToNextTourStop() {
  if (tourQueue.length === 0) {
    tourActive = false;
    tourIndicator.classList.add('hidden');
    tourProgress.textContent = '';
    return;
  }

  const total = SYSTEMS.find(s => s.id === 'journey')?.planets.filter(p => p.tourOrder !== undefined).length || 4;
  const remaining = tourQueue.length;
  const current = total - remaining + 1;
  tourProgress.textContent = `STOP ${current} OF ${total}`;

  const next = tourQueue.shift();
  startAutopilot(next, () => {
    // After arriving and viewing, fly to next
    if (tourActive) {
      flyToNextTourStop();
    }
  });
}

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

  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.getElapsedTime();

  // --- WARP ---
  if (isWarping) {
    updateWarp(dt);
    renderer.render(scene, camera);
    return;
  }

  // --- KEYBOARD STEERING ---
  processKeyboardSteering(dt);

  // --- THRUST from scroll ---
  thrust = scrollAccum * 2;
  scrollAccum *= 0.85;

  // --- AUTOPILOT ---
  if (autopilot) {
    const dir = autopilot.target.clone().sub(camera.position);
    const dist = dir.length();
    if (dist < 8) {
      stopAutopilot();
      velocity *= 0.3;
    } else {
      dir.normalize();
      forward.lerp(dir, 0.03).normalize();
      yaw = Math.atan2(forward.x, -forward.z);
      pitch = Math.asin(Math.max(-1, Math.min(1, forward.y)));
      const targetSpeed = Math.min(AUTOPILOT_SPEED, dist * 0.5);
      velocity += (targetSpeed - velocity) * 0.05;
    }
  } else {
    // --- MANUAL FLIGHT ---
    if (thrust > 0) {
      velocity += THRUST_ACCEL * dt * (thrust / 100);
    } else if (thrust < 0) {
      // REVERSE thrust — allow negative velocity (backwards travel)
      velocity += THRUST_ACCEL * dt * (thrust / 100) * 0.5;
    }
  }

  // Clamp velocity — allow negative for reverse!
  const maxV = C * 0.95;
  velocity = Math.max(-maxV * 0.3, Math.min(velocity, maxV));
  velocity *= DRAG;
  if (Math.abs(velocity) < 0.01) velocity = 0;

  // --- RELATIVISTIC CALCULATIONS ---
  const absVel = Math.abs(velocity);
  const beta = absVel / C;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const properDt = dt / gamma;
  shipTime += properDt;

  // --- MOVE CAMERA ---
  camera.position.addScaledVector(forward, velocity * dt);

  // Mouse look sway
  const lookOffset = new THREE.Vector3(mouseX * 2, -mouseY * 1.5, 0);
  camLook.copy(camera.position).add(forward.clone().multiplyScalar(50)).add(lookOffset);
  camera.lookAt(camLook);

  // Move sun with camera
  sunLight.position.set(camera.position.x + 40, camera.position.y + 25, camera.position.z + 30);

  // --- STAR SHADER ---
  starMat.uniforms.uBeta.value = beta;
  starMat.uniforms.uForward.value.copy(forward);
  stars.rotation.y = elapsed * 0.002;

  // --- PLANET UPDATES ---
  let nearestPlanet = null;
  let nearestDist = Infinity;

  planetObjects.forEach(({ group, data, sphere, mat, worldPos }) => {
    const dist = camera.position.distanceTo(worldPos);

    group.visible = dist < PLANET_RENDER_DIST;
    if (!group.visible) return;

    mat.uniforms.uTime.value = elapsed;
    sphere.rotation.y = elapsed * 0.12;

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

  // --- CURRENT SYSTEM ---
  if (!autopilot && !isWarping) {
    currentSystem = findCurrentSystem();
  }

  // --- SYSTEM BEACONS: fade based on distance ---
  systemBeacons.forEach(({ group, sys }) => {
    const d = camera.position.distanceTo(new THREE.Vector3(...sys.pos));
    // Fade in only when camera is far from system center
    const fadeStart = 200;
    const fadeEnd = 400;
    const alpha = Math.max(0, Math.min(1, (d - fadeStart) / (fadeEnd - fadeStart)));
    group.visible = alpha > 0.01;
    group.children.forEach(child => {
      if (child.material) {
        child.material.opacity = (child.material.userData?.baseOpacity ?? child.material.opacity) * alpha;
      }
    });
  });

  // --- INTRO OVERLAY ---
  if (introVisible && absVel > 2) {
    introOverlay.style.opacity = '0';
    introVisible = false;
    setTimeout(() => { introOverlay.style.pointerEvents = 'none'; }, 800);
  }
  if (!introVisible && absVel < 0.5 && camera.position.distanceTo(new THREE.Vector3(0, 0, 60)) < 30) {
    introOverlay.style.opacity = '1';
    introOverlay.style.pointerEvents = '';
    introVisible = true;
  }

  // --- PLANET INFO CARD ---
  if (nearestPlanet && nearestDist < SHOW_RADIUS && absVel < 15) {
    showPlanetInfo(nearestPlanet);
  } else {
    hidePlanetInfo();
  }

  // --- HUD ---
  hudVel.textContent = beta.toFixed(3) + 'c';
  hudVelBar.style.width = (beta * 100 / 0.95) + '%';
  hudGamma.textContent = gamma.toFixed(3);

  const totalSec = shipTime;
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  hudTau.textContent = String(mins).padStart(2, '0') + ':' + secs.toFixed(1).padStart(4, '0');

  if (nearestPlanet) {
    hudNearest.textContent = nearestPlanet.title;
    hudDist.textContent = (nearestDist / 50).toFixed(1) + ' ly';
  } else {
    hudNearest.textContent = '—';
    hudDist.textContent = '— ly';
  }

  const heading = Math.atan2(forward.x, -forward.z) * (180 / Math.PI);
  hudHeading.textContent = ((heading + 360) % 360).toFixed(0).padStart(3, '0') + '°';

  if (hudSystem) {
    hudSystem.textContent = currentSystem.name;
  }

  // Hint text
  if (velocity < -1) {
    hudHint.textContent = 'REVERSE — scroll down to brake';
  } else if (absVel > 5 && !autopilot) {
    hudHint.textContent = beta > 0.3
      ? '⚡ RELATIVISTIC — stars compress ahead (aberration)'
      : 'CRUISING — scroll up to brake';
  } else if (autopilot) {
    hudHint.textContent = tourActive
      ? `GUIDED TOUR → ${autopilot.name}`
      : `AUTOPILOT to ${autopilot.name}`;
  } else {
    hudHint.textContent = 'SCROLL to thrust · ARROWS to steer · M for galaxy map';
  }

  // Velocity color
  if (beta > 0.5) {
    hudVel.style.color = '#f472b6';
    hudVel.style.textShadow = '0 0 12px rgba(244,114,182,0.5)';
  } else if (beta > 0.2) {
    hudVel.style.color = '#a855f7';
    hudVel.style.textShadow = '0 0 10px rgba(168,85,247,0.4)';
  } else {
    hudVel.style.color = '#00d4ff';
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
