import React, { useEffect, useState } from 'react';
import './slaab-case.css';

const frames = (route, count) => Array.from({ length: count }, (_, index) => `/slaab/routes/${route}/deck-${index + 1}.jpg`);
const routes = [
  { id: '01', name: 'Octagonal signal', line: 'Structure becomes recognition.', copy: 'The first route begins with a regular octagon. Its stable geometry is cut into an angular S, balancing the solidity of a surface with the speed of visualization.', traits: ['Bold', 'Simple', 'Clean'], image: '/slaab/options/page-04.webp', gallery: [...frames('01', 6), ...Array.from({ length: 6 }, (_, index) => `/slaab/mockup/page-${index + 1}.jpg`)] },
  { id: '02', name: 'Stacked depth', line: 'Three layers. One dimensional S.', copy: 'Three rectangular prisms use isometric projection to create depth without distortion. The floating stack expresses how SLAAB lets people layer, compare and visualize materials in space.', traits: ['Layer', 'Compare', 'Visualize'], image: '/slaab/options/page-11.webp', gallery: frames('02', 5) },
  { id: '03', name: 'Interrupted plane', line: 'A break that makes the word memorable.', copy: 'A skewed slab contains the name while a teal diagonal interrupts the L and connects it to the baseline. The tension draws the eye to the centre and turns a simple wordmark into an active surface.', traits: ['Plane', 'Tension', 'Connection'], image: '/slaab/options/page-17.webp', gallery: frames('03', 6) },
  { id: '04', name: 'Surface bar', line: 'The material sits above the name.', copy: 'A blue gradient bar rests above the double a. It behaves like a slab, a scan, and a layer in motion. Angled cuts bring depth, flow, and precision to a more approachable rounded wordmark.', traits: ['Depth', 'Flow', 'Precision'], image: '/slaab/options/page-24.webp', gallery: frames('04', 4) },
  { id: '05', name: 'Cut from the slab', line: 'Every letter carries an edge.', copy: 'This direction treats the complete word as one engineered surface. The S, L and B are sharply cut. Both A forms hold square counters, making the name feel constructed rather than typeset.', traits: ['Sharp', 'Engineered', 'Complete'], image: '/slaab/branding/page-1.jpg', gallery: Array.from({ length: 7 }, (_, index) => `/slaab/branding/page-${index + 2}.jpg`) }
];

function RouteMark({ route }) {
  if (route === '01') return <svg className="slaab-authored-mark" viewBox="0 0 256 256" aria-hidden="true"><rect x="16" y="16" width="224" height="224" rx="27"/><path d="M82 48h88l38 35v24h-34l-14-13H99l-14 13 120 26v50l-36 35H83l-35-35v-27h35l16 16h58l14-14-123-28V84z"/></svg>;
  if (route === '02') return <svg viewBox="0 0 220 220" aria-hidden="true"><path d="m44 55 75-32 57 25-75 33zM44 96l75-32 57 25-75 33zM44 137l75-32 57 25-75 33z"/></svg>;
  if (route === '03') return <div className="slaab-route-word slab-plane">SL<span>A</span>AB<i /></div>;
  if (route === '05') return <img className="slaab-sharp-wordmark" src="/slaab/branding/page-1.jpg" alt="" aria-hidden="true" />;
  return <div className="slaab-route-word slab-bar">slaab<i /></div>;
}

export default function SlaabCase({ Header, Seo, Arrow }) {
  const [surface, setSurface] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSurface(value => (value + 1) % 4), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <>
    <Header />
    <main className={`slaab-case slaab-surface-${surface}`}>
      <Seo title="SLAAB Logo Exploration and Brand Identity | Modern Day" description="Four identity directions and a complete application study for SLAAB, a surface visualization technology company." path="/work/slaab" />
      <section className="slaab-hero">
        <div className="slaab-scan" aria-hidden="true"><i /><b /></div>
        <div className="slaab-hero-copy"><span>Modern Day / Design / Identity exploration</span><h1>SLAAB</h1><p>Surface Lab, compressed into one name. An identity study for technology that lets people see any surface before it becomes real.</p></div>
        <div className="slaab-surface-control" aria-label="Surface states">{['Stone', 'Glass', 'Light', 'Grid'].map((name, index) => <button className={surface === index ? 'active' : ''} onClick={() => setSurface(index)} key={name}><i />{name}</button>)}</div>
      </section>

      <section className="slaab-premise"><span>The premise</span><h2>A surface is never only flat.</h2><div><p>SLAAB makes material decisions visible. It turns texture, finish, scale and context into something people can explore before anything is built.</p><p>The identity exploration therefore could not stop at a neat symbol. Each route had to test a different relationship between structure, dimension, movement and interface.</p></div></section>

      <section className="slaab-status"><span>Project status</span><strong>Five directions explored.<br />No final logo selected.</strong><p>This case study documents the thinking honestly. The routes are presented as parallel possibilities, not renamed as final or alternate identities.</p></section>

      <section className="slaab-routes-intro"><span>Identity study / 05 routes</span><h2>One product.<br />Five ways to see it.</h2></section>
      {routes.map((route, index) => <section className={`slaab-route slaab-route-${route.id}`} key={route.id}>
        <header><span>Route {route.id}</span><div><h2>{route.name}</h2><p>{route.copy}</p></div></header>
        <div className="slaab-route-stage"><RouteMark route={route.id} /><small>{route.line}</small></div>
        <div className="slaab-traits">{route.traits.map(trait => <span key={trait}>{trait}</span>)}</div>
        {route.id !== '05' && <figure><img src={route.image} alt={`SLAAB logo construction and rationale for route ${route.id}, ${route.name}`} loading={index ? 'lazy' : 'eager'} /></figure>}
        <div className="slaab-route-gallery" aria-label={`Applications for route ${route.id}`}>{route.gallery.map((src, frameIndex) => <figure className={frameIndex % 5 === 0 ? 'wide' : ''} key={src}><img src={src} alt={`SLAAB route ${route.id} application ${frameIndex + 1}`} loading="lazy" /><figcaption>{route.id}.{String(frameIndex + 1).padStart(2, '0')}</figcaption></figure>)}</div>
      </section>)}

      <section className="slaab-bridge"><span>From mark to world</span><h2>The routes were not left on a white page.</h2><p>They were pushed into the places where a surface technology company has to live: software, screens, mobile icons, social systems, events, objects and spatial displays.</p></section>

      <section className="slaab-system"><span>What the work tested</span><div>{[['Recognition', 'Could the symbol remain distinct at app icon size?'],['Dimension', 'Could a flat mark still suggest depth, layers and material?'],['Motion', 'Could the identity feel native to scanning and real time rendering?'],['Presence', 'Could it hold both a tiny interface and a room sized display?']].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="slaab-close"><span>Modern Day / Brand identity / Concept development</span><h2>Not one answer.<br /><em>A field of possibilities.</em></h2><div><a href="/work/design">View Design work <Arrow /></a><a href="/contact">Build the next identity <Arrow /></a></div></section>
    </main>
  </>;
}
