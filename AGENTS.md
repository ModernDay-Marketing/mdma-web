# Modern Day Website Master Playbook

**Project:** Modern Day Marketing Agency website  
**Owner:** Dharma Teja  
**Primary market:** Hyderabad, India, with national and international ambitions  
**Primary production URL:** https://modern-day.vercel.app  
**Original website domain:** https://www.modernday.in
**Canonical SEO domain:** https://moderndaymarketingagency.com
**Secondary deployment:** https://modern-day-hyderabad.dharmateja29.chatgpt.site  
**Last major design review:** 31 July 2026  
**Review cadence:** Update this file whenever a material design, writing, architecture, CMS, or deployment decision changes.

This is the governing source of truth for all future work on the Modern Day website. Read it before changing the site. Preserve the decisions below unless Dharma explicitly changes them.

---

## 1. The central idea

> The website is not the portfolio.  
> The website is the museum.  
> The case studies are the exhibitions.

The website should feel like entering a founder's paradise. A founder or enterprise decision maker should immediately feel that Modern Day can understand the company in their head, sharpen it, and make it impossible to ignore.

The experience must feel:

- Founder led
- Precise
- Adventurous
- Quietly confident
- Highly considered
- Enterprise ready
- Creative without becoming difficult to use
- Minimal without feeling empty
- Interactive without becoming a demo reel

The visitor should never feel that they are browsing a conventional agency template.

### The single job of the site

Convert conviction into trust. Show that Modern Day can build both the enduring brand and the daily market presence around it.

### The two wings

Modern Day has two distinct practices. Never blur them into a vague list of services.

| Wing | Plain meaning | Strategic meaning | Typical outputs |
|---|---|---|---|
| Design | Logos, identity, packaging, and brand systems | Build the brand people recognise | Strategy, verbal identity, visual identity, packaging, product design, rollout, governance |
| Digital | Social media, content, reels, and campaigns | Build the presence people keep noticing | Social strategy, editorial systems, production, campaigns, advertising, community, intelligence |

The practices share one standard but must remain easy to distinguish. A visitor should immediately understand that Design includes logo and identity work, while Digital includes social media and content work.

---

## 2. Non negotiable brand principles

### 2.1 Design philosophy

The visual philosophy combines:

- Dieter Rams clarity and usefulness
- Braun instrument logic
- Teenage Engineering playfulness and tactility
- Museum scale spacing and curation
- Modern editorial typography

Do not imitate these references literally. Use their principles: hierarchy, honest materials, functional controls, disciplined spacing, and meaningful interaction.

### 2.2 Restraint

Spend boldness in one place per section. If the animation is expressive, the typography and layout around it should be quiet. If a case study image is visually rich, the copy should become shorter and more factual.

Do not add decorative graphs, Three.js objects, labels, captions, numbering, or controls unless they communicate a real idea.

### 2.3 Meaning before spectacle

Every visual device must answer one of these questions:

1. What does Modern Day do?
2. How does the work become better?
3. Which practice is the visitor entering?
4. What was designed and why?
5. What should the visitor do next?

If a visual element answers none of these, remove it.

### 2.4 Never allow text collisions

Text must have its own clear territory. Do not place large copy over a model, image, face, product, decorative form, or another text block.

Specific rules:

- Large display type must use a line height that contains the actual glyphs.
- For the homepage gateway titles, keep line height at `0.88` or more.
- Supporting sentences must have a deliberate gap after display titles.
- Test at wide laptop and desktop sizes where viewport based type can become unexpectedly large.
- Do not solve collisions by hiding meaningful copy on desktop.
- On mobile, stack the visual, controls, and copy instead of layering them.

The overlap visible in the July 2026 Digital gateway screenshot is a known failure mode. It was caused by a `0.72` title line height paired with a very large capped font size. The corrected title rule is:

```css
.home-wing-card h2 {
  margin: 32px 0 34px;
  font-size: clamp(84px, 10.5vw, 170px);
  line-height: .88;
  letter-spacing: -.095em;
}
```

Do not regress this.

---

## 3. Writing system

### 3.1 Voice

Write with founder energy and enterprise discipline.

The voice is:

- Clear before clever
- Confident without boasting
- Specific without becoming technical
- Story led without becoming long
- Ambitious without using empty superlatives
- Human, direct, and active

Write from the client's side of the screen. Explain what changes for the business, not how impressive the agency thinks it is.

### 3.2 Punctuation rule

Avoid hyphens, en dashes, and em dashes in visible website copy. Use a full stop, comma, colon, parentheses, or a rewritten sentence.

This rule applies to:

- Headlines
- Body copy
- Labels
- Captions
- Buttons
- SEO titles where practical
- Footer copy
- Case study storytelling

It does not require changing technical identifiers, URLs, file names, code, slugs, database values, or established brand names.

