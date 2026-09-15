import React from 'react';
import './pricing-page.css';

const designFees = [
  { name: 'Logo design', price: '₹1,00,000 to ₹1,50,000', copy: 'A distinctive mark built around what your company stands for. Clear enough to recognise. Considered enough to endure.', includes: ['Understand the business, audience and what the mark needs to communicate.', 'Explore concepts and refine the chosen direction into a distinctive logo.', 'Prepare the agreed logo variations and final artwork for print and digital use.'], scope: 'A focused logo engagement. The wider visual language and brand applications belong to complete branding.' },
  { name: 'Complete branding', price: '₹1,80,000', copy: 'A whole world for your brand. The idea, identity and visual language that make every expression feel like it belongs to you.', includes: ['Define the brand direction, personality and central idea.', 'Develop the logo, colour palette, typography and supporting visual language.', 'Bring the system into the agreed brand applications and document how it works.'], scope: 'We choose the applications around your business before we begin. Packaging, websites and ongoing social media are scoped separately.' },
  { name: 'Packaging design', price: '₹1,00,000 to ₹2,00,000', copy: 'Make the product worth picking up, and the brand worth remembering. A packaging system with presence on the shelf and in the hand.', includes: ['Shape the packaging concept around the product, audience and shelf context.', 'Design the information hierarchy, graphics and agreed product variants.', 'Prepare artwork for the agreed pack formats using confirmed production specifications.'], scope: 'The range reflects the number of formats and variants. Structural development, prototyping and printing are confirmed separately where needed.' },
];

const shootFees = [
  { name: 'Dharma Teja', price: '₹80,000 to ₹1,20,000', copy: 'A shoot led personally by Dharma. For the brand, product or campaign that calls for his eye and direction.', scope: 'His involvement in shaping the visual approach, directing the shoot and making the choices behind the camera that give the work its character.' },
  { name: 'Lead photographer or cinematographer', price: '₹40,000 to ₹50,000', copy: 'A dedicated lead behind the camera, chosen for the photography or film your brief needs.', scope: 'A lead professional working to the agreed brief, with considered framing, lighting and capture throughout the shoot day.' },
  { name: 'iPhone shoot', price: '₹15,000', copy: 'A lighter production approach for immediate, natural content and moments made for social.', scope: 'Phone based capture for the agreed content plan, from founder moments and behind the scenes stories to simple product or location footage.' },
];

function FeeRow({ name, price, copy, includes, scope, unit }) {
  return <article className="fees-row">
    <div className="fees-row-copy"><h3>{name}</h3><p>{copy}</p>{includes && <ul className="fees-includes" aria-label={`What ${name.toLowerCase()} covers`}>{includes.map(item => <li key={item}>{item}</li>)}</ul>}{scope && <p className="fees-scope">{scope}</p>}</div>
    <div className="fees-amount"><strong>{price}</strong><span>{unit}</span></div>
  </article>;
}

