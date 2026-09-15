import React from 'react';
import './ninety-north-case.css';

const base = '/ninety-north';

const visualModules = [
  { name: 'North compass', type: 'three', note: 'A live Three.js compass for the homepage. The pointer follows movement, the core responds to touch and the field resolves at true north.' },
  { name: 'Agentic globe', type: 'image', image: 'agentic-studio-network.png', note: 'A second live Three.js world for Agentic Studio, built from connected intelligence, moving nodes and coordinated systems.' },
  { name: 'Kortex orbit', type: 'image', image: 'deal-os-network.png', note: 'A focused decision instrument for Kortex IQ. Fewer elements and tighter orbits make the product feel more specialised.' },
  { name: 'Polar instruments', type: 'rings', note: 'Eight page heroes use a shared animated polar instrument. Each one changes its label, rhythm and emphasis for the subject.' },
  { name: 'Coordinate fields', type: 'squares', note: 'Squares, routes, crosshairs and coordinate marks create depth without taking attention away from the writing.' },
  { name: 'Page signals', type: 'signal', note: 'Blue arrives on hover, selection and movement. It tells the visitor what can be explored and where the system is active.' },
];

function Frame({ src, alt, className = '', label = 'Website view' }) {
  return <figure className={`nn-frame ${className}`}><figcaption><b>{label}</b><span>Ninety North / Digital experience</span></figcaption><div className="nn-frame-bar"><i /><i /><i /><span>90.0000° N</span></div><img src={src} alt={alt} decoding="async" /></figure>;
}