Examples:

| Avoid | Use |
|---|---|
| Founder-led | Founder led |
| We build brands—and momentum | We build brands and momentum |
| Always-on content | Content that works every day |
| Mon—Fri | Mon to Fri |

### 3.3 Preferred language

Use words such as:

- Recognise
- Notice
- Conviction
- Structure
- Rhythm
- Presence
- System
- Identity
- Momentum
- Clarity
- Useful
- Enduring
- Daily

Use industry terms only when they improve understanding. Acceptable jargon includes brand strategy, identity system, editorial system, governance, performance intelligence, campaign platform, and content production.

### 3.4 Language to avoid

Avoid:

- Forced explanatory language
- Generic agency hype
- Empty innovation claims
- Repeated claims of being disruptive
- Long paragraphs that say one simple thing
- Copy that describes the interface rather than guiding the visitor
- The phrase “Move through the system”
- The phrase “We did not stop at the bottle”
- Claims about client results that are not verified
- Invented brand relationships

“Choose an entrance” is approved and should remain. It is useful because it connects the museum metaphor to the two practices.

### 3.5 Copy density

Desktop can hold more narrative than mobile, but neither should feel like continuous reading.

For case studies:

- One strong idea per section
- Prefer a short headline and one compact paragraph
- Let images carry evidence
- On mobile, shorten or hide secondary captions before shrinking type excessively
- Avoid consecutive text only sections
- Do not repeat the same project claim in the hero, brief, overview, and outcome

---

## 4. Visual design system

### 4.1 Core tokens

The global tokens are defined at the top of `src/styles.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#efefeb` | Primary page background and light surfaces |
| `--ink` | `#181a17` | Primary text, dark surfaces, strong controls |
| `--muted` | `#71756d` | Secondary information |
| `--line` | `#c9cbc4` | Structural rules and quiet borders |
| `--panel` | `#dfe0da` | Secondary neutral panels |
| `--signal` | `#ec5b32` | Orange action and meaning signal |
| `--acid` | `#c7dd3d` | Digital wing and high energy surfaces |

Do not add a new global color without documenting why the existing tokens cannot perform the job.

### 4.2 Typography

| Role | Typeface | Typical use |
|---|---|---|
| Display and body | Manrope | Headlines, body copy, navigation, buttons |
| Utility | DM Mono | Labels, metadata, categories, system language, captions |

Fonts load through Google Fonts in `index.html`.

Typography behavior:

- Display type uses tight tracking and compact line height.
- Body copy must remain comfortable and readable.
- Utility text is uppercase, small, and sparse.
- Do not use mono text for paragraphs.
- Do not reduce mobile utility copy below practical readability.
- Large type is allowed only when the containing layout reserves enough space.

### 4.3 Borders and shapes

- Prefer one pixel borders.
- Prefer square corners.
- Avoid generic rounded cards and pill buttons.
- Circles, grids, frames, and alignment bars are allowed when they represent rhythm, reach, structure, or form.
- Avoid decorative blobs and generic gradients.

### 4.4 Spacing

Spacing should feel architectural.

- Desktop page edges generally use `clamp(22px, 4vw, 64px)`.
- Mobile page edges generally use `22px`.
- Separate major ideas with section scale spacing, not repeated cards.
- Use rules and negative space to group information.
- Do not place a paragraph directly against a display title.

### 4.5 Logo assets

Approved Modern Day brand assets live in `public/brand`.

| File | Use |
|---|---|
| `modern-day-marketing-agency-transparent.png` | Primary horizontal header and footer logo |
| `modern-day-logo.png` | Studio login and compact brand applications |
| `modern-day-icon.png` | Favicon and app icon |
| `modern-day-share.png` | Social sharing preview |

Do not recreate the logo with live text. Use the supplied logo assets. Preserve aspect ratio. Do not add effects, shadows, outlines, or alternative colors unless Dharma supplies an approved version.

---

## 5. Homepage specification

### 5.1 Purpose

The homepage opens as a rotating exhibition of selected work. It should establish Modern Day through evidence, then ask the visitor to choose between Digital and Design below the opening viewport.

### 5.2 Current hero copy

Approved headline:

> Be the company
> people remember.

Approved supporting sentence:

> We help ambitious companies look distinct, speak clearly and feel worth choosing.

The selected project title, practice, scope and one factual sentence update with the active album.

### 5.3 Hero layout

The hero is a full screen black glass exhibition beneath the dark homepage header.

- The headline owns a clear zone at the top.
- A cylindrical album carousel spans the viewport and shows seven selected Design and Digital projects.
- The active project is centred, fully legible and framed in orange.
- Adjacent projects recede around a visible circular orbit.
- Project details and direct navigation occupy a separate footer rail.
- The homepage selection includes Design Commune and Social Battery. Helios Stone is not part of the homepage carousel.
- Mobile retains the same composition with a smaller headline, a touch sized active album and compact controls.
- No copy may overlap the project artwork.

