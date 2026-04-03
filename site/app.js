/* ═══════════════════════════════════════════════════════════
   TANISH'S UNIVERSE v5
   Five phases:
     HOME      — holographic orrery, camera revolves
     WARP      — relativistic warp transition (canvas effect)
     SYSTEM    — star + planets visible, mode chooser
     GUIDED    — scroll-thrust, sequential, info cards, zoom
     EXPLORER  — WASD+mouse-look, proximity popups
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────
   SECTION DATA
   ───────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'journey',
    name: 'My Journey',
    subtitle: 'ORIGIN STORY',
    color: 0x00d4ff,
    starColor: 0x00d4ff,
    // position on the home orrery (unit sphere × scale)
    orreryPos: new THREE.Vector3(0, 0.6, 1).normalize().multiplyScalar(7),
    starRadius: 1.4,
    star: {
      label: 'THE JOURNEY', title: 'Born to Wander',
      body: `<p>From a volcanic island in the Indian Ocean to the foothills of the Himalayas to a walled city in China to a forest campus in India — I have collected more passport stamps than most people collect streaming services.</p>`
    },
    planets: [
      { name: 'mauritius', title: 'Mauritius', label: 'ORIGIN', color: 0x00d4ff, orbitR: 5, orbitSpeed: .4,
        body: `<p>Born on a volcanic island in the Indian Ocean. Started tinkering with computers at an age when most kids were tinkering with Legos. Both are valid engineering pursuits.</p>` },
      { name: 'sikkim', title: 'Sikkim, India', label: 'CHAPTER II', color: 0x22c55e, orbitR: 7.5, orbitSpeed: .28,
        body: `<p>Moved to the foothills of the Himalayas. Learned that altitude and ambition both take your breath away.</p>` },
      { name: 'china', title: 'China', label: 'CHAPTER III', color: 0xef4444, orbitR: 10, orbitSpeed: .19, ring: true,
        body: `<p>Another country, another language to butcher. Continued building things and collecting passport stamps.</p>` },
      { name: 'uwc', title: 'UWC Mahindra', label: 'CHAPTER IV', color: 0xfbbf24, orbitR: 13, orbitSpeed: .14,
        sub: 'IB Diploma',
        body: `<p>International Baccalaureate at a school with 80+ nationalities. My worldview expanded faster than my code compiled.</p>` },
    ]
  },
  {
    id: 'education',
    name: 'Education',
    subtitle: 'ACADEMIC CHAPTERS',
    color: 0xa855f7,
    starColor: 0xa855f7,
    orreryPos: new THREE.Vector3(-1, 0.2, 0.4).normalize().multiplyScalar(7),
    starRadius: 1.6,
    star: {
      label: 'EDUCATION', title: 'Vassar College',
      sub: 'B.A. Computer Science + Economics · 3.97 GPA',
      body: `<p>Double major in CS and Economics, double minor in Physics and Applied Math. Phi Beta Kappa. Dean's List every semester — including the ones I probably shouldn't have survived.</p>
<div class="tags"><span>3.97 GPA</span><span>Phi Beta Kappa</span><span>CS + Econ</span><span>Physics Minor</span></div>`
    },
    planets: [
      { name: 'vassar', title: 'Vassar College', label: 'ALMA MATER', color: 0xa855f7, orbitR: 5, orbitSpeed: .4, ring: true,
        sub: 'B.A. CS + Economics',
        body: `<p>Double major, double minor, one functioning brain cell left. Research with Prof. Rui Li on 3D shape generation using diffusion models.</p>
<div class="tags"><span>CS</span><span>Economics</span><span>Physics</span><span>Applied Math</span></div>` },
      { name: 'uwc-ib', title: 'UWC Mahindra', label: 'IB DIPLOMA', color: 0xfbbf24, orbitR: 8, orbitSpeed: .24,
        sub: 'International Baccalaureate',
        body: `<p>HL Math, Physics, and Econ at a school with 80+ nationalities. Extended Essay on market microstructure. Wrote more code than essays.</p>` },
    ]
  },
  {
    id: 'work',
    name: 'Work',
    subtitle: 'WHERE CODE MEETS PRODUCTION',
    color: 0x3b82f6,
    starColor: 0x3b82f6,
    orreryPos: new THREE.Vector3(1, -0.3, -0.5).normalize().multiplyScalar(7),
    starRadius: 1.8,
    star: {
      label: 'CURRENT ROLE', title: 'Uber',
      sub: 'Software Engineer — Distributed Systems + LLMs',
      body: `<p>Building an MCP server for semantic trace analysis on Jaeger. LLM-driven debugging over 10B+ daily spans. Cut trace noise by 40% with a real-time span leak mitigation system.</p>
<div class="tags"><span>Go</span><span>Distributed Systems</span><span>LLMs</span><span>Observability</span></div>`
    },
    planets: [
      { name: 'uber', title: 'Uber', label: 'SWE', color: 0x3b82f6, orbitR: 5.5, orbitSpeed: .38, ring: true,
        sub: 'Software Engineer',
        body: `<p>Observability platform. MCP server for semantic trace analysis. 10B+ daily spans. Real-time span leak mitigation.</p>
<div class="tags"><span>Go</span><span>LLMs</span><span>Jaeger</span><span>OpenTelemetry</span></div>` },
      { name: 'google', title: 'Google Research & Brown', label: 'ML RESEARCH', color: 0x22c55e, orbitR: 8.5, orbitSpeed: .22,
        sub: 'Research Intern',
        body: `<p>Trained Stable Diffusion v1.5 to synthesize novel 3D objects from 51,000+ geometry images. My GPU still hasn't forgiven me.</p>
<div class="tags"><span>Diffusion Models</span><span>3D ML</span><span>PyTorch</span></div>` },
    ]
  },
  {
    id: 'projects',
    name: 'Projects',
    subtitle: 'SIDE QUESTS',
    color: 0xf472b6,
    starColor: 0xf472b6,
    orreryPos: new THREE.Vector3(-0.5, -0.7, -1).normalize().multiplyScalar(7),
    starRadius: 1.3,
    star: {
      label: 'SIDE QUESTS', title: 'Projects',
      body: `<p>Things I built because I couldn't find them elsewhere, or because it seemed like a good idea at the time. Usually both.</p>`
    },
    planets: [
      { name: 'cortex', title: 'Cortex', label: 'AI PRODUCTIVITY', color: 0xf472b6, orbitR: 5, orbitSpeed: .42,
        body: `<p>AI productivity monitor for macOS. Captures your screen, classifies activity via LLMs, and intervenes when you start doomscrolling.</p>
<div class="tags"><span>SwiftUI</span><span>ScreenCaptureKit</span><span>OpenAI</span></div>
<a href="https://github.com/Bankminer78/cortex" target="_blank" class="ext-link">View on GitHub →</a>` },
      { name: 'lenz', title: 'Lenz AI', label: 'WEB REWRITER', color: 0x8b5cf6, orbitR: 7.5, orbitSpeed: .28,
        body: `<p>Rewrites web content in real-time based on your personal knowledge profile. The internet, adapted to you.</p>
<div class="tags"><span>Electron</span><span>React</span><span>FastAPI</span><span>OpenAI</span></div>
<a href="https://github.com/tanwasp/lenz-ai" target="_blank" class="ext-link">View on GitHub →</a>` },
      { name: 'lunchbox', title: 'LunchBox', label: 'FOOD SOCIAL', color: 0xfbbf24, orbitR: 10.5, orbitSpeed: .18, ring: true,
        body: `<p>Social platform for restaurant tracking. Because spreadsheets of restaurant names deserve a better home.</p>
<div class="tags"><span>React Native</span><span>Firebase</span><span>Node.js</span></div>
<a href="https://thelunchboxapp.com" target="_blank" class="ext-link">Visit →</a>` },
    ]
  },
  {
    id: 'life',
    name: 'Beyond the Code',
    subtitle: 'EVIDENCE I TOUCH GRASS',
    color: 0xfbbf24,
    starColor: 0xfbbf24,
    orreryPos: new THREE.Vector3(0.8, 0.9, -0.3).normalize().multiplyScalar(7),
    starRadius: 1.2,
    star: {
      label: 'THE ANALOG SIDE', title: 'Beyond the Code',
      body: `<p>The non-programming activities I pretend to be good at.</p>`
    },
    planets: [
      { name: 'hobbies', title: 'The Analog Life', label: 'HUMAN ACTIVITIES', color: 0xfbbf24, orbitR: 5, orbitSpeed: .35, ring: true,
        body: `<div class="about-item"><strong>🎸 Guitar</strong> — Currently learning. My neighbors are very patient.</div>
<div class="about-item"><strong>🏃 Running</strong> — Chasing a sub-20 5K. The only race condition I actually want to fix.</div>
<div class="about-item"><strong>🛶 Kayaking</strong> — Frequently capsize. Always blame the current.</div>
<div class="about-item"><strong>🍳 Cooking</strong> — Japanese curry specialist. Thai green curry. Hotpot evangelist.</div>
<div class="about-item"><strong>💪 Fitness</strong> — 10 clean pull-ups. Visible abs. One is going better than the other.</div>
<div class="about-item"><strong>🌍 Travel</strong> — 6 countries before 22. Collecting cultures faster than npm packages.</div>` },
    ]
  },
  {
    id: 'contact',
    name: "Let's Talk",
    subtitle: 'OPEN A TRANSMISSION',
    color: 0x06b6d4,
    starColor: 0x06b6d4,
    orreryPos: new THREE.Vector3(-0.3, -0.4, 1).normalize().multiplyScalar(7),
    starRadius: 1.1,
    star: {
      label: 'CONTACT', title: "Let's Talk",
      body: `<p>I'm always up for conversations about distributed systems, ML, side projects, or which NYC restaurant deserves a spot in LunchBox.</p>
<div class="contact-btns">
<a href="mailto:tanishwas@gmail.com" class="btn btn-prim">tanishwas@gmail.com</a>
<a href="https://github.com/tanwasp" target="_blank" class="btn btn-ghost">GitHub</a>
<a href="https://www.linkedin.com/in/tanish-pradhan-wong-ah-sui" target="_blank" class="btn btn-ghost">LinkedIn</a>
</div>
<a href="./magic-portfolio" class="boring-link">Looking for the boring version? →</a>`
    },
    planets: [
      { name: 'email', title: 'Email', label: 'FASTEST ROUTE', color: 0x06b6d4, orbitR: 5, orbitSpeed: .5,
        body: `<p><a href="mailto:tanishwas@gmail.com" class="ext-link">tanishwas@gmail.com</a></p>` },
      { name: 'github', title: 'GitHub', label: 'CODE', color: 0xa855f7, orbitR: 7.5, orbitSpeed: .3,
        body: `<p><a href="https://github.com/tanwasp" target="_blank" class="ext-link">github.com/tanwasp →</a></p>` },
      { name: 'linkedin', title: 'LinkedIn', label: 'PROFESSIONAL', color: 0x3b82f6, orbitR: 10, orbitSpeed: .2,
        body: `<p><a href="https://www.linkedin.com/in/tanish-pradhan-wong-ah-sui" target="_blank" class="ext-link">linkedin.com/in/tanish-pradhan-wong-ah-sui →</a></p>` },
    ]
  }
];

/* ─────────────────────────────────────────────────────────
   RENDERER + SCENE
   ───────────────────────────────────────────────────────── */
