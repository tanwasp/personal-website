/* ═══════════════════════════════════════════════════════════
   TANISH'S UNIVERSE v5.1
   Five phases:
     HOME      — holographic orrery, camera revolves
     WARP      — spaceship warp tunnel transition
     SYSTEM    — star + planets visible, mode chooser at sides
     GUIDED    — scroll-thrust, sequential, info cards
     EXPLORER  — arrows = translate, mouse = look, prox popups
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
   STAR-LIKE ORRERY NODE — uses Points instead of a sphere
   Renders as a bright spiky star point with diffraction rays
   ───────────────────────────────────────────────────────── */
function makeStarPoint(color) {
  const group = new THREE.Group();

  // Core — sharp diffraction-spike star (like a real telescope photo)
  const coreMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime:  { value: 0 },
      uScale: { value: 1.0 }
    },
    vertexShader: `
      uniform float uScale;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 80.0 * uScale * (200.0 / max(-mv.z, 1.0));
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uTime;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;

        // Diffraction spikes: 4 perpendicular rays (like a real star photo)
        float ax = abs(uv.x);
        float ay = abs(uv.y);
        // Horizontal spike
        float spikeH = exp(-ay * 60.0) * exp(-ax * 3.0) * smoothstep(0.5, 0.0, ax);
        // Vertical spike
        float spikeV = exp(-ax * 60.0) * exp(-ay * 3.0) * smoothstep(0.5, 0.0, ay);
        // Diagonal spikes (fainter)
        float diag1 = exp(-abs(uv.x - uv.y) * 60.0) * exp(-d * 3.0) * 0.5;
        float diag2 = exp(-abs(uv.x + uv.y) * 60.0) * exp(-d * 3.0) * 0.5;

        // Bright point core
        float core = exp(-d * 40.0);

        // Soft inner glow
        float glow = exp(-d * 12.0) * 0.4;

        float twinkle = 0.88 + 0.12 * sin(uTime * 2.3);
        float brightness = clamp(core + glow + spikeH + spikeV + diag1 + diag2, 0.0, 1.0);
        gl_FragColor = vec4(uColor + vec3(0.4, 0.4, 0.4) * core, brightness * twinkle);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]), 3));
  const corePoint = new THREE.Points(coreGeo, coreMat);
  group.add(corePoint);

  // Soft glow halo behind the point
  const haloMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime:  { value: 0 }
    },
    vertexShader: `
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 120.0 * (200.0 / max(-mv.z, 1.0));
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uTime;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float g = exp(-d * 8.0) * 0.25;
        float twinkle = 0.7 + 0.3 * sin(uTime * 1.7 + 1.2);
        gl_FragColor = vec4(uColor, g * twinkle);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const haloGeo = new THREE.BufferGeometry();
  haloGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]), 3));
  const haloPoint = new THREE.Points(haloGeo, haloMat);
  group.add(haloPoint);

  // Store refs for animation
  group.userData.coreMat = coreMat;
  group.userData.haloMat = haloMat;

  return group;
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

// Central star of the orrery — also star-like
const orreryCentralStar = makeStarPoint(0xffffff);
// Slightly larger than section nodes
orreryCentralStar.children.forEach(c => {
  if (c.material?.uniforms?.uScale) c.material.uniforms.uScale.value = 1.1;
});
orrery.add(orreryCentralStar);
// Subtle atmo glow for the central star
orrery.add(makeAtmo(0.6, 0x88ddff));

// Orrery node objects — one per section
const orreryNodes = []; // { group, starGroup, labelEl, section }

SECTIONS.forEach(sec => {
  const group = new THREE.Group();
  group.position.copy(sec.orreryPos);

  // Star-like node instead of a sphere
  const starGroup = makeStarPoint(sec.color);
  starGroup.children.forEach(c => {
    if (c.material?.uniforms?.uScale) c.material.uniforms.uScale.value = 1.3;
  });
  group.add(starGroup);

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
  orreryNodes.push({ group, starGroup, labelEl: el, section: sec });
});

// Disable raycasting on all non-node orrery children
orrery.children.forEach(child => {
  if (!orreryNodes.find(n => n.group === child)) {
    child.raycast = () => {};
    if (child.children) child.children.forEach(c => { c.raycast = () => {}; });
  }
});

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
  const hits = raycaster.intersectObjects(orrery.children, true);
  if (hits.length) {
    let obj = hits[0].object;
    while (obj.parent && obj.parent !== orrery) obj = obj.parent;
    const node = orreryNodes.find(n => n.group === obj);
    if (node) startWarp(node.section);
  }
}

