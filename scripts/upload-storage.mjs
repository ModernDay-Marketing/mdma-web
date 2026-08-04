/**
 * Upload local media assets to Supabase Storage.
 *
 * These folders are kept out of git (see .gitignore) and hosted in Supabase
 * Storage instead. This script walks each target directory, uploads every
 * media file (preserving the folder structure), and writes a manifest mapping
 * each storage key to its public URL.
 *
 * Usage:
 *   node --env-file=.env.local scripts/upload-storage.mjs            # upload
 *   node --env-file=.env.local scripts/upload-storage.mjs --dry-run  # preview only
 *   npm run upload:storage            # same as the first, via package.json
 *   npm run upload:storage -- --dry-run
 *
 * Required env (put SUPABASE_SERVICE_ROLE_KEY in .env.local — it is gitignored):
 *   VITE_SUPABASE_URL            e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY    service_role key (NOT the publishable/anon key)
 *
 * The service_role key is required because Storage writes and bucket creation
 * bypass RLS. Never commit it or expose it to the browser.
 */

import { createClient } from '@supabase/supabase-js';
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';

// ---------------------------------------------------------------------------
// Config — adjust targets/buckets here.
// ---------------------------------------------------------------------------

const TARGETS = [
  // Site media. Keys mirror the site's `/images/...` URLs, so a stored file
  // ends up at bucket `site-media` under `images/<...>`.
  { localDir: 'public/images', bucket: 'site-media', prefix: 'images' },

  // Working artifacts / QA archive. Keys are relative to `work/`.
  { localDir: 'work', bucket: 'work-archive', prefix: '' }
];

// Only files with these extensions are uploaded. This naturally skips the
// Chrome-profile blobs, caches, and other binary junk under work/.
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
const VIDEO_EXT = ['.mp4', '.mov', '.webm', '.m4v'];
const DOC_EXT = ['.pdf'];
const ARCHIVE_EXT = ['.tar.gz', '.tgz', '.zip']; // set INCLUDE_ARCHIVES=false to skip

const INCLUDE_ARCHIVES = process.env.INCLUDE_ARCHIVES !== 'false';

// Directory names to skip entirely (Chrome profile / build caches under work/).
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'chrome-desktop', 'component_crx_cache',
  'optimization_guide_model_store', 'WasmTtsEngine', 'GPUCache',
  'ShaderCache', 'GraphiteDawnCache', 'Code Cache'
]);

const CONCURRENCY = 6;
const MAX_RETRIES = 3;
const CACHE_CONTROL = '31536000'; // 1 year — assets are content-addressed by path

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mov': 'video/quicktime',
  '.webm': 'video/webm', '.m4v': 'video/x-m4v', '.pdf': 'application/pdf',
  '.tar.gz': 'application/gzip', '.tgz': 'application/gzip', '.zip': 'application/zip'
};

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const DRY_RUN = process.argv.includes('--dry-run');

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Credentials are only needed for a real upload; --dry-run just lists files.
if (!DRY_RUN && (!url || !serviceKey)) {
  console.error(
    'Missing env. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Add SUPABASE_SERVICE_ROLE_KEY to .env.local (gitignored) and run:\n' +
    '  node --env-file=.env.local scripts/upload-storage.mjs'
  );
  process.exit(1);
}

const client = (!DRY_RUN && url && serviceKey)
  ? createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
  : null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ALLOWED_EXT = [
  ...IMAGE_EXT, ...VIDEO_EXT, ...DOC_EXT,
  ...(INCLUDE_ARCHIVES ? ARCHIVE_EXT : [])
];

function matchExt(name) {
  const lower = name.toLowerCase();
  // longest match first so `.tar.gz` beats `.gz`-less checks
  return [...ALLOWED_EXT].sort((a, b) => b.length - a.length).find(ext => lower.endsWith(ext));
}