### 5.4 Carousel behavior

The carousel should feel like a physical media library, not an autoplaying gallery.

- Pointer and touch dragging follow movement directly.
- Release velocity creates inertia, friction and a spring settled snap.
- Mouse wheel, trackpad, arrow keys and explicit previous and next controls are supported.
- The wheel journey is finite. After the visitor reaches the final project, the next downward gesture moves into the page so the carousel never traps vertical scrolling.
- Inactive albums can be selected directly. The active album opens its case study.
- A visible “See more work” action takes visitors directly to the Design and Digital practice entrances.
- Motion is implemented with lightweight DOM transforms and requestAnimationFrame. Do not move it to Three.js unless measured performance proves a need.
- The animation loop stops after the carousel settles.
- Reduced motion moves directly between settled states.
- Keep the orbit and interface quiet so the work remains the visual focus.

### 5.5 Majestic transition and practice entrances

The hero is followed by a full viewport transition that prepares the visitor for the two practices.

Approved transition statement:

> Every enduring company is built twice.  
> First, it becomes unmistakable.  
> Then, unmissable.

Supporting logic:

- Design gives the business a form only it can own.
- Digital gives that form rhythm, reach and a place in people’s minds.
- A subtle p5.js field may sit behind this transition, but the writing remains dominant.

The next full viewport contains exactly two direct entrances:

- Design: “Build the world.” Links to `/work/design`.
- Digital: “Move the market.” Links to `/work/digital`.

The choice banner uses the approved line “Choose an entrance.” Each door includes a clear Enter Design or Enter Digital action with light arrival and hover motion. The entrances retain equal columns on mobile and desktop. Do not collapse the animated hero, majestic transition, and entrances into one average card layout.

Homepage carousel covers live in `public/home-albums` as compact WebP assets. Do not point the homepage carousel at full case study heroes.

---

## 6. Work and case study rules

### 6.1 Work index

The `/work` index is typography led and intentionally has no project images. Images appear only after entering a case study.

The index can be filtered into:

- `/work/design`
- `/work/digital`

A small persistent switch lets visitors move between Design and Digital while inside a wing.

### 6.2 Existing custom case studies

| Route | Wing | Subject |
|---|---|---|
| `/work/egg-break` | Design | Brand, packaging, bottle, product system, characters, brochure, fleet |
| `/work/eagle-stone` | Design | Premium natural stone identity |
| `/work/ghar-culture` | Design | Indian design heritage, marble craft, and the feeling of home |
| `/work/design-commune` | Design | Modular identity, architectural negative space, and a continuous DC monogram |
| `/work/malle-social` | Digital | Campaign photography across golf and pickleball |
| `/work/the-sanctuary` | Digital | Hospitality content and visual atmosphere |
| `/work/helios-social` | Digital | Stone brand social media, reels, material stories |
| `/work/grey-rose-social` | Digital | Interior designer founder positioning, international reels, sourcing, and brand development |
| `/work/agartha-social` | Digital | Real estate and community storytelling |
| `/work/dat-social` | Digital | Spatial technology social media, reels, and website design |

Each important new case study should be custom coded. Do not introduce a generic case study creation form.

### 6.3 Imported legacy projects

`src/project-catalog.json` contains 30 projects fetched from the original Modern Day website. `src/project-copy.js` supplies clearer summaries and wing classifications for those records.

Use the imported catalog as source material, not as final creative direction. When promoting a legacy project into a full case study:

1. Verify the source material.
2. Confirm the correct wing.
3. Rewrite the copy in the current Modern Day voice.
4. Create a custom route and page structure.
5. Add SEO metadata and sitemap entry.
6. Add the project to the inline editor lists if it should be editable.

### 6.4 Case study storytelling sequence

A case study should usually move through:

1. Premise
2. Business or category problem
3. Central idea
4. Design or content system
5. Important details
6. Application in the real world
7. Scope
8. Next relevant action

Do not force every project into identical section names. The structure should reflect the actual work.

### 6.5 Image treatment

- Use high resolution images.
- Keep correct aspect ratios.
- Provide useful alt text.
- Use lazy loading below the fold.
- Keep raw project evidence recognisable.
- Improve backgrounds, light, and presentation only when it makes the design easier to understand.
- Generated or edited product imagery must look physically plausible and should not feel synthetic.
- Do not fabricate business outcomes.

---

## 7. EggBreak case study memory

EggBreak is a flagship example of how Modern Day creates an entire brand world, not only a logo or pack.

### 7.1 What Modern Day designed

- Brand strategy
- Name expression and identity
- EB symbol
- Wordmark
- Omelette lockup
- Bottle structure
- Bottle grip
- Vertical egg count system
- Packaging family
- Brochure
- Character family
- Stationery
- Refrigerated fleet graphics
- Both truck sides
- Cab and front treatment
- Rear doors

