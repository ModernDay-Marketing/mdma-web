import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { publicAssetUrl, useCaseStudy, usePublishedProjectSlugs } from './supabase';
import projectCatalog from './project-catalog.json';
import { applyProjectCopy } from './project-copy';
import CaseEditBar from './inline-editor';
import './styles.css';
import './modcon.css';
import './dat.css';

gsap.registerPlugin(ScrollTrigger);
const Studio = React.lazy(() => import('./cms'));

const Arrow = () => <span className="motion-arrow" aria-hidden="true">↗</span>;

function Logo() {
  return (
    <a className="logo" href="/#top" aria-label="Modern Day, home">
      <img src="/brand/modern-day-marketing-agency-transparent.png" alt="" width="2600" height="830" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = window.location.pathname;
  const lightHeader = path === '/about' || path.startsWith('/about/');
  const designWork = ['/work/design', '/work/egg-break', '/work/social-battery', '/work/sleeping-tiger', '/work/eagle-stone', '/work/the-sanctuary', '/work/ghar-culture', '/work/design-commune', '/work/sasyaa'];
  const digitalWork = ['/work/digital', '/work/dat-social', '/work/modcon-social', '/work/malle-social', '/work/helios-social', '/work/grey-rose-social', '/work/agartha-social'];
  const activeWing = designWork.includes(path) ? 'Design' : digitalWork.includes(path) ? 'Digital' : null;
  const oppositeWing = activeWing === 'Design' ? 'Digital' : 'Design';
  return (
    <>
      <header className={`site-header site-header-home${lightHeader ? ' site-header-light' : ''}`}>
        <Logo />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>
          <span className="menu-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        </button>
        <nav id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="/#work-gate" onClick={() => setOpen(false)}>Work</a>
          <a href="/services" onClick={() => setOpen(false)}>Services</a>
          <a href="/about" onClick={() => setOpen(false)}>About</a>
          <a className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Start a conversation <Arrow /></a>
        </nav>
      </header>
      {activeWing && (
        <a className={`wing-switch-tab wing-switch-${oppositeWing.toLowerCase()}${path === '/work/sleeping-tiger' ? ' wing-switch-sleeping-tiger' : ''}`} href={`/work/${oppositeWing.toLowerCase()}`}>
          <span>Switch to {oppositeWing}</span><i>↔</i>
        </a>
      )}
    </>
  );
}

function SignalBoard() {
  const board = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.signal-row', { x: 36, opacity: 0, duration: .75, stagger: .09, ease: 'power3.out', delay: .35 });
      gsap.to('.scanner', { xPercent: 920, duration: 4.5, repeat: -1, ease: 'none' });
      gsap.to('.dial-mark', { rotate: 22, transformOrigin: '50% 100%', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, board);
    return () => ctx.revert();
  }, []);

  return (
    <div className="signal-board" ref={board} aria-label="Modern Day operating system: clarity in, momentum out">
      <div className="board-top">
        <span>MD/OS   26</span><span className="status"><i /> System active</span>
      </div>
      <div className="signal-row">
        <span className="signal-label">Input</span>
        <strong>Complex business</strong>
        <div className="wave wave-one" />
      </div>
      <div className="signal-row split">
        <div><span className="signal-label">Wing A</span><strong>Design</strong></div>
        <div className="dial"><i className="dial-mark" /></div>
        <div><span className="signal-label">Wing B</span><strong>Digital</strong></div>
      </div>
      <div className="signal-row">
        <span className="signal-label">Output</span>
        <strong>Clear market signal</strong>
        <div className="track"><i className="scanner" /></div>
      </div>
      <div className="board-foot"><span>Strategy  → Systems  → Stories</span><span>HYD / INDIA</span></div>
    </div>
  );
}

function SignalInstrument() {
  const mount = useRef(null);
  const activeRef = useRef('design');
  const pointer = useRef({ x: 0, y: 0 });
  const modelState = useRef(null);
  const [active, setActive] = useState('design');

  const select = mode => {
    activeRef.current = mode;
    setActive(mode);
    if (modelState.current) modelState.current.target = mode === 'design' ? -0.48 : 0.48;
  };

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, .1, 100);
    camera.position.set(0, .25, 13);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const product = new THREE.Group();
    product.rotation.set(-.12, -.16, -.025);
    scene.add(product);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc9c7bd, roughness: .58, metalness: .08 });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x99988f, roughness: .46, metalness: .22 });
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x292b28, roughness: .62, metalness: .06 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x11120f, roughness: .42, metalness: .25 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xb8bab4, roughness: .3, metalness: .72 });
    const orangeMat = new THREE.MeshStandardMaterial({ color: 0xe85d31, roughness: .5 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x9db23a, emissive: 0x56651d, emissiveIntensity: .85 });

    const body = new THREE.Mesh(new RoundedBoxGeometry(7.5, 4.65, 1.25, 6, .16), bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    product.add(body);
    const lip = new THREE.Mesh(new RoundedBoxGeometry(7.08, 4.22, .22, 4, .1), edgeMat);
    lip.position.z = .67;
    product.add(lip);
    const face = new THREE.Mesh(new RoundedBoxGeometry(6.86, 4, .14, 4, .07), faceMat);
    face.position.z = .82;
    product.add(face);

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1400;
    labelCanvas.height = 800;
    const context = labelCanvas.getContext('2d');
    context.fillStyle = '#292b28';
    context.fillRect(0, 0, 1400, 800);
    context.fillStyle = '#d7d6ce';
    context.font = '600 33px Arial';
    context.fillText('MODERN DAY', 70, 78);
    context.font = '22px monospace';
    context.fillStyle = '#92958d';
    context.fillText('MD   02  SIGNAL PROCESSOR', 70, 118);
    context.fillText('INPUT', 72, 235);
    context.fillText('LEVEL', 750, 235);
    context.fillText('DESIGN', 72, 700);
    context.fillText('DIGITAL', 338, 700);
    context.fillText('OUTPUT', 748, 700);
    context.strokeStyle = '#555851';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(70, 150); context.lineTo(1330, 150);
    context.moveTo(675, 185); context.lineTo(675, 730);
    context.stroke();
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(6.83, 3.9), new THREE.MeshBasicMaterial({ map: labelTexture }));
    label.position.z = .902;
    product.add(label);

    const meterCase = new THREE.Mesh(new RoundedBoxGeometry(2.2, 1.2, .16, 3, .06), blackMat);
    meterCase.position.set(2.02, .72, 1.01);
    product.add(meterCase);
    const meterFace = new THREE.Mesh(new THREE.PlaneGeometry(1.92, .92), new THREE.MeshStandardMaterial({ color: 0xd8d5c8, roughness: .8 }));
    meterFace.position.set(2.02, .72, 1.105);
    product.add(meterFace);
    const needle = new THREE.Mesh(new THREE.BoxGeometry(.025, .66, .018), orangeMat);
    needle.geometry.translate(0, .3, 0);
    needle.position.set(2.02, .39, 1.13);
    needle.rotation.z = -.55;
    product.add(needle);

    const knobGeometry = new THREE.CylinderGeometry(.44, .48, .28, 48);
    knobGeometry.rotateX(Math.PI / 2);
    const knob = new THREE.Mesh(knobGeometry, silverMat);
    knob.position.set(.18, .1, 1.12);
    knob.castShadow = true;
    product.add(knob);
    const knobMark = new THREE.Mesh(new THREE.BoxGeometry(.035, .28, .025), blackMat);
    knobMark.position.set(.18, .28, 1.275);
    product.add(knobMark);
    const led = new THREE.Mesh(new THREE.SphereGeometry(.09, 24, 16), greenMat);
    led.position.set(2.95, -1.35, 1.02);
    product.add(led);

    const selector = new THREE.Group();
    const selectorBar = new THREE.Mesh(new RoundedBoxGeometry(.78, .28, .18, 3, .06), orangeMat);
    selectorBar.position.z = 1.06;
    selector.add(selectorBar);
    selector.position.set(-2.65, -1.34, 0);
    product.add(selector);
    [-2.65, -1.33].forEach(x => {
      const button = new THREE.Mesh(new RoundedBoxGeometry(.9, .48, .18, 3, .05), blackMat);
      button.position.set(x, -1.34, 1.01);
      product.add(button);
    });

    const holeGeo = new THREE.CylinderGeometry(.055, .055, .035, 16);
    holeGeo.rotateX(Math.PI / 2);
    for (let row = 0; row < 6; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        const hole = new THREE.Mesh(holeGeo, blackMat);
        hole.position.set(-2.72 + column * .25, .7 + row * .25, 1.01);
        product.add(hole);
      }
    }

    const feet = [];
    [-2.7, 2.7].forEach(x => {
      const foot = new THREE.Mesh(new RoundedBoxGeometry(1.05, .22, .55, 3, .08), blackMat);
      foot.position.set(x, -2.38, -.05);
      product.add(foot);
      feet.push(foot);
    });
    const light = new THREE.DirectionalLight(0xffffff, 3.2);
    light.position.set(-4, 7, 8);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.HemisphereLight(0xf7f4e9, 0x50524d, 2.1));
    const rim = new THREE.PointLight(0xec5b32, 22, 18);
    rim.position.set(5, -3, 5);
    scene.add(rim);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(22, 16), new THREE.ShadowMaterial({ color: 0x181a17, opacity: .13 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.25;
    floor.receiveShadow = true;
    scene.add(floor);
    modelState.current = { target: -.48, selector, needle, knob, knobMark };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const move = event => {
      const rect = host.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const leave = () => { pointer.current = { x: 0, y: 0 }; };
    const press = event => {
      const rect = host.getBoundingClientRect();
      select((event.clientX - rect.left) / rect.width < .5 ? 'design' : 'digital');
    };
    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = reduced ? 0 : clock.getElapsedTime();
      const mode = activeRef.current;
      const targetSelector = mode === 'design' ? -2.65 : -1.33;
      selector.position.x += (targetSelector - selector.position.x) * .1;
      const needleTarget = mode === 'design' ? -.42 + Math.sin(t * 1.2) * .04 : .38 + Math.sin(t * 3.1) * .09;
      needle.rotation.z += (needleTarget - needle.rotation.z) * .08;
      knob.rotation.z += ((mode === 'design' ? -.55 : .8) - knob.rotation.z) * .07;
      knobMark.rotation.z = knob.rotation.z;
      product.rotation.y += ((-.14 + pointer.current.x * .13) - product.rotation.y) * .035;
      product.rotation.x += ((-.1 - pointer.current.y * .07) - product.rotation.x) * .035;
      product.position.y = Math.sin(t * .55) * .035;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    host.addEventListener('pointerdown', press);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      host.removeEventListener('pointerdown', press);
      scene.traverse(object => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach(item => item.dispose());
        else object.material?.dispose();
      });
      labelTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      modelState.current = null;
    };
  }, []);

  return (
    <div className="signal-instrument">
      <div className="signal-canvas" ref={mount} aria-hidden="true" />
      <div className="instrument-readout">
        <span>MD   02 / Signal processor</span><span>{active === 'design' ? 'Mode A / Design' : 'Mode B / Digital'}</span>
      </div>
      <div className="instrument-controls" aria-label="Explore our two disciplines">
        <a className={active === 'design' ? 'active' : ''} href="/services/design" onPointerEnter={() => select('design')} onFocus={() => select('design')}>
          <span>Design</span><small>Build the world</small><Arrow />
        </a>
        <a className={active === 'digital' ? 'active' : ''} href="/services/digital" onPointerEnter={() => select('digital')} onFocus={() => select('digital')}>
          <span>Digital</span><small>Move the market</small><Arrow />
        </a>
      </div>
    </div>
  );
}

function OrderField() {
  const mount = useRef(null);
  const modeRef = useRef('design');
  const pointer = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState('design');

  const selectMode = next => {
    modeRef.current = next;
    setMode(next);
  };

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 50);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const columns = 42;
    const rows = 22;
    const count = columns * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scatter = [];
    const grid = [];
    const wave = [];
    const ink = new THREE.Color(0x242520);
    const orange = new THREE.Color(0xe65d33);
    const acid = new THREE.Color(0xa8b93d);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        const x = (column / (columns - 1) - .5) * 13.5;
        const y = (row / (rows - 1) - .5) * 7;
        const randomA = Math.sin(index * 127.13) * 43758.5453 % 1;
        const randomB = Math.sin(index * 311.71) * 24634.6345 % 1;
        scatter.push({
          x: x + randomA * 2.6,
          y: y + randomB * 2.3,
          z: Math.sin(index * 4.17) * 1.8
        });
        grid.push({ x, y, z: Math.sin(column * .31) * .05 });
        const lane = row % 7;
        wave.push({
          x,
          y: (lane - 3) * .72 + Math.sin(x * .74 + lane * .8) * .58,
          z: Math.cos(x * .42 + row) * .35
        });
        positions[index * 3] = scatter[index].x;
        positions[index * 3 + 1] = scatter[index].y;
        positions[index * 3 + 2] = scatter[index].z;
        ink.toArray(colors, index * 3);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: .045,
      vertexColors: true,
      transparent: true,
      opacity: .78,
      sizeAttenuation: true
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const guideMaterial = new THREE.LineBasicMaterial({ color: 0x242520, transparent: true, opacity: .12 });
    const guideGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-6.75, 0, -.2), new THREE.Vector3(6.75, 0, -.2),
      new THREE.Vector3(0, -3.5, -.2), new THREE.Vector3(0, 3.5, -.2)
    ]);
    scene.add(new THREE.LineSegments(guideGeometry, guideMaterial));

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const move = event => {
      const rect = host.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const leave = () => { pointer.current = { x: 0, y: 0 }; };
    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      const time = reduced ? 2.4 : clock.getElapsedTime();
      const target = modeRef.current === 'design' ? grid : wave;
      const focusX = pointer.current.x * 6.5;
      const focusY = pointer.current.y * 3.3;
      const settle = reduced ? 1 : Math.min(1, time / 2.2);
      for (let index = 0; index < count; index += 1) {
        const offset = index * 3;
        const currentX = positions[offset];
        const currentY = positions[offset + 1];
        const distance = Math.hypot(currentX - focusX, currentY - focusY);
        const focus = Math.max(0, 1 - distance / 2.2);
        const pulse = modeRef.current === 'digital' ? Math.sin(time * 1.6 + target[index].x * .8) * .18 : 0;
        const tx = THREE.MathUtils.lerp(scatter[index].x, target[index].x, settle);
        const ty = THREE.MathUtils.lerp(scatter[index].y, target[index].y + pulse, settle);
        positions[offset] += (tx - positions[offset]) * (.035 + focus * .12);
        positions[offset + 1] += (ty - positions[offset + 1]) * (.035 + focus * .12);
        positions[offset + 2] += (target[index].z + focus * 1.2 - positions[offset + 2]) * .06;
        const accent = index % (modeRef.current === 'design' ? 47 : 31) === 0;
        const targetColor = accent ? (modeRef.current === 'design' ? orange : acid) : ink;
        colors[offset] += (targetColor.r - colors[offset]) * .05;
        colors[offset + 1] += (targetColor.g - colors[offset + 1]) * .05;
        colors[offset + 2] += (targetColor.b - colors[offset + 2]) * .05;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      points.rotation.y += (pointer.current.x * .055 - points.rotation.y) * .035;
      points.rotation.x += (-pointer.current.y * .035 - points.rotation.x) * .035;
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      geometry.dispose();
      material.dispose();
      guideGeometry.dispose();
      guideMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="order-field">
      <div className="order-field-canvas" ref={mount} aria-hidden="true" />
      <div className="order-field-axis"><span>Complexity</span><i /><span>Clarity</span></div>
      <nav className="order-field-modes" aria-label="Explore Modern Day disciplines">
        <a className={mode === 'design' ? 'active' : ''} href="/services/design" onPointerEnter={() => selectMode('design')} onFocus={() => selectMode('design')}><i />Design</a>
        <a className={mode === 'digital' ? 'active' : ''} href="/services/digital" onPointerEnter={() => selectMode('digital')} onFocus={() => selectMode('digital')}><i />Digital</a>
      </nav>
    </div>
  );
}

const services = [
  {
    wing: 'Design',
    thesis: 'Give ambition a form only you can own.',
    copy: 'We turn business conviction into positioning, identity and experience systems that make the company easier to recognise, trust and choose.',
    items: ['Brand strategy', 'Identity systems', 'Campaign platforms', 'Experience & communication design']
  },
  {
    wing: 'Digital',
    thesis: 'Turn presence into market momentum.',
    copy: 'We turn positioning into an editorial engine, combining social strategy, content and campaigns so attention compounds into memory and demand.',
    items: ['Social strategy', 'Content systems', 'Campaigns & paid media', 'Community & performance intelligence']
  }
];

function MuseumSignalField({ mode, onExplore, compact = false }) {
  const field = useRef(null);
  const mount = useRef(null);
  const modeRef = useRef(0);
  const exploreRef = useRef(onExplore);

  useEffect(() => {
    modeRef.current = mode === 'design' ? 1 : mode === 'digital' ? -1 : 0;
  }, [mode]);

  useEffect(() => {
    exploreRef.current = onExplore;
  }, [onExplore]);

  useEffect(() => {
    const host = mount.current;
    const surface = field.current;
    if (!host || !surface) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xdeddd5, 1);
    host.appendChild(renderer.domElement);

    const ink = new THREE.Color(0x181a17);
    const quiet = new THREE.Color(0x74766f);
    const acid = new THREE.Color(0xc7e927);
    const signal = new THREE.Color(0xff6542);
    const stage = new THREE.Group();
    const digitalGroup = new THREE.Group();
    const designGroup = new THREE.Group();
    const coreGroup = new THREE.Group();
    stage.add(digitalGroup, designGroup, coreGroup);
    scene.add(stage);

    const resources = [];
    const track = resource => {
      resources.push(resource);
      return resource;
    };
    const makeLineMaterial = (color, opacity) => track(new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity
    }));
    const quietLineMaterial = makeLineMaterial(quiet, .34);
    const digitalLineMaterial = makeLineMaterial(ink, .66);
    const designLineMaterial = makeLineMaterial(ink, .66);
    const designGridMaterial = makeLineMaterial(quiet, .34);
    const acidLineMaterial = makeLineMaterial(acid, .88);
    const signalLineMaterial = makeLineMaterial(signal, .95);

    const connectorGeometry = track(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5.1, 0, -.4),
      new THREE.Vector3(5.1, 0, -.4)
    ]));
    stage.add(new THREE.Line(connectorGeometry, quietLineMaterial));

    const digitalRings = [];
    for (let ringIndex = 0; ringIndex < 7; ringIndex += 1) {
      const radius = .52 + ringIndex * .28;
      const points = [];
      for (let index = 0; index <= 96; index += 1) {
        const angle = (index / 96) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * .72,
          Math.sin(angle * 2 + ringIndex) * .055
        ));
      }
      const ringGeometry = track(new THREE.BufferGeometry().setFromPoints(points));
      const ring = new THREE.Line(ringGeometry, ringIndex === 2 ? acidLineMaterial : digitalLineMaterial);
      ring.userData.speed = (ringIndex % 2 ? -1 : 1) * (.045 + ringIndex * .009);
      ring.userData.phase = ringIndex * .72;
      digitalGroup.add(ring);
      digitalRings.push(ring);
    }

    const particlePositions = [];
    for (let index = 0; index < 84; index += 1) {
      const progress = index / 84;
      const angle = progress * Math.PI * 10;
      const radius = .42 + progress * 1.72;
      particlePositions.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * .72,
        Math.sin(index * 1.71) * .2
      );
    }
    const particleGeometry = track(new THREE.BufferGeometry());
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMaterial = track(new THREE.PointsMaterial({
      color: ink,
      size: .045,
      transparent: true,
      opacity: .78,
      sizeAttenuation: true
    }));
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    digitalGroup.add(particles);

    const digitalMarkerGeometry = track(new THREE.SphereGeometry(.11, 20, 20));
    const digitalMarkerMaterial = track(new THREE.MeshBasicMaterial({ color: signal }));
    const digitalMarker = new THREE.Mesh(digitalMarkerGeometry, digitalMarkerMaterial);
    digitalMarker.position.set(-1.53, .24, .12);
    digitalGroup.add(digitalMarker);
    digitalGroup.position.x = -2.75;
    digitalGroup.rotation.x = -.2;

    const gridPositions = [];
    const gridSize = 1.82;
    const gridSteps = 8;
    for (let index = 0; index <= gridSteps; index += 1) {
      const position = -gridSize + (index / gridSteps) * gridSize * 2;
      gridPositions.push(-gridSize, position, 0, gridSize, position, 0);
      gridPositions.push(position, -gridSize, 0, position, gridSize, 0);
    }
    const gridGeometry = track(new THREE.BufferGeometry());
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3));
    const grid = new THREE.LineSegments(gridGeometry, designGridMaterial);
    designGroup.add(grid);

    const framePoints = [
      [-1.82, -1.82], [1.82, -1.82], [1.82, 1.82], [-1.82, 1.82], [-1.82, -1.82],
      [-1.38, -1.38], [1.38, -1.38], [1.38, 1.38], [-1.38, 1.38], [-1.38, -1.38]
    ].map(([x, y]) => new THREE.Vector3(x, y, .03));
    const frameGeometry = track(new THREE.BufferGeometry().setFromPoints(framePoints));
    designGroup.add(new THREE.Line(frameGeometry, designLineMaterial));

    const designBlockGeometry = track(new THREE.BoxGeometry(.44, 1.38, .16));
    const designBlockMaterial = track(new THREE.MeshBasicMaterial({ color: ink }));
    const designBlock = new THREE.Mesh(designBlockGeometry, designBlockMaterial);
    designBlock.position.set(.68, -.44, .14);
    designGroup.add(designBlock);

    const alignGeometry = track(new THREE.BoxGeometry(1.34, .12, .19));
    const alignMaterial = track(new THREE.MeshBasicMaterial({ color: signal }));
    const alignBar = new THREE.Mesh(alignGeometry, alignMaterial);
    alignBar.position.set(-.34, .68, .17);
    designGroup.add(alignBar);
    designGroup.position.x = 2.75;
    designGroup.rotation.x = -.08;

    const coreRingGeometry = track(new THREE.TorusGeometry(.34, .022, 12, 64));
    const coreRing = new THREE.Mesh(coreRingGeometry, signalLineMaterial);
    coreGroup.add(coreRing);
    const coreGeometry = track(new THREE.SphereGeometry(.105, 24, 24));
    const coreMaterial = track(new THREE.MeshBasicMaterial({ color: signal }));
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(core);
    const coreNeedleGeometry = track(new THREE.BoxGeometry(.035, 1.7, .035));
    const coreNeedle = new THREE.Mesh(coreNeedleGeometry, coreMaterial);
    coreNeedle.position.z = -.08;
    coreGroup.add(coreNeedle);

    const targetPointer = new THREE.Vector2(0, 0);
    const currentPointer = new THREE.Vector2(0, 0);
    let frame;
    let exploredMode = 'neutral';
    host.classList.add('ready');

    const move = event => {
      if (reduced) return;
      const rect = surface.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
        -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1)
      );
      const nextMode = targetPointer.x < -.14 ? 'digital' : targetPointer.x > .14 ? 'design' : 'neutral';
      if (nextMode !== exploredMode) {
        exploredMode = nextMode;
        exploreRef.current?.(nextMode);
      }
    };
    const leave = () => {
      targetPointer.set(0, 0);
      exploredMode = 'neutral';
      exploreRef.current?.('neutral');
    };
    const resize = () => {
      const { width, height } = surface.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      if (width < 620) {
        stage.scale.setScalar(.56);
        stage.position.set(0, 0, 0);
      } else if (width < 900) {
        stage.scale.setScalar(.72);
        stage.position.set(0, 0, 0);
      } else {
        stage.scale.setScalar(.86);
        stage.position.set(0, 0, 0);
      }
    };
    const clock = new THREE.Clock();
    let currentMode = 0;
    const animate = () => {
      currentPointer.lerp(targetPointer, reduced ? 1 : .055);
      currentMode += (modeRef.current - currentMode) * (reduced ? 1 : .07);
      const time = reduced ? 0 : clock.getElapsedTime();
      const digitalFocus = THREE.MathUtils.clamp(.6 - currentMode * .42, .18, 1);
      const designFocus = THREE.MathUtils.clamp(.6 + currentMode * .42, .18, 1);

      stage.rotation.x += ((currentPointer.y * .055) - stage.rotation.x) * .055;
      stage.rotation.y += ((currentPointer.x * .075) - stage.rotation.y) * .055;
      digitalGroup.scale.setScalar(.88 + digitalFocus * .22);
      designGroup.scale.setScalar(.88 + designFocus * .22);
      digitalGroup.position.x = -2.75 - Math.max(currentMode, 0) * .42 + Math.max(-currentMode, 0) * .18;
      designGroup.position.x = 2.75 + Math.max(-currentMode, 0) * .42 - Math.max(currentMode, 0) * .18;
      digitalGroup.position.z = digitalFocus * .22;
      designGroup.position.z = designFocus * .22;
      quietLineMaterial.opacity = .2 + Math.max(digitalFocus, designFocus) * .2;
      particleMaterial.opacity = .26 + digitalFocus * .68;
      digitalLineMaterial.opacity = .12 + digitalFocus * .74;
      acidLineMaterial.opacity = .24 + digitalFocus * .74;
      designLineMaterial.opacity = .12 + designFocus * .74;
      designGridMaterial.opacity = .08 + designFocus * .4;

      digitalRings.forEach(ring => {
        ring.rotation.z = time * ring.userData.speed * (1.1 + digitalFocus) + ring.userData.phase * .018;
        ring.scale.setScalar(1 + Math.sin(time * 1.15 + ring.userData.phase) * .014 * digitalFocus);
      });
      particles.rotation.z = time * -.035;
      digitalMarker.position.y = .24 + Math.sin(time * 1.8) * .18 * digitalFocus;
      grid.rotation.z = currentPointer.x * .018 * designFocus;
      designBlock.position.y = -.44 + currentPointer.y * .12 * designFocus;
      alignBar.position.x = -.34 + currentPointer.x * .16 * designFocus;
      coreGroup.position.x = currentMode * .38;
      coreGroup.rotation.z = -currentPointer.x * .18;
      const corePulse = 1 + Math.sin(time * 2.2) * .08;
      core.scale.setScalar(corePulse);
      coreRing.scale.setScalar(1 + Math.abs(currentMode) * .18);
      coreNeedle.scale.y = 1 + Math.abs(currentMode) * .28;

      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    surface.addEventListener('pointermove', move);
    surface.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      surface.removeEventListener('pointermove', move);
      surface.removeEventListener('pointerleave', leave);
      resources.forEach(resource => resource.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`museum-field field-${mode}${compact ? ' museum-field-compact' : ''}`} ref={field}>
      <div className="museum-canvas" ref={mount} aria-hidden="true" />
      <span className="museum-field-label museum-field-digital">Influence / Demand / Momentum</span>
      <span className="museum-field-label museum-field-design">Identity / Brand world / Experience</span>
    </div>
  );
}