/* ─────────────────────────────────────────────────────────
   ██████  WARP TRANSITION — spaceship hyperspace style
   ───────────────────────────────────────────────────────── */
const warpOverlay = document.getElementById('warp-overlay');
const warpCanvas  = document.getElementById('warp-canvas');
const warpDestEl  = document.getElementById('warp-dest');
const wCtx = warpCanvas.getContext('2d');

let warpActive = false, warpT = 0, warpStreaks = [], warpStartTime = 0;
let warpShake = 0;

/* Warp has 3 phases:
   0.0–0.4 : ENGAGE  — streaks emerge from centre, stars stretch, cockpit shake
   0.4–0.7 : TUNNEL  — full hyperspace tunnel rings + solid colour flash, max shake
   0.7–1.0 : ARRIVE  — tunnel closes, flash white, everything fades
*/
function startWarp(section) {
  if (phase === 'warp') return;
  phase = 'warp';
  activeSection = section;
  warpDestEl.textContent = section.name.toUpperCase();
  warpOverlay.classList.remove('hidden');
  document.getElementById('home-ui').classList.add('hidden');

  // Build streaks — radiate outward from centre
  warpStreaks = [];
  for (let i = 0; i < 500; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = 5 + Math.random() * 80;
    const colorRoll = Math.random();
    const color = colorRoll < .45 ? '#00d4ff' : colorRoll < .75 ? '#a855f7' : '#ffffff';
    warpStreaks.push({
      angle,
      dist,            // how far from centre the streak starts
      baseLen: 2 + Math.random() * 5,
      speed: 0.6 + Math.random() * 2.8,
      color,
      alpha: 0.25 + Math.random() * 0.75,
      thickness: 0.4 + Math.random() * 1.4,
      // rings for tunnel phase
      ringR: 30 + Math.random() * 220,
      ringZ: Math.random()
    });
  }

  warpT = 0;
  warpStartTime = performance.now();
  warpActive = true;
  warpShake = 0;

  setTimeout(() => {
    if (warpActive) {
      warpActive = false;
      warpOverlay.classList.add('hidden');
      document.getElementById('warp-overlay').style.transform = '';
      enterSystem(activeSection);
    }
  }, 2600);
}

