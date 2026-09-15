import React, { useEffect, useRef, useState } from 'react';

const Arrow = () => <span aria-hidden="true">↗</span>;

function HeroField() {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = navigator.connection;
    if (reduced || connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2)) return undefined;

    let cancelled = false;
    let dispose = () => {};
    let idleId;
    let timeoutId;

    const initialise = () => import('three').then(THREE => {
      if (cancelled || !host.isConnected) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0d0f0d, .052);
      const camera = new THREE.PerspectiveCamera(40, 1, .1, 70);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setClearColor(0x0d0f0d, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const world = new THREE.Group();
      scene.add(world);

      const particleCount = window.innerWidth < 700 ? 320 : 560;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const phases = new Float32Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        const progress = Math.random();
        const strand = index % 2 ? 1 : -1;
        const angle = progress * Math.PI * 6.2 + strand * .48;
        const radius = 1.1 + progress * 8.4 + (Math.random() - .5) * 1.3;
        positions[index * 3] = Math.cos(angle) * radius * 1.08;
        positions[index * 3 + 1] = Math.sin(angle) * radius * .52 + strand * progress * .55;
        positions[index * 3 + 2] = (Math.random() - .5) * 7 - progress * 2.7;
        sizes[index] = .8 + Math.random() * 2.1;
        phases[index] = Math.random() * Math.PI * 2;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
      particleGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } },
        vertexShader: `
          attribute float aSize;
          attribute float aPhase;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vHeat;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * .62 + aPhase) * .12;
            p.x += cos(uTime * .28 + aPhase) * .055;
            vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = aSize * uPixelRatio * (38.0 / -viewPosition.z);
            vHeat = .5 + .5 * sin(aPhase + uTime * .82);
          }
        `,
        fragmentShader: `
          varying float vHeat;
          void main() {
            float distanceToCentre = length(gl_PointCoord - .5);
            float alpha = smoothstep(.5, .05, distanceToCentre) * (.48 + vHeat * .48);
            vec3 quiet = vec3(.76, .79, .72);
            vec3 signal = vec3(1.0, .31, .14);
            gl_FragColor = vec4(mix(quiet, signal, vHeat * .62), alpha);
          }
        `,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      world.add(particles);

      const aperture = new THREE.Group();
      for (let index = 0; index < 8; index += 1) {
        const geometry = new THREE.TorusGeometry(1.05 + index * .34, .012, 4, 104);
        const material = new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xff6743 : index === 5 ? 0xc7dd3d : 0xc3c7bd,
          transparent: true,
          opacity: .72 - index * .064,
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.set(.88 + index * .065, -.34 + index * .055, index * .3);
        aperture.add(ring);
      }
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(.24, 1),
        new THREE.MeshBasicMaterial({ color: 0xff6743, wireframe: true })
      );
      aperture.add(core);
      aperture.position.set(2.55, -.05, .8);
      world.add(aperture);

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointerMove = event => {
        target.x = (event.clientX / window.innerWidth - .5) * .48;
        target.y = (event.clientY / window.innerHeight - .5) * .28;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      let frame = 0;
      let visible = true;
      let previousTime = 0;
      let scrollResumeTimer = 0;
      const clock = new THREE.Clock();

      const draw = time => {
        frame = 0;
        if (!visible || document.hidden) return;
        if (time - previousTime < 27) {
          frame = requestAnimationFrame(draw);
          return;
        }
        previousTime = time;
        const elapsed = clock.getElapsedTime();
        particleMaterial.uniforms.uTime.value = elapsed;
        pointer.x += (target.x - pointer.x) * .038;
        pointer.y += (target.y - pointer.y) * .038;
        world.rotation.y = pointer.x + elapsed * .012;
        world.rotation.x = pointer.y - .06;
        aperture.rotation.z = elapsed * .045;
        aperture.rotation.y = Math.sin(elapsed * .22) * .16;
        core.rotation.set(elapsed * .24, elapsed * .31, 0);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
      };
      const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
      const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; };
      const onScroll = () => {
        stop();
        window.clearTimeout(scrollResumeTimer);
        scrollResumeTimer = window.setTimeout(start, 180);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: .01 });
      intersectionObserver.observe(host);
      const onVisibilityChange = () => { if (document.hidden) stop(); else start(); };
      document.addEventListener('visibilitychange', onVisibilityChange);

      const resize = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();
      setReady(true);
      start();

      dispose = () => {
        stop();
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('scroll', onScroll);
        window.clearTimeout(scrollResumeTimer);
        particleGeometry.dispose();
        particleMaterial.dispose();
        aperture.traverse(item => {
          if (item.geometry) item.geometry.dispose();
          if (item.material) item.material.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});

    const schedule = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(initialise, { timeout: 850 });
      else timeoutId = window.setTimeout(initialise, 220);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
      dispose();
    };
  }, []);

  return <div className={`md-home-field${ready ? ' is-ready' : ''}`} ref={mountRef} aria-hidden="true"><div className="md-home-field-fallback" /></div>;
}

export default function HomeHero() {
  return (
    <section className="md-home-hero" aria-labelledby="md-home-title">
      <HeroField />
      <div className="md-home-grid" aria-hidden="true" />
      <div className="md-home-copy">
        <h1 id="md-home-title">Build the future.<br /><em>Make it Modern Day.</em></h1>
        <div className="md-home-intro">
          <p>We help ambitious companies look distinct, speak clearly and feel worth choosing.</p>
          <div>
            <a className="md-home-primary" href="#work-gate">Choose an entrance <span aria-hidden="true">↓</span></a>
            <a href="/contact">Start a conversation</a>
          </div>
        </div>
      </div>
    </section>
  );
}