export default function PricingPage({ Seo }) {
  return <div className="fees-page">
    <Seo title="Pricing | Modern Day Design, Social Media and Production" description="Explore Modern Day fees for logo design, complete branding, packaging, monthly social media and photography or film shoots. Understand the scope behind each fee." path="/pricing" />
    <a className="fees-skip" href="#fees-main">Skip to fee guide</a>
    <header className="fees-header">
      <a href="/" aria-label="Modern Day home"><img src="/brand/modern-day-marketing-agency-transparent.png" width="2600" height="830" alt="Modern Day Marketing Agency" /></a>
      <span>Pricing</span>
      <a href="/contact">Start a conversation <span aria-hidden="true">↗</span></a>
    </header>
    <main id="fees-main">
      <section className="fees-hero">
        <div className="fees-hero-meta"><span>Working with Modern Day</span><span>Fee guide / INR</span></div>
        <h1>Build something<br />worth choosing.</h1>
        <div className="fees-hero-bottom"><p>Give your company a distinct identity.<br />Build the presence to make it matter.<br />Here is what working together looks like.</p><a href="#design-fees">Explore the fees <span aria-hidden="true">↓</span></a></div>
      </section>

      <nav className="fees-nav" aria-label="Fee guide sections"><a href="#design-fees">Design</a><a href="#digital-fees">Digital</a><a href="#production-fees">Production</a><a href="#working-together">Before we begin</a></nav>

      <section className="fees-chapter" id="design-fees">
        <header className="fees-chapter-heading"><span className="fees-label">Design</span><h2>A brand.<br />A whole world.</h2><p>From the first mark to the system around it. Build a company people can recognise wherever they meet it.</p><a className="fees-evidence" href="/work/sleeping-tiger">Enter the world of Sleeping Tiger <span aria-hidden="true">↗</span></a></header>
        <div>{designFees.map(fee => <FeeRow key={fee.name} {...fee} unit={fee.name === 'Complete branding' ? 'Indicative project fee' : 'Per project'} />)}</div>
      </section>

      <section className="fees-digital" id="digital-fees">
        <div className="fees-digital-heading"><span className="fees-label">Digital / Social media</span><h2>Your entire presence.<br />Considered.</h2><p>How you look. What you say. Why anyone should care. We connect it all, so your company shows up with purpose wherever your audience meets it.</p></div>
        <div className="fees-retainer"><div><h3>Social media partnership</h3><strong>₹80,000 to ₹3,00,000</strong><span>Per month / Scope shaped around your business</span></div><p>A connected programme of strategy, creative direction and execution. The fee reflects the channels, production needs and level of involvement your business requires.</p></div>
        <div className="fees-digital-scope">
          <article><h3>A clear point of view</h3><p>We clarify who you need to reach, what you want to be known for and how your brand should sound. That direction becomes the basis for the content plan.</p></article>
          <article><h3>A presence that belongs together</h3><p>We shape profile presentation, visual direction, writing and design across the agreed channels. Every expression should feel like it comes from the same company.</p></article>
          <article><h3>Ideas with impact</h3><p>We develop campaign ideas, founder stories and product or service narratives, then plan the content needed to bring them to life. Production is agreed as part of the scope.</p></article>
          <article><h3>Direction that keeps improving</h3><p>We manage the agreed publishing rhythm, coordinate content and approvals, and review performance. Audience response informs the next round of ideas and community priorities.</p></article>
        </div>
        <div className="fees-digital-foot"><p>The monthly fee grows with the number of channels, campaign activity, production needs and depth of involvement. We agree those responsibilities upfront, then choose the formats that serve the work.</p><a className="fees-evidence" href="/work/dat-social">Explore DAT’s digital presence <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="fees-chapter" id="production-fees">
        <header className="fees-chapter-heading"><span className="fees-label">Production / Photography and film</span><h2>The right eye.<br />For your story.</h2><p>Choose the approach that suits the ambition. Each option starts with the story you need to tell.</p></header>
        <div>{shootFees.map(fee => <FeeRow key={fee.name} {...fee} unit="Per shoot day" />)}<p className="fees-editing-note"><strong>A light hand in the edit.</strong> Clean cuts, considered pacing, natural colour and clear sound. Editing gives the story shape, with effects used only when they help it. The editing scope and fee are agreed with the brief.</p><p className="fees-production-note">These are shoot rates. The proposal confirms shoot hours, crew, equipment, location, travel and editing, including what is included and what is priced separately.</p><a className="fees-evidence" href="/work/malle-social">See the eye behind the work: Malle <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="fees-conviction"><span className="fees-label">A note from Dharma</span><blockquote>If a quick sale is the whole brief, we are not the right partner.</blockquote><div><p>We are here to build the value people see in your company. The clarity, confidence and presence that make it feel like a market leader.</p><p>Commercial ambition matters. Our work gives people a stronger reason to recognise you, trust you and choose you over time.</p></div><span className="fees-signature">Dharma Teja<br /><small>Founder, Modern Day</small></span></section>

      <section className="fees-working" id="working-together"><header><span className="fees-label">Before we begin</span><h2>Clear scope.<br />Shared ambition.</h2></header><div>
        <details open><summary>What determines the final fee?</summary><p>The depth of the brief, number of applications or channels, production needs and timeline. These fees guide the conversation. Your proposal defines the work and its price.</p></details>
        <details><summary>What does the social media fee include?</summary><p>We agree the channels, responsibilities, content plan and production requirements together. The proposal makes clear whether shoot days, editing and campaign execution sit within the monthly scope or are quoted separately.</p></details>
        <details><summary>What about additional costs and terms?</summary><p>We confirm tax treatment, ad spend, third party costs, revisions, deliverables, payment milestones and timelines in the proposal before work begins.</p></details>
        <details><summary>Can Design and Digital work together?</summary><p>Yes. We can build the identity and then the presence around it, with a connected scope and a clear fee for each part of the work.</p></details>
      </div></section>

      <section className="fees-close"><span className="fees-label">The next conversation</span><h2>What are<br />you building?</h2><div><p>Tell us where the business is today, where it needs to go and what is getting in the way.</p><a href="/contact">Start a conversation <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer className="fees-footer"><span>Modern Day / Hyderabad</span><a href="mailto:work@mdma.co.in">work@mdma.co.in</a><span>All fees in Indian rupees.</span></footer>
  </div>;
}