function updateWarp(dt) {
  if (!warpActive) return;
  warpT = (performance.now() - warpStartTime) / 1000;

  const W = innerWidth, H = innerHeight;
  const cx = W / 2, cy = H / 2;
  const progress = Math.min(warpT / 2.2, 1);

  // Ease: fast build-up, hold tunnel, soft exit
  const engageP  = Math.min(progress / 0.35, 1);                        // 0–0.35s
  const tunnelP  = Math.max(0, Math.min((progress - 0.35) / 0.35, 1));  // 0.35–0.7s
  const arriveP  = Math.max(0, (progress - 0.7) / 0.3);                  // 0.7–1.0

  const easeIn = t => t * t * (3 - 2 * t);
  const engE   = easeIn(engageP);
  const tunE   = easeIn(tunnelP);

  warpCanvas.width  = W;
  warpCanvas.height = H;

  // ── Background trail fill
  const trailAlpha = 0.12 + tunE * 0.35;
  wCtx.fillStyle = `rgba(2,2,9,${trailAlpha})`;
  wCtx.fillRect(0, 0, W, H);

  // ── Cockpit shake (peaks at tunnel start, eases at arrival)
  warpShake = (engE * 4 + tunE * 8) * (1 - arriveP * 2);
  const ox = (Math.random() - .5) * warpShake;
  const oy = (Math.random() - .5) * warpShake;

  wCtx.save();
  wCtx.translate(cx + ox, cy + oy);

  // ── STREAKS (engage + hold)
  if (progress < 0.78) {
    warpStreaks.forEach(s => {
      // How far from centre the streak tip is
      const tipDist  = s.dist * (1 + engE * 12 + tunE * 30);
      const tailDist = tipDist - s.baseLen * (1 + engE * 50 + tunE * 120) * s.speed;
      if (tailDist < 0 && tipDist < 0) return;

      const tipX  = Math.cos(s.angle) * tipDist;
      const tipY  = Math.sin(s.angle) * tipDist;
      const tailX = Math.cos(s.angle) * Math.max(0, tailDist);
      const tailY = Math.sin(s.angle) * Math.max(0, tailDist);

      const hex = s.color.replace('#','');
      const r = parseInt(hex.substring(0,2),16);
      const g = parseInt(hex.substring(2,4),16);
      const b = parseInt(hex.substring(4,6),16);
      const alpha = s.alpha * (1 - arriveP);

      const grad = wCtx.createLinearGradient(tailX, tailY, tipX, tipY);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},${alpha})`);

      wCtx.strokeStyle = grad;
      wCtx.lineWidth = s.thickness * (1 + tunE * 2);
      wCtx.beginPath();
      wCtx.moveTo(tailX, tailY);
      wCtx.lineTo(tipX, tipY);
      wCtx.stroke();
    });
  }

  // ── TUNNEL RINGS (during tunnel phase)
  if (tunE > 0) {
    const ringCount = 8;
    for (let i = 0; i < ringCount; i++) {
      const t = ((warpT * 1.8 + i / ringCount) % 1);
      const z = 1 - t;               // 0=far(small), 1=near(big)
      const ringR = z * z * 340 + 10;
      const ringAlpha = (1 - z) * tunE * 0.7 * (1 - arriveP * 1.5);
      if (ringAlpha <= 0) continue;

      // Pick ring color from section
      const secColor = new THREE.Color(activeSection.color);
      const rr = Math.floor(secColor.r * 255);
      const gg = Math.floor(secColor.g * 255);
      const bb = Math.floor(secColor.b * 255);

      wCtx.strokeStyle = `rgba(${rr},${gg},${bb},${ringAlpha})`;
      wCtx.lineWidth = (1 - z) * 2.5 + 0.5;
      wCtx.beginPath();
      wCtx.ellipse(0, 0, ringR, ringR * 0.5, 0, 0, Math.PI * 2);
      wCtx.stroke();

      // Radial lines on ring
      if (i % 2 === 0) {
        for (let j = 0; j < 24; j++) {
          const a = (j / 24) * Math.PI * 2;
          const r1 = ringR * 0.92, r2 = ringR;
          wCtx.strokeStyle = `rgba(${rr},${gg},${bb},${ringAlpha * 0.4})`;
          wCtx.lineWidth = 0.5;
          wCtx.beginPath();
          wCtx.moveTo(Math.cos(a)*r1, Math.sin(a)*r1*0.5);
          wCtx.lineTo(Math.cos(a)*r2, Math.sin(a)*r2*0.5);
          wCtx.stroke();
        }
      }
    }

    // Central vanishing glow
    const cgAlpha = tunE * 0.6 * (1 - arriveP * 2);
    if (cgAlpha > 0) {
      const secColor = new THREE.Color(activeSection.color);
      const cg = wCtx.createRadialGradient(0, 0, 0, 0, 0, 120);
      cg.addColorStop(0, `rgba(${Math.floor(secColor.r*255)},${Math.floor(secColor.g*255)},${Math.floor(secColor.b*255)},${cgAlpha})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      wCtx.fillStyle = cg;
      wCtx.beginPath();
      wCtx.arc(0, 0, 120, 0, Math.PI * 2);
      wCtx.fill();
    }
  }

  // ── ARRIVAL FLASH
  if (arriveP > 0) {
    const flashA = arriveP < 0.5 ? arriveP * 2 : 2 - arriveP * 2;
    wCtx.fillStyle = `rgba(255,255,255,${flashA * 0.6})`;
    wCtx.fillRect(-cx, -cy, W, H);
  }

  wCtx.restore();

  if (progress >= 1) {
    warpActive = false;
    warpOverlay.classList.add('hidden');
    warpOverlay.style.transform = '';
    enterSystem(activeSection);
  }
}

/* ─────────────────────────────────────────────────────────
   ██████  SYSTEM VIEW
   ───────────────────────────────────────────────────────── */
