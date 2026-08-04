import { mkdir, writeFile } from 'node:fs/promises';

const posts = [
  'https://www.instagram.com/reel/DJEuc4Gqnbz/',
  'https://www.instagram.com/p/DY2CLUdE4TC/',
  'https://www.instagram.com/reel/DYwzCfdzw_8/'
];

await mkdir(new URL('../public/images/work/helios/', import.meta.url), { recursive: true });

for (const [index, post] of posts.entries()) {
  const html = await fetch(post).then(response => response.text());
  const imageUrl = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
  if (!imageUrl) throw new Error(`No public preview image found for ${post}`);
  const bytes = Buffer.from(await fetch(imageUrl).then(response => response.arrayBuffer()));
  await writeFile(new URL(`../public/images/work/helios/helios-${String(index + 1).padStart(2, '0')}.jpg`, import.meta.url), bytes);
}

console.log(`Saved ${posts.length} Helios social previews.`);