const canvas = document.getElementById('cosmos');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x020209, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.01, 3000);
camera.position.set(0, 4, 22);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0x111133, 1.2));
const sunLight = new THREE.PointLight(0xffffff, 3, 600);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

/* ─────────────────────────────────────────────────────────
   BACKGROUND STARS
   ───────────────────────────────────────────────────────── */
const BG_STAR_COUNT = 7000;
const bgStarGeo = new THREE.BufferGeometry();
const bgPos = new Float32Array(BG_STAR_COUNT * 3);
const bgCol = new Float32Array(BG_STAR_COUNT * 3);
const bgSz  = new Float32Array(BG_STAR_COUNT);
const starPalette = [[.85,.88,1],[1,.95,.8],[.7,.8,1],[1,.85,.7]];
for (let i = 0; i < BG_STAR_COUNT; i++) {
  const r = 200 + Math.random() * 800;
  const th = Math.random() * Math.PI * 2;
  const ph = Math.acos(2*Math.random()-1);
  bgPos[i*3]   = r * Math.sin(ph)*Math.cos(th);
  bgPos[i*3+1] = r * Math.sin(ph)*Math.sin(th);
  bgPos[i*3+2] = r * Math.cos(ph);
  const c = starPalette[Math.floor(Math.random()*4)];
  bgCol[i*3]=c[0]; bgCol[i*3+1]=c[1]; bgCol[i*3+2]=c[2];
  bgSz[i] = .4 + Math.random() * 2.2;
}
bgStarGeo.setAttribute('position', new THREE.BufferAttribute(bgPos,3));
bgStarGeo.setAttribute('color',    new THREE.BufferAttribute(bgCol,3));
bgStarGeo.setAttribute('size',     new THREE.BufferAttribute(bgSz,1));