let systemGroup = null;
let systemPlanetObjects = [];
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

  // Hide orrery
  orreryNodes.forEach(n => { n.labelEl.style.opacity = '0'; n.labelEl.style.pointerEvents = 'none'; });
  orrery.visible = false;

  camera.position.set(0, 18, 32);
  camera.lookAt(0, 0, 0);

  const titleEl = document.getElementById('system-title');
  const subtitleEl = document.getElementById('system-subtitle');
  titleEl.textContent = section.name;
  subtitleEl.textContent = section.subtitle;

  document.getElementById('system-ui').classList.remove('hidden');
}

document.getElementById('btn-back').addEventListener('click', () => exitToHome());
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
   Scroll thrusts the ship forward toward the current target.
   On arrival, info card pops up. CLOSE → flies to next.
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
let tourArrived = false;
const C_TOUR = 60;
let scrollAccumTour = 0;

document.getElementById('tour-back').addEventListener('click', () => exitToSystem());
document.getElementById('zoom-close').addEventListener('click', () => zoomOverlay.classList.add('hidden'));

window.addEventListener('wheel', e => {
  if (phase !== 'guided') return;
  e.preventDefault();
  // Only accept scroll thrust when we have an active AP target (not at info card)
  if (tourAP) scrollAccumTour += e.deltaY * 0.9;
}, {passive:false});