### 7.2 Logo logic

- The egg symbol is tilted.
- The left side reads as E.
- The cracked right side reads as B.
- Together the shape becomes EB.
- The G contains a break detail.
- The complete EggBreak wordmark can sit across an omelette shaped ground.
- The wordmark should cross the omelette shape rather than looking trapped inside it.

Do not show a straight upright egg when explaining the EB symbol.

### 7.3 Bottle story

The bottle was designed as part of the product experience.

Important evidence:

- 3D work in progress structure studies
- Full grip for a full bottle
- Side handle and grip study
- Vertical count scale that explains how many eggs remain
- Measure detail
- Open, shake, and pour behavior

### 7.4 Character family

EggBreak uses a family of egg characters to communicate personality and product behavior. Each character should feel distinct. They are a brand system, not a decorative mascot collection.

### 7.5 Fleet

Prefer the 3D fleet presentation. Show the truck as a complete moving brand environment. Do not show only one side. Do not restore the removed Side A and Side B explanation section.

### 7.6 Image art direction

When generating new EggBreak product placement imagery:

- Use clean, believable studio or kitchen light.
- Keep the real packaging artwork accurate.
- Use eggshell fragments sparingly when aesthetics need context.
- Do not introduce visible yolk or raw egg unless Dharma explicitly requests it.
- Avoid obvious AI artifacts, impossible label geometry, duplicated objects, false reflections, or unreadable typography.

Approved local EggBreak asset groups live in:

- `public/images/egg-break`
- `public/images/egg-break/v2`
- `public/images/egg-break/v3`

---

## 7A. Ghar Culture case study memory

Ghar Culture is a presentation led identity exhibition. Its story must follow the design process in the approved brand presentation:

1. The permanence of marble
2. Indian visual memory and the moodboard
3. Sketch exploration
4. Wordmark construction
5. Monogram reduction
6. Deep red, black, and warm white palette
7. Marble object applications
8. The wider image world

The writing should build from conviction to proof, with the same narrative momentum as EggBreak. Approved central lines include “Built to outlive the moment” and “Some materials do not follow time. They hold it.”

The master Ghar Culture mark lives at `public/images/ghar-culture/ghar-culture-logo.png`. Use the supplied artwork rather than recreating the logo with live type. Preserve its proportions. White versions on deep red and black may be produced with a simple monochrome inversion because the source mark is black and transparent.

Presentation evidence lives in `public/images/ghar-culture/deck`. Keep those frames in their original narrative order. The local case study palette is deep red `#800006`, black `#0b0b0b`, warm white `#f2f0eb`, and a quiet stone neutral. Do not turn the project into a generic luxury marble story or invent commercial outcomes.

## 7B. Design Commune case study memory

Design Commune is a custom identity exhibition built around one central idea: two initials become one continuous architectural space. The case study must preserve this narrative order:

1. D and C as one connected monogram
2. Exploration across initials, architectural forms, community, and infinity
3. Construction from one proportional module
4. A continuous path through the mark
5. Negative space interpreted as rooms
6. The mark extended into a repeatable pattern system
7. The full lockup, red, black, and warm white identity
8. Stationery as proof of the system in use

The signature interaction is the live mark and its modular construction, not a slideshow of supplied mockups. Use the supplied vector lockup for final logo applications. Preserve the local palette of signal red `#cc0017`, black `#090909`, and warm white `#f3f2ee`. Approved central lines include “Two initials. One continuous space.” and “Designing together. Growing together.” Do not reduce the identity to a generic infinity symbol or invent business outcomes.

---

## 7C. Sleeping Tiger case study memory

Sleeping Tiger is a custom Design exhibition for a premium accessible sleepwear brand. Its central tension is strength at rest: powerful without aggression, warm without becoming childish, and distinctive without placing the mascot on every surface.

The case study must preserve this story:

1. Category conventions and visual research
2. Pencil sketch, stripe rhythm, vector refinement, and facial details
3. Thick, cosy wordmark development
4. Three placement trials shown explicitly as work in progress
5. The approved final orange wordmark with blue sleeping tiger
6. The matcha and strawberry launch collection
7. Woven label, frosted inner bag, hang tag, outer bag, door hanger, and stickers

The final logo source of truth is the transparent high resolution artwork at `public/images/sleeping-tiger/logo-color-hq.png`. The three placement studies named Midnight Curl, Hidden Prowl, and Resting Stripe are development routes, not final or alternate logos. Do not describe them otherwise.

The local identity palette is Sunset Dream `#FC5F1A`, Deep Slumber `#0261D5`, Midnight Black `#000000`, and Pillow Cloud `#FFFFFF`. The launch collection adds a restrained matcha green and dusty strawberry pink.