function MobileAtmosphere({ dark = false }) {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
    camera.position.set(0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.scale.setScalar(dark ? 1.22 : 1);
    scene.add(group);
    const ink = new THREE.MeshBasicMaterial({ color: dark ? 0xd8dbd3 : 0x181a17, wireframe: true, transparent: true, opacity: dark ? .55 : .5 });
    const quiet = new THREE.MeshBasicMaterial({ color: dark ? 0x747970 : 0x71756d, wireframe: true, transparent: true, opacity: .38 });
    const orange = new THREE.MeshBasicMaterial({ color: 0xff6542 });
    const acid = new THREE.MeshBasicMaterial({ color: 0xc7dd3d });

    const bars = [];
    const barGeometry = new THREE.BoxGeometry(.19, 1, .19);
    for (let column = 0; column < 11; column += 1) {
      const x = (column - 5) * .42;
      const height = .7 + Math.sin(column * 1.15) * .42 + (column % 3) * .18;
      const bar = new THREE.Mesh(barGeometry, column % 4 === 1 ? acid : column % 4 === 3 ? orange : quiet);
      bar.position.set(x, 0, Math.sin(column * .9) * .42);
      bar.scale.y = height;
      bar.userData = { column, height };
      bars.push(bar);
      group.add(bar);
    }
    const cage = new THREE.Mesh(new THREE.BoxGeometry(5.35, 3.1, 1.5, 6, 3, 2), ink);
    cage.scale.set(1, .78, 1);
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(.34, 0), orange);
    core.position.set(0, 0, .9);
    const signalRing = new THREE.Mesh(new THREE.TorusGeometry(1.65, .022, 8, 100), ink);
    signalRing.rotation.x = 1.15;
    group.add(cage, core, signalRing);

    const dotPositions = [];
    for (let index = 0; index < 72; index += 1) {
      const progress = index / 71;
      const row = Math.floor(index / 12);
      const column = index % 12;
      dotPositions.push((column - 5.5) * .45, (row - 2.5) * .42, Math.sin(column + row) * .35 - .65);
    }
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMaterial = new THREE.PointsMaterial({ color: dark ? 0xd9ddd4 : 0x71756d, size: .042, transparent: true, opacity: .58 });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    group.add(dots);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const clock = new THREE.Clock();
    const target = { x: 0, y: 0 };
    const move = event => {
      const bounds = host.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - .5) * .75;
      target.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - .5) * .55;
    };
    let frame;
    const animate = () => {
      const time = reduced ? 0 : clock.getElapsedTime();
      group.rotation.y += ((time * .08 + target.x) - group.rotation.y) * .055;
      group.rotation.x += ((target.y * -.65) - group.rotation.x) * .07;
      group.rotation.z = Math.sin(time * .22) * .08 + target.x * .12;
      bars.forEach(bar => {
        const lift = 1 + Math.sin(time * 2.2 + bar.userData.column * .62 + target.x * 4) * .42;
        bar.scale.y += ((bar.userData.height * lift) - bar.scale.y) * .12;
        bar.rotation.y = time * .35 + bar.userData.column * .16;
      });
      cage.rotation.z = Math.sin(time * .35) * .07;
      signalRing.rotation.z = time * .14;
      dots.position.x = Math.sin(time * .4) * .18;
      const pulse = 1 + Math.sin(time * 2.1) * .12;
      core.scale.setScalar(pulse);
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', move);
      [barGeometry, cage.geometry, core.geometry, signalRing.geometry, dotGeometry].forEach(item => item.dispose());
      [ink, quiet, orange, acid, dotMaterial].forEach(item => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className={`mobile-atmosphere${dark ? ' mobile-atmosphere-dark' : ''}`} ref={mount} aria-hidden="true" />;
}

function ConversionHero() {
  const work = [
    { href:'/work/egg-break', src:'/images/egg-break/bottle-hero.jpg', label:'EggBreak / Brand and product' },
    { href:'/work/eagle-stone', src:'/images/work/eagle-stone/eagle-stone-01.jpg', label:'Eagle Stone / Identity' },
    { href:'/work/helios-social', src:'/images/work/helios/social/render-01.jpg', label:'Helios Stone / Social media' }
  ];
  return (
    <section className="conversion-hero" aria-labelledby="conversion-hero-title">
      <div className="conversion-hero-top"><span>Modern Day / Independent creative company</span><span>Design + Digital / Hyderabad</span></div>
      <div className="conversion-hero-main">
        <div className="conversion-hero-copy">
          <h1 id="conversion-hero-title">Build a brand<br />people recognise.<br /><em>Move the market<br />around it.</em></h1>
          <div className="conversion-hero-intro">
            <p>Modern Day brings identity, digital experiences, social content and campaigns into one connected system for ambitious companies.</p>
            <div><a className="conversion-primary" href="/work">View selected work <Arrow /></a><a className="conversion-secondary" href="/contact">Start a conversation</a></div>
          </div>
        </div>
        <div className="conversion-work-wall" aria-label="Selected Modern Day work">
          {work.map(item=><a href={item.href} key={item.href}><img src={item.src} alt={item.label} /><span>{item.label}</span></a>)}
        </div>
      </div>
      <div className="conversion-proof">
        <div><span>Practice 01</span><strong>Design</strong><small>Identity / Brand world / Experience</small></div>
        <div><span>Practice 02</span><strong>Digital</strong><small>Strategy / Content / Influence</small></div>
        <div><span>Completed</span><strong>50+</strong><small>Projects across sectors</small></div>
        <div><span>Established</span><strong>2020</strong><small>Founder led from Hyderabad</small></div>
      </div>
    </section>
  );
}

function MuseumHero() {
  const [mode, setMode] = useState('neutral');
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 620px)').matches);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 620px)');
    const update = event => setIsMobile(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  if (isMobile) {
    return (
      <section className="mobile-home-hero" aria-labelledby="mobile-home-title">
        <p className="mobile-home-kicker">ModernDay / Independent creative company</p>
        <h1 id="mobile-home-title">Make the<br />company in<br />your head<br /><em>visible.</em></h1>
        <MobileAtmosphere />
        <div className="mobile-home-proof">
          <span>What we make possible</span>
          <p>We turn founder conviction into a brand people recognise and a presence they keep noticing.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="museum-hero" aria-labelledby="museum-hero-title">
      <MuseumSignalField mode={mode} onExplore={setMode} />
      <div className="museum-hero-shade" aria-hidden="true" />
      <div className="museum-hero-copy">
        <div className="museum-hero-top">
          <p>ModernDay / Independent creative company</p>
          <span>Independent / Founder led</span>
        </div>
        <h1 id="museum-hero-title">Make the<br />company in<br />your head<br /><em>visible.</em></h1>
        <div className="museum-hero-bottom">
          <p>We turn founder conviction into a brand people recognise and a presence they keep noticing.</p>
        </div>
      </div>
      <div className={`museum-meaning museum-meaning-${mode}`} aria-live="polite">
        <span>{mode === 'design' ? 'Design creates recognition' : mode === 'digital' ? 'Digital creates momentum' : 'One connected market system'}</span>
        <strong>{mode === 'design' ? 'Build the world.' : mode === 'digital' ? 'Move the market.' : 'Identity  → Market entry  → Influence'}</strong>
        <p>{mode === 'design'
          ? 'Logos, identity systems, brand worlds, websites and apps.'
          : mode === 'digital'
            ? 'Go to market strategy, social media, content and influence.'
            : 'Move across the field to see what each practice changes.'}</p>
      </div>
      <div className="museum-lens-controls" onPointerLeave={() => setMode('neutral')}>
        <button className={mode === 'digital' ? 'active' : ''} onPointerEnter={() => setMode('digital')} onFocus={() => setMode('digital')} onClick={() => setMode('digital')}>Digital</button>
        <button className={mode === 'design' ? 'active' : ''} onPointerEnter={() => setMode('design')} onFocus={() => setMode('design')} onClick={() => setMode('design')}>Design</button>
      </div>
    </section>
  );
}

function HomeWingGate() {
  const [entering, setEntering] = useState(null);

  const enterWing = (event, wing) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    const destination = event.currentTarget.href;
    setEntering(wing);
    window.setTimeout(() => { window.location.href = destination; }, 620);
  };

  return (
    <section className={`home-wing-gate${entering ? ` is-entering entering-${entering}` : ''}`} id="work-gate" aria-label="Choose the work you want to see">
      <a className="home-wing-card home-wing-design" href="/work/design" onClick={event => enterWing(event, 'design')}>
        <span className="home-wing-top"><i>Build the world.</i><i>Design / Brand systems</i></span>
        <div>
          <span>Brand strategy, identity, packaging and digital experiences</span>
          <h2>Give ambition<br />a form.</h2>
          <p>We translate the company in your head into a strategic and visual system the market can recognise, leadership can defend and teams can carry forward.</p>
        </div>
        <span className="home-wing-bottom"><i>Enter Design</i><Arrow /></span>
      </a>
      <a className="home-wing-card home-wing-digital" href="/work/digital" onClick={event => enterWing(event, 'digital')}>
        <span className="home-wing-top"><i>Move the market.</i><i>Digital / Market presence</i></span>
        <div>
          <span>Social strategy, content production and campaigns</span>
          <h2>Create<br />market pull.</h2>
          <p>We turn positioning into an editorial engine that earns attention, builds memory and gives the brand a living presence between its biggest moments.</p>
        </div>
        <span className="home-wing-bottom"><i>Enter Digital</i><Arrow /></span>
      </a>
      <span className="home-wing-choice">
        <b>Choose the work you want to see.</b>
        <span className="entrance-flow" aria-hidden="true"><i>↓</i><i>↓</i><i>↓</i></span>
      </span>
    </section>
  );
}

function HomeSignalLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame;
    const blooms = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const press = event => {
      if (reduced || event.pointerType === 'mouse' && event.button !== 0) return;
      blooms.push({
        x: event.clientX,
        y: event.clientY,
        born: performance.now(),
        turn: Math.random() * Math.PI * 2,
      });
      if (blooms.length > 7) blooms.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const draw = now => {
      frame = undefined;
      context.clearRect(0, 0, width, height);

      blooms.forEach(bloom => {
        const age = now - bloom.born;
        const progress = Math.max(0, Math.min(1, age / 700));
        const burst = 1 - (1 - progress) ** 5;
        const entrance = Math.min(1, progress * 12);
        const fade = (1 - progress) ** .9;
        const ringRadius = 3 + burst * 74;

        for (let index = 0; index < 34; index += 1) {
          const baseAngle = (index / 34) * Math.PI * 2 + bloom.turn;
          const angle = baseAngle + progress * Math.PI * .7;
          const x = bloom.x + Math.cos(angle) * ringRadius;
          const y = bloom.y + Math.sin(angle) * ringRadius;
          const size = (1.35 + (index % 5 === 0 ? .75 : 0)) * entrance;

          context.beginPath();
          context.arc(x, y, size, 0, Math.PI * 2);
          context.fillStyle = `rgba(255,255,255,${fade})`;
          context.fill();
        }

        const heartProgress = Math.max(0, Math.min(1, age / 180));
        context.beginPath();
        context.arc(bloom.x, bloom.y, 4.5 - heartProgress * 3.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,255,255,${1 - heartProgress})`;
        context.fill();
      });

      for (let index = blooms.length - 1; index >= 0; index -= 1) {
        if (now - blooms[index].born > 760) blooms.splice(index, 1);
      }
      if (blooms.length) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', press, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', press);
    };
  }, []);

  return <canvas className="home-signal-layer" ref={canvasRef} aria-hidden="true" />;
}

function SensoryHero() {
  const projects = [
    {
      href: '/work/sleeping-tiger',
      image: '/images/sleeping-tiger/objects/hangtag-front.png',
      coverStyle: 'sleeping-tiger',
      name: 'Sleeping Tiger',
      practice: 'Design',
      output: 'Identity / Packaging / Product',
      note: 'A complete sleepwear world built for the rituals of rest.',
      position: 'center'
    },
    {
      href: '/work/design-commune',
      image: '/images/design-commune/card-red.png',
      name: 'Design Commune',
      practice: 'Design',
      output: 'Identity / Architecture / System',
      note: 'A modular identity shaped by architectural space.',
      position: 'center'
    },
    {
      href: '/work/egg-break',
      image: '/images/egg-break/character-family-cover.jpg',
      name: 'EggBreak',
      practice: 'Design',
      output: 'Brand / Packaging / Product',
      note: 'A complete brand world built from the bottle out.',
      position: 'center'
    },
    {
      href: '/work/dat-social',
      image: '/images/work/dat-social/carousel-02/slide-02-poster.jpg',
      name: 'DAT',
      practice: 'Digital',
      output: 'Content / Motion / Web',
      note: 'Spatial technology given a precise digital world.',
      position: 'center'
    },
    {
      href: '/work/malle-social',
      image: '/images/work/malle/golf-hero.jpg',
      name: 'Malle',
      practice: 'Digital',
      output: 'Campaign / Photography / Social',
      note: 'A sport and style campaign caught in the last light.',
      position: 'center'
    },
    {
      href: '/work/ghar-culture',
      image: '/images/ghar-culture/deck/03-moodboard.webp',
      name: 'Ghar Culture',
      practice: 'Design',
      output: 'Identity / Culture / Objects',
      note: 'Marble, memory and the feeling of home made visible.',
      position: 'center'
    },
    {
      href: '/work/helios-social',
      image: '/images/work/helios/social/render-01.jpg',
      name: 'Helios Stone',
      practice: 'Digital',
      output: 'Strategy / Content / Social',
      note: 'The scale and rarity of stone translated for the screen.',
      position: 'center'
    }
  ];

  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const motionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = {
      position: 0,
      velocity: 0,
      desired: 0,
      dragging: false,
      pointerId: null,
      startX: 0,
      startPosition: 0,
      previousPosition: 0,
      previousTime: 0,
      distance: 0,
      frame: 0,
      lastTime: 0,
      active: 0
    };
    motionRef.current = motion;

    const wrapDelta = value => {
      const half = projects.length / 2;
      return ((value + half) % projects.length + projects.length) % projects.length - half;
    };

    const render = () => {
      const radius = Math.min(Math.max(stage.clientWidth * .42, 250), 620);
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const delta = wrapDelta(index - motion.position);
        const angle = delta * .55;
        const x = Math.sin(angle) * radius;
        const z = (Math.cos(angle) - 1) * 360;
        const y = Math.abs(delta) * 10;
        const rotate = delta * -15;
        const scale = Math.max(.72, 1 - Math.abs(delta) * .065);
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.opacity = `${Math.max(0, 1 - Math.abs(delta) * .82)}`;
        card.style.zIndex = `${100 - Math.round(Math.abs(delta) * 10)}`;
      });
      const next = ((Math.round(motion.position) % projects.length) + projects.length) % projects.length;
      if (next !== motion.active) {
        motion.active = next;
        setActiveIndex(next);
      }
    };

    const animate = time => {
      const deltaTime = Math.min(time - (motion.lastTime || time), 32);
      motion.lastTime = time;
      if (motion.desired !== null) {
        const displacement = motion.desired - motion.position;
        motion.velocity += displacement * .00024 * deltaTime;
        motion.velocity *= Math.exp(-.019 * deltaTime);
        motion.position += motion.velocity * deltaTime;
        if (Math.abs(displacement) < .0008 && Math.abs(motion.velocity) < .00008) {
          motion.position = motion.desired;
          motion.velocity = 0;
          render();
          motion.frame = 0;
          return;
        }
      } else {
        motion.position += motion.velocity * deltaTime;
        motion.velocity *= Math.exp(-.0075 * deltaTime);
        if (Math.abs(motion.velocity) < .00045) motion.desired = Math.round(motion.position);
      }
      render();
      motion.frame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (reduced) {
        motion.position = motion.desired ?? Math.round(motion.position);
        render();
        return;
      }
      if (!motion.frame) {
        motion.lastTime = performance.now();
        motion.frame = requestAnimationFrame(animate);
      }
    };

    const select = index => {
      const rounded = Math.round(motion.position);
      const current = ((rounded % projects.length) + projects.length) % projects.length;
      motion.desired = rounded + wrapDelta(index - current);
      motion.velocity = 0;
      start();
    };
    motion.select = select;

    const onPointerDown = event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      motion.dragging = true;
      motion.pointerId = event.pointerId;
      motion.startX = event.clientX;
      motion.startPosition = motion.position;
      motion.previousPosition = motion.position;
      motion.previousTime = performance.now();
      motion.distance = 0;
      motion.desired = null;
      motion.velocity = 0;
      if (motion.frame) cancelAnimationFrame(motion.frame);
      motion.frame = 0;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('is-dragging');
    };

    const onPointerMove = event => {
      if (!motion.dragging || event.pointerId !== motion.pointerId) return;
      const now = performance.now();
      const distance = event.clientX - motion.startX;
      const sensitivity = Math.max(170, stage.clientWidth * .24);
      motion.position = motion.startPosition - distance / sensitivity;
      const deltaTime = Math.max(8, now - motion.previousTime);
      motion.velocity = Math.max(-.032, Math.min(.032, (motion.position - motion.previousPosition) / deltaTime));
      motion.previousPosition = motion.position;
      motion.previousTime = now;
      motion.distance = Math.max(motion.distance, Math.abs(distance));
      render();
    };

    const onPointerUp = event => {
      if (!motion.dragging || event.pointerId !== motion.pointerId) return;
      motion.dragging = false;
      stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      motion.desired = Math.round(motion.position + motion.velocity * 145);
      start();
    };

    const onWheel = event => {
      event.preventDefault();
      motion.desired = null;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      motion.velocity = Math.max(-.03, Math.min(.03, motion.velocity + delta / 6800));
      start();
    };

    const onKeyDown = event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      select(Math.round(motion.position) + (event.key === 'ArrowRight' ? 1 : -1));
    };

    render();
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);
    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', render);

    return () => {
      if (motion.frame) cancelAnimationFrame(motion.frame);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerUp);
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', render);
      motionRef.current = null;
    };
  }, []);

  const activeProject = projects[activeIndex];
  const chooseProject = (event, index) => {
    const motion = motionRef.current;
    if (!motion) return;
    if (motion.distance > 7 || index !== activeIndex) {
      event.preventDefault();
      if (motion.distance <= 7) motion.select(index);
    }
  };
  const step = direction => motionRef.current?.select?.(activeIndex + direction);

  return (
    <section className="work-carousel-hero" aria-labelledby="work-carousel-title">
      <div className="work-carousel-heading">
        <p>Modern Day / Selected work</p>
        <h1 id="work-carousel-title">Be the company<br /><em>people remember.</em></h1>
        <p className="work-carousel-subtext">We help ambitious companies look distinct, speak clearly and feel worth choosing.</p>
      </div>
      <div className="work-carousel-stage" ref={stageRef} tabIndex="0" role="region" aria-roledescription="carousel" aria-label="Selected Modern Day work. Drag, scroll or use arrow keys to browse.">
        <div className="work-carousel-orbit" aria-hidden="true" />
        {projects.map((project, index) => (
          <a
            className={`work-album${index === activeIndex ? ' is-active' : ''}${project.coverStyle ? ` work-album-${project.coverStyle}` : ''}`}
            href={project.href}
            key={project.name}
            ref={node => { cardRefs.current[index] = node; }}
            onClick={event => chooseProject(event, index)}
            tabIndex={index === activeIndex ? 0 : -1}
            aria-label={`${project.name}. ${project.output}`}
          >
            <img src={project.image} alt="" draggable="false" style={{ objectPosition: project.position }} />
            <span><small>{project.practice}</small><strong>{project.name}</strong><i>{String(index + 1).padStart(2, '0')}</i></span>
          </a>
        ))}
      </div>
      <div className="work-carousel-detail" aria-live="polite">
        <div className="work-carousel-controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous project">←</button>
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => step(1)} aria-label="Next project">→</button>
        </div>
        <div className="work-carousel-project"><span>{activeProject.output}</span><strong>{activeProject.name}</strong></div>
        <p>{activeProject.note}</p>
        <a href={activeProject.href}>View project <Arrow /></a>
      </div>
      <div className="work-carousel-instruction"><span>Drag</span><i /><span>Scroll</span><i /><span>Arrow keys</span></div>
    </section>
  );
}
function WorldsPrelude() {
  return (
    <section className="worlds-prelude" id="worlds-prelude" aria-labelledby="worlds-prelude-title">
      <div className="worlds-prelude-top"><span>The logic / 01 + 02</span><span>Recognition  → Momentum</span></div>
      <div className="worlds-prelude-copy" data-reveal>
        <p>Every enduring company is built twice.</p>
        <h2 id="worlds-prelude-title">First, it becomes<br /><em>unmistakable.</em><br />Then, <strong>unmissable.</strong></h2>
        <div><span>Design gives the business a form only it can own.</span><span>Digital gives that form rhythm, reach and a place in people’s minds.</span></div>
      </div>
      <div className="worlds-prelude-foot"><span>Two practices. One standard.</span><a href="#work-gate">Choose an entrance <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}

function HomePage() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const reveals = gsap.utils.toArray('[data-reveal]');
    reveals.forEach(el => gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    }));
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <Seo
        title="Modern Day | Design and Digital Partner for Ambitious Companies"
        description="Modern Day helps ambitious companies build a distinctive brand and a disciplined digital presence through Design and Digital."
        path="/"
      />
      <Header />
      <main id="top">
        <SensoryHero />
        <WorldsPrelude />
        <HomeWingGate />
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

const detailPages = {
  design: {
    marker: 'Wing A / Design',
    title: <>Build the world<br /><em>around the idea.</em></>,
    intro: 'A strong business can still arrive in fragments. We align strategy, language, identity and experience into one brand system that leadership can steer and the market can recognise.',
    promise: 'Strategy  → Identity  → Adoption',
    story: [
      ['Brand strategy', 'We find the business truth worth organising around, then turn it into positioning, portfolio architecture and a brand idea leadership can use to make harder decisions.'],
      ['Verbal identity', 'We give the strategy a voice through naming, narrative, messaging and language patterns that make every team sound like the same company.'],
      ['Visual identity', 'We build recognition through a coherent behaviour system of mark, type, colour, image, motion and information design.'],
      ['Experience & rollout', 'We carry the identity into the moments that make it real, from packaging and digital products to campaigns, spaces and internal adoption.'],
      ['Governance', 'We turn standards into usable tools, templates and decision rights so distributed teams can move quickly without diluting the brand.']
    ],
    deliverables: ['Research & diagnosis', 'Positioning & architecture', 'Naming & verbal identity', 'Visual identity systems', 'Packaging & environments', 'Web & digital design', 'Guidelines & governance', 'Launch campaigns'],
    closing: 'The output is not a logo. It is a world the organisation can keep building.',
    triggers: ['A new business needs a credible market position', 'Growth has made the brand inconsistent', 'A portfolio is difficult to understand', 'A transformation needs one visible idea'],
    engagement: [['Brand transformation', 'Strategy, identity and rollout for an organisation at a point of change.'], ['Identity evolution', 'A sharper system that protects useful recognition and equity.'], ['Launch platform', 'A clear brand and campaign system for a new business, product or place.']]
  },
  digital: {
    marker: 'Wing B / Digital',
    title: <>Move the market<br /><em>one signal at a time.</em></>,
    intro: 'Attention is not a calendar problem. We turn positioning into social strategy, editorial systems, production and campaigns that keep the brand culturally present and commercially useful.',
    promise: 'Strategy  → Stories  → Learning',
    story: [
      ['Social strategy', 'We give every channel a role in the business, grounded in audience behaviour, brand permission and the outcomes attention must create.'],
      ['Editorial systems', 'We build ownable content territories, repeatable franchises and a publishing rhythm that creates memory without becoming predictable.'],
      ['Content production', 'We run concept, scripting, casting, photography, film, motion and post production as one connected asset ecosystem.'],
      ['Campaigns & advertising', 'We concentrate creative and media around the moments that matter, from launches and category education to demand generation.'],
      ['Community & intelligence', 'We connect conversation, qualitative signals and performance data so the next cycle starts with evidence instead of opinion.']
    ],
    deliverables: ['Audience & channel strategy', 'Editorial systems', 'Content calendars', 'Photography & film', 'Reels & motion', 'Campaign creative', 'Paid social', 'Community management', 'Performance reporting'],
    closing: 'The goal is not more content. It is an attention system that learns and compounds.',
    triggers: ['The brand is visible but not distinctive', 'Content depends on urgent requests', 'Production quality varies by channel', 'Reporting describes activity, not decisions'],
    engagement: [['Ongoing partner', 'Strategy, production, publishing and learning managed as one cadence.'], ['Campaign sprint', 'A focused creative and distribution system for a priority business moment.'], ['Content engine', 'A dependable production rhythm that strengthens an existing marketing team.']]
  }
};

const capabilityPages = {
  'brand-strategy': {
    wing: 'design', title: 'Brand strategy', thesis: 'Find the business truth powerful enough to organise a brand around.',
    intro: 'Before identity comes conviction. We connect ambition, market reality, audience tension and commercial direction into a strategic centre the whole organisation can use.',
    problem: 'Without a shared strategy, brand decisions become subjective. Teams optimise their own touchpoints, messages multiply and the market receives fragments instead of one clear proposition.',
    approach: 'We work with leadership, customers, teams and available evidence to locate the most valuable truth in the business. Then we make the hard choices: who the brand is for, what it owns, how the portfolio fits together and which idea should guide expression.',
    principles: [['Business before language', 'The strategy must support a real commercial or organisational change.'], ['Difference with evidence', 'Distinctiveness matters only when the business can credibly deliver it.'], ['Useful at every level', 'A good strategy clarifies decisions for leadership, marketing, product and sales.']],
    process: ['Leadership alignment', 'Research & diagnosis', 'Positioning & architecture', 'Strategic narrative'],
    outputs: ['Brand audit', 'Audience framework', 'Competitive frame', 'Positioning', 'Portfolio architecture', 'Brand idea', 'Messaging principles'],
    fit: 'Useful before a launch, transformation, acquisition, portfolio change or identity programme.'
  },
  'verbal-identity': {
    wing: 'design', title: 'Verbal identity', thesis: 'Give the strategy a voice people can recognise without seeing the logo.',
    intro: 'We translate positioning into naming, narrative, messaging and verbal behaviour, creating a voice with enough character for campaigns and enough discipline for enterprise communication.',
    problem: 'When every team writes independently, tone becomes inconsistent and important ideas are diluted. The organisation may look coherent while sounding like several different companies.',
    approach: 'We define the relationship between meaning and voice: what the brand needs to say, how it should sound, and how that voice changes without losing itself across leadership, campaigns, products and customer communication.',
    principles: [['Meaning first', 'Voice begins with a clear point of view, not a list of adjectives.'], ['Range, not rigidity', 'The system flexes across contexts while retaining recognisable behaviour.'], ['Written for use', 'Guidance includes practical patterns, examples and tools, not abstract theory.']],
    process: ['Language audit', 'Narrative architecture', 'Voice development', 'Application & guidance'],
    outputs: ['Naming', 'Brand narrative', 'Messaging hierarchy', 'Tone of voice', 'Taglines', 'Copy principles', 'Writing toolkit'],
    fit: 'Useful when messages have multiplied, a new identity needs a voice, or complex offers need plain language.'
  },
  'visual-identity': {
    wing: 'design', title: 'Visual identity', thesis: 'Turn one strategic idea into a thousand recognisable appearances.',
    intro: 'A mark identifies. A visual system builds memory. We create coherent behaviours across type, colour, image, motion and information so the brand stays itself wherever it appears.',
    problem: 'A logo can identify a company, but it cannot manage a growing ecosystem. Without stronger design logic, every new campaign or channel becomes another exception.',
    approach: 'We translate the brand idea into a focused set of useful behaviours: type, colour, composition, image, motion and information design. Then we test them against the organisation’s most demanding applications.',
    principles: [['Distinct by behaviour', 'Recognition comes from how the whole system acts, not one isolated mark.'], ['Designed under pressure', 'We test the identity against dense, small, fast and imperfect conditions.'], ['Built to travel', 'The system supports internal teams and external partners without constant intervention.']],
    process: ['Creative territories', 'Core identity', 'Application testing', 'System documentation'],
    outputs: ['Logo system', 'Typography', 'Colour system', 'Art direction', 'Motion principles', 'Templates', 'Identity guidelines'],
    fit: 'Useful for new ventures, repositioning, mergers, category expansion or brands that have become visually inconsistent.'
  },
  'experience-rollout': {
    wing: 'design', title: 'Experience & rollout', thesis: 'Move the identity from presentation to lived experience.',
    intro: 'The brand becomes real at the point of encounter. We translate the system into digital products, packaging, environments, campaigns and internal moments that make the promise tangible.',
    problem: 'Many identities weaken after approval because the rollout is treated as production. Critical touchpoints are solved in isolation and the brand idea never becomes tangible.',
    approach: 'We identify the experiences with the greatest strategic weight, prototype the system across them and create a coordinated rollout that gives internal teams a visible standard to build from.',
    principles: [['Prioritise moments', 'Not every touchpoint deserves equal investment or attention.'], ['Prototype the system', 'Real applications reveal gaps that presentation slides cannot.'], ['Launch is adoption', 'Internal understanding matters as much as external visibility.']],
    process: ['Touchpoint mapping', 'Experience principles', 'Prototype & design', 'Rollout planning'],
    outputs: ['Web design', 'Packaging', 'Environmental design', 'Campaign systems', 'Internal launch', 'Rollout toolkit', 'Partner briefs'],
    fit: 'Useful when a new identity must move across a large organisation, physical network or launch across multiple channels.'
  },
  'governance': {
    wing: 'design', title: 'Brand governance', thesis: 'Protect the idea while giving the organisation room to move.',
    intro: 'Enterprise brands do not scale through approvals alone. We build principles, tools, templates and decision rights that let teams act with speed while recognition compounds.',
    problem: 'As organisations scale, brand quality often depends on a few people reviewing everything. This slows teams down and still fails to prevent drift.',
    approach: 'We turn the identity into an operating model: clear standards, flexible templates, ownership rules and enablement designed around how work is actually commissioned and produced.',
    principles: [['Principles over policing', 'Teams make better decisions when they understand the reason behind the rule.'], ['Right control, right place', 'Critical moments need scrutiny. Routine work needs speed.'], ['Improve through use', 'Governance should learn from recurring exceptions and changing needs.']],
    process: ['Workflow audit', 'Standards framework', 'Tools & templates', 'Training & stewardship'],
    outputs: ['Brand guidelines', 'Governance model', 'Approval matrix', 'Templates', 'Training sessions', 'Partner onboarding', 'Quality reviews'],
    fit: 'Useful for distributed teams, brand portfolios, franchise networks and organisations with many communication partners.'
  },
  'social-strategy': {
    wing: 'digital', title: 'Social strategy', thesis: 'Turn channels into a connected system for attention, memory and action.',
    intro: 'We define who the brand must matter to, the role it can credibly play in their world and how each channel should move attention toward a business outcome.',
    problem: 'Without a strategy, channels become calendars. Teams chase formats and trends while the relationship between content, audience and business remains unclear.',
    approach: 'We connect business priorities to audience behaviour, define an explicit role for each channel and establish the territories, measures and operating choices that guide daily work.',
    principles: [['Role before format', 'A channel needs a purpose before it needs another recurring series.'], ['Earn attention', 'Useful, interesting or culturally relevant content precedes the ask.'], ['Measure decisions', 'Reporting should change what the team does next.']],
    process: ['Audience & channel audit', 'Strategic role', 'Content architecture', 'Measurement design'],
    outputs: ['Audience framework', 'Channel strategy', 'Content territories', 'Format system', 'Publishing principles', 'Measurement framework'],
    fit: 'Useful when activity is high but distinctiveness, audience growth or business relevance remains unclear.'
  },
  'editorial-systems': {
    wing: 'digital', title: 'Editorial systems', thesis: 'Create memory through repetition without becoming repetitive.',
    intro: 'We turn social strategy into ownable territories, recurring franchises and a sustainable cadence, giving the brand an editorial point of view audiences can learn and teams can operate.',
    problem: 'Content often begins from an empty calendar every month. This creates reactive planning, inconsistent quality and unnecessary production pressure.',
    approach: 'We build a modular editorial architecture: ownable territories, repeatable formats, clear roles for fast and considered content, and a cadence aligned to audience attention and business moments.',
    principles: [['Territories create memory', 'Repeated ideas help audiences understand what the brand is useful for.'], ['Formats create efficiency', 'A strong structure makes room for creativity instead of replacing it.'], ['Cadence follows capacity', 'The system must be ambitious enough to matter and realistic enough to run.']],
    process: ['Editorial diagnosis', 'Territory design', 'Format prototyping', 'Calendar & workflow'],
    outputs: ['Editorial territories', 'Recurring formats', 'Channel playbooks', 'Content calendar', 'Brief templates', 'Production workflow'],
    fit: 'Useful for ongoing programmes, teams managing multiple channels and brands struggling with reactive content planning.'
  },
  'content-production': {
    wing: 'digital', title: 'Content production', thesis: 'Build an asset ecosystem, not another folder of content.',
    intro: 'We connect creative direction, scripting, production design, photography, film, motion and post production so every shoot serves a larger editorial and campaign system.',
    problem: 'Production becomes expensive when ideas, formats and distribution are decided separately. Teams either fail to use strong material fully or compromise quality to feed the calendar.',
    approach: 'We begin with the channel role and content architecture, then plan scripts, storyboards, locations, casting, crew and capture around a deliberate asset system.',
    principles: [['Plan for the edit', 'Every frame has a known role, format and destination before the shoot.'], ['One world, many outputs', 'A production system creates range without fragmenting the brand.'], ['Craft serves the idea', 'Technique earns its place by making the story clearer or more compelling.']],
    process: ['Concept & scripting', 'Production planning', 'Photography & filming', 'Post production & delivery'],
    outputs: ['Creative concepts', 'Scripts', 'Storyboards', 'Photography', 'Brand films', 'Reels', 'Motion graphics', 'Edit systems'],
    fit: 'Useful for launch campaigns, ongoing social media, product stories, hospitality, real estate and brands built around materials.'
  },
  'campaigns-advertising': {
    wing: 'digital', title: 'Campaigns & advertising', thesis: 'Give the market one idea worth gathering around.',
    intro: 'We connect a business priority to an organising creative idea, then build the asset and distribution system that lets every impression strengthen the same memory.',
    problem: 'Campaigns lose force when the idea, production and media plan are developed in sequence by separate teams. The result is often visible but not cumulative.',
    approach: 'We bring strategy, concept, content and channel planning together early. Then we build an extensible creative platform that stays recognisable across formats and placements.',
    principles: [['One organising idea', 'Every execution should add to the same memory structure.'], ['Design for distribution', 'The creative system anticipates channel behaviour and media weight.'], ['Optimise without dilution', 'Learning improves execution while the central idea remains intact.']],
    process: ['Campaign strategy', 'Creative platform', 'Production & adaptation', 'Distribution & optimisation'],
    outputs: ['Campaign idea', 'Key visual system', 'Film & social assets', 'Launch toolkit', 'Paid social creative', 'Adaptation system', 'Performance review'],
    fit: 'Useful for launches, seasonal priorities, category education, repositioning and critical business moments.'
  },
  'community-intelligence': {
    wing: 'digital', title: 'Community & intelligence', thesis: 'Turn audience response into the next strategic advantage.',
    intro: 'We connect community conversation, qualitative signals and performance data so audience behaviour becomes usable market intelligence, not another monthly dashboard.',
    problem: 'Brands often separate community response from reporting. Important questions, objections and signals remain buried while dashboards describe activity without guiding action.',
    approach: 'We establish response principles, escalation paths and a learning framework that combines quantitative performance with qualitative audience evidence.',
    principles: [['People, not tickets', 'Community response should be useful, human and consistent with the brand.'], ['Context before metrics', 'Numbers become valuable when connected to intent, content and audience behaviour.'], ['Learning closes the loop', 'Every review ends with explicit choices for the next cycle.']],
    process: ['Community framework', 'Response & escalation', 'Performance analysis', 'Decision review'],
    outputs: ['Community playbook', 'Response library', 'Escalation matrix', 'Reporting dashboard', 'Monthly review', 'Content recommendations'],
    fit: 'Useful for ongoing programmes, large communities and enterprise teams that need clearer evidence for decisions.'
  }
};

function Seo({ title, description, path }) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://moderndaymarketingagency.com${path}`);
  }, [title, description, path]);
  return null;
}