function startGuidedTour() {
  phase = 'guided';
  tourVel = 0; tourShipTime = 0; scrollAccumTour = 0; tourArrived = false;
  tourHud.classList.remove('hidden');

  camera.position.set(0, 3, activeSection.starRadius + 12);
  camera.lookAt(0, 0, 0);

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
    infoCardEl.classList.add('hidden');
    tourHud.classList.add('hidden');
    exitToSystem();
    return;
  }
  infoCardEl.classList.add('hidden');
  tourArrived = false;
  scrollAccumTour = 0;

  const stop = tourQueue.shift();
  const total = 1 + activeSection.planets.length;
  const idx   = total - tourQueue.length;
  tourStopEl.textContent = `${idx} / ${total}`;
  tourHintEl.textContent  = `SCROLL to thrust  ·  heading to ${stop.title}`;

  const arrivalDist = (stop.isStar ? activeSection.starRadius : .9) + 6;
  const offset = new THREE.Vector3(0, 1.2, arrivalDist);
  tourAP = {
    target: stop.pos.clone().add(offset),
    data:   stop,
    onArrive: () => {
      tourArrived = true;
      showTourInfo(stop);
      tourHintEl.textContent = 'CLOSE card to continue';
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
  infoBodyEl.innerHTML    = d.body || '';
  infoCardEl.classList.remove('hidden');
}

function updateGuidedTour(dt) {
  if (phase !== 'guided') return;

  if (tourAP) {
    const dir  = tourAP.target.clone().sub(camera.position);
    const dist = dir.length();

    // Camera smoothly looks toward destination
    const fwd = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    fwd.lerp(dir.clone().normalize(), 0.04).normalize();
    camera.lookAt(camera.position.clone().add(fwd.multiplyScalar(10)));

    if (dist < 1.2) {
      tourAP.onArrive();
      tourAP = null;
      tourVel *= 0.05;
    } else {
      // Scroll drives thrust toward target
      const thrustInput = scrollAccumTour;
      scrollAccumTour  *= 0.75;

      const autoSpeed = Math.min(C_TOUR * 0.5, dist * 0.35);
      tourVel += (autoSpeed - tourVel) * 0.04;
      if (Math.abs(thrustInput) > 0.5) tourVel += thrustInput * dt * 6;
    }
  } else {
    // Coasting / arrived — decay
    tourVel *= 0.92;
    scrollAccumTour = 0;
  }

  tourVel = Math.max(-C_TOUR * .2, Math.min(tourVel, C_TOUR * .9));
  tourVel *= 0.985;
  if (Math.abs(tourVel) < .01) tourVel = 0;

  const fwd2 = new THREE.Vector3();
  camera.getWorldDirection(fwd2);
  camera.position.addScaledVector(fwd2, tourVel * dt);

  const beta = Math.abs(tourVel) / C_TOUR;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  tourShipTime += dt / gamma;
  tourVelEl.textContent  = beta.toFixed(3) + 'c';
  tourBarEl.style.width  = (beta * 100 / .9) + '%';
}

/* ─────────────────────────────────────────────────────────
   ██████  EXPLORER MODE
   Arrow keys / WASD = translate (forward/back/strafe)
   Mouse (pointer-locked) = look around
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

let expVel = 0, expStrafeVel = 0, expShipTime = 0;
let yaw = 0, pitch = 0;
const expFwd   = new THREE.Vector3(0,0,-1);
const expRight = new THREE.Vector3(1,0,0);
const expUp    = new THREE.Vector3(0,1,0);
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
  expVel = 0; expStrafeVel = 0; expShipTime = 0;
  yaw = 0; pitch = .08;
  updateExpOrientation();

  camera.position.set(0, 6, 28);
  camera.lookAt(0, 0, 0);

  explorerHud.classList.remove('hidden');
  reticleEl.classList.remove('hidden');
  hudSystemEl.textContent = activeSection.name;

  // Request pointer lock
  try {
    const PLK = 'request' + 'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k';
    const lockFn = canvas[PLK] || canvas['moz'+PLK];
    if (lockFn) lockFn.call(canvas);
  } catch(e) {}
}

document.addEventListener('pointer'+'lockchange', () => {
  mouseLocked = document['pointer'+'LockElement'] === canvas;
  hudHintEl.textContent = mouseLocked
    ? 'ARROWS/WASD move  ·  MOUSE look  ·  SHIFT brake'
    : 'Click screen to capture mouse look';
});

document.addEventListener('mousemove', e => {
  if (phase !== 'explorer' || !mouseLocked) return;
  yaw   -= e.movementX * 0.0022;
  pitch  = Math.max(-Math.PI*.4, Math.min(Math.PI*.4, pitch - e.movementY * .0022));
  updateExpOrientation();
  explorerAP = null;
  proxPopup.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  expKeys.add(e.key.toLowerCase());
  if (e.key === 'Escape' && phase === 'explorer') {
    const epf = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k'];
    if (epf) epf.call(document);
    explorerAP = null;
  }
});
document.addEventListener('keyup', e => expKeys.delete(e.key.toLowerCase()));

function updateExpOrientation() {
  // Forward vector from yaw + pitch
  expFwd.set(
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    -Math.cos(yaw) * Math.cos(pitch)
  ).normalize();

  // Right = expFwd × worldUp (then re-normalise)
  expRight.crossVectors(expFwd, new THREE.Vector3(0,1,0)).normalize();
  if (expRight.length() < 0.001) expRight.set(1,0,0);

  expUp.crossVectors(expRight, expFwd).normalize();
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

  const THRUST_ACC  = C_EXP * 0.9;   // forward/back acceleration
  const STRAFE_ACC  = C_EXP * 0.6;   // strafe acceleration
  const BRAKE       = 0.88;

  // ── Forward / Backward  (Arrow Up/Down or W/S)
  const thrustFwd = expKeys.has('arrowup')   || expKeys.has('w');
  const thrustBck = expKeys.has('arrowdown') || expKeys.has('s');
  if (thrustFwd)  expVel = Math.min(expVel + THRUST_ACC * dt, C_EXP * .9);
  if (thrustBck)  expVel = Math.max(expVel - THRUST_ACC * dt, -C_EXP * .25);

  // ── Strafe left / right  (Arrow Left/Right or A/D)
  const strafeL = expKeys.has('arrowleft')  || expKeys.has('a');
  const strafeR = expKeys.has('arrowright') || expKeys.has('d');
  if (strafeL)  expStrafeVel = Math.max(expStrafeVel - STRAFE_ACC * dt, -C_EXP * .4);
  if (strafeR)  expStrafeVel = Math.min(expStrafeVel + STRAFE_ACC * dt,  C_EXP * .4);

  // ── Space/Q = thrust forward, E/X = brake
  if (expKeys.has(' ') || expKeys.has('q')) expVel = Math.min(expVel + THRUST_ACC * dt, C_EXP * .9);
  if (expKeys.has('e') || expKeys.has('x')) expVel = Math.max(expVel - THRUST_ACC * dt, -C_EXP * .25);
  if (expKeys.has('shift'))  { expVel *= BRAKE; expStrafeVel *= BRAKE; }

  // Autopilot
  if (explorerAP) {
    const dir  = explorerAP.pos.clone().sub(camera.position);
    const dist = dir.length();
    const radius = explorerAP.isStar ? activeSection.starRadius : .9;
    if (dist < radius + 5) {
      showExplorerInfo(explorerAP);
      explorerAP = null;
    } else {
      dir.normalize();
      expFwd.lerp(dir, .03).normalize();
      yaw   = Math.atan2(expFwd.x, -expFwd.z);
      pitch = Math.asin(Math.max(-1, Math.min(1, expFwd.y)));
      updateExpOrientation();
      expVel += (Math.min(C_EXP * .6, dist * .4) - expVel) * .04;
      expStrafeVel *= 0.9;
    }
  }

  // Decay
  expVel       = Math.max(-C_EXP*.25, Math.min(expVel, C_EXP*.9));
  expStrafeVel = Math.max(-C_EXP*.4,  Math.min(expStrafeVel, C_EXP*.4));
  if (!thrustFwd && !thrustBck && !expKeys.has(' ') && !expKeys.has('q') && !expKeys.has('e') && !expKeys.has('x') && !explorerAP) {
    expVel *= 0.985;
  }
  if (!strafeL && !strafeR) expStrafeVel *= 0.88;

  if (Math.abs(expVel)       < .02) expVel       = 0;
  if (Math.abs(expStrafeVel) < .02) expStrafeVel = 0;

  // Move camera
  camera.position.addScaledVector(expFwd,   expVel       * dt);
  camera.position.addScaledVector(expRight, expStrafeVel * dt);

  // Camera look
  camera.lookAt(camera.position.clone().add(expFwd.clone().multiplyScalar(20)));

  // Relativistic HUD (based on combined speed)
  const totalSpeed = Math.sqrt(expVel*expVel + expStrafeVel*expStrafeVel);
  const beta  = Math.min(totalSpeed / C_EXP, 0.9999);
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  expShipTime += dt / gamma;

  bgStarMat.uniforms.uBeta.value = beta;
  bgStarMat.uniforms.uFwd.value.copy(expFwd);

  hudVelEl.textContent   = beta.toFixed(3) + 'c';
  hudBarEl.style.width   = (beta * 100 / .9) + '%';
  hudGammaEl.textContent = gamma.toFixed(3);
  const m = Math.floor(expShipTime/60), s = expShipTime % 60;
  hudTauEl.textContent   = String(m).padStart(2,'0') + ':' + s.toFixed(1).padStart(4,'0');
  hudVelEl.style.color   = beta > .5 ? '#f472b6' : beta > .25 ? '#a855f7' : '#00d4ff';

  // Nearest planet
  let nearestDist = Infinity, nearestObj = null;
  systemPlanetObjects.forEach(o => {
    const d = camera.position.distanceTo(o.worldPos);
    if (d < nearestDist) { nearestDist = d; nearestObj = o; }
  });
  const starDist = camera.position.length();
  if (starDist < nearestDist) {
    hudNearestEl.textContent = activeSection.star.title;
    hudDistEl.textContent    = starDist.toFixed(1) + ' u';
  } else if (nearestObj) {
    hudNearestEl.textContent = nearestObj.data.title;
    hudDistEl.textContent    = nearestDist.toFixed(1) + ' u';
  }

  checkProximityPopup();
}

function checkProximityPopup() {
  if (explorerAP) { proxPopup.classList.add('hidden'); return; }

  let bestAngle = .93, bestObj = null;

  systemPlanetObjects.forEach(o => {
    const toObj = o.worldPos.clone().sub(camera.position).normalize();
    const dot   = expFwd.dot(toObj);
    const dist  = camera.position.distanceTo(o.worldPos);
    if (dot > .93 && dist > 3 && dot > bestAngle) { bestAngle = dot; bestObj = o; }
  });

  const toStar = new THREE.Vector3().sub(camera.position).normalize();
  const starDot = expFwd.dot(toStar);
  if (starDot > .93 && camera.position.length() > activeSection.starRadius + 3) {
    bestObj = { data: activeSection.star, worldPos: new THREE.Vector3(), isStar: true };
  }

  if (bestObj && bestObj !== proxTarget) {
    proxTarget = bestObj;
    proxName.textContent = bestObj.data.title;
    proxPopup.classList.remove('hidden');
    clearTimeout(proxTimeout);
    proxTimeout = setTimeout(() => { proxPopup.classList.add('hidden'); proxTarget = null; }, 3000);
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
    setTimeout(flyToNextTourStop, 600);
  } else if (phase === 'guided' && tourQueue.length === 0) {
    setTimeout(() => { tourHud.classList.add('hidden'); exitToSystem(); }, 600);
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
  if (document['pointer'+'LockElement'] === canvas) {
    const ef = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k'];
    if (ef) ef.call(document);
  }
  camera.position.set(0, 18, 32);
  camera.lookAt(0, 0, 0);
  document.getElementById('system-ui').classList.remove('hidden');
  tourVel = 0; expVel = 0; expStrafeVel = 0; scrollAccumTour = 0;
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
  if (document['pointer'+'LockElement'] === canvas) {
    const ef = document['exit'+'P'+'o'+'i'+'n'+'t'+'e'+'r'+'L'+'o'+'c'+'k'];
    if (ef) ef.call(document);
  }
  if (systemGroup) { scene.remove(systemGroup); systemGroup = null; }
  systemPlanetObjects = [];

  document.getElementById('home-ui').classList.remove('hidden');
  orrery.visible = true;
  orreryNodes.forEach(n => { n.labelEl.style.pointerEvents = 'auto'; });
  camera.position.set(0, 4, 22);
  camera.lookAt(0, 0, 0);
  expVel = 0; expStrafeVel = 0; tourVel = 0;
  bgStarMat.uniforms.uBeta.value = 0;
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

  orrery.rotation.y += dt * .06;

  // Animate star node materials and update label positions
  const t = performance.now() / 1000;
  orreryNodes.forEach(({ group, starGroup, labelEl, section }) => {
    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    worldPos.project(camera);

    const sx = (worldPos.x*.5+.5)*innerWidth;
    const sy = (-.5*worldPos.y+.5)*innerHeight;
    labelEl.style.left = sx+'px';
    labelEl.style.top  = (sy-22)+'px';
    labelEl.style.opacity = worldPos.z < 1 ? '1' : '0';

    // Animate twinkle on star node shaders
    const isHovered = orreryHovered && orreryHovered.section === section;
    starGroup.children.forEach(c => {
      if (c.material?.uniforms?.uTime) c.material.uniforms.uTime.value = t;
      if (c.material?.uniforms?.uScale) c.material.uniforms.uScale.value = isHovered ? 2.2 : 1.0;
    });
    group.scale.setScalar(isHovered ? 1.2 : 1);
  });

  // Animate central star node too
  orreryCentralStar.children.forEach(c => {
    if (c.material?.uniforms?.uTime) c.material.uniforms.uTime.value = t;
  });
}

/* ─────────────────────────────────────────────────────────
   SYSTEM ORBIT ANIMATION
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
    worldPos.copy(group.position);

    group.children.forEach(child => {
      if (!child.userData.orbitR) return;
      const a = t * child.userData.speed + child.userData.off;
      child.position.set(Math.cos(a)*child.userData.orbitR, Math.sin(a)*.15*child.userData.orbitR, Math.sin(a)*child.userData.orbitR);
    });

    group.children[0] && (group.children[0].rotation.y = t*.15);
  });
}

/* ─────────────────────────────────────────────────────────
   SYSTEM MODE — slow orbit camera while choosing
   ───────────────────────────────────────────────────────── */
let systemOrbitAngle = 0;

function updateSystemCamera(dt) {
  if (phase !== 'system') return;
  systemOrbitAngle += dt*.06;
  camera.position.set(Math.sin(systemOrbitAngle)*28, 14, Math.cos(systemOrbitAngle)*28);
  camera.lookAt(0, 0, 0);
}

/* ─────────────────────────────────────────────────────────
   MAIN LOOP
   ───────────────────────────────────────────────────────── */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), .05);
  const t  = clock.getElapsedTime();

  bgStars.rotation.y = t * .001;

  orrery.traverse(obj => {
    if (obj.material?.uniforms?.uTime) obj.material.uniforms.uTime.value = t;
  });
  if (systemGroup) {
    systemGroup.traverse(obj => {
      if (obj.material?.uniforms?.uTime) obj.material.uniforms.uTime.value = t;
    });
  }

  if (phase === 'home')     updateHome(dt);
  if (phase === 'warp')     updateWarp(dt);
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
orreryNodes.forEach(n => { n.labelEl.style.opacity='0'; });
console.log('%c🌌 Hello from the console. tanishwas@gmail.com', 'font-size:13px;color:#00d4ff;background:#020209;padding:8px;');
animate();
