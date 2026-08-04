export const projectCopy = {
  'ghar-culture': {
    wing: 'Design', category: 'Brand identity',
    summary: 'Indian visual memory and marble permanence shaped into a contemporary identity for the objects that make a house feel like home.'
  },
  pandora: {
    wing: 'Design', category: 'Brand identity',
    summary: 'A moon led hospitality world that turns mystery, appetite and after dark theatre into desire before the first visit.'
  },
  'egg-break-packing-designing': {
    wing: 'Design', category: 'Packaging',
    summary: 'A new liquid egg ritual made legible through bottle architecture, an intuitive count system and a packaging family built for modern retail.'
  },
  taamara: {
    wing: 'Design', category: 'Brand identity',
    summary: 'Contemporary Indian craft given a quieter form of authority through material restraint, cultural memory and a precise identity system.'
  },
  sasyaa: {
    wing: 'Design', category: 'Brand identity',
    summary: 'Tradition treated as a living material, shaped into a graceful identity system with contemporary rhythm and commercial clarity.'
  },
  'egg-break-logo': {
    wing: 'Design', category: 'Brand identity',
    summary: 'Freshness, convenience and product intelligence compressed into one recognisable identity for an unfamiliar food category.'
  },
  luma: {
    wing: 'Design', category: 'Brand identity',
    summary: 'Sunlight, warmth and architectural restraint turned into a visual system where space itself becomes the clearest expression of the brand.'
  },
  'eagle-stone': {
    wing: 'Design', category: 'Brand identity',
    summary: 'An elemental identity that turns natural strength, precision and perspective into a premium stone brand.'
  },
  shriyasom: {
    wing: 'Digital', category: 'Fashion content',
    summary: 'A designer point of view made wearable through editorial image making, controlled movement and a recognisable rhythm across the screen.'
  },
  'grey-rose': {
    wing: 'Design', category: 'Brand identity',
    summary: 'Softness held by structure, giving a detail driven interior practice the composure and authority of a recognisable design house.'
  },
  'lazy-chair': {
    wing: 'Design', category: 'Brand identity',
    summary: 'A relaxed attitude turned into an ownable identity system, giving a young business character before it had years of recognition.'
  },
  hera: {
    wing: 'Digital', category: 'Product content',
    summary: 'Material, form and finish directed as the argument, creating product imagery that builds desire without hiding behind visual noise.'
  },
  pinnaki: {
    wing: 'Design', category: 'Brand identity',
    summary: 'Heritage carried forward as a source of distinction, not nostalgia, through an identity designed for the next chapter of the business.'
  },
  millet: {
    wing: 'Design', category: 'Brand identity',
    summary: 'Millet snacking moved out of the worthy corner and into contemporary culture through a bright, inclusive identity with shelf energy.'
  },
  sepal: {
    wing: 'Digital', category: 'Product launch',
    summary: 'Engineering translated into desire through a launch narrative that makes utility tangible, value legible and attention easy to carry forward.'
  },
  vianproperties: {
    wing: 'Design', category: 'Property branding',
    summary: 'Place, promise and long term value organised into a property identity that remains coherent from the first hoarding to the final handover.'
  },
  briskev: {
    wing: 'Digital', category: 'Social media',
    summary: 'An editorial engine for electric mobility, combining product education, category signals and cultural relevance to move with a changing market.'
  },
  'spice-hub': {
    wing: 'Design', category: 'Packaging',
    summary: 'Traditional flavour cues reorganised into a modern shelf architecture that protects familiarity while building faster recognition.'
  },
  'the-sanctuary': {
    wing: 'Digital', category: 'Hospitality content',
    summary: 'A visual narrative that made atmosphere the main character and let the venue be felt before it was visited.'
  },
  'one-cloud': {
    wing: 'Digital', category: 'Brand content',
    summary: 'Clear, structured communication for a technology proposition that needed to feel capable, current and human.'
  },
  ultron: {
    wing: 'Digital', category: 'Product content',
    summary: 'A sharper content language that gives consumer electronics the pace and precision the category demands.'
  },
  'vian-valley': {
    wing: 'Digital', category: 'Property content',
    summary: 'A campaign shaped by place that translates a property proposition into a more tangible way of living.'
  },
  'restaurant-showcase': {
    wing: 'Digital', category: 'Hospitality content',
    summary: 'A sensory content system built to make food, space and social energy work as one invitation.'
  },
  greenpark: {
    wing: 'Digital', category: 'Hospitality content',
    summary: 'Hospitality storytelling designed to turn service, setting and small details into a clear reason to choose.'
  },
  'wilderness-retreat': {
    wing: 'Digital', category: 'Destination content',
    summary: 'An immersive visual story that lets landscape, stillness and escape carry the destination’s promise.'
  },
  orka: {
    wing: 'Digital', category: 'Hospitality content',
    summary: 'A lively content language built around the rituals, flavours and everyday theatre of the café.'
  },
  f45: {
    wing: 'Digital', category: 'Campaign content',
    summary: 'Energetic fitness content designed to make community, momentum and participation visible.'
  },
  handcraftfoods: {
    wing: 'Digital', category: 'Food content',
    summary: 'Honest, appetising imagery that brings craft and ingredient quality to the front of the story.'
  },
  'autumn-leaf': {
    wing: 'Digital', category: 'Hospitality content',
    summary: 'A familiar Hyderabad café reframed through the light, texture and easy rhythm its audience already loves.'
  },
  fmn: {
    wing: 'Design', category: 'Brand identity',
    summary: 'A health brand made clearer and more approachable through a direct, energetic visual system.'
  }
};

export function applyProjectCopy(project) {
  const copy = projectCopy[project.slug] || {};
  return {
    ...project,
    ...copy,
    brief_title: copy.brief_title || project.brief_title,
    brief_body: copy.brief_body || copy.summary || project.brief_body
  };
}