Keep branding deliberate. The clothing should be carried by colour, cut, piping, pockets, and material. Put the identity on the neck label, hang tag, bags, door hanger, and sticker sheet. The warm kraft craft bag is a distinct application and should appear in its own chapter. Do not add the logo or tiger to unrelated props, bedding, mugs, or every available surface. The complete supplied sticker sheet belongs together in its own section and should not be remixed into invented merchandise.

## 7D. Grey Rose Interiors case study memory

Grey Rose Interiors is a custom Digital exhibition built around making the founder visible as the design expert behind the studio. The story uses sixteen reels in four equal chapters:

1. Point of view and design judgment
2. International exposure in Bali and China
3. Global sourcing and material intelligence
4. Finished work, values, and trust

Use the supplied Grey Rose logo artwork rather than recreating the mark with live type. The local palette is dusty rose `#A08B8B`, Baltic Sea `#1F1D22`, brown `#715B44`, silver, and warm white. The opening view leads with the China travel film because it is the most immediate expression of the founder’s curiosity and global eye. Selected static creatives appear before the identity and reel chapters. Show every creative sheet at its complete portrait ratio, label it only by month, and do not link the artwork to Instagram. The reel story still follows four equal chapters, beginning with Aesthetics in three words. Reel cards must load as poster images and create a video player only after the visitor chooses to play. Travel footage must read as evidence of observation, market exposure, and sourcing knowledge rather than lifestyle content. Do not invent audience growth, engagement, leads, or commercial outcomes.

## 7E. Malle campaign photography case study memory

Malle is a custom Digital exhibition for a photography only mandate. The case study is built around one collection moving through two sporting worlds:

1. Golf uses natural sunset light, long shadows, open space, and a quiet editorial pace.
2. Pickleball uses court green, bright pink, graphic paddles, group energy, and active frames.
3. The transition between the two is a meaningful change of ends, not a generic gallery break.

Keep the scope truthful: shoot direction, photography, and natural light. Do not imply that Modern Day created the Malle identity, clothing, styling, social strategy, or commercial outcomes. Use the supplied edited photographs from the Malle shoot and preserve their natural proportions where the layout allows.

## 7F. ModCon social media case study memory

ModCon is a custom Digital exhibition for an eleven reel social media campaign. The content system has four clear roles:

1. Four files named for Manikanta form the founder led chapter and establish trust, design judgment, location perspective, and conviction around Tukkuguda.
2. Three city context reels explain Hyderabad through connectivity, access, and the emerging South Hyderabad growth corridor.
3. Three project stories cover biophilic living, the Tukkuguda proposition, and ModCon One as a commercial opportunity.
4. The office inauguration film is a company moment that makes culture and progress visible.

Keep every source reel in portrait format and preserve its original edit, subtitles, and audio. Use local, web optimised copies with poster images for reliable playback. Do not invent audience growth, engagement, leads, project performance, or property returns. The central idea is that ModCon social content should show why the company, place, and project matter, not only what is being built.

## 7G. DAT digital presence case study memory

DAT is a custom Digital exhibition for a spatial technology company. Modern Day created the company website and a compact social media system made from four carousel stories and three short reels. The case study should make complex technology feel immediate through controlled motion, precise writing, dimensional imagery, and a dark cyan led visual world.

Preserve every supplied carousel at its original 4:5 ratio. Animated frames and embedded video slides must remain in motion. Visitors can let each sequence advance or choose an individual frame. Keep reels in their original format and audio, with deliberate playback controls. Present `https://deftntact.com/` as website work designed and built by Modern Day. Do not invent audience growth, engagement, leads, product performance, or commercial outcomes.

## 7H. SLAAB identity exploration case study memory

SLAAB, short for Surface Lab, is a surface visualization technology company. The case study is an identity exploration, not a selected or finalized brand identity. State clearly that the client did not select a final logo and never rename the four directions as final or alternate logos.

Preserve the five routes and their original logic:

1. An octagonal base cut into a bold angular S, expressing stability, structure and movement.
2. Three stacked isometric prisms forming an S, expressing dimensional layering, comparison and visualization.
3. A skewed slab container with a teal interruption through the L, using tension and connection to make the wordmark memorable.
4. A rounded wordmark with a gradient surface bar above the double a, expressing a slab, depth, flow and precision.
5. A complete sharp cut wordmark where the S, L and B feel engineered from slabs and both A forms contain square counters.

Every route has its own mockup sequence. Keep those applications inside the corresponding route and preserve their presentation order. The later studies are evidence of how the ideas were tested across app icons, interfaces, social systems, spatial displays, objects, print and motion. Present every supplied frame at a useful size and original proportion. The page is mobile first and must dismantle the landscape presentation into one idea, image and explanation at a time. Do not embed the PDFs as small slides or invent approval, performance, adoption, or commercial outcomes.