function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let context;
    let frame;
    const listeners = [];

    frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        const headerItems = document.querySelectorAll('.site-header .logo, .site-header .menu-button, .site-header .nav > *');
        if (headerItems.length) {
          gsap.fromTo(headerItems,
            { y: -12 },
            { y: 0, duration: .62, stagger: .045, ease: 'power3.out', clearProps: 'transform' }
          );
        }

        const main = document.querySelector('main');
        const firstSection = main?.querySelector(':scope > section');
        const firstHeading = firstSection?.querySelector('h1');
        if (firstHeading) {
          gsap.fromTo(firstHeading,
            { y: 24 },
            { y: 0, duration: .82, delay: .08, ease: 'power4.out', clearProps: 'transform' }
          );
        }

        const sections = main ? Array.from(main.querySelectorAll(':scope > section')).slice(1) : [];
        sections.forEach(section => {
          gsap.fromTo(section,
            { y: 28, autoAlpha: .01 },
            {
              y: 0,
              autoAlpha: 1,
              duration: .76,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: { trigger: section, start: 'top 88%', once: true }
            }
          );
        });
      });

      document.querySelectorAll('.motion-arrow').forEach(arrow => {
        const control = arrow.closest('a, button');
        if (!control) return;
        const enter = () => gsap.to(arrow, { x: 5, y: -2, duration: .24, ease: 'power2.out' });
        const leave = () => gsap.to(arrow, { x: 0, y: 0, duration: .3, ease: 'power2.out' });
        ['pointerenter', 'focus'].forEach(event => {
          control.addEventListener(event, enter);
          listeners.push([control, event, enter]);
        });
        ['pointerleave', 'blur'].forEach(event => {
          control.addEventListener(event, leave);
          listeners.push([control, event, leave]);
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      listeners.forEach(([element, event, handler]) => element.removeEventListener(event, handler));
      context?.revert();
    };
  }, []);

  return null;
}

function PageFooter() {
  return (
    <footer className="footer-classic">
      <Logo />
      <div><span>Jubilee Hills, Hyderabad</span><span>Mon to Fri / 10:00 to 19:00 IST</span></div>
      <div><a href="https://www.linkedin.com/company/modern-day/">LinkedIn <Arrow /></a><a href="tel:+919573174647">+91 95731 74647</a></div>
      <span>© {new Date().getFullYear()} Modern Day</span>
    </footer>
  );
}

function PracticeGraph({ kind = 'connected' }) {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 40);
    camera.position.set(0, 0, 12);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const count = 72;
    const pointPositions = new Float32Array(count * 3);
    const pointColors = new Float32Array(count * 3);
    const targets = [];
    const ink = new THREE.Color(0x242520);
    const orange = new THREE.Color(0xe65d33);
    const acid = new THREE.Color(0xa6b73b);

    for (let index = 0; index < count; index += 1) {
      let x;
      let y;
      let z;
      if (kind === 'design') {
        const layer = Math.floor(index / 12);
        const position = index % 12;
        x = (layer - 2.5) * 1.75;
        y = (position - 5.5) * .48;
        z = Math.sin(layer * .9 + position * .3) * .15;
      } else if (kind === 'digital') {
        const ring = Math.floor(index / 12);
        const angle = (index % 12) / 12 * Math.PI * 2;
        const radius = 1.2 + ring * .58;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius * .62;
        z = (ring - 2.5) * .26;
      } else {
        const side = index < count / 2 ? -1 : 1;
        const local = index % 36;
        const column = Math.floor(local / 6);
        const row = local % 6;
        x = side * (1.05 + (5 - column) * .76);
        y = (row - 2.5) * .72 + (side > 0 ? Math.sin(column * .8) * .25 : 0);
        z = side > 0 ? Math.sin(local * .65) * .42 : 0;
      }
      targets.push({ x, y, z });
      pointPositions[index * 3] = x;
      pointPositions[index * 3 + 1] = y;
      pointPositions[index * 3 + 2] = z;
      const accent = index % 12 === 0;
      (accent ? (kind === 'digital' ? acid : orange) : ink).toArray(pointColors, index * 3);
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));
    const pointMaterial = new THREE.PointsMaterial({ size: .095, vertexColors: true, transparent: true, opacity: .9 });
    const points = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(points);

    const linePoints = [];
    if (kind === 'digital') {
      for (let ring = 0; ring < 6; ring += 1) {
        for (let item = 0; item < 12; item += 1) {
          linePoints.push(
            new THREE.Vector3(...Object.values(targets[ring * 12 + item])),
            new THREE.Vector3(...Object.values(targets[ring * 12 + ((item + 1) % 12)]))
          );
        }
      }
    } else {
      for (let index = 0; index < count - 1; index += 1) {
        if ((index + 1) % 12 !== 0) {
          linePoints.push(
            new THREE.Vector3(targets[index].x, targets[index].y, targets[index].z),
            new THREE.Vector3(targets[index + 1].x, targets[index + 1].y, targets[index + 1].z)
          );
        }
      }
      if (kind === 'connected') linePoints.push(new THREE.Vector3(-1.05, 0, 0), new THREE.Vector3(1.05, 0, 0));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x70736b, transparent: true, opacity: .26 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const pointer = { x: 0, y: 0 };
    const move = event => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      const time = reduced ? 0 : clock.getElapsedTime();
      const pulse = kind === 'digital' ? Math.sin(time * 1.2) * .07 : 0;
      points.rotation.z += ((kind === 'digital' ? time * .025 : pointer.x * .04) - points.rotation.z) * .03;
      lines.rotation.z = points.rotation.z;
      points.rotation.x += (-pointer.y * .08 - points.rotation.x) * .035;
      lines.rotation.x = points.rotation.x;
      points.scale.setScalar(1 + pulse);
      lines.scale.copy(points.scale);
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    resize();
    animate();
    window.addEventListener('resize', resize);
    host.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', move);
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [kind]);
  const labels = kind === 'design' ? ['Business truth', 'Brand system'] : kind === 'digital' ? ['Publish', 'Learn', 'Improve'] : ['Design', 'One logic', 'Digital'];
  return <div className={`practice-graph graph-${kind}`}><div ref={mount} /><footer>{labels.map(label => <span key={label}>{label}</span>)}</footer></div>;
}