// Relativistic shader used in all modes
const bgStarMat = new THREE.ShaderMaterial({
  uniforms: { uBeta: {value:0}, uFwd: {value: new THREE.Vector3(0,0,-1)} },
  vertexShader:`
    attribute float size; attribute vec3 color; varying vec3 vColor; varying float vA;
    uniform float uBeta; uniform vec3 uFwd;
    void main(){
      vec4 mv=modelViewMatrix*vec4(position,1.);
      vA=clamp(1.-length(mv.xyz)/900.,.05,1.);
      vec3 toStar=normalize(position-cameraPosition);
      float c=dot(toStar,uFwd);
      float dop=1.+uBeta*c*.65; vColor=color*dop;
      float ab=1.+max(c,0.)*uBeta*1.6;
      gl_PointSize=size*ab*(200./max(-mv.z,1.));
      gl_Position=projectionMatrix*mv;
    }`,
  fragmentShader:`
    varying vec3 vColor; varying float vA;
    void main(){
      float d=length(gl_PointCoord-.5); if(d>.5)discard;
      float g=smoothstep(.5,.0,d);
      gl_FragColor=vec4(vColor,g*vA);
    }`,
  transparent:true, depthWrite:false, blending: THREE.AdditiveBlending, vertexColors:false
});
const bgStars = new THREE.Points(bgStarGeo, bgStarMat);
scene.add(bgStars);

/* ─────────────────────────────────────────────────────────
   SHARED HELPERS
   ───────────────────────────────────────────────────────── */
