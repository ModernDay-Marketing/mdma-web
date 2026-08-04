import { createClient } from '@supabase/supabase-js';
import { readFile, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.');
}

const client = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const studies = [
  {
    slug: 'the-sanctuary',
    title: 'The Sanctuary',
    category: 'Hospitality / Brand content',
    year: '2020',
    location: 'Hyderabad',
    summary: 'The venue was already remarkable. Our task was to frame its light, material and detail so people could feel the place before they arrived.',
    brief_title: 'Show the experience without giving it all away.',
    brief_body: 'The Sanctuary Bar & Kitchen brings global flavours, handcrafted cocktails and a richly layered outdoor setting into one hospitality experience.\n\nRather than treat that experience as a list of amenities, we built the content around a sequence of sensations—scale, conviviality, greenery and a little mystery.',
    overview_title: 'A place told through details.',
    overview_body: 'A captivating visual narrative designed to amplify the venue’s visual ambience and invite a discerning audience into the experience.',
    scope: ['Creative direction', 'Photography', 'Brand marketing', 'Content creation'],
    theme: 'sanctuary',
    status: 'published',
    localDirectory: 'public/images/work/sanctuary'
  },
  {
    slug: 'eagle-stone',
    title: 'Eagle Stone',
    category: 'Brand identity / Natural stone',
    year: '2025',
    location: 'India',
    summary: 'Where nature’s craft becomes identity.',
    brief_title: 'Make strength feel sophisticated.',
    brief_body: 'Eagle Stone curates premium marbles, granites and quartzites from across the world. The identity needed to reflect the depth, strength and artistry embedded in every slab.\n\nThe ambition was larger than recognition. It was to position Eagle Stone as a benchmark of premium quality and timeless design for architects, designers and discerning homeowners.',
    overview_title: 'From natural origin to crafted perfection.',
    overview_body: 'The wider system pairs a confident mark with restrained, immersive communication. Dark mineral tones create authority; warm neutrals reveal material nuance; deep green connects the identity back to the natural world.',
    scope: ['Brand strategy', 'Visual identity', 'Logo system', 'Art direction', 'Applications'],
    theme: 'eagle-stone',
    status: 'published',
    localDirectory: 'public/images/work/eagle-stone'
  }
];

for (const study of studies) {
  const names = (await readdir(study.localDirectory)).filter(name => /\.(jpe?g|png|webp|avif)$/i.test(name)).sort();
  const gallery = [];

  for (const name of names) {
    const extension = extname(name).toLowerCase();
    const contentType = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : extension === '.avif' ? 'image/avif' : 'image/jpeg';
    const storagePath = `${study.slug}/${basename(name)}`;
    const bytes = await readFile(join(study.localDirectory, name));
    const { error } = await client.storage.from('case-study-images').upload(storagePath, bytes, {
      upsert: true,
      cacheControl: '31536000',
      contentType
    });
    if (error) throw error;
    gallery.push({ path: storagePath, alt: `${study.title} project image`, caption: '' });
  }

  const payload = {
    ...study,
    hero_image_path: gallery[0]?.path || '',
    gallery,
    updated_at: new Date().toISOString()
  };
  delete payload.localDirectory;

  const { error } = await client.from('case_studies').upsert(payload, { onConflict: 'slug' });
  if (error) throw error;
  console.log(`Seeded ${study.title} with ${gallery.length} images.`);
}