function contentTypeFor(ext) {
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

function fmtBytes(n) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

// Recursively collect uploadable files under `dir`.
async function walk(dir, base, acc) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // .DS_Store, dotfiles
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full, base, acc);
    } else if (entry.isFile()) {
      const ext = matchExt(entry.name);
      if (!ext) continue;
      const rel = relative(base, full).split(sep).join(posix.sep); // POSIX keys
      acc.push({ full, rel, ext });
    }
  }
  return acc;
}

async function ensureBucket(name) {
  const { error } = await client.storage.getBucket(name);
  if (!error) return;
  const { error: createErr } = await client.storage.createBucket(name, {
    public: true
  });
  // Ignore "already exists" races; surface anything else.
  if (createErr && !/already exists/i.test(createErr.message || '')) {
    throw new Error(`Could not create bucket "${name}": ${createErr.message}`);
  }
  console.log(`  + created public bucket "${name}"`);
}

async function uploadOne(bucket, key, file) {
  const bytes = await readFile(file.full);
  const contentType = contentTypeFor(file.ext);
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const { error } = await client.storage.from(bucket).upload(key, bytes, {
      upsert: true,
      cacheControl: CACHE_CONTROL,
      contentType
    });
    if (!error) {
      const { data } = client.storage.from(bucket).getPublicUrl(key);
      return { bytes: bytes.length, publicUrl: data.publicUrl };
    }
    lastErr = error;
    if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 500 * attempt));
  }
  throw new Error(lastErr?.message || 'upload failed');
}

// Run tasks with a bounded worker pool.
async function pool(items, worker, size) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, run));
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const manifest = [];
let totalFiles = 0;
let totalBytes = 0;
let uploaded = 0;
let failed = 0;

console.log(DRY_RUN ? '=== DRY RUN (no uploads) ===' : '=== Uploading to Supabase Storage ===');
if (INCLUDE_ARCHIVES) console.log('(archives included; set INCLUDE_ARCHIVES=false to skip)');

for (const target of TARGETS) {
  const base = target.localDir;
  if (!existsSync(base)) {
    console.log(`\n[skip] ${base} — not found`);
    continue;
  }

  const files = await walk(base, base, []);
  const dirBytes = (await Promise.all(files.map(async f => (await stat(f.full)).size)))
    .reduce((a, b) => a + b, 0);
  totalFiles += files.length;
  totalBytes += dirBytes;

  console.log(`\n[${target.bucket}]  ${base}  →  ${files.length} files, ${fmtBytes(dirBytes)}`);

  if (DRY_RUN) {
    for (const f of files.slice(0, 8)) {
      const key = posix.join(target.prefix, f.rel);
      console.log(`   would upload  ${key}`);
    }
    if (files.length > 8) console.log(`   … and ${files.length - 8} more`);
    continue;
  }

  await ensureBucket(target.bucket);

  let done = 0;
  await pool(files, async (f) => {
    const key = posix.join(target.prefix, f.rel);
    try {
      const res = await uploadOne(target.bucket, key, f);
      uploaded++;
      manifest.push({ bucket: target.bucket, key, bytes: res.bytes, publicUrl: res.publicUrl });
    } catch (err) {
      failed++;
      manifest.push({ bucket: target.bucket, key, error: String(err.message || err) });
      console.error(`   ✗ ${key}: ${err.message || err}`);
    }
    done++;
    if (done % 25 === 0 || done === files.length) {
      process.stdout.write(`\r   uploaded ${done}/${files.length}`);
    }
  }, CONCURRENCY);
  process.stdout.write('\n');
}

// ---------------------------------------------------------------------------
// Summary + manifest
// ---------------------------------------------------------------------------

console.log('\n---------------------------------------------');
console.log(`Discovered: ${totalFiles} files, ${fmtBytes(totalBytes)}`);
if (!DRY_RUN) {
  console.log(`Uploaded:   ${uploaded}`);
  if (failed) console.log(`Failed:     ${failed}`);

  await mkdir('tmp', { recursive: true });
  const manifestPath = join('tmp', 'storage-upload-manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest:   ${manifestPath}`);
}
console.log('Done.');

if (failed) process.exitCode = 1;