function makeGlowSphere(radius, color, emissiveStr=1.0) {
  const geo = new THREE.SphereGeometry(radius, 48, 48);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uColor:{value:new THREE.Color(color)}, uTime:{value:0}, uStr:{value:emissiveStr} },
    vertexShader:`
      varying vec3 vN; varying vec3 vV;
      void main(){ vN=normalize(normalMatrix*normal);
        vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz);
        gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`
      uniform vec3 uColor; uniform float uTime; uniform float uStr;
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f=pow(1.-dot(vN,vV),2.8)*uStr;
        float core=max(dot(vN,vec3(.5,.5,.3)),0.)*.35;
        float p=.92+.08*sin(uTime*.7);
        gl_FragColor=vec4(uColor*(f+core+.12)*p, .88);
      }`,
    transparent:true
  });
  return new THREE.Mesh(geo, mat);
}

function makeAtmo(radius, color) {
  const m = new THREE.ShaderMaterial({
    uniforms: { uColor:{value:new THREE.Color(color)} },
    vertexShader:`varying vec3 vN; varying vec3 vV;
      void main(){ vN=normalize(normalMatrix*normal);
        vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz);
        gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
      void main(){ float i=pow(.65-dot(vN,vV),2.6);
        gl_FragColor=vec4(uColor,i*.55); }`,
    transparent:true, side:THREE.BackSide, blending:THREE.AdditiveBlending, depthWrite:false
  });
  return new THREE.Mesh(new THREE.SphereGeometry(radius*1.3,32,32), m);
}

function addRing(parent, radius, color) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius*1.85,.12,2,80),
    new THREE.MeshBasicMaterial({color, transparent:true, opacity:.22, side:THREE.DoubleSide})
  );
  ring.rotation.x = Math.PI*.42;
  parent.add(ring);
}

/* ─────────────────────────────────────────────────────────
   PHASE STATE
   ───────────────────────────────────────────────────────── */
let phase = 'home'; // home | warp | system | guided | explorer
let activeSection = null;

/* ─────────────────────────────────────────────────────────
   ██████  HOME — ORRERY
   ───────────────────────────────────────────────────────── */
const orrery = new THREE.Group();
scene.add(orrery);

// Grid lines — hologram skeleton
(function buildOrreryGrid() {
  const mat = new THREE.LineBasicMaterial({color:0x00d4ff, transparent:true, opacity:.06});
  // Longitude lines
  for (let i=0; i<12; i++) {
    const angle = (i/12)*Math.PI*2;
    const pts = [];
    for (let j=0; j<=40; j++) {
      const ph = (j/40)*Math.PI;
      pts.push(new THREE.Vector3(
        8.5*Math.sin(ph)*Math.cos(angle),
        8.5*Math.cos(ph),
        8.5*Math.sin(ph)*Math.sin(angle)
      ));
    }
    orrery.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
  // Latitude circles
  for (let j=1; j<5; j++) {
    const ph = (j/5)*Math.PI;
    const r = 8.5*Math.sin(ph);
    const y = 8.5*Math.cos(ph);
    const pts = [];
    for (let i=0; i<=64; i++) {
      const a = (i/64)*Math.PI*2;
      pts.push(new THREE.Vector3(r*Math.cos(a), y, r*Math.sin(a)));
    }
    orrery.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
})();

// Central star of the orrery
const orreryStar = makeGlowSphere(1.1, 0xffffff, 1.4);
orrery.add(orreryStar);
orrery.add(makeAtmo(1.1, 0x88ddff));

// Orrery node objects — one per section
const orreryNodes = []; // { mesh, labelEl, section }

SECTIONS.forEach(sec => {
  const group = new THREE.Group();
  group.position.copy(sec.orreryPos);

  const sphere = makeGlowSphere(.55, sec.color, 1.8);
  group.add(sphere);
  group.add(makeAtmo(.55, sec.color));

  // Orbital ring showing this node's orbit radius
  const orbitPts = [];
  const orbitR = sec.orreryPos.length();
  const axis = sec.orreryPos.clone().normalize();
  const perp = new THREE.Vector3(1,0,0).cross(axis).normalize();
  if (perp.length() < .01) perp.set(0,1,0).cross(axis).normalize();
  const perp2 = axis.clone().cross(perp).normalize();
  for (let i=0; i<=80; i++) {
    const a = (i/80)*Math.PI*2;
    orbitPts.push(new THREE.Vector3().addScaledVector(perp,orbitR*Math.cos(a)).addScaledVector(perp2,orbitR*Math.sin(a)));
  }
  orrery.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(orbitPts),
    new THREE.LineBasicMaterial({color: sec.color, transparent:true, opacity:.08})
  ));

  // Connector line from center
  orrery.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), sec.orreryPos.clone()]),
    new THREE.LineBasicMaterial({color: sec.color, transparent:true, opacity:.12})
  ));

  // DOM label — also acts as click target
  const el = document.createElement('div');
  el.className = 'node-label node-label--clickable';
  el.innerHTML = `<div class="nl-name">${sec.name}</div><div class="nl-dot" style="background:#${new THREE.Color(sec.color).getHexString()}"></div>`;
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => { if (phase === 'home') startWarp(sec); });
  el.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
  document.body.appendChild(el);

  group.userData.section = sec;
  group.userData.labelEl = el;

  orrery.add(group);
  orreryNodes.push({ group, labelEl: el, section: sec, sphere });
});

// Disable raycasting on all non-node orrery children (grid lines, orbit rings, connector lines)
orrery.children.forEach(child => {
  if (!orreryNodes.find(n => n.group === child)) {
    child.raycast = () => {};
    if (child.children) child.children.forEach(c => { c.raycast = () => {}; });
  }
});

// Raycaster for orrery clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let orreryHovered = null;
canvas.addEventListener('mousemove', onOrreryMouseMove);
canvas.addEventListener('click', onOrreryClick);

function onOrreryMouseMove(e) {
  if (phase !== 'home') return;
  mouse.x = (e.clientX/innerWidth)*2-1;
  mouse.y = -(e.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(orrery.children, true);
  if (hits.length) {
    let obj = hits[0].object;
    while (obj.parent && obj.parent !== orrery) obj = obj.parent;
    orreryHovered = orreryNodes.find(n => n.group === obj) || null;
  } else {
    orreryHovered = null;
  }
  canvas.style.cursor = orreryHovered ? 'pointer' : 'default';
}

function onOrreryClick(e) {
  if (phase !== 'home') return;
  mouse.x = (e.clientX/innerWidth)*2-1;
  mouse.y = -(e.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  // Use the full orrery group recursively to handle rotation
  const hits = raycaster.intersectObjects(orrery.children, true);
  if (hits.length) {
    // Walk up to find the orrery node group
    let obj = hits[0].object;
    while (obj.parent && obj.parent !== orrery) obj = obj.parent;
    const node = orreryNodes.find(n => n.group === obj);
    if (node) startWarp(node.section);
  }
}

/* ─────────────────────────────────────────────────────────
   ██████  WARP TRANSITION
   ───────────────────────────────────────────────────────── */
const warpOverlay = document.getElementById('warp-overlay');
const warpCanvas  = document.getElementById('warp-canvas');
const warpDestEl  = document.getElementById('warp-dest');
const wCtx = warpCanvas.getContext('2d');

let warpActive = false, warpT = 0, warpStreaks = [], warpStartTime = 0;

function startWarp(section) {
  if (phase === 'warp') return;
  phase = 'warp';
  activeSection = section;
  warpDestEl.textContent = section.name.toUpperCase();
  warpOverlay.classList.remove('hidden');
  document.getElementById('home-ui').classList.add('hidden');

  // Generate streaks
  warpStreaks = [];
  for (let i=0; i<300; i++) {
    const angle = Math.random()*Math.PI*2;
    const dist   = 30 + Math.random()*200;
    warpStreaks.push({
      x: innerWidth/2 + Math.cos(angle)*dist,
      y: innerHeight/2 + Math.sin(angle)*dist,
      angle,
      speed: 0.8 + Math.random()*3,
      len: 2 + Math.random()*6,
      color: Math.random() > .4 ? '#00d4ff' : '#a855f7',
      alpha: .3 + Math.random()*.7
    });
  }
  warpT = 0;
  warpStartTime = performance.now();
  warpActive = true;
  // Fallback: ensure transition completes even if RAF is throttled
  setTimeout(() => {
    if (warpActive) {
      warpActive = false;
      warpOverlay.classList.add('hidden');
      enterSystem(activeSection);
    }
  }, 2500);
}

function updateWarp(dt) {
  if (!warpActive) return;
  warpT = (performance.now() - warpStartTime) / 1000;

  warpCanvas.width  = innerWidth;
  warpCanvas.height = innerHeight;

  const cx = innerWidth/2, cy = innerHeight/2;
  wCtx.fillStyle = 'rgba(2,2,9,0.18)';
  wCtx.fillRect(0,0,innerWidth,innerHeight);

  const progress = Math.min(warpT / 2.2, 1);
  const ease = progress < .5 ? 2*progress*progress : 1-Math.pow(-2*progress+2,2)/2;

  warpStreaks.forEach(s => {
    const len = s.len * (1 + ease*60) * s.speed;
    const sx = cx + (s.x-cx) * (1-ease*.85);
    const sy = cy + (s.y-cy) * (1-ease*.85);
    const ex = sx + Math.cos(s.angle+Math.PI)*len;
    const ey = sy + Math.sin(s.angle+Math.PI)*len;

    const g = wCtx.createLinearGradient(sx,sy,ex,ey);
    // Parse hex color to rgba
    const hex = s.color.replace('#','');
    const r = parseInt(hex.substring(0,2),16);
    const gv = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);
    g.addColorStop(0, `rgba(${r},${gv},${b},${s.alpha})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    wCtx.strokeStyle = g;
    wCtx.lineWidth = .8 + ease*1.2;
    wCtx.beginPath(); wCtx.moveTo(sx,sy); wCtx.lineTo(ex,ey); wCtx.stroke();
  });

  if (progress >= 1) {
    warpActive = false;
    warpOverlay.classList.add('hidden');
    enterSystem(activeSection);
  }
}

/* ─────────────────────────────────────────────────────────
   ██████  SYSTEM VIEW
   ───────────────────────────────────────────────────────── */
let systemGroup = null;
let systemPlanetObjects = [];  // {group, data, worldPos: Vector3, sphere}
let systemStarObj = null;