## 8. Services architecture

### 8.1 Overview routes

- `/services`
- `/services/design`
- `/services/digital`

### 8.2 Design capabilities

- `/services/design/brand-strategy`
- `/services/design/verbal-identity`
- `/services/design/visual-identity`
- `/services/design/experience-rollout`
- `/services/design/governance`

### 8.3 Digital capabilities

- `/services/digital/social-strategy`
- `/services/digital/editorial-systems`
- `/services/digital/content-production`
- `/services/digital/campaigns-advertising`
- `/services/digital/community-intelligence`

Service writing must always connect a capability to a business effect. Make the plain service obvious before using strategic language.

Three.js graphs are allowed on service pages when they make a relationship easier to understand. Do not add them automatically to every page.

---

## 9. About and founder story

Routes:

- `/about`
- `/about/dharma-teja`

Modern Day was founded independently in Hyderabad in 2022. The About page uses two meaningful studio facts: more than 85 companies helped, and the 2022 founding year. Do not restore campaign view counts, completed mandate counts, or “Two practices. One standard.” as statistic cards.

The founder portrait caption, “How we show up” heading, and “Start with the business change” prompt are intentional reading hierarchy, not utility captions. Keep them comfortably legible on desktop and mobile.

Founder positioning:

- Dharma Teja is adventurous, hands on, demanding of the work, and intensely curious.
- Skydiving, skiing, mountains, and exploration are useful evidence of temperament.
- The story should connect adventure to how he thinks and works.
- Do not turn the page into a list of brands.
- Do not invent career milestones or unverifiable achievements.
- Hype should come from specificity and character, not unsupported claims.

Founder images live in `public/images/founder`.

---

## 10. Contact experience

### Public fee guide

`/pricing` is a public fee guide for prospective clients, made public at Dharma’s request on 15 September 2026 so visitors can assess fit before enquiring. Include it in main navigation, the footer and sitemap. Allow search indexing; do not restore the former noindex directive or response header. Its custom page and scoped styles live in `src/pricing-page.jsx` and `src/pricing-page.css`.

Owner supplied fees (15 September 2026): logo design ₹1,00,000 to ₹1,50,000 per project; complete branding approximately ₹1,80,000; packaging ₹1,00,000 to ₹2,00,000 per project; social media ₹80,000 to ₹3,00,000 per month; Dharma Teja shoots ₹80,000 to ₹1,20,000 per day; lead photographer or cinematographer ₹40,000 to ₹50,000 per day; iPhone shoots ₹15,000 per day. Monthly social and daily shoot billing were explicitly confirmed. Website design and development costs ₹1,00,000 to ₹3,00,000 per project: ₹1,00,000 covers a focused business website of up to five pages, with fees increasing as structure and functionality become more complex. Confirm features, content, hosting, domain and maintenance in the proposal. The Websites section links to the verified live example https://www.thedesigncommune.com with a homepage preview, distinct from the Design Commune identity case study.

The Design introduction links to Sleeping Tiger with “Enter the world of Sleeping Tiger.” Keep that link beside the whole Design introduction, not below Packaging. Digital links to DAT. Production links to Malle. Keep the Malle scope truthful as photography only. Explain what each fee covers; describe editing briefly as clean and restrained, with scope and fee agreed in the brief.

Do not publish individual poster, creative or carousel fees. Keep Design, Digital and Production distinct. Position social media around the whole agreed presence and meaningful impact. Do not invent editing fees, guaranteed sales, unlimited deliverables, tax treatment or commercial terms. Confirm precise inclusions in the project proposal.

Route: `/contact`

The contact page should feel like the beginning of a working relationship, not a generic lead form. Keep the project brief useful and inviting.

Primary action language:

- Start a conversation
- Build the next one

Do not create pressure through fake urgency, countdowns, or invented capacity claims.

---

## 11. Technical architecture

### 11.1 Stack

| Layer | Technology |
|---|---|
| Build | Vite 6 |
| UI | React 19 |
| Motion | GSAP and ScrollTrigger |
| 3D | Three.js |
| Auth, database, storage | Supabase |
| Primary hosting | Vercel |
| Secondary hosting | OpenAI Sites |

### 11.2 Important files

| File | Responsibility |
|---|---|
| `src/main.jsx` | Router, primary pages, custom case studies, service content, Three.js scenes |
| `src/styles.css` | Global design system and all page styles |
| `src/supabase.js` | Supabase client, public asset helper, case study fetch hook |
| `src/inline-editor.jsx` | Authenticated in page editing toolbar |
| `src/cms.jsx` | Studio login and case study launcher |
| `src/project-catalog.json` | Imported original project data |
| `src/project-copy.js` | Rewritten legacy project summaries and wing assignments |
| `scripts/fetch-project-catalog.mjs` | Imports project catalog from the old site |
| `scripts/seed-supabase.mjs` | Seeds selected cases and uploads images |
| `supabase/migrations/202607310001_case_study_cms.sql` | Database, policies, and storage bucket |
| `public/sitemap.xml` | SEO route listing |
| `index.html` | Global metadata, fonts, social cards, structured data |
| `vercel.json` | SPA rewrite for Vercel |
| `server/index.js` | SPA fallback for Sites |
| `.openai/hosting.json` | Existing Sites project identifier |