export default function NinetyNorthCase({ Header, Seo, Arrow }) {
  return (
    <div className="nn-case">
      <Seo title="Ninety North Website Design Case Study | Modern Day" description="How Modern Day turned Ninety North into a spatial digital experience built from polar coordinates, precise language, intelligent motion and a complete enterprise content system." path="/work/ninety-north" />
      <Header />
      <main>
        <section className="nn-hero">
          <div className="nn-hero-grid" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="nn-hero-copy"><span className="nn-kicker">Modern Day / Design / Digital experience</span><h1>Every direction<br /><em>agrees.</em></h1><p>We designed Ninety North as a navigational system for ambitious companies moving through AI, products and transformation.</p></div>
          <div className="nn-orbit" aria-hidden="true"><i className="nn-orbit-core" /><i className="nn-orbit-ring nn-ring-one" /><i className="nn-orbit-ring nn-ring-two" /><i className="nn-orbit-ring nn-ring-three" /><b>N</b><span>90.0000° N</span></div>
          <div className="nn-hero-meta"><span>Website strategy</span><span>Experience design</span><span>Writing system</span><span>Motion direction</span><span>Development</span></div>
        </section>

        <section className="nn-premise">
          <span className="nn-kicker">The premise</span><h2>A technology company should not feel difficult to navigate.</h2><div><p>Ninety North works across AI, product engineering, data, cloud and transformation. The challenge was not a lack of capability. It was giving a wide offer one clear direction.</p><p>North became more than a name. It became the organising idea for the language, interface and movement of the entire website.</p></div>
        </section>

        <section className="nn-instrument-exhibition">
          <header><span className="nn-kicker">The visual system we created</span><h2><span>Thirteen pages.</span><span>Thirteen different skies.</span></h2><p>We built a family of instruments, globes, orbits, squares and signals, then chose the right system for each page.</p></header>
          <div className="nn-instrument-counts"><div><strong>2</strong><span>Live Three.js worlds</span></div><div><strong>8</strong><span>Polar instruments</span></div><div><strong>2</strong><span>Bespoke SVG systems</span></div><div><strong>13</strong><span>Page specific heroes</span></div></div>
          <div className="nn-instrument-grid">
            {visualModules.map((module,index)=><article key={module.name}>
              <div className={`nn-module-visual nn-module-${module.type}`}>
                {module.image && <img src={`${base}/${module.image}`} alt="" decoding="async" />}
                {module.type === 'three' && <><i /><i /><i /><b>N</b></>}
                {module.type === 'rings' && <><i /><i /><i /></>}
                {module.type === 'squares' && <><i /><i /><i /><i /></>}
                {module.type === 'signal' && <><i /><span>Active direction</span></>}
              </div>
              <span className="nn-module-index">{String(index+1).padStart(2,'0')}</span><h3>{module.name}</h3><p>{module.note}</p>
            </article>)}
          </div>
          <div className="nn-site-journey"><span>Move from the story into the work</span><h3>See every instrument<br />in its natural habitat.</h3><a href="https://https-ninety-north-preview-preview.vercel.app" target="_blank" rel="noreferrer">Experience the Ninety North website <Arrow /></a></div>
        </section>

        <section className="nn-chapter">
          <span className="nn-chapter-number">01</span>
          <div><span className="nn-kicker">How we designed the homepage</span><h2>We made the brand idea the first interaction.</h2></div>
          <div className="nn-chapter-body"><p>The homepage had to explain a broad technology company in one clear sentence. We wrote “From complex ideas to systems that work” to move the conversation away from technical jargon and towards a useful business result.</p><p>We placed an interactive north compass beside the message. Visitors can move the pole and press to find north. This turns the company name into something people experience immediately.</p></div>
        </section>

        <section className="nn-screen-stage">
          <Frame label="Website view / Homepage" src={`${base}/ninety-north-home.png`} alt="Ninety North homepage showing its polar navigation experience and From complex ideas to systems that work message" />
          <div className="nn-screen-caption"><span>What you are seeing</span><p>The completed homepage. The headline establishes the promise, while the compass makes Ninety North feel spatial, responsive and recognisable.</p></div>
        </section>

        <section className="nn-chapter nn-chapter-soft">
          <span className="nn-chapter-number">02</span>
          <div><span className="nn-kicker">How we designed Agentic Studio</span><h2>We gave a complex AI offer one simple purpose.</h2></div>
          <div className="nn-chapter-body"><p>Agentic Studio contains many capabilities, but the page does not begin with a list. It begins with the outcome: “Build AI agents that actually run the work.”</p><p>From there, the page explains what the agents understand, how they use enterprise knowledge, where people stay in control and which business workflows they can support.</p></div>
        </section>

        <section className="nn-screen-stage">
          <Frame label="Website view / Agentic Studio" src={`${base}/ninety-north-studio.png`} alt="Agentic Studio page for Ninety North" />
          <div className="nn-screen-caption"><span>What you are seeing</span><p>The Agentic Studio opening. The copy leads with the work an enterprise wants completed, while the interface keeps the wider Ninety North coordinate system.</p></div>
        </section>

        <section className="nn-chapter">
          <span className="nn-chapter-number">03</span>
          <div><span className="nn-kicker">How we designed the product page</span><h2>We organised Kortex IQ around a decision.</h2></div>
          <div className="nn-chapter-body"><p>Kortex IQ is an AI operating system for investment teams. Instead of describing the platform as a collection of features, we followed the actual deal journey: screening, research, diligence, challenge and committee preparation.</p><p>The page uses a focused orbital instrument rather than the larger homepage compass. It feels like the same brand, but the visual becomes more precise as the product becomes more specialised.</p></div>
        </section>

        <section className="nn-screen-stage">
          <Frame label="Website view / Kortex IQ product page" src={`${base}/ninety-north-deal-os.png`} alt="Kortex IQ deal intelligence page for Ninety North" />
          <div className="nn-screen-caption"><span>What you are seeing</span><p>The Kortex IQ product opening. The writing identifies the audience, the decision and the value before introducing the platform modules.</p></div>
        </section>

        <section className="nn-mobile-story">
          <header className="nn-mobile-copy"><span className="nn-kicker">04 / How we designed it for mobile</span><h2>Every page kept its direction.</h2><p>We did not squeeze the desktop website into a smaller frame. We designed a mobile rhythm for every service and product page, keeping the writing clear, the instruments responsive and the journey easy to follow with one hand.</p></header>
          <div className="nn-mobile-gallery">
            <figure className="nn-phone"><img src={`${base}/ninety-north-mobile-services.png`} alt="Ninety North Services page designed for mobile" decoding="async" /><figcaption><span>01</span><b>Services</b><small>Message, action and service map</small></figcaption></figure>
            <figure className="nn-phone nn-phone-raised"><img src={`${base}/ninety-north-mobile-studio.png`} alt="Ninety North Agentic Studio page designed for mobile" decoding="async" /><figcaption><span>02</span><b>Agentic Studio</b><small>Outcome first, connected system second</small></figcaption></figure>
            <figure className="nn-phone"><img src={`${base}/ninety-north-mobile-kortex.png`} alt="Ninety North Kortex IQ page designed for mobile" decoding="async" /><figcaption><span>03</span><b>Kortex IQ</b><small>One product, one focused orbit</small></figcaption></figure>
          </div>
          <div className="nn-mobile-decisions">
            <article><span>01</span><div><h3>A line holds the story together.</h3><p>Across the mobile pages, the desktop connection lines become a vertical route. Fine rules, node points and coordinate labels carry the eye from one section into the next, so a long page still feels like one connected system.</p></div></article>
            <article><span>02</span><div><h3>“What we do” becomes a clear sequence.</h3><p>The service groups stack in a deliberate order. Each capability receives its own space, number and dividing rule, while the connecting line preserves the relationship between strategy, engineering, intelligence and transformation.</p></div></article>
            <article><span>03</span><div><h3>Each product keeps its own instrument.</h3><p>Agentic Studio retains its network of connected nodes. Kortex IQ keeps a tighter decision orbit. We resized and repositioned these systems for touch instead of replacing them with generic mobile graphics.</p></div></article>
            <article><span>04</span><div><h3>Reading comes before decoration.</h3><p>Headlines, explanations and actions arrive in the order a visitor needs them. Buttons become thumb sized, paragraphs stay comfortable and secondary detail moves below the main decision rather than competing with it.</p></div></article>
          </div>
        </section>

        <section className="nn-delivery">
          <span className="nn-kicker">What we built</span><h2>One company website.<br />Thirteen clear destinations.</h2><div><p>We designed the homepage, seven service disciplines, Agentic Studio, four focused AI solution families, Kortex IQ, Deal OS, selected experience, the delivery approach, company story and contact journey.</p><p>We also created the writing system, light and dark themes, responsive rules, interactive 3D scenes, reusable motion language and the complete production build.</p></div>
        </section>

        <section className="nn-close"><span>Modern Day / Design / Ninety North</span><h2>We did not decorate a technology company.<br /><em>We gave it a direction.</em></h2><div><a href="/work/design">View Design work <Arrow /></a><a href="/contact">Build the next world <Arrow /></a></div></section>
      </main>
    </div>
  );
}