function buildSystem(section) {
  if (systemGroup) { scene.remove(systemGroup); systemGroup = null; }
  systemPlanetObjects = [];

  systemGroup = new THREE.Group();
  systemGroup.position.set(0, 0, 0);

  // Central star
  const star = makeGlowSphere(section.starRadius, section.starColor, 2.0);
  systemGroup.add(star);
  systemGroup.add(makeAtmo(section.starRadius, section.starColor));
  if (section.id === 'contact') {
    addRing(systemGroup, section.starRadius, section.starColor);
  }
  star.userData.isStar = true;
  star.userData.section = section;
  systemStarObj = star;

  // Corona particles
  const coronaGeo = new THREE.BufferGeometry();
  const cPos = new Float32Array(120*3);
  for (let i=0; i<120; i++) {
    const r = section.starRadius*1.4 + Math.random()*.8;
    const th = Math.random()*Math.PI*2;
    const ph = Math.acos(2*Math.random()-1);
    cPos[i*3]=r*Math.sin(ph)*Math.cos(th);
    cPos[i*3+1]=r*Math.sin(ph)*Math.sin(th);
    cPos[i*3+2]=r*Math.cos(ph);
  }
  coronaGeo.setAttribute('position', new THREE.BufferAttribute(cPos,3));
  systemGroup.add(new THREE.Points(coronaGeo, new THREE.PointsMaterial({
    color: section.starColor, size:.12, transparent:true, opacity:.55,
    depthWrite:false, blending:THREE.AdditiveBlending
  })));

  // Planets
  section.planets.forEach((p, idx) => {
    const group = new THREE.Group();

    // Orbit ring
    const orbitPts = [];
    for (let i=0; i<=96; i++) {
      const a=(i/96)*Math.PI*2;
      orbitPts.push(new THREE.Vector3(p.orbitR*Math.cos(a), 0, p.orbitR*Math.sin(a)));
    }
    systemGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(orbitPts),
      new THREE.LineBasicMaterial({color:p.color, transparent:true, opacity:.12})
    ));

    const sphere = makeGlowSphere(.9, p.color, 1.6);
    group.add(sphere);
    group.add(makeAtmo(.9, p.color));
    if (p.ring) addRing(group, .9, p.color);

    // Moons
    const mc = Math.floor(Math.random()*2);
    for (let m=0; m<mc; m++) {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(.12+Math.random()*.1,8,8),
        new THREE.MeshBasicMaterial({color:0xaaaaaa, transparent:true, opacity:.5})
      );
      moon.userData = {orbitR:.9*2.2+m*.8, speed:.5+Math.random()*.5, off:Math.random()*Math.PI*2};
      group.add(moon);
    }

    // Initial position on orbit
    const startAngle = (idx/section.planets.length)*Math.PI*2;
    group.position.set(p.orbitR*Math.cos(startAngle), 0, p.orbitR*Math.sin(startAngle));

    group.userData = { ...p, orbitAngle: startAngle, isPlanet: true };
    systemGroup.add(group);
    systemPlanetObjects.push({ group, data: p, worldPos: new THREE.Vector3(), sphere });
  });

  scene.add(systemGroup);
}

function enterSystem(section) {
  phase = 'system';
  buildSystem(section);

  // Hide orrery labels and orrery itself
  orreryNodes.forEach(n => { n.labelEl.style.opacity = '0'; n.labelEl.style.pointerEvents = 'none'; });
  orrery.visible = false;

  // Camera position above the system
  camera.position.set(0, 18, 32);
  camera.lookAt(0, 0, 0);

  const titleEl = document.getElementById('system-title');
  const subtitleEl = document.getElementById('system-subtitle');
  titleEl.textContent = section.name;
  subtitleEl.textContent = section.subtitle;

  document.getElementById('system-ui').classList.remove('hidden');
}

document.getElementById('btn-back').addEventListener('click', () => {
  exitToHome();
});

document.getElementById('btn-guided').addEventListener('click', () => {
  document.getElementById('system-ui').classList.add('hidden');
  startGuidedTour();
});

document.getElementById('btn-explorer').addEventListener('click', () => {
  document.getElementById('system-ui').classList.add('hidden');
  startExplorer();
});

/* ─────────────────────────────────────────────────────────
   ██████  GUIDED TOUR
   ───────────────────────────────────────────────────────── */
const tourHud      = document.getElementById('tour-hud');
const tourVelEl    = document.getElementById('tour-vel');
const tourBarEl    = document.getElementById('tour-bar');
const tourStopEl   = document.getElementById('tour-stop');
const tourHintEl   = document.getElementById('tour-hint');
const infoCardEl   = document.getElementById('info-card');
const infoLabelEl  = document.getElementById('info-label');
const infoTitleEl  = document.getElementById('info-title');
const infoSubEl    = document.getElementById('info-sub');
const infoBodyEl   = document.getElementById('info-body');
const zoomOverlay  = document.getElementById('zoom-overlay');

let tourVel = 0, tourShipTime = 0;
let tourQueue = [], tourCurrentTarget = null, tourAP = null;
const C_TOUR = 60; // slower c for tour, easier to control
let scrollAccumTour = 0;

document.getElementById('tour-back').addEventListener('click', () => exitToSystem());
document.getElementById('zoom-close').addEventListener('click', () => zoomOverlay.classList.add('hidden'));

window.addEventListener('wheel', e => {
  if (phase !== 'guided') return;
  e.preventDefault();
  scrollAccumTour += e.deltaY * 0.7;
}, {passive:false});

function startGuidedTour() {
  phase = 'guided';
  tourVel = 0; tourShipTime = 0; scrollAccumTour = 0;
  tourHud.classList.remove('hidden');

  // Place camera at star, looking outward
  camera.position.set(0, 3, activeSection.starRadius + 10);
  camera.lookAt(0, 0, 0);

  // Queue: star first, then planets
  const starEntry = { isStar: true, data: activeSection.star, title: activeSection.star.title, pos: new THREE.Vector3(0,0,0) };
  const planetEntries = activeSection.planets.map((p, i) => {
    const angle = (i/activeSection.planets.length)*Math.PI*2;
    return { isStar: false, data: p, title: p.title, pos: new THREE.Vector3(p.orbitR*Math.cos(angle), 0, p.orbitR*Math.sin(angle)) };
  });
  tourQueue = [starEntry, ...planetEntries];
  flyToNextTourStop();
}

