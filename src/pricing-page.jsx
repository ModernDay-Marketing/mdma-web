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
    <Seo title="Pricing | Modern Day Design, Social Media and Production" description="Explore Modern Day fees for logo design, complete branding, packaging, website building, monthly social media and photography or film shoots. Understand the scope behind each fee." path="/pricing" />
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

      <nav className="fees-nav" aria-label="Fee guide sections"><a href="#design-fees">Design</a><a href="#website-fees">Websites</a><a href="#digital-fees">Digital</a><a href="#production-fees">Production</a><a href="#working-together">Before we begin</a></nav>

      <section className="fees-chapter" id="design-fees">
        <header className="fees-chapter-heading"><span className="fees-label">Design</span><h2>A brand.<br />A whole world.</h2><p>From the first mark to the system around it. Build a company people can recognise wherever they meet it.</p><a className="fees-website-preview" href="/work/sleeping-tiger"><img src="/website-examples/sleeping-tiger.jpg" alt="Sleeping Tiger identity case study with a blue tiger illustration and an orange and blue visual system" width="1280" height="800" loading="lazy" /><span>Enter the world of Sleeping Tiger <span aria-hidden="true">↗</span></span></a></header>
        <div>{designFees.map(fee => <FeeRow key={fee.name} {...fee} unit={fee.name === 'Complete branding' ? 'Indicative project fee' : 'Per project'} />)}</div>
      </section>

      <section className="fees-chapter fees-websites" id="website-fees">
        <header className="fees-chapter-heading"><span className="fees-label">Website design and development</span><h2>A place for<br />your business<br />to grow.</h2><p>A clear, considered website that explains what you do, makes your business feel credible and gives people a way to take the next step.</p>
          <a className="fees-website-preview" href="https://www.thedesigncommune.com" target="_blank" rel="noopener noreferrer" aria-label="Explore the Design Commune website, opens in a new tab"><img src="/website-examples/design-commune.png" alt="Homepage of the Design Commune website designed and built by Modern Day" width="1280" height="800" loading="lazy" /><span>Explore the Design Commune website <span aria-hidden="true">↗</span></span></a>
        </header>
        <div>
          <FeeRow name="Website design and development" price="₹1,00,000 to ₹3,00,000" unit="Per project" copy="Start with the website your business needs today. Build in more depth and functionality as the brief demands." />
          <div className="fees-website-scope"><h3>At ₹1,00,000: get your business going.</h3><p>A focused business website of up to five pages, shaped around the essentials: who you are, what you offer, why it matters and how to get in touch.</p><ul className="fees-includes"><li>Page structure and a clear journey towards an enquiry or conversation.</li><li>Design and development that work comfortably on phones and larger screens.</li><li>Your agreed copy and imagery brought together into a coherent website, ready for launch.</li></ul></div>
          <div className="fees-website-scope"><h3>More complexity. A wider scope.</h3><p>The fee increases towards ₹3,00,000 as the website needs more pages, richer interactions or more involved functionality. Content management, product catalogues, booking, commerce and integrations can all change the work required.</p><p className="fees-scope">We price the actual brief, not page count alone. Features, content creation, domain, hosting, paid services and ongoing maintenance are confirmed in the proposal, including what is included and what is separate.</p></div>
        </div>
      </section>

      <section className="fees-chapter fees-social" id="digital-fees">
        <header className="fees-chapter-heading"><span className="fees-label">Digital / Social media</span><h2>Your entire<br />presence.<br />Considered.</h2><p>How you look. What you say. Why anyone should care. We connect it all, so your company shows up with purpose wherever your audience meets it.</p>
          <a className="fees-website-preview" href="/work/dat-social"><img src="/website-examples/dat.jpg" alt="DAT digital case study showing its spatial technology content and visual direction" width="1280" height="800" loading="lazy" /><span>Explore DAT’s digital presence <span aria-hidden="true">↗</span></span></a>
        </header>
        <div>
          <FeeRow name="Social media partnership" price="₹80,000 to ₹3,00,000" unit="Per month" copy="A connected programme of strategy, creative direction and execution. We shape the scope around the presence your business needs to build." />
          <div className="fees-website-scope"><h3>At ₹80,000: give your presence direction.</h3><p>A focused monthly engagement built around a clear point of view, a consistent visual language and a purposeful publishing rhythm across the agreed channels.</p><ul className="fees-includes"><li>Audience understanding, positioning and a voice that gives people a reason to listen.</li><li>Content planning, writing and design that make each appearance feel like the same company.</li><li>Coordination of content and approvals, agreed publishing responsibilities and performance review.</li></ul></div>
          <div className="fees-website-scope"><h3>More ambition. A deeper partnership.</h3><p>The fee grows towards ₹3,00,000 as the work expands across channels, campaign activity, founder stories and production needs. More involvement gives the business a broader, more connected presence.</p><p className="fees-scope">We agree the channels, content rhythm, community responsibilities, shoot days and editing upfront. Ad spend and other production costs are confirmed in the proposal. The work is shaped around your goals.</p></div>
        </div>
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