function ServicesPage() {
  return (
    <>
      <Seo
        title="Enterprise Brand Design and Social Media Services | Modern Day"
        description="Modern Day brings two specialist practices together: brand strategy and design, plus social media strategy, content production, campaigns and intelligence."
        path="/services"
      />
      <Header />
      <main className="interior-page services-page-v2">
        <section className="services-experience">
          <div className="services-experience-top"><span>Capabilities / Design + Digital</span><span>Independent partner / Hyderabad</span></div>
          <div className="services-experience-copy">
            <span>Two practices. One standard.</span>
            <h1>Build the<br /><em>brand.</em><br />Move the<br /><strong>market.</strong></h1>
            <p>Design gives the business an ownable form. Digital gives that form rhythm, reach and relevance. Engage either practice, or connect both around one market ambition.</p>
          </div>
        </section>
        <section className="services-experience-system" aria-label="Modern Day service system">
          <header><span>Choose where the change begins</span><span>Two ways in. One connected market system.</span></header>
          <a href="/services/design" className="services-experience-design"><span>Practice / 01</span><i aria-hidden="true" /><strong>Design</strong><small>Brand strategy / Identity / Rollout</small><b>Explore Design <Arrow /></b></a>
          <a href="/services/digital" className="services-experience-digital"><span>Practice / 02</span><i aria-hidden="true" /><strong>Digital</strong><small>Social strategy / Content / Campaigns</small><b>Explore Digital <Arrow /></b></a>
        </section>
        <section className="service-signals">
          <header><p className="section-label">When to bring us in</p><h2>The business moved.<br />The brand did not.</h2></header>
          <div className="service-signal-list">
            <article><span>Business / Brand</span><strong>The company has evolved. The identity has not.</strong><p>Growth, acquisition or a new category has made the existing story too small.</p></article>
            <article><span>Brand / Channel</span><strong>The strategy disappears in execution.</strong><p>Teams and partners create volume, but every channel speaks a different language.</p></article>
            <article><span>Channel / Audience</span><strong>Content is constant. Relevance is not.</strong><p>The calendar is full, yet the brand has no recognisable editorial point of view.</p></article>
            <article><span>Team / System</span><strong>Good work depends on heroic effort.</strong><p>There is no repeatable system for decisions, production, governance or learning.</p></article>
          </div>
        </section>
        <section className="operating-section">
          <p className="section-label">One operating model</p>
          <div className="operating-head">
            <h2>From strategic tension<br />to operating momentum.</h2>
            <p>Every engagement begins with a consequential business question, then moves through a visible decision rhythm. The scope changes. Senior accountability and creative continuity do not.</p>
          </div>
          <div className="operating-steps">
            <div><span>Diagnose</span><strong>Find the tension beneath the brief</strong><p>Leadership conversations, research and market evidence before creative opinion.</p></div>
            <div><span>Define</span><strong>Choose what the brand will own</strong><p>Align audience, position, portfolio, priorities, responsibilities and measures.</p></div>
            <div><span>Build</span><strong>Turn the idea into a system</strong><p>Create identity, formats, tools and production logic designed to survive beyond launch.</p></div>
            <div><span>Operate</span><strong>Let the market make it smarter</strong><p>Use rollout, channel rhythm and performance intelligence to improve the next cycle.</p></div>
          </div>
        </section>
        <section className="services-proof">
          <div><span>Established</span><strong>2020</strong></div>
          <div><span>Completed projects</span><strong>50+</strong></div>
          <blockquote>Senior attention.<br />Enterprise scale thinking.</blockquote>
        </section>
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

function ContactBand() {
  return (
    <section className="contact-band">
      <p className="section-label">Start with the business change</p>
      <div><h2>What needs to<br />move?</h2><a href="/contact">Start a conversation <Arrow /></a></div>
    </section>
  );
}

function ServiceDetail({ type }) {
  const page = detailPages[type];
  const capabilitySlug = title => title.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  const process = type === 'design'
    ? [['Listen', 'Align leadership around the business change and the decisions the brand must support.'], ['Frame', 'Define position, architecture, audiences and the idea that holds the system together.'], ['Design', 'Build verbal and visual behaviours across real organisational touchpoints.'], ['Enable', 'Equip teams, partners and leaders to apply the system with confidence.']]
    : [['Listen', 'Connect business priorities to audience behaviour, channel roles and useful measures.'], ['Plan', 'Define editorial territories, formats, campaigns and a realistic production cadence.'], ['Produce', 'Run concept, scripting, shoots, post production, publishing and distribution as one flow.'], ['Learn', 'Turn platform and community signals into specific decisions for the next cycle.']];
  return (
    <>
      <Seo
        title={`${type === 'design' ? 'Brand Strategy and Design' : 'Social Media and Digital Marketing'} | Modern Day`}
        description={page.intro}
        path={`/services/${type}`}
      />
      <Header />
      <main className={`interior-page detail-page detail-v2 detail-${type}`}>
        <section className="detail-hero-v3">
          <div className="detail-hero-top"><span>{page.marker}</span><a href="/services">Design + Digital <Arrow /></a></div>
          <div className="detail-hero-thesis">
            <h1>{type === 'design' ? <>Give ambition<br />an <em>ownable form.</em></> : <>Make attention<br /><em>compound.</em></>}</h1>
            <p>{type === 'design' ? 'We find the business truth worth building around, then turn it into positioning, identity and experience systems that create recognition across markets and teams.' : 'We turn positioning into an editorial and campaign engine that earns attention, builds memory and converts market response into the next strategic move.'}</p>
          </div>
          <div className="detail-hero-system">
            {(type === 'design' ? ['Business truth', 'Position', 'Identity', 'Experience'] : ['Position', 'Strategy', 'Content', 'Influence']).map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 3 && <Arrow />}</div>)}
          </div>
        </section>
        <section className="service-context">
          <header><p className="section-label">The conditions</p><h2>Bring us in<br />at the point of change.</h2></header>
          <div>{page.triggers.map((trigger, index) => <p key={trigger}><span>{String(index + 1).padStart(2, '0')}</span>{trigger}</p>)}</div>
        </section>
        <section className="capability-story">
          <header><p className="section-label">The practice</p><h2>One strategic centre.<br />Every expression connected.</h2></header>
          <div className="capability-list">
            {page.story.map(([title, copy], index) => (
              <a className="capability-row" href={`/services/${type}/${capabilitySlug(title)}`} key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
                <Arrow />
              </a>
            ))}
          </div>
        </section>
        <section className="service-process">
          <header><p className="section-label">How the work moves</p><h2>Momentum without<br />the black box.</h2></header>
          <div>{process.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
        <section className="service-engagements">
          <p className="section-label">Ways to engage</p>
          <div>{page.engagement.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
        <section className="deliverables-section">
          <div>
            <p className="section-label">A useful output</p>
            <h2>{page.closing}</h2>
          </div>
          <ul>{page.deliverables.map(item => <li key={item}>{item}<Arrow /></li>)}</ul>
        </section>
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

function CapabilityDetailPage({ slug }) {
  const page = capabilityPages[slug];
  if (!page) return <NotFound />;
  const wingName = page.wing === 'design' ? 'Design' : 'Digital';
  const siblingSlugs = Object.keys(capabilityPages).filter(key => capabilityPages[key].wing === page.wing);
  const nextSlug = siblingSlugs[(siblingSlugs.indexOf(slug) + 1) % siblingSlugs.length];
  const next = capabilityPages[nextSlug];
  return (
    <>
      <Seo title={`${page.title} | ${wingName} Services | Modern Day`} description={page.intro} path={`/services/${page.wing}/${slug}`} />
      <Header />
      <main className={`interior-page capability-page capability-${page.wing}`}>
        <section className="capability-hero">
          <div className="capability-hero-copy">
            <p className="eyebrow"><a href={`/services/${page.wing}`}>{wingName}</a> / {page.title}</p>
            <h1>{page.title}</h1>
            <p>{page.thesis}</p>
          </div>
          <PracticeGraph kind={page.wing} />
          <div className="capability-hero-rail"><span>{page.intro}</span><i /></div>
        </section>

        <section className="capability-explanation">
          <p className="section-label">Why it matters</p>
          <div><h2>The tension</h2><p>{page.problem}</p></div>
          <div><h2>The strategic move</h2><p>{page.approach}</p></div>
        </section>

        <section className="capability-principles">
          <header><p className="section-label">Working principles</p><h2>What cannot be lost<br />as the system grows.</h2></header>
          <div>{page.principles.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="capability-method">
          <p className="section-label">Engagement sequence</p>
          <div>{page.process.map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><i /></article>)}</div>
        </section>

        <section className="capability-outputs">
          <div><p className="section-label">Typical outputs</p><h2>Strategy that leaves<br />the presentation room.</h2></div>
          <ul>{page.outputs.map(output => <li key={output}>{output}<span> ↗</span></li>)}</ul>
        </section>

        <section className="capability-fit">
          <span>When this is useful</span><p>{page.fit}</p>
        </section>

        <section className="capability-next">
          <span>Next capability / {wingName}</span>
          <h2>{next.title}</h2>
          <a href={`/services/${page.wing}/${nextSlug}`}>Continue <Arrow /></a>
        </section>
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found"><span>404 / Signal lost</span><h1>This page moved<br />out of range.</h1><a href="/">Return to Modern Day <Arrow /></a></main>
      <PageFooter />
    </>
  );
}

const codedProjects = new Set(['egg-break', 'social-battery', 'sleeping-tiger', 'eagle-stone', 'the-sanctuary', 'ghar-culture', 'design-commune', 'dat-social', 'modcon-social', 'malle-social', 'helios-social', 'grey-rose-social', 'agartha-social', 'pandora', 'sasyaa', 'luma', 'millet', 'shriyasom', 'hera', 'sepal', 'briskev', 'vian-valley', 'restaurant-showcase', 'wilderness-retreat', 'orka']);
const projectOrder = ['sleeping-tiger', 'egg-break', 'social-battery', 'design-commune', 'ghar-culture', 'pandora', 'eagle-stone', 'sasyaa', 'millet', 'dat-social', 'modcon-social', 'malle-social', 'helios-social', 'grey-rose-social', 'agartha-social', 'the-sanctuary'];
const portfolioExcludedProjects = new Set(['luma']);
const retiredProjectEntries = new Set(['egg-break-packing-designing', 'egg-break-logo', 'fmn', 'pinnaki', 'lazy-chair', 'grey-rose', 'vianproperties', 'spice-hub', 'taamara', 'f45', 'handcraftfoods', 'autumn-leaf', 'greenpark', 'one-cloud', 'ultron', 'shriyasom', 'hera', 'sepal', 'vian-valley', 'restaurant-showcase', 'wilderness-retreat', 'orka']);
const eggBreakProject = {
  slug: 'egg-break', title: 'EggBreak', category: 'Brand & product design', wing: 'Design',
  summary: 'A new liquid egg category designed from the object out, from identity and bottle architecture to packaging and fleet.',
  sourceUrl: 'https://www.modernday.in/project/egg-break-packing-designing'
};
const socialBatteryProject = {
  slug: 'social-battery', title: 'Social Battery', category: 'Brand and packaging', wing: 'Design',
  summary: 'A four flavor energy drink system imagined as a collectible power cell, built for shelves, nightlife, gaming and the city.',
  sourceUrl: '/work/social-battery'
};
const sleepingTigerProject = {
  slug: 'sleeping-tiger', title: 'Sleeping Tiger', category: 'Brand identity and packaging', wing: 'Design',
  summary: 'A soft but fearless sleepwear identity built from a hand drawn tiger, an unmistakable wordmark and a complete tactile world.'
};
const malleProject = {
  slug: 'malle-social', title: 'Malle', category: 'Campaign photography', wing: 'Digital',
  summary: 'One fashion shoot shaped into two sporting worlds, from the long shadows of golf to the colour and momentum of pickleball.'
};
const modconProject = {
  slug: 'modcon-social', title: 'ModCon', category: 'Social media', wing: 'Digital',
  summary: 'A social media campaign that connects founder conviction, Hyderabad growth stories and project moments into one credible market voice.',
  sourceUrl: 'https://www.modconbuilders.com/'
};
const datProject = {
  slug: 'dat-social', title: 'DAT', category: 'Social media and web design', wing: 'Digital',
  summary: 'A precise digital presence for a spatial technology company, bringing complex ideas to life through motion led carousels, reels and a complete website.',
  sourceUrl: 'https://deftntact.com/'
};
const heliosProject = {
  slug: 'helios-social', title: 'Helios Stone', category: 'Social media', wing: 'Digital',
  summary: 'An ongoing social system that turns stone, scale and provenance into a premium material story.',
  sourceUrl: 'https://www.instagram.com/heliosstone/'
};
const greyRoseSocialProject = {
  slug: 'grey-rose-social', title: 'Gray Rose', category: 'Social media and brand development', wing: 'Digital',
  summary: 'A founder led reel system that turns global exposure, material knowledge and design judgment into visible authority.'
};
const agarthaProject = {
  slug: 'agartha-social', title: 'Agartha', category: 'Social media', wing: 'Digital',
  summary: 'A content world shaped by nature for an earth home community outside Hyderabad.',
  sourceUrl: 'https://www.instagram.com/agartha_by_modcon/'
};
const designCommuneProject = {
  slug: 'design-commune', title: 'Design Commune', category: 'Brand identity system', wing: 'Design',
  summary: 'A modular identity where two initials become one continuous architectural space, built to connect, repeat and grow.'
};
const projects = [sleepingTigerProject, eggBreakProject, socialBatteryProject, designCommuneProject, datProject, modconProject, malleProject, heliosProject, greyRoseSocialProject, agarthaProject, ...projectCatalog.filter(project => !retiredProjectEntries.has(project.slug)).map(applyProjectCopy)].map((project, index) => ({
  name: project.title === 'Sanctuary' ? 'The Sanctuary' : project.title,
  type: project.category,
  wing: project.wing,
  note: project.summary,
  code: `MD / ${String(index + 1).padStart(2, '0')}`,
  slug: project.slug,
  sourceUrl: project.sourceUrl,
  isCoded: codedProjects.has(project.slug)
})).sort((a, b) => {
  const aIndex = projectOrder.indexOf(a.slug);
  const bIndex = projectOrder.indexOf(b.slug);
  if (aIndex === -1 && bIndex === -1) return 0;
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;
  return aIndex - bIndex;
});

function WorkPage({ fixedWing = null }) {
  const [filter, setFilter] = useState(fixedWing || 'All');
  const registry = usePublishedProjectSlugs();
  const registryIsComplete = registry.loaded && registry.slugs.length >= Math.floor(projects.length * .5);
  const activeProjects = registryIsComplete ? projects.filter(project => registry.slugs.includes(project.slug) || ['design-commune', 'sleeping-tiger', 'egg-break', 'social-battery', 'ghar-culture', 'pandora', 'eagle-stone', 'sasyaa', 'millet', 'dat-social', 'modcon-social', 'grey-rose-social', 'malle-social', 'helios-social', 'agartha-social'].includes(project.slug)) : projects;
  const activeFilter = fixedWing || filter;
  const visibleProjects = (activeFilter === 'All' ? activeProjects : activeProjects.filter(project => project.wing === activeFilter))
    .filter(project => !portfolioExcludedProjects.has(project.slug));
  const isDesign = fixedWing === 'Design';
  const isDigital = fixedWing === 'Digital';
  const digitalFeaturedOrder = ['dat-social', 'malle-social', 'helios-social'];
  const designFeaturedOrder = ['sleeping-tiger', 'egg-break', 'social-battery', 'design-commune', 'ghar-culture', 'pandora'];
  const featured = isDigital
    ? digitalFeaturedOrder.map(slug => visibleProjects.find(project => project.slug === slug)).filter(Boolean)
    : isDesign
      ? designFeaturedOrder.map(slug => visibleProjects.find(project => project.slug === slug)).filter(Boolean)
      : visibleProjects.slice(0, 3);
  const registerProjects = fixedWing
    ? visibleProjects.filter(project => !featured.some(featuredProject => featuredProject.slug === project.slug))
    : visibleProjects;
  const designCount = activeProjects.filter(project => project.wing === 'Design').length;
  const digitalCount = activeProjects.filter(project => project.wing === 'Digital').length;
  const pageTitle = isDesign ? 'Selected Design Work | Modern Day' : isDigital ? 'Selected Digital Work | Modern Day' : 'Selected Design and Digital Work | Modern Day';
  const pageDescription = isDesign
    ? 'Selected brand identity, packaging and product design work by Modern Day in Hyderabad.'
    : isDigital
      ? 'Selected social media, content and digital campaign work by Modern Day in Hyderabad.'
      : 'Selected brand, social media, packaging and content production work by Modern Day in Hyderabad.';
  const pagePath = fixedWing ? `/work/${fixedWing.toLowerCase()}` : '/work';

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} path={pagePath} />
      <Header />
      <main className={`interior-page work-page ${fixedWing ? `work-wing-page work-wing-${fixedWing.toLowerCase()}` : ''}`}>
        <section className="work-hero">
          <p className="eyebrow">{fixedWing ? `${fixedWing} projects / ModernDay` : 'Selected partnerships / Design + Digital'}</p>
          <h1>{isDigital ? <>Signals that<br /><em>move markets.</em></> : isDesign ? <>Worlds built<br /><em>to be remembered.</em></> : <>Ideas made<br /><em>impossible to ignore.</em></>}</h1>
          <div className="work-intro">
            <p>{isDigital ? 'Social strategy, editorial systems and campaigns that turn a brand point of view into repeated attention, market memory and measurable learning.' : isDesign ? 'Strategy, identity, packaging and experience systems that give ambitious businesses an ownable form and the discipline to keep it.' : 'Brand worlds and market systems for organisations that need recognition to endure and attention to compound.'}</p>
            <span>{visibleProjects.length} {fixedWing ? fixedWing.toLowerCase() : ''} projects<br />One connected standard</span>
          </div>
        </section>

        {!fixedWing && (
          <section className="work-signal" aria-label="Portfolio split">
            <div><span>Design</span><strong>{designCount}</strong></div>
            <div className="work-signal-track"><i /></div>
            <div><span>Digital</span><strong>{digitalCount}</strong></div>
          </section>
        )}

        <section className="featured-work">
          <header><span>Lead stories</span><span>Custom case studies / {String(featured.length).padStart(2, '0')}</span></header>
          <div className="featured-grid">
            {featured.map((project, index) => {
              const presentation = {
                'egg-break': {
                  title: <>Egg<br />Break</>,
                  note: 'A new food category built from the object out, where identity, bottle architecture, packaging and fleet tell one seamless product story.'
                },
                'social-battery': {
                  title: <>Social<br />Battery</>,
                  note: 'An energy drink recast as a collectible power cell, giving shelves, streets and screens one unmistakable charge code.'
                },
                'sleeping-tiger': {
                  title: <>Sleeping<br />Tiger</>,
                  note: 'A sleepwear world built on the tension between strength and rest, carried through character, product ritual and tactile packaging.'
                },
                'eagle-stone': {
                  title: <>Eagle<br />Stone</>,
                  note: 'An elemental identity that turns natural strength, precision and perspective into a premium stone brand.'
                },
                'ghar-culture': {
                  title: <>Ghar<br />Culture</>,
                  note: 'Marble permanence and Indian visual memory shaped into a contemporary identity for the objects that make a house feel like home.'
                },
                'design-commune': {
                  title: <>Design<br />Commune</>,
                  note: 'Two initials become one continuous architectural system, designed to connect, repeat and grow.'
                },
                'pandora': {
                  title: <>Pandora</>,
                  note: 'A moon led identity for a hospitality world shaped by curiosity, cocktails and after dark allure.'
                },
                'grey-rose-social': {
                  title: <>Gray<br />Rose</>,
                  note: 'A designer becomes the visible expert through founder led reels, international sourcing and a clear editorial point of view.'
                },
                'malle-social': {
                  title: <>Malle<br />Sport</>,
                  note: 'One campaign shoot moves from golf at golden hour to the bright pace of pickleball, giving each game its own visual pulse.'
                },
                'modcon-social': {
                  title: <>Mod<br />Con</>,
                  note: 'Founder conviction, city context and project stories brought together as one clear social media voice for a modern real estate company.'
                },
                'dat-social': {
                  title: <>D<br />A T</>,
                  note: 'A complex spatial technology proposition made immediate through dimensional storytelling, motion led social content and a complete digital home.'
                }
              }[project.slug] || { title: project.name, note: project.note };

              return (
              <a id={fixedWing ? `project-${project.slug}` : undefined} className={`featured-project featured-project-${project.slug}`} href={`/work/${project.slug}`} key={project.slug}>
                <div className="featured-meta"><span>{project.wing} / {project.type}</span><span>0{index + 1}</span></div>
                <h2>{presentation.title}</h2>
                <p>{presentation.note}</p>
                <div className="featured-link">Read the case study <Arrow /></div>
              </a>
              );
            })}
          </div>
          {isDigital && visibleProjects.length > featured.length && (
            <a className="more-work-cue" href="#all-projects">
              <span>Keep exploring</span>
              <strong>Explore all {visibleProjects.length} digital projects below</strong>
              <i aria-hidden="true">↓</i>
            </a>
          )}
        </section>

        <section className={`work-register ${fixedWing ? 'work-register-continuation' : ''}`} id="all-projects">
          {!fixedWing && <div className="register-head">
            <div><span>Project register</span><h2>The wider body of work.</h2></div>
            {!fixedWing && (
              <div className="work-filters" aria-label="Filter projects">
                {['All', 'Design', 'Digital'].map(option => (
                  <button className={filter === option ? 'active' : ''} onClick={() => setFilter(option)} key={option}>
                    {option} <span>{option === 'All' ? activeProjects.length : activeProjects.filter(project => project.wing === option).length}</span>
                  </button>
                ))}
              </div>
            )}
          </div>}
          <div className="project-index">
            {registerProjects.map((project, index) => (
              <article id={fixedWing ? `project-${project.slug}` : undefined} className="project-tile" key={project.slug}>
                <div className="project-number">{String((fixedWing ? featured.length : 0) + index + 1).padStart(2, '0')}</div>
                <div className="project-code"><span>{project.wing}</span><span>{project.type}</span></div>
                <h3>{project.name}</h3>
                <p>{project.note}</p>
                <a className="project-link" href={project.isCoded ? `/work/${project.slug}` : project.sourceUrl} target={project.isCoded ? undefined : '_blank'} rel={project.isCoded ? undefined : 'noreferrer'}>
                  {project.isCoded ? 'Read case study' : 'View original project'} <Arrow />
                </a>
              </article>
            ))}
          </div>
        </section>
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Seo title="About Modern Day | Independent Design and Digital Partner" description="Modern Day is an independent, founder led Design and Digital partner in Hyderabad. We work with leadership and marketing teams to build brands and market presence." path="/about" />
      <Header />
      <main className="interior-page about-page">
        <section className="about-hero">
          <p className="eyebrow">Modern Day / Since 2020</p>
          <h1>Ambition starts<br />in one mind. <em>We make</em><br />the market see it.</h1>
          <div><p>Independent Design and Digital company.<br />Hyderabad, India.</p><p>We work at the point where founder conviction becomes organisational clarity, then build the identity and market presence that let the world feel the same ambition.</p></div>
        </section>
        <section className="about-story">
          <p className="section-label">Why we exist</p>
          <div>
            <h2>A brand should not become less itself every time it enters the market.</h2>
            <div className="story-copy"><p>Modern Day began with one conviction: the strategic centre of a company should not disappear as the work moves through teams, channels and partners.</p><p>That is why we built two focused practices. Design gives the ambition an ownable form. Digital gives that form rhythm, cultural presence and a continuous relationship with the market.</p></div>
          </div>
        </section>
        <section className="about-independence">
          <header><p className="section-label">What independence changes</p><h2>Closer to the decision.<br />Closer to the work.</h2></header>
          <div className="about-independence-grid">
            <article><span>01 / Proximity</span><h3>The people you meet stay accountable.</h3><p>Senior attention does not disappear after the first conversation. We stay close to the mandate, the decisions and the quality of the work.</p></article>
            <article><span>02 / Coherence</span><h3>One organising idea leads every expression.</h3><p>Identity, experience, editorial content and campaigns come from the same strategic centre, so every appearance deposits into the same memory structure.</p></article>
            <article><span>03 / Momentum</span><h3>We carry it into the market.</h3><p>The work does not end at approval. We help teams launch, operate and improve the systems that keep the brand visible and coherent.</p></article>
          </div>
        </section>
        <section className="founder-door">
          <figure>
            <img src="/images/founder/dharma-teja-portrait.jpg" alt="Dharma Teja, founder of Modern Day, standing in a red gallery space" loading="lazy" />
            <figcaption><span>Founder / Creative Director</span><span>Hyderabad, India</span></figcaption>
          </figure>
          <div>
            <p className="section-label">Meet the founder</p>
            <h2>Dharma Teja.<br /><em>Restless</em> by design.</h2>
            <p>A filmmaker’s eye, a strategist’s discipline and a founder’s refusal to leave the important parts unfinished.</p>
            <a href="/about/dharma-teja">Enter the founder’s room <Arrow /></a>
          </div>
        </section>
        <section className="fact-section">
          <div><strong>2020</strong><span>Founded independently in Hyderabad</span></div>
          <div><strong>85+</strong><span>Creative mandates completed</span></div>
          <div><strong>1M+</strong><span>Views on a standout campaign</span></div>
          <div><strong>2</strong><span>Practices. One standard.</span></div>
        </section>
        <section className="beliefs-section">
          <p className="section-label">How we show up</p>
          <div className="beliefs-grid">
            <div><span>Clarity</span><h3>If the idea is not clear, the work is not ready.</h3></div>
            <div><span>Conviction</span><h3>Strong work chooses a direction and commits.</h3></div>
            <div><span>Care</span><h3>The smallest decision can change what people feel.</h3></div>
            <div><span>Finish</span><h3>We carry the important parts across the line.</h3></div>
          </div>
        </section>
        <ContactBand />
      </main>
      <PageFooter />
    </>
  );
}

function FounderPage() {
  const page = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-founder-reveal]').forEach(element => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: .9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true }
        });
      });
      gsap.utils.toArray('.founder-photo img').forEach(image => {
        gsap.fromTo(image, { scale: 1.06 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: .6 }
        });
      });
    }, page);
    return () => context.revert();
  }, []);

  return (
    <>
      <Seo
        title="Dharma Teja | Founder of Modern Day"
        description="Meet Dharma Teja, founder and creative director of Modern Day: a Hyderabad storyteller shaped by film, design, adventure and uncommon attention."
        path="/about/dharma-teja"
      />
      <Header />
      <main className="founder-page" ref={page}>
        <section className="founder-hero">
          <div className="founder-hero-copy">
            <p className="eyebrow">Founder / Creative Director / Storyteller</p>
            <h1>Dharma<br /><em>Teja.</em></h1>
            <p className="founder-lede">A storyteller who built an agency for founders unwilling to make ordinary companies.</p>
            <div className="founder-credentials">
              <span>Modern Day / Since 2020</span>
              <span>New York Film Academy / 2010 to 2011</span>
              <span>Hyderabad / India</span>
            </div>
          </div>
          <figure className="founder-hero-image founder-photo">
            <img src="/images/founder/dharma-teja-portrait.jpg" alt="Dharma Teja, founder of Modern Day, standing in a red gallery space" width="512" height="640" />
            <figcaption><span>Frame 01 / The storyteller</span><span>Portrait from @mr.dharmateja</span></figcaption>
          </figure>
        </section>

        <section className="founder-origin">
          <p className="section-label">The beginning</p>
          <div>
            <h2 data-founder-reveal>He did not set out to make an agency. He set out to make the work impossible to ignore.</h2>
            <div className="founder-origin-copy" data-founder-reveal>
              <p>Film taught Dharma to think in sequences: find the tension, decide what matters, remove the rest. At Modern Day, that instinct became an operating system for brands.</p>
              <p>Design gives the idea a body. Digital gives it a pulse. He moves between both, protecting the thought from the first conversation to the final frame.</p>
            </div>
          </div>
        </section>

        <section className="founder-altitude">
          <header data-founder-reveal>
            <p className="section-label">Outside the studio</p>
            <h2>Comfort is useful.<br /><em>Leaving it is better.</em></h2>
            <p>Skydiving, skiing and unfamiliar landscapes are not an escape from the work. They are how he keeps his instincts awake.</p>
          </header>
          <figure className="founder-photo founder-freefall" data-founder-reveal>
            <img src="/images/founder/dharma-teja-skydiving.jpg" alt="Dharma Teja skydiving above Pokhara, Nepal" width="640" height="413" loading="lazy" />
            <figcaption><span>Open sky / Freefall</span><span>Pokhara, Nepal</span></figcaption>
          </figure>
          <div className="founder-altitude-pair">
            <figure className="founder-photo" data-founder-reveal>
              <img src="/images/founder/dharma-teja-skiing.jpg" alt="Dharma Teja carrying skis on a snowy slope" width="512" height="640" loading="lazy" />
              <figcaption><span>Snowline / Balance</span><span>Keep moving</span></figcaption>
            </figure>
            <figure className="founder-photo" data-founder-reveal>
              <img src="/images/founder/dharma-teja-mountains.jpg" alt="Dharma Teja seated among birds in a mountain valley" width="640" height="640" loading="lazy" />
              <figcaption><span>Higher ground / Perspective</span><span>Stay curious</span></figcaption>
            </figure>
          </div>
          <p className="founder-altitude-note" data-founder-reveal>Not thrill for its own sake. A practice in staying composed while the conditions change.</p>
        </section>

        <section className="founder-code">
          <header>
            <p className="section-label">His operating code</p>
            <h2 data-founder-reveal>Curiosity<br />with standards.</h2>
          </header>
          <div className="founder-code-grid">
            <article data-founder-reveal><span>01 / Listen</span><h3>See the thing behind the brief.</h3><p>Founders rarely arrive with a neat problem. Dharma listens for the ambition underneath it.</p></article>
            <article data-founder-reveal><span>02 / Enter</span><h3>Stay uncomfortably close.</h3><p>He works inside the problem until the logic, look and language agree.</p></article>
            <article data-founder-reveal><span>03 / Decide</span><h3>Make taste accountable.</h3><p>A bold choice still has to help the business move.</p></article>
            <article data-founder-reveal><span>04 / Finish</span><h3>Carry it across the line.</h3><p>An idea is not finished when it looks good. It is finished when it works in the world.</p></article>
          </div>
        </section>

        <section className="founder-note">
          <p className="section-label">A note from Dharma</p>
          <blockquote data-founder-reveal>“Founders give us something deeply personal: the company they are betting their life on. I want them to feel that their ambition has met an equal amount of care. My job is to understand what they are trying to build, then make the world understand it too.”</blockquote>
        </section>

        <section className="founder-links">
          <div>
            <p className="section-label">Follow the thinking</p>
            <h2>Work in public.<br />Live in motion.</h2>
          </div>
          <nav aria-label="Dharma Teja’s social profiles">
            <a href="https://www.instagram.com/mr.dharmateja/" target="_blank" rel="noreferrer"><span>Instagram</span><small>@mr.dharmateja</small><Arrow /></a>
            <a href="https://www.linkedin.com/in/teja-dharma-8647265b/" target="_blank" rel="noreferrer"><span>LinkedIn</span><small>Dharma Teja</small><Arrow /></a>
            <a href="/contact"><span>Start a conversation</span><small>With Modern Day</small><Arrow /></a>
          </nav>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function ContactPage() {
  const projectTypes = ['Brand and identity', 'Digital and social', 'Campaign or launch', 'Not sure yet'];
  const [brief, setBrief] = useState({ project: projectTypes[0], name: '', email: '', company: '', change: '', timing: '' });
  const updateBrief = (key, value) => setBrief(current => ({ ...current, [key]: value }));
  const sendBrief = event => {
    event.preventDefault();
    const subject = `New ${brief.project} enquiry: ${brief.company || brief.name}`;
    const body = [
      `Name: ${brief.name}`,
      `Work email: ${brief.email}`,
      `Company: ${brief.company || 'Not provided'}`,
      `Mandate: ${brief.project}`,
      `Timing: ${brief.timing || 'Open'}`,
      '',
      'What needs to change:',
      brief.change
    ].join('\n');
    window.location.href = `mailto:work@mdma.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <>
      <Seo title="Contact Modern Day | Design and Digital Partner" description="Talk to Modern Day about brand strategy, identity, social media, content production, campaigns or a connected Design and Digital mandate." path="/contact" />
      <Header />
      <main className="contact-page contact-v2">
        <section className="contact-hero-v2">
          <p className="eyebrow">New mandates / India and international</p>
          <h1>Bring us the<br /><em>consequential</em> thing.</h1>
          <div className="contact-hero-foot">
            <p>Start with the change the business cannot afford to communicate badly. We will shape the mandate together.</p>
            <a href="#project-brief">Build a useful first note <span>↓</span></a>
          </div>
        </section>

        <section className="contact-builder" id="project-brief">
          <header>
            <p className="section-label">A useful first note</p>
            <h2>What needs<br />to move?</h2>
            <p>Share the ambition, the tension and what success must change. We will turn that context into a useful first mandate.</p>
          </header>
          <div className="contact-builder-grid">
            <form onSubmit={sendBrief}>
              <fieldset>
                <legend>Choose a starting point</legend>
                <div className="contact-project-types">
                  {projectTypes.map((type, index) => (
                    <button className={brief.project === type ? 'active' : ''} type="button" key={type} onClick={() => updateBrief('project', type)}>
                      <span>{String(index + 1).padStart(2, '0')}</span>{type}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="contact-fields">
                <label><span>Your name</span><input required value={brief.name} onChange={event => updateBrief('name', event.target.value)} placeholder="Name" /></label>
                <label><span>Work email</span><input required type="email" value={brief.email} onChange={event => updateBrief('email', event.target.value)} placeholder="name@company.com" /></label>
                <label><span>Company</span><input value={brief.company} onChange={event => updateBrief('company', event.target.value)} placeholder="Organisation" /></label>
                <label><span>Timing</span><input value={brief.timing} onChange={event => updateBrief('timing', event.target.value)} placeholder="A date, quarter or open" /></label>
                <label className="wide"><span>What is changing, stuck or newly possible?</span><textarea required rows="5" value={brief.change} onChange={event => updateBrief('change', event.target.value)} placeholder="The complicated version is welcome." /></label>
              </div>
              <button className="contact-send" type="submit"><span>Open this brief in email</span><Arrow /></button>
            </form>

            <aside className="brief-receipt" aria-live="polite">
              <div className="brief-receipt-head"><span>MD / New brief</span><i>Live draft</i></div>
              <dl>
                <div><dt>Mandate</dt><dd>{brief.project}</dd></div>
                <div><dt>From</dt><dd>{brief.name || 'Your name'}</dd></div>
                <div><dt>Organisation</dt><dd>{brief.company || 'Your company'}</dd></div>
                <div><dt>Timing</dt><dd>{brief.timing || 'Open'}</dd></div>
              </dl>
              <blockquote>{brief.change || 'Tell us what needs to change. The note does not need to be polished. It needs to be true.'}</blockquote>
              <footer><span>To / work@mdma.co.in</span><span>HYD / IST</span></footer>
            </aside>
          </div>
        </section>

        <section className="contact-direct">
          <header><p className="section-label">Prefer direct?</p><h2>That works too.</h2></header>
          <div className="contact-details">
            <div><span>Email</span><a href="mailto:work@mdma.co.in">work@mdma.co.in <Arrow /></a></div>
            <div><span>Phone</span><a href="tel:+919573174647">+91 95731 74647 <Arrow /></a></div>
            <div><span>Studio</span><p>8-2-686/A11, Road No. 12<br />Jubilee Hills, Hyderabad</p></div>
            <div><span>Hours</span><p>Monday to Friday<br />10:00 to 19:00 IST</p></div>
          </div>
        </section>

        <section className="contact-close">
          <span>A good first conversation begins here</span>
          <h2>The strongest work starts<br />before the answer.</h2>
          <a href="mailto:work@mdma.co.in">work@mdma.co.in <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function SanctuaryPage() {
  const sequence = useRef(null);
  const cms = useCaseStudy('the-sanctuary');
  const cmsGallery = cms?.gallery?.length
    ? cms.gallery.map((image, index) => ({
        src: publicAssetUrl(image.path),
        alt: image.alt || `The Sanctuary project image ${index + 1}`,
        caption: image.caption || ''
      }))
    : null;
  const sanctuaryGallery = cmsGallery || [
    { src: '/images/work/sanctuary/sanctuary-01.jpg', alt: "The Sanctuary's open air courtyard, bar and garden across two levels" },
    { src: '/images/work/sanctuary/sanctuary-02.jpg', alt: "Guests seated around The Sanctuary's outdoor dining space filled with trees" },
    { src: '/images/work/sanctuary/sanctuary-03.jpg', alt: 'Layered greenery and draped seating at The Sanctuary' }
  ];
  const briefParagraphs = cms?.brief_body?.split(/\n\n+/).filter(Boolean);
  const sanctuaryRecord = cms || {
    title: 'The Sanctuary', category: 'Hospitality content', year: '2020', location: 'Hyderabad',
    summary: 'The venue was already remarkable. Our task was to frame its light, material and detail so people could feel the place before they arrived.',
    brief_title: 'Show the experience without giving it all away.',
    brief_body: 'The Sanctuary Bar & Kitchen brings global flavours, handcrafted cocktails and a richly layered outdoor setting into one hospitality experience.\n\nRather than treat that experience as a list of amenities, we built the content around a sequence of sensations: scale, conviviality, greenery and a little mystery.',
    overview_title: 'A place told through details.', overview_body: '',
    scope: ['Creative direction', 'Photography', 'Brand marketing', 'Content creation'], theme: 'sanctuary'
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || window.innerWidth < 900 || !sequence.current) return;
    const track = sequence.current.querySelector('.evidence-track');
    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sequence.current,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 500}`,
        scrub: .7,
        pin: true,
        invalidateOnRefresh: true
      }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <Seo title="The Sanctuary Brand Content Case Study | Modern Day" description="How Modern Day translated The Sanctuary Bar & Kitchen's atmosphere into a focused hospitality content system." path="/work/the-sanctuary" />
      <Header />
      <CaseEditBar slug="the-sanctuary" record={sanctuaryRecord} gallery={sanctuaryGallery} />
      <main className="case-page sanctuary-case">
        <section className="case-hero">
          <div className="case-hero-top"><span>Hospitality / Brand content</span><span>Hyderabad / 2020</span></div>
          <h1 data-cms-field="title">{sanctuaryRecord.title.replace(' ', '\n')}</h1>
          <div className="case-hero-bottom">
            <p>Making atmosphere<br />the main character.</p>
            <p data-cms-field="summary">{sanctuaryRecord.summary}</p>
          </div>
          <div className="ambient-orbit" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <section className="case-brief">
          <p className="section-label">The assignment</p>
          <div>
            <h2 data-cms-field="brief_title">{sanctuaryRecord.brief_title}</h2>
            <div data-cms-field="brief_body">
              {(briefParagraphs?.length ? briefParagraphs : [
                'The Sanctuary Bar & Kitchen brings global flavours, handcrafted cocktails and a richly layered outdoor setting into one hospitality experience.',
                'Rather than treat that experience as a list of amenities, we built the content around a sequence of sensations: scale, conviviality, greenery and a little mystery.'
              ]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="evidence-sequence" ref={sequence}>
          <div className="evidence-track">
            <div className="evidence-intro">
              <span>Evidence / 03 frames</span>
              <h2 data-cms-field="overview_title">{sanctuaryRecord.overview_title}</h2>
              <p data-cms-field="overview_body">{sanctuaryRecord.overview_body || 'One visual thought per frame. Together, a complete atmosphere.'}</p>
            </div>
            <article className="evidence-frame frame-photo">
              <div className="frame-visual"><img data-cms-image="0" src={sanctuaryGallery[0]?.src} alt={sanctuaryGallery[0]?.alt || ''} /></div>
              <footer><span>01 / Scale</span><p>{sanctuaryGallery[0]?.caption || 'Establish the venue as an oasis hidden inside the city.'}</p></footer>
            </article>
            <article className="evidence-frame frame-photo">
              <div className="frame-visual"><img data-cms-image="1" src={sanctuaryGallery[1]?.src} alt={sanctuaryGallery[1]?.alt || ''} loading="lazy" /></div>
              <footer><span>02 / Social</span><p>{sanctuaryGallery[1]?.caption || 'Show the place in use: generous, relaxed and alive.'}</p></footer>
            </article>
            <article className="evidence-frame frame-photo">
              <div className="frame-visual"><img data-cms-image="2" src={sanctuaryGallery[2]?.src} alt={sanctuaryGallery[2]?.alt || ''} loading="lazy" /></div>
              <footer><span>03 / Detail</span><p>{sanctuaryGallery[2]?.caption || 'Let plants, drapery and depth carry the atmosphere.'}</p></footer>
            </article>
          </div>
        </section>

        <section className="case-method">
          <p className="section-label">The creative logic</p>
          <div className="method-grid">
            <h2>Not coverage.<br />A visual cypher.</h2>
            <div>
              <article><span>Frame</span><p>Each photograph was assigned one job: express a distinct quality of the space and its visual ambience.</p></article>
              <article><span>Sequence</span><p>The frames alternate scale, texture and light to create rhythm without repetition.</p></article>
              <article><span>Restraint</span><p>The story avoids explaining too much. The viewer completes the picture and wants to enter it.</p></article>
            </div>
          </div>
        </section>

        <section className="case-outcome">
          <div><span>Scope</span><p data-cms-field="scope">{sanctuaryRecord.scope.join('\n')}</p></div>
          <blockquote>“Every picture became one part of the venue’s design cypher.”</blockquote>
          <a href="https://www.behance.net/gallery/108392565/The-Sanctuary-Bar-Kitchen-%28Outdoors%29">View original project on Behance <Arrow /></a>
        </section>

        <section className="next-case">
          <span>Next project</span>
          <a href="/work/design">See all design work <Arrow /></a>
          <h2>What should<br />we frame next?</h2>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const eagleImages = Array.from({ length: 10 }, (_, index) =>
  `/images/work/eagle-stone/eagle-stone-${String(index + 1).padStart(2, '0')}.jpg`
);

function EagleStonePage() {
  const cms = useCaseStudy('eagle-stone');
  const cmsImages = cms?.gallery?.length ? cms.gallery.map(image => publicAssetUrl(image.path)) : null;
  const images = cmsImages || eagleImages;
  const briefParagraphs = cms?.brief_body?.split(/\n\n+/).filter(Boolean);
  const eagleRecord = cms || {
    title: 'Eagle Stone', category: 'Brand identity', year: '2025', location: 'India',
    summary: 'Where nature’s craft becomes identity.',
    brief_title: 'Make strength feel sophisticated.',
    brief_body: 'Eagle Stone curates premium marbles, granites and quartzites from across the world. The identity needed to reflect the depth, strength and artistry embedded in every slab.\n\nThe ambition was larger than recognition. It was to position Eagle Stone as a benchmark of premium quality and timeless design for architects, designers and discerning homeowners.',
    overview_title: 'From natural origin to crafted perfection.',
    overview_body: 'The wider system pairs a confident mark with restrained, immersive communication. Dark mineral tones create authority; warm neutrals reveal material nuance; deep green connects the identity back to the natural world.',
    scope: ['Brand strategy', 'Visual identity', 'Logo system', 'Art direction', 'Applications'], theme: 'eagle-stone'
  };
  const eagleEditorGallery = cms?.gallery?.length ? cms.gallery : eagleImages.map((path, index) => ({ path, alt: `Eagle Stone identity study ${index + 1}`, caption: '' }));
  return (
    <>
      <Seo title="Eagle Stone Brand Identity Case Study | Modern Day" description="A premium natural stone identity built around vision, strength and precision for Eagle Stone." path="/work/eagle-stone" />
      <Header />
      <CaseEditBar slug="eagle-stone" record={eagleRecord} gallery={eagleEditorGallery} />
      <main className="eagle-case">
        <section className="eagle-hero">
          <img data-cms-image="0" src={cms?.hero_image_path ? publicAssetUrl(cms.hero_image_path) : images[0]} alt="Eagle Stone identity presented over sculptural natural rock" />
        </section>
        <section className="case-opening-band"><span>Brand identity / Natural stone</span><h1 data-cms-field="title">{eagleRecord.title}</h1><p data-cms-field="summary">{eagleRecord.summary}</p></section>

        <section className="eagle-brief">
          <p className="section-label">The brief</p>
          <div>
            <h2 data-cms-field="brief_title">{eagleRecord.brief_title}</h2>
            <div data-cms-field="brief_body">
              {(briefParagraphs?.length ? briefParagraphs : [
                'Eagle Stone curates premium marbles, granites and quartzites from across the world. The identity needed to reflect the depth, strength and artistry embedded in every slab.',
                'The ambition was larger than recognition. It was to position Eagle Stone as a benchmark of premium quality and timeless design for architects, designers and discerning homeowners.'
              ]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="stone-system">
          <div className="stone-system-intro">
            <p className="section-label">Identity anatomy</p>
            <h2>One mark.<br />Three ideas.</h2>
          </div>
          <article className="stone-panel slab-one">
            <div className="slab-copy"><span>01 / Vision</span><h3>The eagle is hidden in plain sight.</h3><p>The letter A carries the silhouette of an eagle’s head in its negative space, turning a familiar character into a symbol of perspective and precision.</p></div>
            <img data-cms-image="1" src={images[1] || eagleImages[1]} alt="Eagle Stone logo concept breakdown showing the eagle concealed in the letter A" loading="lazy" />
          </article>
          <article className="stone-panel slab-two">
            <div className="slab-copy"><span>02 / Form</span><h3>From bird to letter. From letter to mark.</h3><p>A minimal geometric reduction keeps the idea ownable and functional without losing its natural source.</p></div>
            <img data-cms-image="2" src={images[2] || eagleImages[2]} alt="Development sequence transforming an eagle silhouette into Eagle Stone's letter A symbol" loading="lazy" />
          </article>
          <article className="stone-panel slab-three">
            <div className="slab-copy"><span>03 / Motion</span><h3>A wordmark designed to take flight.</h3><p>Strokes inspired by wings move through the typography, giving the name a controlled sense of lift, ambition and forward motion.</p></div>
            <img data-cms-image="4" src={images[4] || eagleImages[4]} alt="Eagle Stone wordmark development with letter details inspired by wings" loading="lazy" />
          </article>
        </section>

        <section className="eagle-overview">
          <p className="section-label">The brand presence</p>
          <div>
            <h2 data-cms-field="overview_title">{eagleRecord.overview_title}</h2>
            <p data-cms-field="overview_body">{eagleRecord.overview_body}</p>
          </div>
        </section>

        <section className="material-index">
          <div className="index-head"><span>Application index</span><span>06 studies / Original project assets</span></div>
          {images.slice(3, 10).map((src, index) => (
            <figure className={`index-item index-${index + 1}`} key={src}>
              <img data-cms-image={index + 3} src={src} alt={`Eagle Stone identity application study ${index + 1}`} loading="lazy" />
              <figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>{['Symbol system', 'Wordmark', 'Brand texture', 'Identity detail', 'Printed matter', 'Presentation system', 'Premium packaging'][index]}</span></figcaption>
            </figure>
          ))}
        </section>

        <section className="eagle-outcome">
          <div><span>Scope</span><p data-cms-field="scope">{eagleRecord.scope.join('\n')}</p></div>
          <blockquote>Built to feel elemental.<br />Designed to remain timeless.</blockquote>
          <a href="https://www.modernday.in/project/eagle-stone">View original project <Arrow /></a>
        </section>

        <section className="eagle-next">
          <span>More work</span>
          <h2>Different material.<br />Same standard.</h2>
          <a href="/work/design">View design projects <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const gharSource = projectCatalog.find(project => project.slug === 'ghar-culture');

function GharCulturePage() {
  const cms = useCaseStudy('ghar-culture');
  const fallbackGallery = gharSource.gallery.map((image, index) => ({
    src: publicAssetUrl(image.path),
    alt: image.alt || `Ghar Culture identity study ${index + 1}`,
    caption: image.caption || ''
  }));
  const gallery = cms?.gallery?.length
    ? cms.gallery.map((image, index) => ({
        src: publicAssetUrl(image.path),
        alt: image.alt || `Ghar Culture identity study ${index + 1}`,
        caption: image.caption || ''
      }))
    : fallbackGallery;
  const fallbackRecord = {
    title: 'Ghar Culture', category: 'Brand identity', year: '2025', location: 'India',
    summary: 'An identity that brings the permanence of marble and the visual memory of India into one contemporary home.',
    brief_title: 'Build an identity with the same permanence as the material.',
    brief_body: 'Marble does not chase a moment. It carries time. Ghar Culture needed a brand that could hold that quiet confidence while feeling unmistakably connected to India.\n\nWe began with visual memory, found structure in the written word and carried the mark into objects made to live with people for years.',
    overview_title: 'Three colours. One enduring register.',
    overview_body: 'Deep red carries warmth and cultural memory. Black gives the system authority. Warm white lets the form and material breathe.',
    scope: ['Brand strategy', 'Visual identity', 'Wordmark design', 'Art direction', 'Applications'], theme: 'ghar-culture'
  };
  const gharRecord = cms
    ? { ...fallbackRecord, ...cms, scope: cms.scope?.length ? cms.scope : fallbackRecord.scope }
    : fallbackRecord;
  const processFrames = [
    { src: '/images/ghar-culture/deck/04-sketching.webp', step: '01 / Translate', title: 'Test how English letters can carry the memory of Hindi.', alt: 'Ghar Culture sketchbook showing experiments with Devanagari and Latin letterforms' },
    { src: '/images/ghar-culture/deck/05-wordmark-construction.webp', step: '02 / Resolve', title: 'Turn the shared headline, curves and strokes into one measured word.', alt: 'Ghar Culture wordmark construction shown against a measured guide system' },
    { src: '/images/ghar-culture/deck/06-monogram.webp', step: '03 / Distil', title: 'Reduce the same thought into a compact mark without losing its origin.', alt: 'Reduced Ghar Culture monogram presented as the compact identity mark' }
  ];
  const objectFrames = [
    { src: '/images/ghar-culture/deck/09-tissue-box.webp', label: '01 / Everyday ritual', alt: 'Ghar Culture mark applied to a carved marble tissue box' },
    { src: '/images/ghar-culture/deck/10-marble-box.webp', label: '02 / Object of keeping', alt: 'Ghar Culture mark engraved on a lidded marble box' },
    { src: '/images/ghar-culture/deck/11-object-family.webp', label: '03 / A family of forms', alt: 'Ghar Culture identity shown across marble home objects and trays' }
  ];

  return (
    <>
      <Seo title="Ghar Culture Brand Identity Case Study | Modern Day" description="How Modern Day shaped Ghar Culture from Indian visual memory, marble craft and the feeling of home into a complete identity system." path="/work/ghar-culture" />
      <Header />
      <CaseEditBar slug="ghar-culture" record={gharRecord} gallery={gallery} />
      <main className="ghar-story">
        <section className="ghar-story-hero">
          <div className="ghar-story-mark">
            <div className="ghar-story-meta"><span>Modern Day / Design</span><span>India / 2025</span></div>
            <img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" />
            <div className="ghar-story-index"><span>Brand identity</span><span>Marble culture</span></div>
          </div>
          <div className="ghar-story-intro">
            <span>Ghar / Home</span>
            <h1 data-cms-field="title">{gharRecord.title}</h1>
            <strong>Built to outlive the moment.</strong>
            <p>Ghar means home. Culture is everything that gives a home its character. The brand turns marble into furniture, lighting, surfaces and everyday objects, so its identity had to make one idea visible: home as something we shape and pass on.</p>
            <a href="#premise">Enter the story <Arrow /></a>
          </div>
        </section>

        <section className="ghar-story-premise" id="premise">
          <span>The vision</span>
          <h2>Some materials<br />do not follow time.<br /><em>They hold it.</em></h2>
          <div>
            <p>In an age where trends come and go, marble remains unmoved: calm, unshaken, timeless.</p>
            <p>From a tabletop to a tissue box, a lamp to a complete room, Ghar Culture gives that permanence a place in everyday life.</p>
          </div>
        </section>

        <section className="ghar-story-source">
          <header>
            <span>01 / Visual memory</span>
            <h2>Before the mark,<br />we found its world.</h2>
            <p>Hand painted signs. Hindi letterforms. Textile rhythm. Architecture, ornament and the confidence of things made by hand. The moodboard did not prescribe a style. It established the memory the English wordmark needed to carry.</p>
          </header>
          <figure>
            <img src="/images/ghar-culture/deck/03-moodboard.webp" alt="Ghar Culture moodboard with Indian typography, art, architecture and visual culture" loading="lazy" />
            <figcaption><span>Source material</span><span>India / Type / Form / Memory</span></figcaption>
          </figure>
        </section>

        <section className="ghar-story-process" id="transformation">
          <header>
            <span>02 / The transformation</span>
            <h2>Write it in English.<br />Let it remember Hindi.</h2>
            <p>This is the central idea. Ghar is a Hindi word, but the brand needed to read in English. We drew the Latin letters around the visual logic of Hindi writing: a shared upper line, open circular forms, strong vertical strokes and a connected rhythm.</p>
          </header>
          <div className="ghar-script-translation">
            <article>
              <span>Meaning</span>
              <strong lang="hi">घर</strong>
              <p>The Hindi word for home. Not merely a building, but the feeling, rituals and objects that make it yours.</p>
            </article>
            <article>
              <span>Translation principle</span>
              <div className="ghar-headline-study"><b>G</b><b>H</b><b>A</b><b>R</b></div>
              <p>The English letters remain readable, while one continuous headline and a more calligraphic rhythm make them feel culturally familiar.</p>
            </article>
            <article className="ghar-translation-result">
              <span>Final wordmark</span>
              <img src="/images/ghar-culture/ghar-culture-logo.png" alt="Final Ghar Culture wordmark" loading="lazy" />
              <p>English in language. Hindi in memory. Contemporary in use.</p>
            </article>
          </div>
          <div className="ghar-process-frames">
            {processFrames.map(frame => (
              <article key={frame.step}>
                <figure><img src={frame.src} alt={frame.alt} loading="lazy" /></figure>
                <span>{frame.step}</span>
                <h3>{frame.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="ghar-story-register">
          <header><span>03 / Identity register</span><h2>One mark.<br />Three temperatures.</h2><p>The wordmark stays recognisable as its surroundings change. Warm white gives it calm. Deep red brings cultural heat. Black gives the same form ceremonial weight.</p></header>
          <div className="ghar-register-grid" aria-label="Ghar Culture logo on warm white, deep red and black backgrounds">
            <div className="chalk"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture logo in black on warm white" /><span>Warm white</span></div>
            <div className="blood"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture logo in white on deep red" /><span>Deep red</span></div>
            <div className="ink"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture logo in white on black" /><span>Black</span></div>
          </div>
          <div className="ghar-palette-evidence">
            <figure><img src="/images/ghar-culture/deck/07-colour-palette.webp" alt="Ghar Culture colour palette of deep red, black and warm white" loading="lazy" /><figcaption><span>Palette</span><span>Heat / Authority / Air</span></figcaption></figure>
            <figure><img src="/images/ghar-culture/deck/08-logo-variants.webp" alt="Ghar Culture logo variants across deep red, black, white and material backgrounds" loading="lazy" /><figcaption><span>Contrast system</span><span>Light / Dark / Material</span></figcaption></figure>
          </div>
        </section>

        <section className="ghar-story-stationery" id="stationery">
          <header>
            <span>04 / Working identity</span>
            <h2>From mark to material.<br />Documents with a job.</h2>
            <p>The stationery is written as if the brand is already at work. Material notes, finishes, dimensions, object references and project information make every sheet useful before the logo makes it recognisable.</p>
          </header>
          <div className="ghar-stationery-stage">
            <article className="ghar-letterhead-sheet">
              <div className="ghar-sheet-brand"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" /><span>Marble / Furniture / Objects</span></div>
              <div className="ghar-letter-copy">
                <span>Material note / GC 01</span>
                <h3>A home is built through the objects it keeps.</h3>
                <p>Ghar Culture works with marble across furniture, lighting, surfaces and everyday objects. Each piece begins with the material, then finds the form it needs to live naturally inside a home.</p>
                <p>Vein, tone and finish are treated as part of the design. No two pieces resolve in exactly the same way.</p>
              </div>
              <footer><span>Ghar Culture</span><span>India / 2025</span></footer>
            </article>

            <article className="ghar-spec-sheet">
              <div className="ghar-sheet-brand"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" /><span>Material schedule / Residence 01</span></div>
              <h3>Stone and finish register</h3>
              <div className="ghar-spec-table">
                <div><b>GC 01</b><span>Calacatta Viola</span><span>Honed</span><span>Tabletop</span></div>
                <div><b>GC 02</b><span>Forest Green</span><span>Honed</span><span>Lamp base</span></div>
                <div><b>GC 03</b><span>Nero Marquina</span><span>Soft polish</span><span>Ashtray</span></div>
                <div><b>GC 04</b><span>Travertine Beige</span><span>Filled and honed</span><span>Console</span></div>
                <div><b>GC 05</b><span>Statuario White</span><span>Honed</span><span>Coaster set</span></div>
              </div>
              <div className="ghar-material-chips"><i className="viola" /><i className="green" /><i className="black" /><i className="travertine" /></div>
              <footer><span>Natural variation expected</span><span>Sheet 01 / 02</span></footer>
            </article>

            <article className="ghar-object-sheet">
              <div className="ghar-sheet-brand"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" /><span>Object register / Collection 01</span></div>
              <h3>Objects for the rituals of home.</h3>
              <dl>
                <div><dt>01</dt><dd>Tissue box</dd><small>260 × 140 × 110 mm</small></div>
                <div><dt>02</dt><dd>Table lamp</dd><small>Stone base / Linen shade</small></div>
                <div><dt>03</dt><dd>Coaster set</dd><small>Four pieces / Honed</small></div>
                <div><dt>04</dt><dd>Console table</dd><small>Custom dimensions</small></div>
              </dl>
              <footer><span>Furniture / Lighting / Objects</span><span>Sheet 02 / 02</span></footer>
            </article>

            <div className="ghar-stationery-small">
              <div className="ghar-envelope"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" /><span>Material samples enclosed</span></div>
              <div className="ghar-business-card"><img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" /><p>Marble for the culture of home.</p></div>
              <div className="ghar-sample-tag"><span>GC 04</span><strong>Travertine Beige</strong><small>Filled and honed</small></div>
            </div>
          </div>
        </section>

        <section className="ghar-story-range" id="range">
          <header><span>05 / The world of Ghar</span><h2>One material.<br />Every scale of home.</h2><p>The identity was built for a brand that can move from the smallest daily object to the largest surface in a room.</p></header>
          <div>
            <article><span>Furniture</span><h3>Tables, consoles and sculptural forms.</h3><p>Marble carries the visual weight. Proportion makes it feel at home.</p></article>
            <article><span>Lighting</span><h3>Lamps shaped around stone and glow.</h3><p>Solid bases meet soft light, giving permanence a warmer register.</p></article>
            <article><span>Surfaces</span><h3>Tabletops, counters and architectural planes.</h3><p>The identity can sit quietly beside the natural movement of the slab.</p></article>
            <article><span>Objects</span><h3>Tissue boxes, trays, coasters and ashtrays.</h3><p>Small rituals become the most frequent expression of the brand.</p></article>
          </div>
        </section>

        <section className="ghar-story-objects">
          <header>
            <span>06 / Objects</span>
            <h2>The identity<br />entered the home.</h2>
            <p>A mark for Ghar Culture could not live only on paper. It had to sit quietly on marble, respect the grain and make an everyday object feel like something worth keeping.</p>
          </header>
          <div>
            {objectFrames.map(frame => (
              <figure key={frame.label}>
                <img src={frame.src} alt={frame.alt} loading="lazy" />
                <figcaption><span>{frame.label}</span><span>Mark / Material / Use</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="ghar-story-world">
          <header>
            <span>07 / Image world</span>
            <h2>Then the mark<br />found an atmosphere.</h2>
            <p>Historic colour, carved stone, shadow and stillness gave the identity a wider emotional register. The visual world makes the brand feel lived in before a single object enters the room.</p>
          </header>
          <div>
            <figure><img src="/images/ghar-culture/deck/12-image-world.webp" alt="Ghar Culture wordmark over an Indian landscape beside a historic street painting" loading="lazy" /></figure>
            <figure><img src="/images/ghar-culture/deck/13-image-application.webp" alt="White Ghar Culture wordmark applied to a dark architectural image" loading="lazy" /></figure>
          </div>
        </section>

        <section className="ghar-story-close">
          <div className="ghar-close-copy">
            <span>From vision to life</span>
            <h2>Not simply made<br />for a home.<br /><em>Made to become part of it.</em></h2>
            <p>The identity begins with permanence, finds its structure in Indian visual culture and proves itself on the objects people touch every day. That is how Ghar Culture moves from a name into a world.</p>
          </div>
          <div className="ghar-close-mark">
            <img src="/images/ghar-culture/ghar-culture-logo.png" alt="Ghar Culture" loading="lazy" />
            <span>Rooted in culture / Made for modern homes</span>
          </div>
        </section>

        <section className="ghar-story-outcome">
          <div><span>Scope</span><p data-cms-field="scope">{gharRecord.scope.join('\n')}</p></div>
          <blockquote>Built from memory.<br />Made to endure.</blockquote>
          <a href="/work/design">View design projects <Arrow /></a>
        </section>

        <section className="ghar-story-next">
          <span>Build the next one</span>
          <h2>A lasting brand<br />starts with a lasting idea.</h2>
          <a href="/contact">Start a conversation <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const greyRoseChapters = [
  {
    number: '01',
    label: 'Point of view',
    title: 'First, make the eye visible.',
    copy: 'The opening chapter gives the founder a clear voice. Taste becomes language. Design judgment becomes a reason to listen, remember and return.',
    reels: [
      ['aesthetics-three-words', 'Aesthetics in three words', 'A concise expression of the Gray Rose visual language.'],
      ['design-influence', 'What influences the work', 'The references and experiences behind her design decisions.'],
      ['over-designed', 'When a space becomes over designed', 'An expert opinion on restraint, editing and knowing when a room has enough.'],
      ['breaking-design-rules', 'The rule worth breaking', 'Confidence built through a thoughtful challenge to design convention.']
    ]
  },
  {
    number: '02',
    label: 'Global eye',
    title: 'Then, show where the eye travels.',
    copy: 'Travel footage becomes professional evidence. Bali and China are not treated as backdrops. They reveal a designer who observes markets, brands, spaces and cultures firsthand.',
    reels: [
      ['bali', 'Bali through a designer’s eye', 'Place, craft, atmosphere and detail become creative reference.'],
      ['exploring-china', 'Exploring China', 'A moving record of discovery beyond the familiar.'],
      ['when-in-china', 'When in China', 'On location curiosity gives the brand scale and a human pulse.'],
      ['brands-in-china', 'Brands in China', 'Market observation turns travel into useful design intelligence.']
    ]
  },
  {
    number: '03',
    label: 'Material intelligence',
    title: 'Move from inspiration to selection.',
    copy: 'The third chapter reveals what sits behind the finished space. Sourcing, comparison and material sensitivity make the founder’s expertise tangible.',
    reels: [
      ['china-shopping', 'Shopping and sourcing in China', 'A look inside the selection process in an international market.'],
      ['sourcing-three-countries', 'Sourcing across three countries', 'Global access translated into a wider material vocabulary.'],
      ['stones-and-fabrics', 'Stone and fabric close up', 'Texture, tone and finish shown through a tactile designer’s lens.'],
      ['whats-in-my-bag', 'What is in my bag', 'A personal format that reveals the objects behind the working day.']
    ]
  },
  {
    number: '04',
    label: 'Trust and proof',
    title: 'Close with judgment made real.',
    copy: 'The final chapter connects personality and perspective to real decisions. A finished home, the projects she chooses and direct answers complete the picture of a trusted creative partner.',
    reels: [
      ['sumadhura', 'Sumadhura finished home', 'A completed interior turns the content story into visible proof.'],
      ['why-say-yes', 'Why say yes to a project', 'Values and creative alignment shape the work Gray Rose accepts.'],
      ['design-question', 'A designer answers', 'A direct expert response builds familiarity with her voice.'],
      ['ad-01', 'Design at a glance', 'A concise campaign film that distils the studio’s promise.']
    ]
  }
];

const greyRoseInstagramPosts = [
  { label: 'July post', image: '2026-07-18.jpg', title: 'Stone or tile?', note: 'Material judgment made clear and useful.' },
  { label: 'July post', image: '2026-07-16.jpg', title: 'Design, then stage', note: 'A distinction that sharpens the studio’s point of view.' },
  { label: 'June post', image: '2026-06-28.jpg', title: 'Begin with a mood', note: 'The thinking that comes before material selection.' },
  { label: 'June post', image: '2026-06-22.jpg', title: 'The depth in neutrals', note: 'Colour theory translated into an inviting visual lesson.' },
  { label: 'May post', image: '2026-05-25.jpg', title: 'Sourcing in Vietnam', note: 'Makers, materials and the nuances found on the ground.' },
  { label: 'May post', image: '2026-05-16.jpg', title: 'Restraint with richness', note: 'A field note on texture, light and spatial calm.' },
  { label: 'May post', image: '2026-05-14.jpg', title: 'Ateliers to markets', note: 'A creative travel diary built around cultural depth.' },
  { label: 'May post', image: '2026-05-11.jpg', title: 'Objects with a story', note: 'Craft and character become part of the brand world.' },
  { label: 'May post', image: '2026-05-09.jpg', title: 'Craft over trend', note: 'A quiet manifesto for lasting, considered interiors.' }
];

function GreyRoseReel({reel, index}) {
  const [slug, title, note] = reel;
  const [playing, setPlaying] = useState(false);
  return (
    <article className="grey-rose-reel">
      <div className="grey-rose-reel-media">
        {playing ? (
          <video src={`/images/work/grey-rose/reels/${slug}.mp4`} poster={`/images/work/grey-rose/reels/${slug}.jpg`} controls autoPlay preload="auto" playsInline aria-label={`Gray Rose reel: ${title}`} />
        ) : (
          <button type="button" className="grey-rose-reel-poster" onClick={() => setPlaying(true)} aria-label={`Play Gray Rose reel: ${title}`}>
            <img src={`/images/work/grey-rose/reels/${slug}.jpg`} alt="" loading="lazy" />
            <span aria-hidden="true">Play</span>
          </button>
        )}
      </div>
      <footer><span>{String(index + 1).padStart(2, '0')} / Reel</span><h3>{title}</h3><p>{note}</p></footer>
    </article>
  );
}

function GreyRoseHeroFilm() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) video.play().catch(() => {});
  };

  return (
    <div className="grey-rose-hero-film">
      <video
        ref={videoRef}
        src="/images/work/grey-rose/reels/exploring-china.mp4"
        poster="/images/work/grey-rose/reels/exploring-china-hero.jpg"
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        aria-label="Gray Rose exploring design, culture and craft in China"
      />
      <button type="button" className="grey-rose-sound-control" onClick={toggleSound} aria-pressed={!muted}>
        {muted ? 'Play sound' : 'Sound on'}
      </button>
      <span>China / Observation in motion</span>
    </div>
  );
}

function GreyRoseSocialPage() {
  return (
    <>
      <Seo title="Gray Rose Social Media Case Study | Modern Day" description="How Modern Day built a founder led social media and brand development system for Gray Rose through expertise, international sourcing and design reels." path="/work/grey-rose-social" />
      <Header />
      <main className="grey-rose-story">
        <section className="grey-rose-hero">
          <GreyRoseHeroFilm />
          <div className="grey-rose-hero-copy">
            <div className="grey-rose-hero-meta"><span>Digital / Social media</span><span>Brand development / Interior design</span></div>
            <img src="/images/work/grey-rose/grey-rose-logo-ink.png" alt="Gray Rose" className="grey-rose-wordmark" />
            <h1>We turned a designer’s eye into a point of view people could follow.</h1>
            <p>Sixteen founder led films connect design judgment, international exposure, material intelligence and finished work into one recognisable presence.</p>
          </div>
        </section>

        <section className="grey-rose-premise">
          <span>The mandate</span>
          <h2>The expertise was already there.<br />The content made it visible.</h2>
          <p>Gray Rose needed more than a polished feed. The founder needed to be recognised as the thinking behind the studio. We built a reel system where every format reveals a different layer of her authority.</p>
        </section>

        <section className="grey-rose-instagram" aria-labelledby="grey-rose-instagram-title">
          <header>
            <span>Selected creative work</span>
            <h2 id="grey-rose-instagram-title">The thinking, made saveable.</h2>
            <p>Before the reels unfold, the static work establishes the visual world. Full creative sheets turn material choices, sourcing and aesthetic intelligence into clear references.</p>
          </header>
          <div className="grey-rose-post-grid">
            {greyRoseInstagramPosts.map((post, index) => (
              <article className={`grey-rose-post grey-rose-post-${index + 1}`} key={post.image}>
                <figure>
                  <img src={`/images/work/grey-rose/posts/${post.image}`} alt={`Gray Rose editorial creative: ${post.title}`} loading="lazy" />
                  <figcaption><span>{post.label}</span></figcaption>
                </figure>
                <h3>{post.title}</h3>
                <p>{post.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grey-rose-identity" aria-label="Gray Rose brand identity">
          <div className="grey-rose-identity-board">
            <img src="/images/work/grey-rose/reels/sumadhura.jpg" alt="A completed Gray Rose bedroom interior" loading="lazy" />
          </div>
          <div className="grey-rose-identity-copy">
            <span>One visual world</span>
            <h2>Calm in tone.<br />Certain in voice.</h2>
            <p>The existing Gray Rose identity gave the content its restraint. Dusty rose, warm neutrals, clean typography and considered space keep the founder’s knowledge at the centre.</p>
            <img src="/images/work/grey-rose/grey-rose-logo-ink.png" alt="Gray Rose black logo" loading="lazy" />
          </div>
        </section>

        <div className="grey-rose-chapters">
          {greyRoseChapters.map(chapter => (
            <section className="grey-rose-chapter" key={chapter.number}>
              <aside><b>{chapter.number}</b><span>{chapter.label}</span></aside>
              <div className="grey-rose-chapter-main">
                <header><h2>{chapter.title}</h2><p>{chapter.copy}</p></header>
                <div className="grey-rose-reel-grid">
                  {chapter.reels.map((reel, index) => <GreyRoseReel reel={reel} index={index} key={reel[0]} />)}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="grey-rose-global-proof">
          <header><span>Brand development in motion</span><h2>Every trip added<br />to the authority.</h2><p>International footage creates more than visual variety. It shows an active practice of looking, learning and selecting, then connects those observations back to the spaces Gray Rose creates.</p></header>
          <div>
            <figure><img src="/images/work/grey-rose/reels/bali.jpg" alt="Gray Rose exploring craft and interiors in Bali" loading="lazy" /><figcaption>Bali / Atmosphere and craft</figcaption></figure>
            <figure><img src="/images/work/grey-rose/reels/exploring-china.jpg" alt="Gray Rose exploring design districts in China" loading="lazy" /><figcaption>China / Markets and design culture</figcaption></figure>
            <figure><img src="/images/work/grey-rose/reels/sourcing-three-countries.jpg" alt="Gray Rose examining materials for international sourcing" loading="lazy" /><figcaption>Global sourcing / Material judgment</figcaption></figure>
          </div>
        </section>

        <section className="grey-rose-brand-system">
          <div className="grey-rose-system-copy"><span>One connected presence</span><h2>Voice.<br />World.<br />Proof.</h2></div>
          <div className="grey-rose-system-images">
            <img src="/images/work/grey-rose/archive/gr-03.jpg" alt="Gray Rose brand presentation" loading="lazy" />
            <img src="/images/work/grey-rose/archive/gr-06.jpg" alt="Gray Rose colour and material system" loading="lazy" />
            <img src="/images/work/grey-rose/archive/gr-08.jpg" alt="Gray Rose stationery applications" loading="lazy" />
          </div>
          <p>The identity creates recognition. The founder creates trust. The reel system brings both together often enough to build a memorable brand in public.</p>
        </section>

        <section className="grey-rose-scope">
          <div><span>Scope</span><p>Social strategy<br />Founder positioning<br />Creative direction<br />International production<br />Reels and editing<br />Brand development</p></div>
          <blockquote>Not a designer placed in front of a camera.<br />An expert given a platform.</blockquote>
          <a href="/contact">Build a visible point of view <Arrow /></a>
        </section>

        <section className="grey-rose-next"><span>More Digital work</span><h2>Build the presence.<br />Keep it moving.</h2><a href="/work/digital">View Digital projects <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

const heliosFallbackGallery = [
  { path: '/images/work/helios/helios-01.jpg', alt: 'Helios Stone reel showing a marble quarry', caption: 'Origin / Quarry story' },
  { path: '/images/work/helios/helios-02.jpg', alt: 'Helios Stone experience centre with monumental slabs', caption: 'Place / Experience centre' },
  { path: '/images/work/helios/helios-03.jpg', alt: 'Helios Stone Statuario reel cover', caption: 'Product / Material reveal' }
];

function HeliosSocialPageLegacy() {
  const cms = useCaseStudy('helios-social');
  const heliosRecord = cms || {
    title: 'Helios Stone', category: 'Social media', year: '2025', location: 'Hyderabad',
    summary: 'Turning a monumental material business into a social presence with pace, provenance and point of view.',
    brief_title: 'Make stone move.',
    brief_body: 'Helios curates exotic marble and granite from leading quarries around the world. The material is inherently dramatic. The social challenge was to translate its physical scale, texture and rarity into an experience made for screens.\n\nWe built a content system that moves between origin, product and place, giving architects, designers and homeowners a reason to keep looking beyond a single slab.',
    overview_title: 'A feed with material intelligence.',
    overview_body: 'The system balances cinematic reels with quieter product stories. Quarry footage establishes provenance. Material reveals build desire. Spatial content helps audiences imagine each stone in use.',
    scope: ['Social strategy', 'Creative direction', 'Content production', 'Reels', 'Editorial design'], theme: 'helios-social'
  };
  const gallery = cms?.gallery?.length ? cms.gallery : heliosFallbackGallery;
  const imageUrl = index => publicAssetUrl(gallery[index]?.path, heliosFallbackGallery[index]?.path);
  const paragraphs = heliosRecord.brief_body.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Seo title="Helios Stone Social Media Case Study | Modern Day" description="How Modern Day built a premium social media content system for Helios Stone in Hyderabad through reels, material stories and spatial inspiration." path="/work/helios-social" />
      <Header />
      <CaseEditBar slug="helios-social" record={heliosRecord} gallery={gallery} />
      <main className="helios-case">
        <section className="helios-hero">
          <div className="helios-hero-meta"><span>Digital / Social media</span><span>Hyderabad / Always on</span></div>
          <h1 data-cms-field="title">{heliosRecord.title.replace(' ', '\n')}</h1>
          <div className="helios-hero-copy">
            <strong>Stone<br />in motion.</strong>
            <p data-cms-field="summary">{heliosRecord.summary}</p>
          </div>
          <div className="helios-reel-stack" aria-label="Selected Helios social content">
            {[0, 1, 2].map(index => (
              <figure key={index}>
                <img data-cms-image={index} src={imageUrl(index)} alt={gallery[index]?.alt || ''} />
                <span>0{index + 1} / Reel</span>
              </figure>
            ))}
          </div>
        </section>

        <section className="helios-brief">
          <p className="section-label">The mandate</p>
          <div>
            <h2 data-cms-field="brief_title">{heliosRecord.brief_title}</h2>
            <div data-cms-field="brief_body">{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="helios-system">
          <header><span>Content operating system</span><span>Three recurring lenses</span></header>
          <div className="helios-pillars">
            <article><span>01 / Origin</span><h3>Show where rarity begins.</h3><p>Quarries, extraction and global sourcing turn provenance into a visible part of the value.</p></article>
            <article><span>02 / Material</span><h3>Let every surface speak.</h3><p>Vein, colour, translucency and finish become concise product stories with a designer’s eye.</p></article>
            <article><span>03 / Space</span><h3>Move from slab to possibility.</h3><p>Applications and the experience centre help audiences picture stone at architectural scale.</p></article>
          </div>
        </section>

        <section className="helios-watch">
          <header>
            <div><span>Selected social</span><h2>Watch the work.</h2></div>
            <p>Short stories designed to make provenance, scale and material detail hold attention on a small screen.</p>
          </header>
          <div className="helios-watch-grid">
            <article>
              <iframe src="https://www.instagram.com/reel/DJEuc4Gqnbz/embed/" title="Helios Stone. Every stone has a story." loading="lazy" allowFullScreen />
              <footer><span>01 / Origin</span><a href="https://www.instagram.com/reel/DJEuc4Gqnbz/">Open reel <Arrow /></a></footer>
            </article>
            <article>
              <iframe src="https://www.instagram.com/reel/DYwzCfdzw_8/embed/" title="Helios Stone. Curated marble collection." loading="lazy" allowFullScreen />
              <footer><span>02 / Collection</span><a href="https://www.instagram.com/reel/DYwzCfdzw_8/">Open reel <Arrow /></a></footer>
            </article>
            <article>
              <iframe src="https://www.instagram.com/p/DY2CLUdE4TC/embed/" title="Helios Stone. Material experience." loading="lazy" allowFullScreen />
              <footer><span>03 / Experience</span><a href="https://www.instagram.com/p/DY2CLUdE4TC/">Open post <Arrow /></a></footer>
            </article>
          </div>
          <a className="helios-all-reels" href="https://www.instagram.com/heliosstone/reels/">View the full Helios reel library <Arrow /></a>
        </section>

        <section className="helios-cadence">
          <div className="helios-cadence-copy">
            <span>Editorial cadence</span>
            <h2 data-cms-field="overview_title">{heliosRecord.overview_title}</h2>
            <p data-cms-field="overview_body">{heliosRecord.overview_body}</p>
          </div>
          <div className="helios-phone phone-one"><img data-cms-image="0" src={imageUrl(0)} alt={gallery[0]?.alt || ''} /><span>Origin story / Reel</span></div>
          <div className="helios-phone phone-two"><img data-cms-image="2" src={imageUrl(2)} alt={gallery[2]?.alt || ''} /><span>Material reveal / Reel</span></div>
          <div className="helios-phone phone-three"><img data-cms-image="1" src={imageUrl(1)} alt={gallery[1]?.alt || ''} /><span>Experience / Carousel</span></div>
        </section>

        <section className="helios-principle">
          <span>Social principle</span>
          <blockquote>Do not shrink the material.<br />Use the screen to reveal its scale.</blockquote>
        </section>

        <section className="helios-outcome">
          <div><span>Scope</span><p data-cms-field="scope">{heliosRecord.scope.join('\n')}</p></div>
          <div><span>Audience</span><p>Architects<br />Interior designers<br />Homeowners<br />Material specifiers</p></div>
          <a href="https://www.instagram.com/heliosstone/">Visit Helios on Instagram <Arrow /></a>
        </section>

        <section className="helios-next">
          <span>More work</span><h2>Design the system.<br />Keep it moving.</h2><a href="/work/digital">View digital projects <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const heliosRenderFrames = Array.from({length:5},(_,index) => `/images/work/helios/social/render-${String(index+1).padStart(2,'0')}.jpg`);
const heliosPhotoFrames = Array.from({length:4},(_,index) => `/images/work/helios/social/photo-${String(index+1).padStart(2,'0')}.jpg`);
const heliosMotion = [
  ['DbYLZbpI3mw','Material choreography'],['DYUhTeITJEy','Surface and light'],['DX3whMnu6Vi','Product transformation'],
  ['DWYe5DME4Xg','Cinematic reveal'],['DV04AJHE9TS','Spatial simulation'],['DUsylOikkiy','Object in motion']
];
const heliosEgc = [['DU5uzvXktOq','Expertise, spoken directly'],['DZNTaXGTI9k','A founder who teaches'],['DTDDZqpEsBp','Trust built in public']];

function HeliosInstagram({code,title}) {
  const postUrl = `https://www.instagram.com/p/${code}/`;
  return <figure className="helios-instagram-card">
    <div className="helios-instagram-media">
      <iframe src={`${postUrl}embed/?autoplay=0&muted=1`} title={title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
    </div>
  </figure>;
}

function HeliosSocialPage() {
  return (
    <>
      <Seo title="Helios Stone Social Media Case Study | Modern Day" description="A complete social media operating system for Helios Stone built from microdrama, Blender visualization, photography and founder led content." path="/work/helios-social" />
      <Header />
      <main className="helios-story">
        <section className="helios-story-open">
          <div className="helios-story-title"><span>Helios Stone / Social media</span><h1>We made stone<br />move, speak<br />and perform.</h1><p>A multi format content system engineered to turn material expertise into attention, authority and sustained market momentum.</p></div>
          <div className="helios-micro"><video className="helios-micro-video" src="/images/work/helios/social/microdrama.mp4" autoPlay muted loop playsInline controls preload="metadata" aria-label="Helios Stone microdrama" /></div>
        </section>

        <section className="helios-story-premise">
          <span>Opening act / Microdrama</span><h2>Start with a story.<br />Earn the product reveal.</h2><p>Instead of opening with another slab, we used microdrama to create tension, character and a reason to keep watching. The product enters as part of the narrative, giving Helios a format that behaves like entertainment while still carrying commercial intent.</p>
        </section>

        <section className="helios-grid-shift">
          <header><span>Before / After</span><h2>From scattered posts<br />to a recognisable<br />brand world.</h2><p>Helios did not need more content. It needed coherence. We built one visual system for material, light, typography, framing and brand placement, so every post now strengthens the next.</p></header>
          <div className="helios-grid-comparison">
            <figure className="helios-grid-before"><figcaption><span>Before</span><div><strong>Individual posts.<br />No shared visual rhythm.</strong><p>Formats, subjects and art direction changed from post to post. The feed communicated activity, but the brand was difficult to recognise at a glance.</p></div></figcaption><div className="helios-grid-feed"><img src="/images/work/helios/social/grid-before.jpg" alt="The Helios Stone Instagram grid before Modern Day, showing inconsistent formats and visual styles" loading="lazy" /></div></figure>
            <figure className="helios-grid-after"><figcaption><span>After</span><div><strong>One feed.<br />One recognisable system.</strong><p>A controlled language of stone, light, space, type and brand placement gives the grid a clear rhythm and an unmistakable Helios presence.</p></div></figcaption><div className="helios-grid-feed"><img src="/images/work/helios/social/grid-after.jpg" alt="The Helios Stone Instagram grid maintained by Modern Day, showing a consistent and elegant visual system" loading="lazy" /></div></figure>
          </div>
        </section>

        <section className="helios-content-map">
          <header><span>The operating system</span><h2>One feed.<br />Four engines.</h2></header>
          <div><article><b>01</b><h3>Founder EGC</h3><p>Human authority and material education.</p></article><article><b>02</b><h3>Blender motion</h3><p>Impossible product worlds built in 3D.</p></article><article><b>03</b><h3>Photography</h3><p>Scale, craft and the store as experience.</p></article><article><b>04</b><h3>Render posts</h3><p>Controlled product desire for the daily feed.</p></article></div>
        </section>

        <section className="helios-renders">
          <header><span>Product renders / Static</span><h2>Art direct<br />every surface.</h2><p>These are not catalogue images. Each render controls material, light, scale and composition so the stone reads as an object of desire before it becomes a specification.</p></header>
          <div className="helios-render-grid">{heliosRenderFrames.map((src,index)=><figure key={src}><img src={src} alt={`Helios product render ${index+1}`} loading="lazy" /></figure>)}</div>
        </section>

        <section className="helios-motion">
          <header><span>Blender films / Motion</span><h2>Material,<br />directed in motion.</h2><p>Using Blender, we choreograph camera, light, reflection and transformation around the product. The resulting films make physical material behave with the pace and spectacle expected on a social screen.</p></header>
          <div>{heliosMotion.map(([code,title])=><article key={code}><HeliosInstagram code={code} title={`Helios ${title}`} /><span>{title}</span></article>)}</div>
        </section>

        <section className="helios-photography">
          <header><span>Original photography</span><h2>The store is<br />part of the story.</h2><p>Photography makes scale credible. We capture the experience centre, the material and the details that renders cannot replace, giving architects and buyers a sense of being there before they visit.</p></header>
          <div>{heliosPhotoFrames.map((src,index)=><img src={src} alt={`Helios store and material photograph ${index+1}`} loading="lazy" key={src} />)}</div>
        </section>

        <section className="helios-egc">
          <header><span>Founder led EGC</span><h2>Expertise needs<br />a human voice.</h2><p>The founder speaks directly, for good reason. Knowledge becomes accessible, conviction becomes visible and the audience learns to associate Helios with informed judgment, not just inventory.</p></header>
          <div>{heliosEgc.map(([code,title])=><article key={code}><HeliosInstagram code={code} title={`Helios founder EGC ${title}`} /><span>{title}</span></article>)}</div>
        </section>

        <section className="helios-instagram-exit"><span>Continue exploring</span><p>See how the complete content system lives together on the Helios feed.</p><a href="https://www.instagram.com/heliosstone/" target="_blank" rel="noreferrer">Visit Helios on Instagram <Arrow /></a></section>

        <section className="helios-publishing">
          <span>Publishing architecture</span><h2>Reels create reach.<br />Carousels build depth.<br />Posts hold recognition.</h2><p>The formats work as a portfolio, not isolated uploads. Video earns attention. Carousels reward consideration. Static posts create rhythm and memory. Together they turn the Helios page into an always on market asset.</p>
        </section>
        <section className="helios-story-close"><span>Strategy / Creative direction / Production / Social media</span><blockquote>Not content for the calendar.<br />A system built for traction.</blockquote><a href="/contact">Build your content engine <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

const agarthaFallbackGallery = [
  { path: '/images/work/agartha/agartha-28.jpg', alt: 'The sculptural entrance to Agartha' },
  { path: '/images/work/agartha/agartha-20.jpg', alt: 'Earth architecture and natural pool at Agartha' },
  { path: '/images/work/agartha/agartha-13.jpg', alt: 'Earth retreat social space at Agartha' },
  { path: '/images/work/agartha/agartha-16.jpg', alt: 'Architecture shaped by nature at Agartha' },
  { path: '/images/work/agartha/agartha-22.jpg', alt: 'Agartha landscape and community architecture' },
  { path: '/images/work/agartha/agartha-24.jpg', alt: 'Agartha resort amenity' }
];

function AgarthaSocialPage() {
  const cms = useCaseStudy('agartha-social');
  const record = cms || {
    title: 'Agartha', category: 'Social media', year: '2025', location: 'Narsapur / Hyderabad',
    summary: 'A digital world for 36 earth home plots where the product is not square footage. It is a quieter way to live.',
    brief_title: 'Make the life feel real.',
    brief_body: 'Agartha is a 25 acre earth home community beside the Narsapur forest: architecture shaped by bamboo, mud and lime, private food forests, and a resort designed around restoration.\n\nOur task is to translate that layered proposition into social content people can feel before the place is complete. Not another stream of property claims, but an accumulating portrait of the land, its rituals and the life it makes possible.',
    overview_title: 'From masterplan to living world.',
    overview_body: 'The feed moves between atmosphere and evidence. Landscape establishes emotion. Architecture gives the vision form. Progress, material and maker stories build trust. Together, they make a future place feel specific, credible and close.',
    scope: ['Social strategy', 'Creative direction', 'Content production', 'Reels', 'Campaign design'], theme: 'agartha-social'
  };
  const gallery = cms?.gallery?.length ? cms.gallery : agarthaFallbackGallery;
  const imageUrl = index => publicAssetUrl(gallery[index]?.path, agarthaFallbackGallery[index]?.path);
  const paragraphs = record.brief_body.split(/\n\n+/).filter(Boolean);
  return (
    <>
      <Seo title="Agartha Social Media Case Study | Modern Day" description="Modern Day's social media and digital storytelling for Agartha, a 25 acre earth home community beside Narsapur forest near Hyderabad." path="/work/agartha-social" />
      <Header />
      <CaseEditBar slug="agartha-social" record={record} gallery={gallery} />
      <main className="agartha-case">
        <section className="agartha-hero">
          <div className="agartha-kicker"><span>Digital / Social media</span><span>25 acres / 36 earth-home plots</span></div>
          <h1 data-cms-field="title">{record.title}</h1>
          <div className="agartha-thesis"><strong>Roots<br />of earth.</strong><p data-cms-field="summary">{record.summary}</p></div>
          <figure><img data-cms-image="0" src={imageUrl(0)} alt={gallery[0]?.alt || ''} /><figcaption>01 / The threshold</figcaption></figure>
        </section>
        <section className="agartha-brief">
          <p className="section-label">The mandate</p>
          <div><h2 data-cms-field="brief_title">{record.brief_title}</h2><div data-cms-field="brief_body">{paragraphs.map(p => <p key={p}>{p}</p>)}</div></div>
        </section>
        <section className="agartha-land">
          <header><span>A place before a product</span><span>Narsapur / Telangana</span></header>
          <figure><img data-cms-image="1" src={imageUrl(1)} alt={gallery[1]?.alt || ''} /><figcaption>Earth architecture, native landscape and water.</figcaption></figure>
          <div className="agartha-land-note"><span>25 / Acres</span><p>The visual language stays close to the ground: mineral colour, unhurried frames and enough silence for the landscape to register.</p></div>
        </section>
        <section className="agartha-pillars">
          <header><span>Content system</span><h2>One world.<br />Three lenses.</h2></header>
          <article><span>01 / Land</span><h3>Begin with what cannot be manufactured.</h3><p>Forest, soil, season and sky establish a sense of place before a sales message enters the frame.</p></article>
          <article><span>02 / Living</span><h3>Show the rituals, not the amenities list.</h3><p>Food forests, earthen retreats, water and wellness become moments people can imagine inhabiting.</p></article>
          <article><span>03 / Proof</span><h3>Let progress make the promise credible.</h3><p>Materials, makers and construction stories turn a forward looking vision into visible evidence.</p></article>
        </section>
        <section className="agartha-gallery">
          <figure className="wide"><img data-cms-image="2" src={imageUrl(2)} alt={gallery[2]?.alt || ''} /><figcaption>Shared rituals / Resort life</figcaption></figure>
          <figure><img data-cms-image="3" src={imageUrl(3)} alt={gallery[3]?.alt || ''} /><figcaption>Built from the earth</figcaption></figure>
          <div className="agartha-gallery-copy"><span>Editorial direction</span><h2 data-cms-field="overview_title">{record.overview_title}</h2><p data-cms-field="overview_body">{record.overview_body}</p></div>
          <figure><img data-cms-image="4" src={imageUrl(4)} alt={gallery[4]?.alt || ''} /><figcaption>Landscape as identity</figcaption></figure>
          <figure className="wide"><img data-cms-image="5" src={imageUrl(5)} alt={gallery[5]?.alt || ''} /><figcaption>A future made tangible</figcaption></figure>
        </section>
        <section className="agartha-watch">
          <header><div><span>Selected social</span><h2>See the story<br />in motion.</h2></div><p>Reels move between context, craft and connectivity, each one adding a new piece to the world.</p></header>
          <div className="agartha-watch-grid">
            <article><iframe src="https://www.instagram.com/reel/DLCxMEIPO6j/embed/" title="Agartha earth construction reel" loading="lazy" allowFullScreen /><footer><span>01 / Material</span><a href="https://www.instagram.com/reel/DLCxMEIPO6j/">Open reel <Arrow /></a></footer></article>
            <article><iframe src="https://www.instagram.com/reel/DXZVCUpE3kZ/embed/" title="Agartha Narsapur location reel" loading="lazy" allowFullScreen /><footer><span>02 / Place</span><a href="https://www.instagram.com/reel/DXZVCUpE3kZ/">Open reel <Arrow /></a></footer></article>
            <article><iframe src="https://www.instagram.com/reel/DMfhKyYPeYG/embed/" title="Agartha sustainable community reel" loading="lazy" allowFullScreen /><footer><span>03 / Vision</span><a href="https://www.instagram.com/reel/DMfhKyYPeYG/">Open reel <Arrow /></a></footer></article>
          </div>
          <a className="agartha-instagram" href="https://www.instagram.com/agartha_by_modcon/">Visit Agartha on Instagram <Arrow /></a>
        </section>
        <section className="agartha-principle"><span>Digital principle</span><blockquote>Do not sell the plot.<br />Reveal the life around it.</blockquote></section>
        <section className="agartha-outcome"><div><span>Scope</span><p data-cms-field="scope">{record.scope.join('\n')}</p></div><div><span>Audience</span><p>Second home buyers<br />Investors guided by nature<br />Families seeking retreat<br />Design conscious homeowners</p></div><a href="https://www.agartha.in/">Explore Agartha <Arrow /></a></section>
        <section className="agartha-next"><span>More work</span><h2>Build the world.<br />Then keep it alive.</h2><a href="/work/digital">View digital projects <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

const eggBreakFallbackGallery = [
  { path: '/images/egg-break/logo.png', alt: 'EggBreak identity mark built around the moment an egg cracks' },
  { path: '/images/egg-break/stationery.jpg', alt: 'EggBreak stationery system on a cobalt blue studio set' },
  { path: '/images/egg-break/bottle-hero.jpg', alt: 'The custom EggBreak handled bottle shown from front and back' },
  { path: '/images/egg-break/product-family.jpg', alt: 'EggBreak bottle and liquid egg pouch family' },
  { path: '/images/egg-break/truck.jpg', alt: 'EggBreak refrigerated delivery truck in Hyderabad' },
  { path: '/images/egg-break/v2/product-world.jpg', alt: 'EggBreak bottles and pouches photographed as a complete product family' },
  { path: '/images/egg-break/v2/brochure-world.jpg', alt: 'EggBreak brochure shaped like an egg with editorial spreads led by characters' },
  { path: '/images/egg-break/v2/mascot-1.png', alt: 'EggBreak chef character presenting the cracked egg idea' },
  { path: '/images/egg-break/v2/mascot-2.png', alt: 'EggBreak brown chicken character reacting with curiosity' },
  { path: '/images/egg-break/v2/mascot-3.png', alt: 'EggBreak character in a blue apron explaining the product' },
  { path: '/images/egg-break/v2/mascot-4.png', alt: 'EggBreak character in a yellow apron welcoming the audience' },
  { path: '/images/egg-break/v2/mascot-5.png', alt: 'EggBreak maker character in an orange apron' },
  { path: '/images/egg-break/v2/brochure-01.jpg', alt: 'EggBreak brochure cover' },
  { path: '/images/egg-break/v2/brochure-02.jpg', alt: 'EggBreak brochure character dialogue and brand legacy spread' },
  { path: '/images/egg-break/v2/brochure-03.jpg', alt: 'EggBreak brochure product and benefit spread' },
  { path: '/images/egg-break/v2/brochure-04.jpg', alt: 'EggBreak brochure quality and process spread' },
  { path: '/images/egg-break/v2/brochure-05.jpg', alt: 'EggBreak brochure back cover' },
  { path: '/images/egg-break/v2/fleet-world.jpg', alt: 'EggBreak refrigerated fleet showing both sides and rear door livery' },
  { path: '/images/egg-break/v2/truck-art-1.jpg', alt: 'EggBreak truck livery artwork on the driver side' },
  { path: '/images/egg-break/v2/truck-art-2.jpg', alt: 'EggBreak truck livery artwork on the passenger side' },
  { path: '/images/egg-break/v2/truck-art-3.jpg', alt: 'EggBreak rear and door livery artwork' },
  { path: '/images/egg-break/v2/truck-art-4.jpg', alt: 'EggBreak branded vehicle door artwork' },
  { path: '/images/egg-break/v2/truck-art-5.jpg', alt: 'EggBreak character vehicle door artwork' },
  { path: '/images/egg-break/v3/bottle-development-01.jpg', alt: 'EggBreak bottle development sheet with orthographic, handle and shoulder studies' },
  { path: '/images/egg-break/v3/bottle-development-02.jpg', alt: 'EggBreak bottle progressing from wireframe to clay model and translucent production form' },
  { path: '/images/egg-break/v3/grip-study.jpg', alt: 'Close view of a hand using the integrated EggBreak bottle grip' },
  { path: '/images/egg-break/v3/measure-detail.jpg', alt: 'EggBreak bottle front with its vertical egg count measurement scale' },
  { path: '/images/egg-break/v3/fleet-3d.jpg', alt: 'Three dimensional EggBreak fleet installation showing both sides and rear doors' },
  { path: '/images/egg-break/v3/eb-symbol.png', alt: 'Broken egg symbol whose two sides form the E and B initials' },
  { path: '/images/egg-break/v3/wordmark.png', alt: 'EggBreak wordmark with a fracture cut into the final G' },
  { path: '/images/egg-break/v3/omelette-shape.png', alt: 'Irregular field shaped like an omelette and used to hold the EggBreak identity' },
  { path: '/images/egg-break/v3/packaging-reference.jpg', alt: 'EggBreak handled bottle and flexible pouch packaging family' },
  { path: '/images/egg-break/v3/logo-lockup-omelette.png', alt: 'Complete EggBreak logo contained within its field shaped like an omelette' }
];

function EggBreakPage() {
  const cms = useCaseStudy('egg-break');
  const record = cms || {
    title: 'EggBreak', category: 'Brand & product design', year: '2025', location: 'Hyderabad',
    summary: 'A new liquid egg category built as a complete world: name, identity, custom bottle, packaging, character family, brochure, stationery and fleet.',
    brief_title: 'Do more than explain a new product. Make people want to enter its world.',
    brief_body: 'EggBreak was not a label waiting for a pack. It introduced a different way to buy, measure, store and use eggs, especially for professional kitchens. The proposition had to feel practical at first glance and credible under scrutiny.\n\nWe designed from the object outward. A direct name made the shift understandable. A custom bottle made the behaviour intuitive. Packaging organised the range. Then a family of characters gave the brand humour, warmth and a voice wherever technical information needed a human way in.',
    overview_title: 'A useful system with a personality.',
    overview_body: 'The cracked form is the organising idea. Cobalt builds recognition. Shell yellow carries energy. Pink and lime turn instructions into signals. The character family changes the register from confident, to curious, to reassuring without changing the brand.',
    scope: ['Brand strategy', 'Naming', 'Visual identity', 'Character world', 'Bottle design', 'Packaging system', 'Brochure', 'Stationery', 'Fleet livery'], theme: 'egg-break'
  };
  const gallery = eggBreakFallbackGallery.map((fallback, index) => cms?.gallery?.[index]
    ? { ...fallback, ...cms.gallery[index] }
    : fallback);
  const imageUrl = index => publicAssetUrl(gallery[index]?.path, eggBreakFallbackGallery[index]?.path);
  const paragraphs = record.brief_body.split(/\n\n+/).filter(Boolean);
  const characters = [
    { image: 7, number: '01', role: 'The instigator', note: 'Makes the new idea visible in one irreverent gesture.' },
    { image: 8, number: '02', role: 'The sceptic', note: 'Asks the obvious question before the customer has to.' },
    { image: 9, number: '03', role: 'The explainer', note: 'Turns product detail into a conversation, not a lecture.' },
    { image: 10, number: '04', role: 'The host', note: 'Brings warmth, familiarity and kitchen confidence.' },
    { image: 11, number: '05', role: 'The maker', note: 'Carries authority when process and quality take the lead.' }
  ];

  return (
    <>
      <Seo
        title="EggBreak Brand, Bottle and Packaging Design Case Study | Modern Day"
        description="How Modern Day designed EggBreak from the product out: naming, identity, a custom liquid egg bottle, packaging, stationery and delivery fleet."
        path="/work/egg-break"
      />
      <Header />
      <CaseEditBar slug="egg-break" record={record} gallery={gallery} />
      <main className="egg-case">
        <section className="egg-hero">
          <div className="egg-hero-brand">
            <div className="egg-hero-meta"><span>Design / Brand + Product</span><span>{record.year || '2025'}</span></div>
            <figure className="egg-hero-mark">
              <img data-cms-image="0" src={imageUrl(0)} alt={gallery[0]?.alt || ''} />
            </figure>
            <span className="egg-hero-code">EB / 01 to 09</span>
          </div>
          <div className="egg-hero-story">
            <span className="egg-kicker">Hyderabad / A complete brand world</span>
            <h1 data-cms-field="title">{record.title}</h1>
            <strong>From one crack, an entire world.</strong>
            <p data-cms-field="summary">{record.summary}</p>
            <a href="#world">Enter the world <Arrow /></a>
          </div>
        </section>

        <section className="egg-thesis" id="world">
          <span className="egg-kicker">The premise</span>
          <h2>One unfamiliar product.<br />One instantly familiar world.</h2>
          <p>Liquid egg can sound industrial. EggBreak needed to feel precise enough for a production kitchen, simple enough for a first time buyer and memorable enough to create its own category. So every useful answer became a designed touchpoint.</p>
          <div><span>Object</span><span>Identity</span><span>Characters</span><span>Story</span><span>Movement</span></div>
        </section>

        <section className="egg-brief">
          <p className="section-label">The assignment</p>
          <div>
            <h2 data-cms-field="brief_title">{record.brief_title}</h2>
            <div data-cms-field="brief_body">{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="egg-identity">
          <header><span>01 / Identity</span><h2>The name is<br />inside the mark.</h2><p>EggBreak did not need an abstract symbol. It needed an idea people could decode in seconds. The mark turns the name, the product and the act of using it into one compact piece of recognition.</p></header>
          <div className="egg-logo-anatomy">
            <article>
              <figure><img data-cms-image="28" src={imageUrl(28)} alt={gallery[28]?.alt || ''} loading="lazy" /></figure>
              <div><span>01 / EB</span><h3>The break is the monogram.</h3><p className="egg-anatomy-copy">Turn the egg and the fracture does two jobs at once: the left half resolves into an E, the right into a B. Before the name is read, its initials are already inside the object.</p><p className="egg-mobile-note">Tilted, the left half reads E; the right resolves as B.</p></div>
            </article>
            <article>
              <figure><img data-cms-image="29" src={imageUrl(29)} alt={gallery[29]?.alt || ''} loading="lazy" /></figure>
              <div><span>02 / The G</span><h3>The crack continues into the word.</h3><p className="egg-anatomy-copy">A small cut in the final G carries the same visual action into the typography, so symbol and wordmark belong to one thought rather than two separate assets.</p><p className="egg-mobile-note">The same fracture travels into the final G.</p></div>
            </article>
            <article>
              <figure className="egg-omelette-lockup">
                <img data-cms-image="32" src={imageUrl(32)} alt={gallery[32]?.alt || ''} loading="lazy" />
              </figure>
              <div><span>03 / The ground</span><h3>The idea lands on an omelette.</h3><p className="egg-anatomy-copy">The irregular white field is not a badge. It is the finished product, the omelette, holding the broken egg and the complete EggBreak name in one readable silhouette.</p><p className="egg-mobile-note">The complete lockup stays inside the omelette.</p></div>
            </article>
          </div>
          <figure>
            <img data-cms-image="1" src={imageUrl(1)} alt={gallery[1]?.alt || ''} loading="lazy" />
            <figcaption><span>Business system</span><span>Stationery / Print / Internal use</span></figcaption>
          </figure>
        </section>

        <section className="egg-product-world">
          <header><span>02 / Product family</span><h2>The pack is the first demonstration.</h2><p>Rigid bottles and flexible pouches share one visual logic while solving different operational needs. The system looks related before anyone reads a line.</p></header>
          <figure><img data-cms-image="31" src={imageUrl(31)} alt={gallery[31]?.alt || ''} loading="lazy" /><figcaption><span>Bottle + pouches</span><span>One visual language / Multiple kitchen formats</span></figcaption></figure>
        </section>

        <section className="egg-object">
          <figure>
            <img data-cms-image="2" src={imageUrl(2)} alt={gallery[2]?.alt || ''} loading="lazy" />
            <figcaption><span>03 / Product architecture</span><span>30-egg handled bottle</span></figcaption>
          </figure>
          <div className="egg-object-copy">
            <span>The bottle is<br />part of the identity.</span>
            <p>The silhouette was designed from the task outward: carry thirty eggs with control, read the remaining quantity at a glance, pour cleanly, close securely and return the object to cold storage.</p>
          </div>
        </section>

        <section className="egg-development">
          <header><span>Object archive / Development</span><h2>Designed in<br />three dimensions.</h2><p>The label came after the object. We worked through proportion, shoulder transition, grip clearance, wall thickness, cap geometry and the relationship between the measurement scale and the hand.</p></header>
          <div>
            <figure><img data-cms-image="23" src={imageUrl(23)} alt={gallery[23]?.alt || ''} loading="lazy" /><figcaption><span>Development plate 01</span><span>Orthographic / Grip / Shoulder</span></figcaption></figure>
            <figure><img data-cms-image="24" src={imageUrl(24)} alt={gallery[24]?.alt || ''} loading="lazy" /><figcaption><span>Development plate 02</span><span>Wireframe / Clay / Production form</span></figcaption></figure>
          </div>
        </section>

        <section className="egg-use">
          <header><span>04 / Object evidence</span><h2>Three actions.<br />One resolved object.</h2><p>Every formal decision earns its place through use. The bottle makes weight manageable, quantity visible and movement direct.</p></header>
          <div className="egg-use-grid">
            <article>
              <figure><img data-cms-image="25" src={imageUrl(25)} alt={gallery[25]?.alt || ''} loading="lazy" /></figure>
              <div><span>01 / Hold</span><h3>A full grip for a full bottle.</h3><p>The handle is carved into the body rather than attached to it. Four fingers pass through the opening; the thumb meets the shoulder; the load stays close to the hand.</p></div>
            </article>
            <article>
              <figure className="egg-measure-detail"><img data-cms-image="26" src={imageUrl(26)} alt={gallery[26]?.alt || ''} loading="lazy" /></figure>
              <div><span>02 / Measure</span><h3>The bottle explains itself.</h3><p>The side scale translates liquid volume back into the unit a kitchen understands: eggs. A cook does not calculate millilitres; they read three, six, nine, up to thirty.</p></div>
            </article>
          </div>
          <div className="egg-use-footer">
            <article><span>03 / Pour</span><h3>From cold storage to service in one move.</h3><p>The stable square base, broad shoulder and direct cap geometry create a controlled path from carrying to opening to pouring.</p></article>
            <div className="egg-metric"><span>30</span><p>whole eggs<br />in one handled format</p></div>
          </div>
        </section>

        <section className="egg-characters">
          <header>
            <span>05 / Character world</span>
            <h2>Five voices.<br />One family.</h2>
            <p>Technical products ask for explanation. We gave EggBreak a cast that could do it with expression, timing and point of view. Each character carries a different conversational role; together they make the brand feel alive.</p>
          </header>
          <div className="egg-character-stage">
            {characters.map(character => (
              <article key={character.number}>
                <div><span>{character.number}</span><img data-cms-image={character.image} src={imageUrl(character.image)} alt={gallery[character.image]?.alt || ''} loading="lazy" /></div>
                <h3>{character.role}</h3><p>{character.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="egg-brochure">
          <header><span>06 / Editorial system</span><h2>A brochure<br />that talks back.</h2><p>Most brochures speak at the reader. This one stages a conversation. Cut in the silhouette of an egg, its characters ask what a buyer would ask, answer without jargon, then reveal the source, process and proof of the cold chain. Information becomes dialogue; the brochure becomes another character.</p></header>
          <figure className="egg-brochure-hero"><img data-cms-image="6" src={imageUrl(6)} alt={gallery[6]?.alt || ''} loading="lazy" /><figcaption><span>Editorial object cut to shape</span><span>Cover / Dialogue / Process</span></figcaption></figure>
          <div className="egg-brochure-spreads">
            <figure><img data-cms-image="13" src={imageUrl(13)} alt={gallery[13]?.alt || ''} loading="lazy" /><figcaption><span>01 / Conversation</span><span>Doubt  → answer  → confidence</span></figcaption></figure>
            <figure><img data-cms-image="15" src={imageUrl(15)} alt={gallery[15]?.alt || ''} loading="lazy" /><figcaption><span>02 / Proof</span><span>Origin  → process  → trust</span></figcaption></figure>
          </div>
        </section>

        <section className="egg-system">
          <div><span>07 / Brand system</span><h2 data-cms-field="overview_title">{record.overview_title}</h2></div>
          <p data-cms-field="overview_body">{record.overview_body}</p>
          <div className="egg-swatches" aria-label="EggBreak brand palette">
            <i className="blue" /><i className="yellow" /><i className="shell" /><i className="pink" />
          </div>
        </section>

        <section className="egg-fleet">
          <header><span>08 / Fleet</span><h2>The world<br />went to work.</h2><p>The system left the page and entered the city. Refrigerated trucks became the largest objects in the identity: yellow moving rooms where the logo, the question and the character family could be read at traffic speed.</p></header>
          <figure>
            <img data-cms-image="27" src={imageUrl(27)} alt={gallery[27]?.alt || ''} loading="lazy" />
            <figcaption><span>3D fleet installation</span><span>Both sides / Cab / Rear doors</span></figcaption>
          </figure>
        </section>

        <section className="egg-outcome">
          <div><span>Scope</span><p data-cms-field="scope">{record.scope.join('\n')}</p></div>
          <blockquote>Not a pack.<br />A whole world.</blockquote>
          <a href="/work/design">View design projects <Arrow /></a>
        </section>

        <section className="egg-next">
          <span>More work</span>
          <h2>When the category is new,<br />design every way in.</h2>
          <a href="/contact">Build the next one <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function PandoraMoon() {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const moon = new THREE.Group();
    scene.add(moon);
    const surface = new THREE.MeshStandardMaterial({ color:0xe7e1d6, roughness:.92, metalness:0 });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.55, 80, 80), surface);
    moon.add(sphere);
    const craterMaterial = new THREE.MeshStandardMaterial({ color:0xb8b0a5, roughness:1, transparent:true, opacity:.38 });
    [[-.55,.5,1.4,.23],[.38,.72,1.3,.16],[.72,-.22,1.25,.3],[-.32,-.48,1.42,.18],[.1,.08,1.55,.12]].forEach(([x,y,z,size]) => {
      const crater = new THREE.Mesh(new THREE.CircleGeometry(size, 32), craterMaterial);
      crater.position.set(x,y,z);
      crater.lookAt(camera.position);
      moon.add(crater);
    });
    const key = new THREE.DirectionalLight(0xffe2c4, 4.2);
    key.position.set(-3,2,5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa72a20, 2.6);
    rim.position.set(4,-2,2);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x211918,.55));

    const resize = () => {
      const {width,height} = host.getBoundingClientRect();
      renderer.setSize(width,height,false);
      camera.aspect = width / Math.max(height,1);
      camera.updateProjectionMatrix();
    };
    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      const time = reduced ? 0 : clock.getElapsedTime();
      moon.rotation.y = time * .09;
      moon.rotation.x = Math.sin(time * .21) * .08;
      renderer.render(scene,camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    resize(); animate();
    window.addEventListener('resize',resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize',resize);
      sphere.geometry.dispose(); surface.dispose(); craterMaterial.dispose();
      moon.children.slice(1).forEach(item => item.geometry?.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  },[]);
  return <div className="pandora-moon" ref={mount} aria-hidden="true" />;
}

const pandoraImages = Array.from({length:7},(_,index) => `/images/work/pandora/pandora-${String(index+1).padStart(2,'0')}.png`);

function PandoraPage() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.pandora-hero-word span', {yPercent:110, duration:1.15, stagger:.08, ease:'power4.out'});
      gsap.utils.toArray('.pandora-reveal').forEach(item => gsap.from(item, {y:55, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:item,start:'top 84%',once:true}}));
      gsap.to('.pandora-orbit i', {rotate:360, duration:22, repeat:-1, ease:'none'});
    });
    return () => ctx.revert();
  },[]);
  return (
    <>
      <Seo title="Pandora Brand Identity | Modern Day" description="An identity led by the moon and a visual world for Pandora, a premium tap room and cocktail bar built around mystery, rhythm and the allure of night." path="/work/pandora" />
      <Header />
      <main className="pandora-page">
        <section className="pandora-hero">
          <img src={pandoraImages[0]} alt="Pandora tap room and bar identity over a nocturnal chess scene" />
        </section>
        <section className="case-opening-band pandora-opening"><span>Brand identity / Hospitality</span><h1>Pandora</h1><p>A new identity for a night shaped by curiosity, cocktails and the magnetic pull of the moon.</p></section>

        <section className="pandora-premise">
          <p className="pandora-label">The premise</p>
          <div className="pandora-orbit" aria-hidden="true"><i><b /></i></div>
          <div className="pandora-premise-copy pandora-reveal"><h2>The night needed<br />its own gravity.</h2><p>Pandora was conceived as a premium tap room and cocktail bar where mystery feels inviting, not obscure. The identity uses the moon as a point of recognition: a symbol of rhythm, transformation and the promise that something begins after sunset.</p></div>
        </section>

        <section className="pandora-logo-story">
          <header className="pandora-reveal"><span>01 / Identity</span><h2>The moon<br />completes<br />the name.</h2><p>Placed inside the wordmark, the moon is both letterform and atmosphere. It gives a poised serif identity one unforgettable interruption.</p></header>
          <figure><img src={pandoraImages[2]} alt="Pandora wordmark system and red menu applications" loading="lazy" /></figure>
        </section>

        <section className="pandora-eclipse">
          <div className="pandora-eclipse-copy pandora-reveal"><span>02 / Colour</span><h2>Black holds the mystery.<br />Red brings the heat.</h2><p>Night black creates depth. Eclipse red carries appetite, energy and theatrical tension. Moon white keeps the identity legible at its most atmospheric.</p></div>
          <figure><img src={pandoraImages[3]} alt="Moonrise and cocktail still life in Pandora's orange red palette" loading="lazy" /></figure>
        </section>

        <section className="pandora-nightlife">
          <header className="pandora-reveal"><span>03 / Image world</span><h2>Every drink<br />becomes a phase.</h2><p>Hard light, deep shadow, red warmth and reflective glass turn ordinary service moments into scenes from a night already in motion.</p></header>
          <div className="pandora-night-grid"><figure><img src={pandoraImages[1]} alt="Pandora cocktail art direction and social imagery" loading="lazy" /></figure><figure><img src={pandoraImages[4]} alt="Pandora cocktail triptych with lunar wordmark" loading="lazy" /></figure></div>
        </section>

        <section className="pandora-menu">
          <figure><img src={pandoraImages[5]} alt="Pandora cocktail menu and moon wordmark applications" loading="lazy" /></figure>
          <div className="pandora-reveal"><span>04 / Menu system</span><h2>The identity arrives<br />before the order.</h2><p>The menu carries the same restraint as the wordmark, letting the moon, glassware and warm reflections turn the table into a branded surface.</p></div>
        </section>

        <section className="pandora-world">
          <img src={pandoraImages[6]} alt="Pandora hospitality experience, menu and overhead drinks" loading="lazy" />
          <div><span>05 / Brand world</span><h2>Designed to be<br />felt before<br />it is visited.</h2></div>
        </section>

        <section className="pandora-close">
          <span>Identity / Art direction / Menu system / Brand world</span>
          <blockquote>Not simply a bar.<br />A world with its own moon.</blockquote>
          <a href="/contact">Build the next world <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function DcMark({ className = '' }) {
  return (
    <svg className={`dc-live-mark ${className}`} viewBox="50 360 465 360" role="img" aria-label="Design Commune DC symbol">
      <image href="/images/design-commune/logo-lockup.svg" width="1080" height="1080" />
    </svg>
  );
}

function DesignCommunePage() {
  const page = useRef(null);
  const hero = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.from('.dc-hero-copy > *', { y: 34, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out' });
      gsap.from('.dc-hero-mark', { scale: .72, opacity: 0, rotate: -5, duration: 1.35, ease: 'power4.out' });
      if (!reduced) {
        gsap.to('.dc-path-line', { strokeDashoffset: -320, duration: 7, repeat: -1, ease: 'none' });
        gsap.utils.toArray('.dc-reveal').forEach(item => gsap.from(item, {
          y: 48, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 84%', once: true }
        }));
        gsap.from('.dc-module.on', {
          scale: .25, opacity: 0, stagger: .045, duration: .55, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.dc-module-stage', start: 'top 72%', once: true }
        });
      }
    }, page);

    const onMove = event => {
      if (reduced || !hero.current) return;
      const rect = hero.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      gsap.to('.dc-hero-mark', { x: x * 22, y: y * 14, rotate: x * 2, duration: .8, ease: 'power3.out' });
    };
    const heroNode = hero.current;
    heroNode?.addEventListener('pointermove', onMove);
    return () => {
      heroNode?.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  const moduleMap = [
    1,1,1,1,0,1,1,1,1,1,
    1,0,0,1,1,1,0,0,1,0,
    1,0,0,1,1,1,0,0,1,0,
    1,0,0,1,1,1,0,0,0,0,
    1,0,0,1,1,1,0,0,1,0,
    1,0,0,1,1,1,0,0,1,0,
    1,1,1,1,0,1,1,1,1,1
  ];

  return (
    <>
      <Seo title="Design Commune Brand Identity | Modern Day" description="A modular brand identity where D and C become one continuous architectural system, designed by Modern Day." path="/work/design-commune" />
      <Header />
      <main className="dc-case" ref={page}>
        <section className="dc-hero" ref={hero}>
          <div className="dc-hero-grid" aria-hidden="true" />
          <div className="dc-hero-copy">
            <span>Brand identity / Spatial design</span>
            <h1>Two initials.<br />One continuous<br /><em>space.</em></h1>
            <p>Design Commune needed more than a signature. It needed a structure that could hold architecture, collaboration and the possibility of what comes next.</p>
          </div>
          <div className="dc-hero-symbol">
            <DcMark className="dc-hero-mark" />
            <span>DC / Built to connect</span>
          </div>
          <div className="dc-scroll-note">Follow the construction <i>↓</i></div>
        </section>

        <section className="dc-premise">
          <span>Project premise / 01</span>
          <h2 className="dc-reveal">A studio that designs space needed an identity with space inside it.</h2>
          <p className="dc-reveal">The answer began with D and C. Not placed side by side, but drawn into one connected form. The result is both a monogram and a tiny piece of architecture.</p>
        </section>

        <section className="dc-sketch-story">
          <header className="dc-reveal">
            <span>Exploration / 02</span>
            <h2>The spark was not a shape.<br />It was a connection.</h2>
            <p>The sketches tested four ideas at once: pure initials, architectural forms, community, and a continuous path. The selected direction holds all four without forcing any one of them.</p>
          </header>
          <figure>
            <img src="/images/design-commune/exploration-sketches.png" alt="Design Commune logo exploration sketches showing monograms, architectural forms, connection and infinity studies" loading="lazy" />
            <figcaption><span>Original exploration sheet</span><span>D + C / rooms / connection / continuity</span></figcaption>
          </figure>
        </section>

        <section className="dc-modular">
          <header className="dc-reveal"><span>Construction / 03</span><h2>One module.<br />A complete system.</h2><p>A single rounded unit establishes the width, corner logic and rhythm. Repetition builds the field. Subtraction reveals the mark.</p></header>
          <div className="dc-module-stage" aria-label="The Design Commune mark assembled from a modular grid">
            <div className="dc-module-grid">{moduleMap.map((active, index) => <i className={`dc-module ${active ? 'on' : ''}`} key={index} />)}</div>
            <div className="dc-module-key"><i /><span>Base module<br /><b>X × X</b></span></div>
          </div>
        </section>

        <section className="dc-continuity">
          <div className="dc-continuity-copy dc-reveal"><span>Continuity / 04</span><h2>Designed<br />without end.</h2><p>A path travels through D and C, passes the interlock, and returns. It expresses a studio built on conversation, evolution and work that connects rather than concludes.</p></div>
          <div className="dc-path-stage">
            <DcMark className="dc-path-mark" />
            <svg viewBox="0 0 1000 700" aria-hidden="true"><path className="dc-path-line" d="M420 120 C180 70 100 180 105 350 C110 570 330 625 470 510 C565 430 405 305 495 185 C620 20 900 105 905 330 C910 540 735 630 590 535 C480 462 620 310 522 210 C460 146 390 170 420 120Z" /></svg>
            <span className="dc-path-label one">Design</span><span className="dc-path-label two">Commune</span>
          </div>
        </section>

        <section className="dc-space">
          <header className="dc-reveal"><span>Negative space / 05</span><h2>The voids<br />became rooms.</h2><p>The internal openings mirror the studio’s own subject: kitchens, wardrobes, rooms and the connections between them. Empty space becomes usable meaning.</p></header>
          <div className="dc-room-mark">
            <div className="dc-room dc-room-kitchen"><b>Kitchen</b><i /><i /><i /><i /></div>
            <div className="dc-room dc-room-wardrobe"><b>Wardrobe</b><i /><i /><i /><i /><i /></div>
            <span className="dc-room-bridge">Connected space</span>
          </div>
        </section>

        <section className="dc-pattern">
          <div className="dc-pattern-copy dc-reveal"><span>Pattern / 06</span><h2>Built to repeat.<br />Never made generic.</h2><p>The same connection point extends into a pattern language. On paper it guides rhythm. In space it becomes a screen. In leather it becomes texture.</p></div>
          <div className="dc-pattern-field" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <DcMark key={index} />)}</div>
        </section>

        <section className="dc-identity">
          <div className="dc-lockup-stage"><img src="/images/design-commune/logo-lockup.svg" alt="Design Commune full logo lockup" loading="lazy" /></div>
          <div className="dc-identity-copy dc-reveal"><span>Identity / 07</span><h2>One symbol.<br />Many readings.</h2><p>D and C. Two rooms. A continuous route. A community held by a shared centre. The mark stays simple because the idea inside it is rich.</p><div className="dc-swatches"><i /><i /><i /><b>#CC0017 / #000000 / #F4F3F0</b></div></div>
        </section>

        <section className="dc-applications">
          <header className="dc-reveal"><span>Applications / 08</span><h2>The system leaves<br />the drawing board.</h2><p>Embossed, printed, repeated or reduced to a small centre mark, the identity keeps its recognition across every physical touchpoint.</p></header>
          <div className="dc-application-grid">
            <figure className="wide"><img src="/images/design-commune/diary-red.png" alt="Red Design Commune diaries with embossed modular pattern" loading="lazy" /></figure>
            <figure><img src="/images/design-commune/card-white.png" alt="White Design Commune visiting cards with repeated mark pattern" loading="lazy" /></figure>
            <figure><img src="/images/design-commune/card-red.png" alt="Red and white Design Commune visiting cards" loading="lazy" /></figure>
            <figure className="wide"><img src="/images/design-commune/envelope.png" alt="Design Commune envelope system" loading="lazy" /></figure>
            <figure><img src="/images/design-commune/letterhead.png" alt="Design Commune letterhead" loading="lazy" /></figure>
            <figure><img src="/images/design-commune/invoice.png" alt="Design Commune invoice" loading="lazy" /></figure>
          </div>
        </section>

        <section className="dc-close">
          <span>Strategy / Identity / Modular system / Stationery</span>
          <blockquote><span>Designing together.</span><span>Growing together.</span></blockquote>
          <div><a href="/work/design">View Design work <Arrow /></a><a href="/contact">Build the next world <Arrow /></a></div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const socialBatteryFlavors = [
  { name: 'Cranberry and lime', code: 'Charge 01', color: 'Pink pulse', label: '/images/social-battery/labels/label-1.jpg' },
  { name: 'Orange and cream', code: 'Charge 02', color: 'Orange boost', label: '/images/social-battery/labels/label-2.jpg' },
  { name: 'Blueberry and vanilla', code: 'Charge 03', color: 'Violet focus', label: '/images/social-battery/labels/label-3.jpg' },
  { name: 'Guava and chilli', code: 'Charge 04', color: 'Green surge', label: '/images/social-battery/labels/label-4.jpg' }
];

const socialBatteryMockups = [
  ['/images/social-battery/generated/lineup-light-v2.jpg', 'Four Social Battery cans photographed in a bright white studio', 'The complete flavor family'],
  ['/images/social-battery/generated/single-pink-v2.jpg', 'Pink cranberry and lime Social Battery can photographed on pale aluminum', 'Single can study'],
  ['/images/social-battery/generated/steps-light-v2.jpg', 'Four Social Battery flavors arranged on pale aluminum steps', 'Stepped product study'],
  ['/images/social-battery/generated/ice.jpg', 'Pink cranberry and lime Social Battery can set in crushed ice', 'Cold charge']
];

function SocialBatteryPage() {
  const page = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const context = gsap.context(() => {
      gsap.from('.sb-opening > *', { y: 38, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out' });
      gsap.utils.toArray('.sb-reveal').forEach(element => {
        gsap.from(element, { y: 44, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } });
      });
      gsap.utils.toArray('.sb-charge-bar i').forEach((bar, index) => {
        gsap.from(bar, { scaleX: 0, transformOrigin: 'left center', duration: .8, delay: index * .08, ease: 'power3.out', scrollTrigger: { trigger: bar, start: 'top 90%', once: true } });
      });
    }, page);
    return () => context.revert();
  }, []);

  const gallery = (items, className = '') => (
    <div className={`sb-gallery ${className}`}>
      {items.map(([src, alt, caption], index) => (
        <figure key={src} className={index === 0 ? 'sb-wide' : ''}>
          <img src={src} alt={alt} loading="lazy" />
          <figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>{caption}</span></figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <>
      <Seo title="Social Battery Energy Drink Brand and Packaging | Modern Day" description="A four flavor energy drink identity, packaging system and launch world designed by Modern Day as a collectible game power cell." path="/work/social-battery" />
      <Header />
      <main className="sb-case" ref={page}>
        <section className="sb-hero">
          <img src="/images/social-battery/generated/hero-lineup.jpg" alt="Four Social Battery energy drink cans in pink, orange, violet and green inside an arcade inspired power chamber" />
          <div className="sb-hero-hud" aria-hidden="true"><span>Player energy</span><i /><i /><i /><i /></div>
        </section>

        <section className="sb-opening">
          <div className="sb-opening-mark"><img src="/images/social-battery/logo/social-battery-black.jpg" alt="Social Battery" /></div>
          <div className="sb-opening-copy">
            <span>Brand identity / Packaging / Campaign world</span>
            <h1>Energy became<br />a <em>power up.</em></h1>
            <p>Social Battery was built like an object from a game world. A drink you find, collect and activate when the room gets louder and your charge runs low.</p>
          </div>
        </section>

        <section className="sb-identity">
          <header className="sb-reveal">
            <span>Logo and type / 01</span>
            <h2>Designed for a generation that reads pixels fluently.</h2>
            <p>Gen Z moves easily between gaming, music, fashion and chat. The identity needed that same fluency: immediate on a screen, distinctive on a can and confident enough to become part of the culture around it.</p>
          </header>
          <div className="sb-identity-grid">
            <figure>
              <img src="/images/social-battery/logo/social-battery-black.jpg" alt="Social Battery pixel wordmark in black" loading="lazy" />
              <figcaption><span>Primary wordmark</span><span>Pixel built / Screen native</span></figcaption>
            </figure>
            <div className="sb-type-notes">
              <article className="sb-reveal"><span>Pixel construction</span><h3>Familiar at first sight.</h3><p>The letterforms recall arcade scores, status bars and low resolution displays without copying one specific game. That digital memory makes the mark feel energetic, current and instantly accessible.</p></article>
              <article className="sb-reveal"><span>Weight and rhythm</span><h3>The charge lands on Battery.</h3><p>Social reads like a quick status message. Battery carries more visual weight, giving the name a strong finish and turning the second word into the stored power behind the idea.</p></article>
              <article className="sb-reveal"><span>Supporting typography</span><h3>Expression meets clarity.</h3><p>Italic flavor names bring speed and attitude. Clean utility type keeps ingredients, benefits and product information direct. The system feels playful where it can and precise where it must.</p></article>
            </div>
          </div>
        </section>

        <section className="sb-premise">
          <span>Premise / 02</span>
          <h2 className="sb-reveal">Low battery was never the vibe.</h2>
          <div className="sb-reveal"><p>The category is full of speed, force and familiar lightning. Social Battery takes a more human route. Energy is framed as the charge behind conversation, movement, play and the decision to stay for one more round.</p><p>The battery silhouette makes that idea physical. Pixel lettering gives it an arcade memory. Four neon modes turn flavor into a system people can recognise from across the room.</p></div>
          <div className="sb-charge-bar" aria-label="Social Battery fully charged"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </section>

        <section className="sb-flavors">
          <header className="sb-reveal"><span>Packaging system / 03</span><h2>Four flavors.<br />Four charge modes.</h2><p>The complete supplied label artwork remains the source of truth. Each flavor changes color while the battery architecture, information grid and pixel voice stay locked.</p></header>
          <div className="sb-label-grid">
            {socialBatteryFlavors.map((flavor, index) => (
              <figure key={flavor.name}>
                <img src={flavor.label} alt={`Complete ${flavor.name} Social Battery label artwork`} loading="lazy" />
                <figcaption><span>{flavor.code}</span><strong>{flavor.name}</strong><small>{flavor.color}</small></figcaption>
                <i aria-hidden="true">{index + 1}</i>
              </figure>
            ))}
          </div>
        </section>

        <section className="sb-world sb-world-studio">
          <header className="sb-reveal"><span>Product studies / 04</span><h2>Let the pack<br />hold the frame.</h2><p>Bright light, accurate scale and very little else. The quieter the scene becomes, the more clearly the battery structure does its work.</p></header>
          {gallery(socialBatteryMockups, 'sb-gallery-studio')}
        </section>

        <section className="sb-application">
          <header className="sb-reveal"><span>One application / 05</span><h2>One can.<br />One clear line.</h2><p>The subway application uses the product as the main object. No flavor wall, no repeated poster system, no visual noise.</p></header>
          <figure><img src="/images/social-battery/generated/subway-light-v2.jpg" alt="Minimal Social Battery subway lightbox with one pink can and the Social Battery wordmark" loading="lazy" /><figcaption><span>Subway lightbox</span><span>Charged with intention</span></figcaption></figure>
        </section>

        <section className="sb-close">
          <span>Identity / Packaging / Art direction / Product rendering</span>
          <blockquote>Low charge.<br /><em>High intent.</em></blockquote>
          <div><p>A focused product world built from one recognisable object: the battery you can drink.</p><a href="/contact">Build the next world <Arrow /></a></div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const sleepingTigerProcess = [
  ['/images/sleeping-tiger/process/page-05.jpg', 'Pencil sketch exploration for the sleeping tiger character', 'Pencil first'],
  ['/images/sleeping-tiger/process/page-06.jpg', 'Stripe rhythm studies for the sleeping tiger illustration', 'Every stripe considered'],
  ['/images/sleeping-tiger/process/page-07.jpg', 'Vector refinement of the sleeping tiger in Adobe Illustrator', 'Vector refinement'],
  ['/images/sleeping-tiger/process/page-08.jpg', 'Face, eye and stripe detail studies for Sleeping Tiger', 'Character details']
];

const sleepingTigerPlacements = [
  ['/images/sleeping-tiger/process/page-13.jpg', 'Midnight Curl early logo placement study', '01', 'Midnight Curl'],
  ['/images/sleeping-tiger/process/page-14.jpg', 'Hidden Prowl early logo placement study', '02', 'Hidden Prowl'],
  ['/images/sleeping-tiger/process/page-15.jpg', 'Resting Stripe early logo placement study', '03', 'Resting Stripe']
];

function SleepingTigerPage() {
  const page = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const context = gsap.context(() => {
      gsap.from('.st-hero-copy > *', { y: 34, opacity: 0, duration: 1, stagger: .09, ease: 'power3.out' });
      gsap.from('.st-hero-tiger', { x: 55, opacity: 0, duration: 1.2, ease: 'power3.out' });
      gsap.utils.toArray('.st-reveal').forEach(element => {
        gsap.from(element, { y: 46, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } });
      });
      gsap.from('.st-final-logo img', { scale: .82, opacity: 0, duration: 1.25, ease: 'power3.out', scrollTrigger: { trigger: '.st-final-logo', start: 'top 72%', once: true } });
      gsap.from('.st-palette i', { scaleX: 0, transformOrigin: 'left center', duration: .85, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.st-palette', start: 'top 84%', once: true } });
    }, page);
    return () => context.revert();
  }, []);

  return (
    <>
      <Seo title="Sleeping Tiger Brand Identity and Packaging | Modern Day" description="The making of Sleeping Tiger, a sleepwear identity built from an original hand drawn character, expressive wordmark, packaging and launch world." path="/work/sleeping-tiger" />
      <Header />
      <main className="st-case" ref={page}>
        <section className="st-hero">
          <div className="st-hero-copy">
            <div className="st-meta"><span>Brand identity / Packaging / Launch world</span><span>Modern Day / Hyderabad</span></div>
            <h1>Sleeping<br />Tiger</h1>
            <p>A majestic animal. Completely at ease. We built a sleepwear identity around the confidence of having nothing to prove.</p>
            <a href="#st-story">Enter the story <span>↓</span></a>
          </div>
          <div className="st-hero-stage">
            <span>Rest is a power pose.</span>
            <img className="st-hero-tiger" src="/images/sleeping-tiger/objects/hangtag-front.png" alt="Blue line drawing of the original sleeping tiger character" />
            <div className="st-sleep-signal" aria-hidden="true"><i>Z</i><i>Z</i><i>Z</i></div>
          </div>
        </section>

        <section className="st-premise" id="st-story">
          <span>Premise / 01</span>
          <h2 className="st-reveal">Strength,<br /><em>at rest.</em></h2>
          <div className="st-reveal">
            <p>Sleepwear often speaks in whispers. Tiger identities often shout. Sleeping Tiger had to live in the beautiful tension between them.</p>
            <p>The character needed to feel powerful without aggression, warm without becoming childish, and memorable without turning every surface into a mascot moment.</p>
          </div>
        </section>

        <section className="st-research">
          <header className="st-reveal"><span>Finding our tiger / 02</span><h2>We started with<br />what the category repeats.</h2><p>Bengal realism. Generic cat illustration. Cartoon mascot. Tribal symbol. Seeing the familiar routes clearly helped us choose a more ownable one.</p></header>
          <div className="st-research-grid">
            <figure><img src="/images/sleeping-tiger/process/page-03.jpg" alt="Study comparing familiar tiger identity conventions" loading="lazy" /><figcaption>Category conventions</figcaption></figure>
            <figure><img src="/images/sleeping-tiger/process/page-04.jpg" alt="Visual research into tiger illustration styles" loading="lazy" /><figcaption>Reference study</figcaption></figure>
          </div>
        </section>

        <section className="st-making">
          <header className="st-reveal"><span>Making the character / 03</span><h2>Drawn slowly.<br />Recognised instantly.</h2><p>The tiger began in pencil, found its rhythm through the stripes, then moved into vector. The moon shaped eyes, softened paws and sleeping posture hold the character together.</p></header>
          <div className="st-process-grid">
            {sleepingTigerProcess.map(([src, alt, caption], index) => (
              <figure key={src} className="st-reveal"><img src={src} alt={alt} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, '0')}</span><strong>{caption}</strong></figcaption></figure>
            ))}
          </div>
        </section>

        <section className="st-wordmark">
          <div className="st-wordmark-copy st-reveal"><span>Wordmark / 04</span><h2>Type that could<br />curl around a tiger.</h2><p>We wanted the lettering to feel thick, cosy and distinctly strange. Its uneven rhythm carries the looseness of sleep while keeping enough weight to lead a label, a bag or a storefront.</p></div>
          <figure><img src="/images/sleeping-tiger/process/page-11.jpg" alt="Development of the thick Sleeping Tiger wordmark" loading="lazy" /></figure>
        </section>

        <section className="st-placement">
          <header className="st-reveal"><span>Placement trials / 05</span><h2>Three ways in.<br />None were final.</h2><p>We tried the tiger curled beside the name, hidden through the letters and resting across the wordmark. These were decisions in motion, not alternate logos.</p></header>
          <div className="st-placement-grid">
            {sleepingTigerPlacements.map(([src, alt, number, name]) => (
              <figure key={src}><img src={src} alt={alt} loading="lazy" /><figcaption><span>{number} / Work in progress</span><strong>{name}</strong></figcaption></figure>
            ))}
          </div>
        </section>

        <section className="st-final">
          <div className="st-final-intro st-reveal"><span>Final identity / 06</span><h2>Then everything<br />fell into place.</h2><p>The final lockup lets the orange wordmark carry the voice while the blue sleeping tiger settles into its centre. One holds attention. The other rewards the closer look.</p></div>
          <figure className="st-final-logo"><img src="/images/sleeping-tiger/logo-color-hq.png" alt="Final Sleeping Tiger logo with orange wordmark and blue sleeping tiger" loading="lazy" /></figure>
          <div className="st-palette" aria-label="Sleeping Tiger colour palette"><i><span>Sunset Dream</span><b>#FC5F1A</b></i><i><span>Deep Slumber</span><b>#0261D5</b></i><i><span>Midnight Black</span><b>#000000</b></i><i><span>Pillow Cloud</span><b>#FFFFFF</b></i></div>
        </section>

        <section className="st-system">
          <header className="st-reveal"><span>Identity system / 07</span><h2>A character with<br />more than one mood.</h2><p>The sleeping pose anchors recognition. Supporting expressions and monochrome treatments widen the world without weakening the master logo.</p></header>
          <div className="st-system-grid"><figure><img src="/images/sleeping-tiger/brand/page-07.jpg" alt="Sleeping Tiger illustration family and character studies" loading="lazy" /></figure><figure><img src="/images/sleeping-tiger/brand/page-10.jpg" alt="Sleeping Tiger logo colour variations" loading="lazy" /></figure><figure><img src="/images/sleeping-tiger/brand/page-11.jpg" alt="Sleeping Tiger monochrome logo system" loading="lazy" /></figure></div>
        </section>

        <section className="st-collection">
          <header className="st-reveal"><span>Launch collection / 08</span><h2>Matcha meets<br />strawberry.</h2><p>Dusty strawberry cotton, matcha green stripes, two balanced chest pockets and relaxed wide leg trousers give the first collection a clear signature without placing the tiger on every garment.</p></header>
          <figure className="st-collection-hero"><img src="/images/sleeping-tiger/campaign/faceless-duo.jpg" alt="Faceless campaign image of two women in strawberry pink and matcha striped sleepwear" loading="lazy" /></figure>
          <div className="st-collection-detail"><figure><img src="/images/sleeping-tiger/campaign/pajama-flatlay.jpg" alt="Strawberry pink and matcha striped pajama set arranged as a flat lay" loading="lazy" /></figure><div><span>Garment language</span><h3>Cute, considered,<br />never crowded.</h3><p>The clothing carries the collection through colour, proportion, piping and pocket placement. Branding stays where it belongs: at the neck, on the tag and in the unboxing.</p></div></div>
        </section>

        <section className="st-labels">
          <header className="st-reveal"><span>At the neck / 09</span><h2>The smallest surface<br />still carries the whole idea.</h2></header>
          <div className="st-label-grid"><figure><img src="/images/sleeping-tiger/objects/woven-label-reference.jpg" alt="Sleeping Tiger woven neck label stitched into blue gingham sleepwear" loading="lazy" /><figcaption>Woven neck label / Size tab</figcaption></figure><div className="st-label-note"><span>One mark is enough.</span><p>The full colour lockup appears once, framed by the garment and finished with a compact orange size tab. The cloth remains the hero.</p></div></div>
        </section>

        <section className="st-craft">
          <figure><img src="/images/sleeping-tiger/objects/craft-bag-design-crop.png" alt="Sleeping Tiger craft bag artwork with three illustrated tigers among branches" loading="lazy" /></figure>
          <div className="st-craft-copy st-reveal"><span>Craft bag / 10</span><h2>A quieter layer<br />of the wild.</h2><p>Warm kraft colour turns the bag into a softer chapter of the identity. White line work lets three tiger moods live together while the final mark holds the centre.</p></div>
        </section>

        <section className="st-packaging">
          <header className="st-reveal"><span>Packaging ritual / 11</span><h2>From cloth<br />to complete world.</h2><p>The garment folds into a frosted inner bag. A tactile hang tag carries the character. The outer bag brings the orange and blue identity into the street. Each layer has a different job.</p></header>
          <figure className="st-packaging-hero"><img src="/images/sleeping-tiger/campaign/complete-packaging.jpg" alt="Complete Sleeping Tiger unboxing with sleepwear, frosted bag, hang tag, stickers and door hanger" loading="lazy" /></figure>
          <div className="st-packaging-steps">
            <figure><img src="/images/sleeping-tiger/campaign/frosted-bag.jpg" alt="Pink striped sleepwear protected inside a frosted Sleeping Tiger garment bag" loading="lazy" /><figcaption><span>01</span><strong>Protect the cloth</strong></figcaption></figure>
            <figure><img src="/images/sleeping-tiger/objects/shopping-bag-reference.jpg" alt="Orange Sleeping Tiger shopping bag with blue handles" loading="lazy" /><figcaption><span>02</span><strong>Carry the world</strong></figcaption></figure>
          </div>
        </section>

        <section className="st-tags">
          <div className="st-tags-copy st-reveal"><span>Hang tag / 12</span><h2>Character in front.<br />Confidence behind.</h2><p>The die cut tiger creates the first tactile encounter. Turn it over and the orange wordmark takes the full surface, finished with the brand address.</p></div>
          <div className="st-tag-pair"><figure><img src="/images/sleeping-tiger/objects/hangtag-front.png" alt="Front of the Sleeping Tiger die cut hang tag" loading="lazy" /><figcaption>Front</figcaption></figure><figure><img src="/images/sleeping-tiger/objects/hangtag-back.png" alt="Back of the Sleeping Tiger die cut hang tag" loading="lazy" /><figcaption>Back</figcaption></figure></div>
        </section>

        <section className="st-door">
          <header className="st-reveal"><span>Door hanger / 13</span><h2>Sleep became<br />the invitation.</h2><p>A do not disturb card was the natural merchandise object for a brand called Sleeping Tiger. It is useful, playful and tied directly to the category.</p></header>
          <div className="st-door-grid"><figure className="st-door-context"><img src="/images/sleeping-tiger/objects/door-hanger-context.jpg" alt="Sleeping Tiger door hanger designs with measurements" loading="lazy" /></figure><figure><img src="/images/sleeping-tiger/objects/door-hanger-back.png" alt="Back artwork of the Sleeping Tiger door hanger" loading="lazy" /></figure></div>
        </section>

        <section className="st-stickers">
          <div className="st-stickers-copy st-reveal"><span>Sticker sheet / 14</span><h2>One place<br />for the whole cast.</h2><p>The complete supplied sticker sheet is shown together. The illustrations can be peeled away one by one, so the variety belongs here rather than being repeated across every product.</p></div>
          <figure><img src="/images/sleeping-tiger/objects/sticker-sheet-hq.png" alt="Complete Sleeping Tiger peelable sticker sheet" loading="lazy" /></figure>
        </section>

        <section className="st-close">
          <img src="/images/sleeping-tiger/campaign/faceless-shopping.jpg" alt="Faceless Sleeping Tiger shopping campaign in matcha and strawberry colours" loading="lazy" />
          <div className="st-close-copy"><span>Strategy / Identity / Character / Packaging / Art direction</span><blockquote>Soft on skin.<br />Wild at heart.</blockquote><a href="/contact">Build the next world <Arrow /></a></div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const compactBrandConfigs = {
  luma: { tone:'luma', eyebrow:'Coastal identity / Hospitality', thesis:'A brand made of light, air and unhurried space.', statement:'Built to breathe.', detail:'Warm restraint became the system: sun washed colour, open compositions and a mark that feels at home between coast and desert.' },
  millet: { tone:'millet', eyebrow:'Brand identity / Healthy snacking', thesis:'Wholesome energy made bright, modern and immediately approachable.', statement:'Goodness with appetite.', detail:'Millet 9 brings warmth and momentum to a nutrition led proposition, using an energetic identity system built for shelves, packs and everyday recognition.' }
};

const sasyaImages = Array.from({length:6},(_,index) => `/images/work/sasya/sasya-${String(index+1).padStart(2,'0')}.jpg`);

function SasyaPage() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.sasya-reveal').forEach(item => gsap.from(item, {y:45, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:item,start:'top 84%',once:true}}));
    });
    return () => ctx.revert();
  },[]);
  return (
    <>
      <Seo title="Sasya Brand Identity and Plant Commerce | Modern Day" description="A floral brand identity, digital commerce system and living visual world for Sasya, an online destination for plants." path="/work/sasyaa" />
      <Header />
      <main className="sasya-page">
        <section className="sasya-hero">
          <img src={sasyaImages[0]} alt="Sasya plant store and flower identity" />
        </section>
        <section className="case-opening-band sasya-opening"><span>Brand identity / Digital commerce</span><h1>Sasya</h1><p>A living identity for a digital plant store, built to make discovering, understanding and bringing home plants feel beautifully natural.</p></section>
        <section className="sasya-premise">
          <span>Root idea / 01</span><div className="sasya-orbit"><img src={sasyaImages[1]} alt="Original Sasya heart petal flower symbol" /></div>
          <div className="sasya-reveal"><h2>Growth became<br />the interface.</h2><p>Sasya sells plants online, but the proposition is larger than a product grid. We shaped an identity and commerce world that helps people choose confidently, care intelligently and build a lasting relationship with what they bring home.</p></div>
        </section>
        <section className="sasya-mark">
          <div className="sasya-mark-copy sasya-reveal"><span>Identity / 02</span><h2>Eight petals.<br />Infinite growth.</h2><p>The flower symbol is constructed from one repeated organic form. Its rhythm gives the mark recognition at a glance, while the open centre keeps it light, generous and alive.</p></div>
          <div className="sasya-mark-stage"><img src={sasyaImages[5]} alt="Original Sasya logo and wordmark system" /></div>
        </section>
        <section className="sasya-object">
          <figure><img src={sasyaImages[1]} alt="Sasya flower mark and wordmark on a sculptural plant pot" loading="lazy" /></figure>
          <div className="sasya-reveal"><span>Application / 03</span><h2>The mark belongs<br />among the leaves.</h2><p>Quiet enough for a sculptural pot. Distinct enough for a delivery box. The identity sits naturally beside the product instead of competing with it.</p></div>
        </section>
        <section className="sasya-commerce">
          <header className="sasya-reveal"><span>Commerce / 04</span><h2>Choose with<br />confidence.</h2><p>Plant care becomes part of the buying experience. Sunlight, watering and growth information are treated as primary product attributes, helping every customer find the right plant for the right place.</p></header>
          <figure><img src={sasyaImages[2]} alt="Sasya online plant store shown on a laptop" loading="lazy" /></figure>
          <div className="sasya-care"><span>Light</span><b>4 to 5 hours</b><span>Water</span><b>Every 7 days</b><span>Outcome</span><b>A better match</b></div>
        </section>
        <section className="sasya-palette">
          <figure><img src={sasyaImages[4]} alt="Sasya botanical colour palette" loading="lazy" /></figure>
          <div className="sasya-reveal"><span>Visual world / 05</span><h2>Colour sampled<br />from living things.</h2><p>Misted pear, almond cream, pebble path and vintage lichen create a palette that feels grown rather than selected. The result is calm enough for commerce and rich enough for storytelling.</p></div>
        </section>
        <section className="sasya-mobile">
          <img src={sasyaImages[3]} alt="Sasya mobile identity on a phone among green surfaces" loading="lazy" />
          <div><span>Digital expression / 06</span><h2>A bloom<br />in your hand.</h2></div>
        </section>
        <section className="sasya-close">
          <span>Identity / Ecommerce / Plant care / Packaging / Art direction</span>
          <blockquote>Bring nature home.<br />Know how to keep it growing.</blockquote>
          <a href="/contact">Build the next world <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function CompactBrandPage({slug}) {
  const record = projectCatalog.find(project => project.slug === slug);
  const config = compactBrandConfigs[slug];
  const gallery = (record?.gallery || []).slice(0,8);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const ctx = gsap.context(() => gsap.utils.toArray('.brand-case-reveal').forEach(item => gsap.from(item,{y:45,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:item,start:'top 85%',once:true}})));
    return () => ctx.revert();
  },[]);
  if (!record || !config) return <NotFound />;
  const image = index => gallery[index]?.path || record.hero_image_path;
  return (
    <>
      <Seo title={`${record.title} Brand Identity | Modern Day`} description={config.thesis} path={`/work/${slug}`} />
      <Header />
      <main className={`brand-case brand-case-${config.tone}`}>
        <section className="brand-case-hero">
          <img src={image(0)} alt={`${record.title} brand identity`} />
        </section>
        <section className="case-opening-band brand-opening"><span>{config.eyebrow}</span><h1>{record.title}</h1><p>{config.thesis}</p></section>
        <section className="brand-case-intro">
          <span>Project premise</span>
          <h2 className="brand-case-reveal">{config.statement}</h2>
          <p className="brand-case-reveal">{config.detail}</p>
        </section>
        <section className="brand-case-feature"><img src={image(1)} alt={`${record.title} identity application`} loading="lazy" /></section>
        <section className="brand-case-pair"><figure><img src={image(2)} alt={`${record.title} visual identity detail`} loading="lazy" /></figure><figure><img src={image(3)} alt={`${record.title} brand world`} loading="lazy" /></figure></section>
        <section className="brand-case-system">
          <header className="brand-case-reveal"><span>Identity in use</span><h2>One idea.<br />Every expression.</h2></header>
          <div>{gallery.slice(4,7).map((item,index) => <figure key={item.path}><img src={item.path} alt={item.alt || `${record.title} application ${index+1}`} loading="lazy" /></figure>)}</div>
        </section>
        <section className="brand-case-close"><span>Brand identity / Visual system / Applications</span><blockquote>{config.statement}</blockquote><a href="/work/design">View Design work <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

function MalleSocialPage() {
  return (
    <>
      <Seo
        title="Malle Sport Campaign Photography | Modern Day"
        description="A campaign photography case study for Malle, moving from golf at golden hour to the bright pace and colour of pickleball."
        path="/work/malle-social"
      />
      <Header />
      <main className="malle-story">
        <section className="malle-hero">
          <div className="malle-hero-copy">
            <span>Campaign photography / Malle</span>
            <h1>Two games.<br />One golden<br />hour.</h1>
            <p>We built two distinct sporting worlds in a single shoot. Golf holds the last light. Pickleball turns up the colour, movement and attitude.</p>
          </div>
          <figure className="malle-hero-image">
            <img src="/images/work/malle/golf-hero.jpg" alt="Malle models crossing a golf course in the last light of sunset" />
            <figcaption>Golf / Natural light at sunset</figcaption>
          </figure>
        </section>

        <section className="malle-premise">
          <span>The mandate</span>
          <h2>Nothing added.<br />Everything felt.</h2>
          <p>Our mandate was the photoshoot. That made light, timing, casting and composition the whole language. We used the sun as it fell, then let each sport set a different tempo for the collection.</p>
        </section>

        <section className="malle-golf-chapter">
          <header className="malle-chapter-head">
            <span>Set one / Golf</span>
            <h2>Dress the<br />last light.</h2>
            <p>Golf needed patience. Long shadows, quiet confidence and space around every look turned the course into an editorial stage.</p>
          </header>
          <figure className="malle-golf-wide">
            <img src="/images/work/malle/golf-solitude.jpg" alt="A Malle model standing alone on a sunlit golf course" loading="lazy" decoding="async" />
            <figcaption>Let the course breathe</figcaption>
          </figure>
          <div className="malle-golf-pair">
            <figure><img src="/images/work/malle/golf-stride.jpg" alt="Malle golf looks photographed while the models walk through sunset" loading="lazy" decoding="async" /></figure>
            <figure><img src="/images/work/malle/golf-swing.jpg" alt="Malle womenswear styled for a golf swing" loading="lazy" decoding="async" /></figure>
          </div>
          <figure className="malle-cart-scene">
            <img src="/images/work/malle/golf-cart-group.jpg" alt="Malle campaign cast gathered around a golf cart" loading="lazy" decoding="async" />
            <figcaption><span>Editorial frame</span><strong>The clubhouse becomes a runway.</strong></figcaption>
          </figure>
          <div className="malle-cart-portraits">
            <img src="/images/work/malle/golf-cart-portrait.jpg" alt="Malle model in layered colour seated in a golf cart" loading="lazy" decoding="async" />
            <img src="/images/work/malle/golf-cart-man.jpg" alt="Malle model in a cream suit seated in a golf cart" loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="malle-change-ends" aria-label="Transition from golf to pickleball">
          <div><span>Golf</span><strong>Hold the light.</strong></div>
          <p>Same collection.<br />A different pulse.</p>
          <div><span>Pickleball</span><strong>Release the colour.</strong></div>
        </section>

        <section className="malle-pickle-chapter">
          <header className="malle-chapter-head">
            <span>Set two / Pickleball</span>
            <h2>Make the court<br />feel alive.</h2>
            <p>Pickleball called for a quicker eye. Graphic paddles, bright stripes and bodies in motion make the clothes feel social, playful and ready to move.</p>
          </header>
          <figure className="malle-pickle-hero">
            <img src="/images/work/malle/pickleball-hero.jpg" alt="Three Malle models carrying pickleball equipment and campaign bags" loading="lazy" decoding="async" />
          </figure>
          <div className="malle-pickle-rally">
            <figure><img src="/images/work/malle/pickleball-ready.jpg" alt="Malle model ready at the pickleball net" loading="lazy" decoding="async" /></figure>
            <figure className="malle-pickle-overhead"><img src="/images/work/malle/pickleball-overhead.jpg" alt="Overhead portrait with pickleballs and a Malle court look" loading="lazy" decoding="async" /></figure>
            <figure><img src="/images/work/malle/pickleball-play.jpg" alt="Pickleball rally photographed for the Malle campaign" loading="lazy" decoding="async" /></figure>
          </div>
          <div className="malle-pickle-looks">
            <figure><img src="/images/work/malle/pickleball-pair.jpg" alt="Malle models in matching bright pickleball looks" loading="lazy" decoding="async" /></figure>
            <figure><img src="/images/work/malle/pickleball-duo.jpg" alt="Malle campaign duo posing across a pickleball net" loading="lazy" decoding="async" /></figure>
            <figure><img src="/images/work/malle/pickleball-court-portrait.jpg" alt="Malle court portrait with striped socks and a patterned paddle" loading="lazy" decoding="async" /></figure>
            <figure><img src="/images/work/malle/pickleball-fence.jpg" alt="Malle models framed against the pickleball court fence" loading="lazy" decoding="async" /></figure>
          </div>
        </section>

        <section className="malle-close">
          <span>Shoot direction / Photography / Natural light</span>
          <blockquote>One collection.<br />Two ways to play.</blockquote>
          <a href="/work/digital">View Digital work <Arrow /></a>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

const digitalStoryConfigs = {
  shriyasom:{label:'Fashion / Editorial content',statement:'Make the point of view wearable.',detail:'Editorial image making gives the designer’s world movement, attitude and a recognisable rhythm across every digital touchpoint.'},
  hera:{label:'Product / Digital content',statement:'Let material do the selling.',detail:'Controlled product imagery turns finish, form and construction into a precise digital language built for desire and consideration.'},
  sepal:{label:'Product / Launch content',statement:'Turn engineering into desire.',detail:'A focused launch narrative makes utility legible, product value tangible and technical thinking compelling on a social screen.'},
  briskev:{label:'Mobility / Social media',statement:'Keep the category moving.',detail:'An always on content system combines product education, timely stories and market relevance to keep electric mobility visible and useful.'},
  'vian-valley':{label:'Real estate / Digital campaign',statement:'Sell the life before the address.',detail:'Place led storytelling translates a property proposition into atmosphere, routines and a more tangible vision of everyday living.'},
  'restaurant-showcase':{label:'Hospitality / Social content',statement:'Make appetite travel.',detail:'Food, space and social energy work as one sensory invitation, turning the venue’s atmosphere into an active reason to visit.'},
  'wilderness-retreat':{label:'Hospitality / Destination content',statement:'Let the landscape lead.',detail:'A destination story built around stillness, terrain and experience gives audiences a reason to imagine leaving the city behind.'},
  orka:{label:'Wellness / Hospitality content',statement:'Make mindful dining desirable.',detail:'Ingredient, nourishment and atmosphere come together in a contemporary content world for a wellness cafe with a clear point of view.'}
};

const datCarouselStories = [
  {
    number: '01',
    title: 'A walkthrough without the walk.',
    note: 'A five frame story turns an industrial problem into an immersive spatial technology proposition.',
    slides: [1, 2, 3, 4, 5].map(number => ({
      src: `/images/work/dat-social/carousel-01/slide-0${number}.jpg`,
      alt: `DAT spatial walkthrough carousel frame ${number}`
    }))
  },
  {
    number: '02',
    title: 'The spark that saw tomorrow.',
    note: 'Motion, archival imagery and quiet pacing make a technology story feel considered rather than instructional.',
    slides: [
      { src: '/images/work/dat-social/carousel-02/slide-01.mp4', poster: '/images/work/dat-social/carousel-02/slide-01-poster.jpg', type: 'video', alt: 'Animated opening for DAT Nikola Tesla carousel' },
      { src: '/images/work/dat-social/carousel-02/slide-02.mp4', poster: '/images/work/dat-social/carousel-02/slide-02-poster.jpg', type: 'video', alt: 'Animated transition in DAT Nikola Tesla carousel' },
      { src: '/images/work/dat-social/carousel-02/slide-03.jpg', alt: 'Nikola Tesla editorial carousel frame' },
      { src: '/images/work/dat-social/carousel-02/slide-04.jpg', alt: 'Closing tribute to Nikola Tesla' }
    ]
  },
  {
    number: '03',
    title: 'The mind behind the film roll.',
    note: 'A visual history of George Eastman shaped with restrained type, grain and dimensional graphic forms.',
    slides: [1, 2, 3, 4].map(number => ({
      src: `/images/work/dat-social/carousel-03/slide-0${number}.jpg`,
      alt: `DAT George Eastman carousel frame ${number}`
    }))
  },
  {
    number: '04',
    title: 'Hands on. Risk off.',
    note: 'A tactile narrative for immersive training, moving from a sharp question to a memorable product idea.',
    slides: [
      { src: '/images/work/dat-social/carousel-04/slide-01.jpg', alt: 'DAT immersive training carousel opening' },
      { src: '/images/work/dat-social/carousel-04/slide-02.jpg', alt: 'DAT craft and technology carousel frame' },
      { src: '/images/work/dat-social/carousel-04/slide-03.mp4', poster: '/images/work/dat-social/carousel-04/slide-03-poster.jpg', type: 'video', alt: 'Animated DAT immersive training demonstration' },
      { src: '/images/work/dat-social/carousel-04/slide-04.jpg', alt: 'DAT immersive training carousel closing frame' }
    ]
  }
];

function DatCarousel({ story }) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const slide = story.slides[active];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (slide.type === 'video') return undefined;
    const timer = window.setTimeout(() => setActive(current => (current + 1) % story.slides.length), 3800);
    return () => window.clearInterval(timer);
  }, [active, slide.type, story.slides.length]);
  const nextSlide = () => setActive(current => (current + 1) % story.slides.length);
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) video.play().catch(() => {});
  };
  return (
    <article className="dat-carousel">
      <div className="dat-carousel-copy">
        <span>Carousel / {story.number}</span>
        <h3>{story.title}</h3>
        <p>{story.note}</p>
      </div>
      <div className="dat-carousel-stage">
        <div className="dat-carousel-frame">
          {slide.type === 'video'
            ? <video ref={videoRef} key={slide.src} src={slide.src} poster={slide.poster} autoPlay muted={muted} playsInline onEnded={nextSlide} aria-label={slide.alt} />
            : <img key={slide.src} src={slide.src} alt={slide.alt} loading="lazy" />}
          {slide.type === 'video' && <button type="button" className="dat-carousel-sound" onClick={toggleSound} aria-pressed={!muted}>{muted ? 'Play sound' : 'Sound on'}</button>}
        </div>
        <div className="dat-carousel-controls" aria-label={`Choose a frame from carousel ${story.number}`}>
          <span>{String(active + 1).padStart(2, '0')} / {String(story.slides.length).padStart(2, '0')}</span>
          <div>{story.slides.map((item, index) => (
            <button key={item.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show frame ${index + 1}`} aria-pressed={index === active}><i /></button>
          ))}</div>
        </div>
      </div>
    </article>
  );
}

function DatSocialPage() {
  return (
    <>
      <Seo title="DAT Social Media and Website Case Study | Modern Day" description="A digital case study for DAT, bringing spatial technology to life through social media carousels, reels and a complete company website." path="/work/dat-social" />
      <Header />
      <main className="dat-case">
        <section className="dat-hero">
          <div className="dat-hero-copy">
            <span>Modern Day / Digital / DAT</span>
            <h1>Make the<br />future feel<br /><em>close.</em></h1>
            <p>DAT works in spatial technology. We built a digital presence that makes complex ideas clear, tactile and worth stopping for.</p>
            <div className="dat-hero-readout"><span>04 carousel stories</span><span>03 motion reels</span><span>01 complete website</span></div>
          </div>
          <div className="dat-hero-media">
            <video src="/images/work/dat-social/reels/reel-01.mp4" poster="/images/work/dat-social/reels/reel-01-poster.jpg" autoPlay muted loop playsInline aria-label="DAT spatial technology motion reel" />
            <div className="dat-crosshair" aria-hidden="true"><i /><i /><span>Spatial signal / Active</span></div>
          </div>
        </section>

        <section className="dat-premise">
          <span>The communication problem</span>
          <h2>Advanced technology can feel distant before it feels useful.</h2>
          <p>Our job was to close that distance. The content system uses precise writing, controlled motion and dimensional imagery to turn technical propositions into stories people can enter.</p>
        </section>

        <section className="dat-site">
          <header><span>The digital home</span><h2>One website.<br />A complete world.</h2><p>Modern Day designed and built the full DAT website around one clear proposition: redefining realities with spatial technology.</p></header>
          <a className="dat-browser" href="https://deftntact.com/" target="_blank" rel="noreferrer" aria-label="Explore the DAT website">
            <div><span>deftntact.com</span><i /><i /><i /></div>
            <img src="/images/work/dat-social/dat-website.jpg" alt="DAT website homepage designed by Modern Day" loading="lazy" />
            <strong>Explore the live website <Arrow /></strong>
          </a>
          <div className="dat-site-notes" aria-label="DAT website design highlights"><span>UI / UX</span><p>We shaped the product story into a clear path: understand the technology, see it in action, then know where it fits.</p><p>Purposeful motion, clear page hierarchy and concise calls to action help a complex offer feel easy to explore.</p></div>
        </section>

        <section className="dat-carousels">
          <header><span>Social system / Carousels</span><h2>Swipe stories.<br />Built with depth.</h2><p>Each carousel has its own narrative rhythm. Static frames, animated transitions and short films work together as one elegant sequence.</p></header>
          <div>{datCarouselStories.map(story => <DatCarousel story={story} key={story.number} />)}</div>
        </section>

        <section className="dat-reels">
          <header><span>Motion system / Reels</span><h2>Short films.<br /><em>Exact signals.</em></h2><p>Three concise reels give DAT a moving language for products, ideas and the future facing character of the company.</p></header>
          <div className="dat-reel-grid">{[1, 2, 3].map((number, index) => (
            <figure key={number} className={index === 1 ? 'dat-reel-offset' : ''}>
              <video src={`/images/work/dat-social/reels/reel-0${number}.mp4`} poster={`/images/work/dat-social/reels/reel-0${number}-poster.jpg`} controls playsInline preload="metadata" aria-label={`DAT social media reel ${number}`} />
              <figcaption><span>DAT / Reel 0{number}</span><span>Play with sound</span></figcaption>
            </figure>
          ))}</div>
        </section>

        <section className="dat-scope">
          <div><span>Scope</span><p>Social media direction<br />Carousel design<br />Motion reels<br />Website design<br />Website development</p></div>
          <blockquote>Complex work.<br />Made <em>immediate.</em></blockquote>
          <div className="dat-scope-links"><a href="https://deftntact.com/" target="_blank" rel="noreferrer">Visit DAT <Arrow /></a><a href="/work/digital">View Digital work <Arrow /></a></div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}

function DigitalStoryPage({slug}) {
  const record = projectCatalog.find(project => project.slug === slug);
  const config = digitalStoryConfigs[slug];
  if (!record || !config) return <NotFound />;
  const gallery = (record.gallery || []).slice(0,8);
  const image = index => gallery[index]?.path || record.hero_image_path;
  return (
    <>
      <Seo title={`${record.title} Digital Case Study | Modern Day`} description={config.detail} path={`/work/${slug}`} />
      <Header />
      <main className={`digital-story digital-story-${slug}`}>
        <section className="digital-story-hero"><img src={image(0)} alt={`${record.title} campaign hero`} /></section>
        <section className="digital-story-opening"><span>{config.label}</span><h1>{record.title}</h1><p>{config.detail}</p></section>
        <section className="digital-story-thesis"><span>The mandate</span><h2>{config.statement}</h2><p>{record.summary}</p></section>
        <section className="digital-story-feature"><img src={image(1)} alt={`${record.title} content direction`} loading="lazy" /></section>
        <section className="digital-story-pair"><figure><img src={image(2)} alt={`${record.title} content frame one`} loading="lazy" /></figure><figure><img src={image(3)} alt={`${record.title} content frame two`} loading="lazy" /></figure></section>
        <section className="digital-story-system"><header><span>Content system</span><h2>Build memory<br />across the feed.</h2><p>Hero moments interrupt. Supporting stories build meaning. Repetition turns one campaign look into a recognisable editorial property the brand can keep growing.</p></header><div>{gallery.slice(4,8).map((item,index)=><figure key={item.path}><img src={item.path} alt={item.alt || `${record.title} content application ${index+1}`} loading="lazy" /></figure>)}</div></section>
        <section className="digital-story-close"><span>Strategy / Creative direction / Content production</span><blockquote>{config.statement}</blockquote><a href="/work/digital">View digital work <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

const modconFounderReels = [
  { file:'founder-trust', number:'01', title:'Trust before transaction.', note:'A direct founder statement that gives the company a human point of view before the property enters the conversation.', duration:'00:32' },
  { file:'founder-perspective', number:'02', title:'How a builder thinks.', note:'Design judgment and category perspective turn the founder into a useful voice, not only the face of the company.', duration:'00:49' },
  { file:'founder-location', number:'03', title:'Location changes value.', note:'A practical market idea is delivered simply, then supported with city and construction imagery.', duration:'00:26' },
  { file:'founder-tukkuguda', number:'04', title:'Why Tukkuguda. Why now.', note:'Founder conviction meets the facts of a fast changing corridor, making the opportunity easier to understand.', duration:'01:04' }
];

const modconContextReels = [
  { file:'hyderabad-connectivity', number:'05', title:'A city shaped by connection.', note:'Hyderabad growth is explained through the infrastructure that keeps changing distance.', duration:'00:37' },
  { file:'location-connectivity', number:'06', title:'Connected to what matters.', note:'Airport access, employment centres and major roads make location legible in seconds.', duration:'00:27' },
  { file:'growth-corridor', number:'07', title:'The next growth corridor.', note:'South Hyderabad becomes a story of movement, access and future possibility.', duration:'00:24' }
];

const modconProjectReels = [
  { file:'biophilic-living', number:'08', title:'A softer way to live.', note:'A compact property story introduces biophilic living through light, material and calm interiors.', duration:'00:12' },
  { file:'tukkuguda-story', number:'09', title:'Make the location tangible.', note:'Founder voice, landscape and city references combine to move the proposition from map to lived possibility.', duration:'00:41' },
  { file:'modcon-one', number:'10', title:'Business meets future growth.', note:'A commercial proposition is framed through the direction of the city and the ambition of the people building it.', duration:'01:03' }
];

const modconMomentReel = { file:'inauguration', number:'11', title:'A new chapter opens.', note:'The office inauguration turns a company milestone into social proof, culture and momentum.', duration:'00:39' };

function ModconReel({ reel, feature = false }) {
  const pauseOthers = event => {
    document.querySelectorAll('.modcon-reel-video').forEach(video => {
      if (video !== event.currentTarget) video.pause();
    });
  };
  return (
    <article className={`modcon-reel-card${feature ? ' modcon-reel-feature' : ''}`}>
      <div className="modcon-reel-frame">
        <video
          className="modcon-reel-video"
          src={`/images/work/modcon-social/reels/${reel.file}.mp4`}
          poster={`/images/work/modcon-social/posters/${reel.file}.jpg`}
          controls
          playsInline
          preload="metadata"
          onPlay={pauseOthers}
          aria-label={`${reel.title} ModCon social media reel`}
        />
        <span>{reel.number} / {reel.duration}</span>
      </div>
      <div className="modcon-reel-copy"><h3>{reel.title}</h3><p>{reel.note}</p></div>
    </article>
  );
}

function ModconSocialPage() {
  return (
    <>
      <Seo title="ModCon Social Media Case Study | Modern Day" description="A founder led social media campaign for ModCon Builders, connecting real estate perspective, Hyderabad growth stories, project launches and company moments." path="/work/modcon-social" />
      <Header />
      <main className="modcon-story">
        <section className="modcon-hero">
          <div className="modcon-hero-top"><span>Modern Day / Digital</span><span>Social media / Real estate</span></div>
          <div className="modcon-hero-copy"><span>ModCon Builders</span><h1>Build trust.<br />Then build<br /><em>the future.</em></h1><p>A social media system that connects a founder people can believe, a city people are watching and projects they can understand.</p></div>
          <figure><img src="/images/work/modcon-social/posters/founder-perspective.jpg" alt="Manikanta of ModCon speaking in a founder led social media reel" /><figcaption>Founder voice / Market perspective / Project stories</figcaption></figure>
        </section>

        <section className="modcon-premise">
          <span>The mandate</span>
          <h2>Make a real estate company feel human, informed and present.</h2>
          <p>ModCon builds across a changing Hyderabad market. The content needed to do more than announce inventory. It had to explain the thinking behind the company, make emerging locations easier to understand and keep real progress visible.</p>
        </section>

        <section className="modcon-system">
          <header><span>The content system</span><h2>One voice.<br />Four jobs.</h2></header>
          <div>
            <article><b>01</b><h3>Founder voice</h3><p>Turn experience and conviction into a reason to trust.</p></article>
            <article><b>02</b><h3>City context</h3><p>Explain how infrastructure changes where value can grow.</p></article>
            <article><b>03</b><h3>Project stories</h3><p>Translate property ideas into clear, memorable propositions.</p></article>
            <article><b>04</b><h3>Company moments</h3><p>Make progress, culture and milestones visible in public.</p></article>
          </div>
        </section>

        <section className="modcon-founder">
          <header><span>Chapter 01 / Founder led</span><div><h2>Put conviction<br />on camera.</h2><p>The founder films are the centre of gravity. Manikanta speaks directly about trust, design, location and growth. Each film begins with a useful idea, then brings in place and project evidence to hold attention.</p></div></header>
          <div className="modcon-founder-grid">{modconFounderReels.map((reel,index) => <ModconReel reel={reel} feature={index === 0} key={reel.file} />)}</div>
        </section>

        <section className="modcon-context">
          <header><span>Chapter 02 / City context</span><h2>Make the map<br />mean something.</h2><p>Connectivity can become a blur of road names and distances. These reels turn Hyderabad infrastructure into short visual arguments about movement, access and where the city is heading.</p></header>
          <div>{modconContextReels.map(reel => <ModconReel reel={reel} key={reel.file} />)}</div>
        </section>

        <section className="modcon-projects">
          <header><span>Chapter 03 / Project stories</span><h2>From proposition<br />to possibility.</h2><p>Each project gets a distinct reason to matter. Living, location and commercial growth are expressed through different pacing, imagery and narrative, while the ModCon voice stays recognisable.</p></header>
          <div>{modconProjectReels.map((reel,index) => <ModconReel reel={reel} feature={index === 2} key={reel.file} />)}</div>
        </section>

        <section className="modcon-moment">
          <div className="modcon-moment-copy"><span>Chapter 04 / Company moments</span><h2>Progress should<br />be seen.</h2><p>A milestone is more useful when it becomes evidence. The inauguration film brings people, place and momentum together in one brand moment.</p></div>
          <ModconReel reel={modconMomentReel} feature />
        </section>

        <section className="modcon-principle"><span>Social principle</span><blockquote>Do not only show<br />what is being built.<br /><em>Show why it matters.</em></blockquote></section>
        <section className="modcon-scope"><div><span>Scope</span><p>Social strategy<br />Editorial direction<br />Founder led content<br />Reel production<br />Campaign storytelling</p></div><div><span>Content library</span><p>11 finished reels<br />4 founder led films<br />7 campaign stories<br />One connected voice</p></div><a href="https://www.modconbuilders.com/" target="_blank" rel="noreferrer">Visit ModCon Builders <Arrow /></a></section>
        <section className="modcon-close"><span>Modern Day / Digital / Social media</span><h2>Build the company.<br />Build the conversation.</h2><a href="/work/digital">View digital work <Arrow /></a></section>
      </main>
      <PageFooter />
    </>
  );
}

function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return <HomePage />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/services/design') return <ServiceDetail type="design" />;
  if (path === '/services/digital') return <ServiceDetail type="digital" />;
  const capabilityMatch = path.match(/^\/services\/(design|digital)\/([^/]+)$/);
  if (capabilityMatch && capabilityPages[capabilityMatch[2]]?.wing === capabilityMatch[1]) return <CapabilityDetailPage slug={capabilityMatch[2]} />;
  if (path === '/work') return <WorkPage />;
  if (path === '/work/design') return <WorkPage fixedWing="Design" />;
  if (path === '/work/digital') return <WorkPage fixedWing="Digital" />;
  if (path === '/work/egg-break') return <EggBreakPage />;
  if (path === '/work/social-battery') return <SocialBatteryPage />;
  if (path === '/work/sleeping-tiger') return <SleepingTigerPage />;
  if (path === '/work/the-sanctuary') return <SanctuaryPage />;
  if (path === '/work/eagle-stone') return <EagleStonePage />;
  if (path === '/work/ghar-culture') return <GharCulturePage />;
  if (path === '/work/design-commune') return <DesignCommunePage />;
  if (path === '/work/dat-social') return <DatSocialPage />;
  if (path === '/work/malle-social') return <MalleSocialPage />;
  if (path === '/work/modcon-social') return <ModconSocialPage />;
  if (path === '/work/helios-social') return <HeliosSocialPage />;
  if (path === '/work/grey-rose-social') return <GreyRoseSocialPage />;
  if (path === '/work/agartha-social') return <AgarthaSocialPage />;
  if (path === '/work/pandora') return <PandoraPage />;
  if (path === '/work/sasyaa') return <SasyaPage />;
  const digitalStoryMatch = path.match(/^\/work\/(shriyasom|hera|sepal|briskev|vian-valley|restaurant-showcase|wilderness-retreat|orka)$/);
  if (digitalStoryMatch) return <DigitalStoryPage slug={digitalStoryMatch[1]} />;
  const compactBrandMatch = path.match(/^\/work\/(luma|millet)$/);
  if (compactBrandMatch) return <CompactBrandPage slug={compactBrandMatch[1]} />;
  if (path === '/about') return <AboutPage />;
  if (path === '/about/dharma-teja') return <FounderPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/studio') return <React.Suspense fallback={<main className="studio-loading">Opening Studio…</main>}><Studio /></React.Suspense>;
  return <NotFound />;
}

createRoot(document.getElementById('root')).render(<><SiteMotion /><Router /></>);