function flyToNextTourStop() {
  if (tourQueue.length === 0) {
    // Tour complete
    infoCardEl.classList.add('hidden');
    tourHud.classList.add('hidden');
    exitToSystem();
    return;
  }
  const stop = tourQueue.shift();
  const total = (1 + activeSection.planets.length);
  const idx = total - tourQueue.length;
  tourStopEl.textContent = `${idx} / ${total}`;
  tourHintEl.textContent = `SCROLL to thrust · heading to ${stop.title}`;

  const offset = new THREE.Vector3(0, 1.5, (stop.isStar ? activeSection.starRadius : .9) + 8);
  tourAP = {
    target: stop.pos.clone().add(offset),
    data: stop,
    onArrive: () => {
      showTourInfo(stop);
    }
  };
  tourCurrentTarget = stop;
}

function showTourInfo(stop) {
  const d = stop.data;
  infoLabelEl.textContent = d.label || (stop.isStar ? 'STAR' : 'PLANET');
  infoTitleEl.textContent = d.title;
  infoSubEl.textContent   = d.sub || '';
  infoSubEl.style.display = d.sub ? 'block' : 'none';
  infoBodyEl.innerHTML = d.body || '';
  infoCardEl.classList.remove('hidden');
}

function updateGuidedTour(dt) {
  if (phase !== 'guided') return;

  // Scroll thrust
  const thrust = scrollAccumTour * 2;
  scrollAccumTour *= 0.82;

  if (tourAP) {
    const dir = tourAP.target.clone().sub(camera.position);
    const dist = dir.length();
    if (dist < 1.5) {
      tourAP.onArrive();
      tourAP = null;
      tourVel *= 0.1;
    } else {
      dir.normalize();
      const smoothFwd = new THREE.Vector3();
      camera.getWorldDirection(smoothFwd);
      smoothFwd.lerp(dir, 0.04).normalize();
      camera.lookAt(camera.position.clone().add(smoothFwd.multiplyScalar(10)));

      const targetSpeed = Math.min(C_TOUR*.55, dist*0.4);
      tourVel += (targetSpeed - tourVel) * 0.05;
      if (Math.abs(thrust) > 1) tourVel += thrust * dt * 8;
    }
  } else {
    // Free scroll
    if (Math.abs(thrust) > 0.1) {
      const fwd = new THREE.Vector3();
      camera.getWorldDirection(fwd);
      tourVel += C_TOUR * dt * (thrust/60);
    }
  }

  tourVel = Math.max(-C_TOUR*.3, Math.min(tourVel, C_TOUR*.9));
  tourVel *= 0.985;
  if (Math.abs(tourVel) < .01) tourVel = 0;

  const fwd = new THREE.Vector3();
  camera.getWorldDirection(fwd);
  camera.position.addScaledVector(fwd, tourVel * dt);

  const beta = Math.abs(tourVel)/C_TOUR;
  const gamma = 1/Math.sqrt(1-beta*beta);
  tourShipTime += dt/gamma;
  tourVelEl.textContent = beta.toFixed(3)+'c';
  tourBarEl.style.width  = (beta*100/.9)+'%';

  if (!tourAP && infoCardEl.classList.contains('hidden')) {
    tourHintEl.textContent = 'SCROLL to thrust · reach the next stop';
  }
}

/* ─────────────────────────────────────────────────────────
   ██████  EXPLORER MODE
   ───────────────────────────────────────────────────────── */
const explorerHud = document.getElementById('explorer-hud');
const hudVelEl    = document.getElementById('hud-vel');
const hudBarEl    = document.getElementById('hud-bar');
const hudGammaEl  = document.getElementById('hud-gamma');
const hudTauEl    = document.getElementById('hud-tau');
const hudSystemEl = document.getElementById('hud-system');
const hudNearestEl= document.getElementById('hud-nearest');
const hudDistEl   = document.getElementById('hud-dist');
const hudHintEl   = document.getElementById('hud-hint');
const reticleEl   = document.getElementById('reticle');
const proxPopup   = document.getElementById('proximity-popup');
const proxName    = document.getElementById('prox-name');

let expVel = 0, expShipTime = 0;
let yaw = 0, pitch = 0;
const expFwd = new THREE.Vector3(0,0,-1);
let mouseLocked = false;
let expKeys = new Set();
const C_EXP = 120;
let proxTarget = null, proxTimeout = null;

document.getElementById('explorer-back').addEventListener('click', () => exitToSystem());
document.getElementById('prox-go').addEventListener('click', () => {
  if (proxTarget) startExplorerAutopilot(proxTarget);
});

let explorerAP = null;

function startExplorer() {
  phase = 'explorer';
  expVel = 0; expShipTime = 0;
  yaw = 0; pitch = .15;
  updateExpFwd();

  camera.position.set(0, 6, 28);
  camera.lookAt(0, 0, 0);

  explorerHud.classList.remove('hidden');
  reticleEl.classList.remove('hidden');
  hudSystemEl.textContent = activeSection.name;

  // Enable mouse-look capture (gracefully handles sandboxed environments)
  try {
    const PLK = 'request'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k';
    const lockFn = canvas[PLK] || canvas['moz'+PLK];
    if (lockFn) lockFn.call(canvas);
  } catch(e) { /* mouse-look unavailable in this context */ }
}

document.addEventListener('pointer'+'lockchange', () => {
  mouseLocked = document["pointer"+"LockElement"] === canvas;
  hudHintEl.textContent = mouseLocked
    ? 'WASD/ARROWS · MOUSE to look · SHIFT brake · CLICK planet to dock'
    : 'Click screen to enable mouse look';
});

document.addEventListener('mousemove', e => {
  if (phase !== 'explorer' || !mouseLocked) return;
  yaw   -= e.movementX * 0.0025;
  pitch  = Math.max(-Math.PI*.42, Math.min(Math.PI*.42, pitch - e.movementY*.0025));
  updateExpFwd();
  explorerAP = null; // manual look cancels autopilot
  proxPopup.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  expKeys.add(e.key.toLowerCase());
  if (e.key === 'Escape' && phase === 'explorer') { const epf = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k']; if (epf) epf.call(document); explorerAP = null; }
});
document.addEventListener('keyup', e => expKeys.delete(e.key.toLowerCase()));

function updateExpFwd() {
  expFwd.set(Math.sin(yaw)*Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw)*Math.cos(pitch)).normalize();
}