### 11.3 Router

Routing is currently handled manually in `src/main.jsx` with `window.location.pathname`. There is no React Router dependency.

When adding a route:

1. Add the page component.
2. Add the exact route in `Router()`.
3. Add `Seo` title, description, and canonical path.
4. Add the route to `public/sitemap.xml` when public.
5. Verify Vercel and Sites SPA fallbacks.
6. Test direct navigation and refresh.

### 11.4 Build chunks

`vite.config.js` separates React, Supabase, motion, and Three.js into manual chunks. Preserve this unless bundle analysis proves a better structure.

---

## 12. Supabase editing model

### 12.1 Product decision

The CMS is not a generic case study builder. New case studies are custom coded.

After an admin signs in at `/studio`, they choose an existing case study and edit it directly on its real page.

### 12.2 Editable projects

- EggBreak
- Eagle Stone
- The Sanctuary
- Ghar Culture
- Helios Stone Social
- Agartha Social

Keep the lists in `src/cms.jsx` and `src/inline-editor.jsx` synchronized.

### 12.3 Editing behavior

- Text with `data-cms-field` becomes content editable after authentication.
- Clicking an image with `data-cms-image` opens image replacement.
- Shift clicking an image marks it for removal.
- Save changes upserts the record by slug.
- Removed gallery entries are filtered before saving.
- Public pages fetch only records with `status = published`.

### 12.4 Database tables

`cms_users`

- Stores the authenticated user IDs allowed to edit.

`case_studies`

- `id`
- `slug`
- `title`
- `category`
- `year`
- `location`
- `summary`
- `brief_title`
- `brief_body`
- `overview_title`
- `overview_body`
- `scope`
- `theme`
- `status`
- `hero_image_path`
- `gallery`
- timestamps

### 12.5 Storage

Bucket: `case-study-images`

- Public read access through public URLs
- Authenticated editor upload, update, and delete policies
- Maximum file size is 10 MB
- Allowed formats are JPEG, PNG, WebP, and AVIF
- Long cache control is used for uploaded assets

### 12.6 Security

- Never expose the Supabase service role key.
- Never place the service role key in a `VITE_` variable.
- The publishable key and project URL live in environment configuration.
- Row level security must remain enabled.
- Editing permission depends on membership in `cms_users`.
- Do not weaken policies to solve an editor bug.

---

## 13. SEO requirements

Every public page must have:

- A unique title
- A useful meta description
- A canonical path
- A sitemap entry
- A clear page heading
- Semantic section structure
- Useful image alt text
- Internal links to the relevant practice and next action

The canonical domain is `https://moderndaymarketingagency.com`, while the Vercel deployment remains available at `https://modern-day.vercel.app`.

Global structured data describes Modern Day as a ProfessionalService in Jubilee Hills, Hyderabad.

Do not keyword stuff. Write for decision makers first.

---

## 14. Motion and interaction

### 14.1 Approved libraries

- Three.js for purposeful spatial systems
- p5.js for the homepage threshold field and similarly restrained generative studies
- GSAP for orchestrated transitions and scroll reveals
- Native CSS transitions for small state changes

### 14.2 Motion principles

- One orchestrated motion idea per section is usually enough.
- Cursor response should be subtle and smooth.
- Hover states must also have keyboard focus states.
- Mobile must not depend on hover.
- Respect `prefers-reduced-motion`.
- Dispose of Three.js geometry, materials, textures, renderers, listeners, and animation frames during cleanup.
- Cap renderer pixel ratio to protect performance.

### 14.3 Performance

- Lazy load below fold images.
- Compress large images.
- Avoid loading project imagery on the homepage.
- Keep Three.js scenes geometrically simple.
- Dynamically import p5.js so it does not increase the initial route bundle.
- Do not add another animation library without a strong reason.

---

## 15. Responsive quality standard

Primary breakpoints in the current stylesheet:

- Desktop above 900 px
- Tablet at 900 px and below
- Mobile at 620 px and below

Required visual checks before publishing:

| Viewport | Purpose |
|---|---|
| 1920 by 1080 | Detect viewport based display type collisions and wide layout gaps |
| 1440 by 900 | Standard desktop composition |
| 1024 by 768 | Tablet and compact laptop behavior |
| 390 by 844 | Current mobile baseline |

At each size confirm:

