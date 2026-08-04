import { writeFile } from 'node:fs/promises';

const origin = 'https://www.modernday.in';
const sitemap = await fetch(`${origin}/sitemap.xml`).then(response => response.text());
const urls = [...sitemap.matchAll(/<loc>(https:\/\/www\.modernday\.in\/project\/[^<]+)<\/loc>/g)].map(match => match[1]);

const decode = value => (value || '')
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#x27;', "'")
  .replaceAll('&#39;', "'")
  .replaceAll('&nbsp;', ' ');

const cleanTitle = value => decode(value)
  .replace(/\s*-\s*ModernDay\s*$/i, '')
  .replace(/\s+/g, ' ')
  .trim();

const records = await Promise.all(urls.map(async sourceUrl => {
  const html = await fetch(sourceUrl).then(response => response.text());
  const sourceSlug = new URL(sourceUrl).pathname.split('/').filter(Boolean).at(-1);
  const slug = sourceSlug === 'sanctuary' ? 'the-sanctuary' : sourceSlug;
  const title = cleanTitle(html.match(/<meta property="og:title" content="([^"]*)"/i)?.[1])
    || sourceSlug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  const summary = decode(html.match(/<meta (?:name|property)="(?:description|og:description)" content="([^"]*)"/i)?.[1])
    .replace(/\s+/g, ' ')
    .trim();
  const imageMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[A-Za-z0-9_-]+\.(?:jpe?g|png|webp|avif)(?:\?[^"' <]*)?/gi)];
  const seen = new Set();
  const images = imageMatches
    .map(match => decode(match[0]).replace(/\?.*$/, ''))
    .filter(url => !url.includes('/2kQBhAiKwLeCa8xRZPpYCvmcmgc.png'))
    .filter(url => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    })
    .slice(0, 30)
    .map((path, index) => ({ path, alt: `${title} project image ${index + 1}`, caption: '' }));

  return {
    slug,
    title,
    sourceUrl,
    category: '',
    year: '',
    location: 'India',
    summary,
    brief_title: 'Project brief',
    brief_body: summary,
    overview_title: 'Project overview',
    overview_body: '',
    scope: [],
    theme: slug === 'sanctuary' ? 'sanctuary' : slug === 'eagle-stone' ? 'eagle-stone' : 'default',
    status: 'published',
    hero_image_path: images[0]?.path || '',
    gallery: images
  };
}));

await writeFile(
  new URL('../src/project-catalog.json', import.meta.url),
  `${JSON.stringify(records, null, 2)}\n`
);

console.log(`Fetched ${records.length} projects and ${records.reduce((total, record) => total + record.gallery.length, 0)} unique image references.`);