// Click on planet in explorer
canvas.addEventListener('click', e => {
  if (phase !== 'explorer') return;
  mouse.x = (e.clientX/innerWidth)*2-1;
  mouse.y = -(e.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const allSpheres = systemPlanetObjects.map(o=>o.sphere).concat([systemStarObj]);
  const hits = raycaster.intersectObjects(allSpheres);
  if (hits.length) {
    const hit = hits[0].object;
    if (hit.userData.isStar) {
      startExplorerAutopilot({ pos: new THREE.Vector3(0,0,0), data: activeSection.star, isStar: true });
    } else {
      const obj = systemPlanetObjects.find(o=>o.sphere===hit);
      if (obj) startExplorerAutopilot({ pos: obj.worldPos.clone(), data: obj.data, isStar: false });
    }
  }
});

function startExplorerAutopilot(target) {
  explorerAP = target;
  proxPopup.classList.add('hidden');
}

function updateExplorer(dt) {
  if (phase !== 'explorer') return;

  // WASD / arrows
  const STEER = 1.6;
  if (expKeys.has('arrowleft')  || expKeys.has('a')) { yaw -= STEER*dt; updateExpFwd(); explorerAP = null; }
  if (expKeys.has('arrowright') || expKeys.has('d')) { yaw += STEER*dt; updateExpFwd(); explorerAP = null; }
  if (expKeys.has('arrowup')    || expKeys.has('w')) { pitch = Math.min(pitch+STEER*.6*dt, Math.PI*.42); updateExpFwd(); explorerAP = null; }
  if (expKeys.has('arrowdown')  || expKeys.has('s')) { pitch = Math.max(pitch-STEER*.6*dt,-Math.PI*.42); updateExpFwd(); explorerAP = null; }
  if (expKeys.has(' ') || expKeys.has('q')) expVel = Math.min(expVel + C_EXP*dt*.8, C_EXP*.9);
  if (expKeys.has('e') || expKeys.has('x')) expVel = Math.max(expVel - C_EXP*dt*.8, -C_EXP*.25);
  if (expKeys.has('shift')) expVel *= .88;

  // Autopilot
  if (explorerAP) {
    const dir = explorerAP.pos.clone().sub(camera.position);
    const dist = dir.length();
    const radius = explorerAP.isStar ? activeSection.starRadius : .9;
    if (dist < radius + 5) {
      showExplorerInfo(explorerAP);
      explorerAP = null;
    } else {
      dir.normalize();
      expFwd.lerp(dir, .03).normalize();
      yaw = Math.atan2(expFwd.x, -expFwd.z);
      pitch = Math.asin(Math.max(-1, Math.min(1, expFwd.y)));
      expVel += (Math.min(C_EXP*.6, dist*.4) - expVel) * .04;
    }
  }

  expVel = Math.max(-C_EXP*.25, Math.min(expVel, C_EXP*.9));
  expVel *= .985;
  if (Math.abs(expVel) < .02) expVel = 0;

  camera.position.addScaledVector(expFwd, expVel*dt);

  // Camera look: follow expFwd with slight mouse sway
  const lookTarget = camera.position.clone().add(expFwd.clone().multiplyScalar(20));
  camera.lookAt(lookTarget);

  const beta = Math.abs(expVel)/C_EXP;
  const gamma = 1/Math.sqrt(1-beta*beta);
  expShipTime += dt/gamma;

  // Star shader update
  bgStarMat.uniforms.uBeta.value = beta;
  bgStarMat.uniforms.uFwd.value.copy(expFwd);

  // HUD
  hudVelEl.textContent = beta.toFixed(3)+'c';
  hudBarEl.style.width = (beta*100/.9)+'%';
  hudGammaEl.textContent = gamma.toFixed(3);
  const m=Math.floor(expShipTime/60), s=expShipTime%60;
  hudTauEl.textContent = String(m).padStart(2,'0')+':'+s.toFixed(1).padStart(4,'0');

  hudVelEl.style.color = beta>.5?'#f472b6':beta>.25?'#a855f7':'#00d4ff';

  // Nearest planet check
  let nearestDist = Infinity, nearestObj = null;
  systemPlanetObjects.forEach(o => {
    const d = camera.position.distanceTo(o.worldPos);
    if (d < nearestDist) { nearestDist=d; nearestObj=o; }
  });
  // Also check star
  const starDist = camera.position.length();
  if (starDist < nearestDist) {
    nearestDist = starDist;
    hudNearestEl.textContent = activeSection.star.title;
    hudDistEl.textContent = nearestDist.toFixed(1)+' u';
  } else if (nearestObj) {
    hudNearestEl.textContent = nearestObj.data.title;
    hudDistEl.textContent = nearestDist.toFixed(1)+' u';
  }

  // Proximity popup when looking toward a planet
  checkProximityPopup();
}

function checkProximityPopup() {
  if (explorerAP) { proxPopup.classList.add('hidden'); return; }

  let bestAngle = .92, bestObj = null;
  const camFwd = expFwd;

  systemPlanetObjects.forEach(o => {
    const toObj = o.worldPos.clone().sub(camera.position).normalize();
    const dot = camFwd.dot(toObj);
    const dist = camera.position.distanceTo(o.worldPos);
    if (dot > .92 && dist > 3 && dot > bestAngle) {
      bestAngle = dot;
      bestObj = o;
    }
  });

  // Also check star
  const toStar = new THREE.Vector3().sub(camera.position).normalize();
  const starDot = camFwd.dot(toStar);
  if (starDot > .93 && camera.position.length() > activeSection.starRadius+3) {
    bestObj = { data: activeSection.star, worldPos: new THREE.Vector3(), isStar: true };
  }

  if (bestObj && bestObj !== proxTarget) {
    proxTarget = bestObj;
    proxName.textContent = bestObj.data.title;
    proxPopup.classList.remove('hidden');
    clearTimeout(proxTimeout);
    proxTimeout = setTimeout(() => {
      proxPopup.classList.add('hidden');
      proxTarget = null;
    }, 3000);
  } else if (!bestObj && proxTarget) {
    proxPopup.classList.add('hidden');
    proxTarget = null;
  }
}

function showExplorerInfo(target) {
  const d = target.data;
  infoLabelEl.textContent = d.label || 'PLANET';
  infoTitleEl.textContent = d.title;
  infoSubEl.textContent   = d.sub || '';
  infoSubEl.style.display = d.sub ? 'block' : 'none';
  infoBodyEl.innerHTML    = d.body || '';
  infoCardEl.classList.remove('hidden');
}

document.getElementById('info-close').addEventListener('click', () => {
  infoCardEl.classList.add('hidden');
  if (phase === 'guided' && tourQueue.length > 0) {
    setTimeout(flyToNextTourStop, 800);
  }
});

/* ─────────────────────────────────────────────────────────
   EXIT FLOWS
   ───────────────────────────────────────────────────────── */
function exitToSystem() {
  phase = 'system';
  tourHud.classList.add('hidden');
  explorerHud.classList.add('hidden');
  reticleEl.classList.add('hidden');
  infoCardEl.classList.add('hidden');
  proxPopup.classList.add('hidden');
  if (document['pointer'+'LockElement'] === canvas) { const ef = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k']; if (ef) ef.call(document); }

  camera.position.set(0, 18, 32);
  camera.lookAt(0, 0, 0);
  document.getElementById('system-ui').classList.remove('hidden');
  tourVel = 0; expVel = 0; scrollAccumTour = 0;
  tourAP = null; explorerAP = null;
}

function exitToHome() {
  phase = 'home';
  document.getElementById('system-ui').classList.add('hidden');
  explorerHud.classList.add('hidden');
  tourHud.classList.add('hidden');
  reticleEl.classList.add('hidden');
  infoCardEl.classList.add('hidden');
  proxPopup.classList.add('hidden');
  if (document['pointer'+'LockElement'] === canvas) { const ef = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k']; if (ef) ef.call(document); }

  if (systemGroup) { scene.remove(systemGroup); systemGroup = null; }
  systemPlanetObjects = [];

  document.getElementById('home-ui').classList.remove('hidden');
  // Restore orrery
  orrery.visible = true;
  orreryNodes.forEach(n => { n.labelEl.style.pointerEvents = 'auto'; });
  camera.position.set(0, 4, 22);
  camera.lookAt(0, 0, 0);
  expVel = 0; tourVel = 0; bgStarMat.uniforms.uBeta.value = 0;
}

/* ─────────────────────────────────────────────────────────
   HOME CAMERA ORBIT
   ───────────────────────────────────────────────────────── */
let homeAngle = 0;

function updateHome(dt) {
  homeAngle += dt * .12;
  const r = 22, h = 4;
  camera.position.set(Math.sin(homeAngle)*r, h + Math.sin(homeAngle*.4)*2, Math.cos(homeAngle)*r);
  camera.lookAt(0, 0, 0);

  // Orrery slow spin
  orrery.rotation.y += dt * .06;

  // Update label positions
  orreryNodes.forEach(({ group, labelEl, section }) => {
    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    worldPos.project(camera);

    const sx = (worldPos.x*.5+.5)*innerWidth;
    const sy = (-.5*worldPos.y+.5)*innerHeight;
    labelEl.style.left = sx+'px';
    labelEl.style.top  = (sy-22)+'px';
    labelEl.style.opacity = worldPos.z < 1 ? '1' : '0';

    // Hover glow
    const isHovered = orreryHovered && orreryHovered.section===section;
    group.children[0].material.uniforms.uStr.value = isHovered ? 3.5 : 1.8;
    group.scale.setScalar(isHovered ? 1.18 : 1);
  });
}

/* ─────────────────────────────────────────────────────────
   SYSTEM ORBIT ANIMATION (all modes while in system)
   ───────────────────────────────────────────────────────── */
function updateSystemOrbits(t) {
  if (!systemGroup) return;
  systemPlanetObjects.forEach(({ group, data, worldPos }) => {
    group.userData.orbitAngle = (group.userData.orbitAngle || 0) + data.orbitSpeed * .008;
    group.position.set(
      data.orbitR * Math.cos(group.userData.orbitAngle),
      0,
      data.orbitR * Math.sin(group.userData.orbitAngle)
    );
    // world position (group is child of systemGroup, which is at origin)
    worldPos.copy(group.position);

    // Moon orbits
    group.children.forEach(child => {
      if (!child.userData.orbitR) return;
      const a = t * child.userData.speed + child.userData.off;
      child.position.set(Math.cos(a)*child.userData.orbitR, Math.sin(a)*.15*child.userData.orbitR, Math.sin(a)*child.userData.orbitR);
    });

    // Planet self-rotation
    group.children[0] && (group.children[0].rotation.y = t*.15);
  });
}

/* ─────────────────────────────────────────────────────────
   SYSTEM MODE — revolving orbit camera when choosing
   ───────────────────────────────────────────────────────── */
let systemOrbitAngle = 0;

function updateSystemCamera(dt) {
  if (phase !== 'system') return;
  systemOrbitAngle += dt*.08;
  camera.position.set(Math.sin(systemOrbitAngle)*30, 16, Math.cos(systemOrbitAngle)*30);
  camera.lookAt(0, 0, 0);
}

/* ─────────────────────────────────────────────────────────
   MAIN LOOP
   ───────────────────────────────────────────────────────── */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt  = Math.min(clock.getDelta(), .05);
  const t   = clock.getElapsedTime();

  // Background stars always spin gently
  bgStars.rotation.y = t * .001;

  // Update glow uniforms
  orrery.traverse(obj => {
    if (obj.material?.uniforms?.uTime) obj.material.uniforms.uTime.value = t;
  });
  if (systemGroup) {
    systemGroup.traverse(obj => {
      if (obj.material?.uniforms?.uTime) obj.material.uniforms.uTime.value = t;
    });
  }

  if (phase === 'home')     { updateHome(dt); }
  if (phase === 'warp')     { updateWarp(dt); }
  if (phase === 'system')   { updateSystemCamera(dt); updateSystemOrbits(t); }
  if (phase === 'guided')   { updateGuidedTour(dt); updateSystemOrbits(t); }
  if (phase === 'explorer') { updateExplorer(dt); updateSystemOrbits(t); }

  renderer.render(scene, camera);
}

/* ─────────────────────────────────────────────────────────
   RESIZE
   ───────────────────────────────────────────────────────── */
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ─────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────── */
// Hide orrery labels from DOM until home phase shown
orreryNodes.forEach(n => { n.labelEl.style.opacity='0'; });

// Console egg
console.log('%c🌌 Hello from the console. tanishwas@gmail.com', 'font-size:13px;color:#00d4ff;background:#020209;padding:8px;');

animate();