- No text overlaps any other text.
- No text sits unintentionally over imagery or Three.js geometry.
- Controls remain visible and usable.
- The header and menu fit.
- Large words remain inside their columns.
- Case study captions do not crowd images.
- Horizontal overflow is absent.
- Page sections begin and end cleanly.

---

## 16. Development and deployment

### 16.1 Local commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

Project catalog import:

```sh
npm run fetch:projects
```

Supabase seed:

```sh
npm run seed:cms
```

### 16.2 Environment variables

Required in local and hosting environments:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Terminal only for seeding:

```text
SUPABASE_SERVICE_ROLE_KEY
```

Do not place real values in this document or commit them to Git.

### 16.3 Vercel

- Account: `moderdaymarketing`
- Project: `modern-day`
- Production alias: `https://modern-day.vercel.app`
- `.vercel/project.json` contains the local project link.
- `vercel.json` rewrites all routes to `index.html` for the single page application.

### 16.4 OpenAI Sites

- Existing project ID is stored in `.openai/hosting.json`.
- Save and deploy only source that has been committed and pushed to the configured Sites repository.
- Secondary production URL is `https://modern-day-hyderabad.dharmateja29.chatgpt.site`.

### 16.5 Publishing checklist

1. Build locally.
2. Run `git diff --check`.
3. Review desktop and mobile screenshots.
4. Test the exact interaction changed.
5. Test direct route refresh where relevant.
6. Commit only intended files.
7. Deploy to Vercel production.
8. Verify the Vercel alias returns HTTP 200.
9. Push the same commit to the Sites repository.
10. Save and deploy the Sites version.
11. Confirm deployment success.

Do not include unrelated files such as temporary work folders in commits.

---

## 17. Future change process

### Purpose

Keep every new page and change consistent with the Modern Day museum concept, the two practice architecture, and the established technical system.

### Responsibility

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Creative direction | Codex or assigned designer | Dharma Teja | This playbook and existing pages | Future contributors |
| Copy direction | Codex or writer | Dharma Teja | Current approved copy | Designer and developer |
| Implementation | Codex or developer | Dharma Teja | Existing components and tokens | Future contributors |
| Content truth | Dharma Teja | Dharma Teja | Source material | Codex or writer |
| Deployment | Codex or developer | Dharma Teja | Vercel and Sites configuration | Dharma Teja |

### Standard workflow

```text
Request
  ↓
Identify the real visitor goal
  ↓
Check this playbook and current page patterns
  ↓
Choose the correct wing and route
  ↓
Write the smallest useful story
  ↓
Design one meaningful visual idea
  ↓
Build with existing tokens and components
  ↓
Review desktop and mobile
  ↓
Correct collisions, density, and unclear language
  ↓
Build, commit, deploy, and verify
  ↓
Update this playbook if a new permanent rule was established
```

### Exceptions

| Situation | Response |
|---|---|
| A requested visual conflicts with readability | Preserve readability and explain the tradeoff |
| A new project fits both wings | Choose the wing based on the primary client mandate and clarify the other contribution inside the case study |
| Source information is incomplete | Use restrained copy and mark facts for confirmation rather than inventing details |
| An old project has weak copy | Rewrite it in the current voice before featuring it |
| Mobile becomes too text heavy | Cut secondary copy before shrinking type or stacking dense blocks |
| A Three.js idea has no clear meaning | Remove it or replace it with a simpler visual explanation |
| CMS data is missing | Preserve custom coded fallback content |
| Supabase save fails | Diagnose schema and policy mismatch. Do not weaken security |

---

## 18. Do and do not summary

### Do

- Treat the site as a museum and each case study as an exhibition.
- Make the two practices immediately understandable.
- Build custom case study pages.
- Keep work index pages image free.
- Put project imagery inside the case study.
- Use Three.js only when it communicates meaning.
- Keep text in its own clear area.
- Reduce copy on mobile.
- Use the supplied Modern Day logo.
- Verify every public claim.
- Keep “Choose an entrance.”
- Test at 1920 by 1080 before publishing large display type.
- Update this file when a permanent decision changes.

### Do not

- Do not turn the homepage into a project grid.
- Do not use a generic agency template.
- Do not create a generic CMS form for new case studies.
- Do not put large text over important visuals.
- Do not allow display type to collide with supporting copy.
- Do not use forced interface language.
- Do not restore “Move through the system.”
- Do not overuse hyphens or dash punctuation in visible copy.
- Do not add decorative 3D scenes without meaning.
- Do not expose secret keys.
- Do not fabricate outcomes, clients, or founder achievements.
- Do not make the mobile page a wall of text.

---

## 19. Final review question

Before approving any page, ask:

> Does this feel like a carefully curated Modern Day exhibition, or does it feel like another agency website?

If the answer is “another agency website,” the work is not finished.
