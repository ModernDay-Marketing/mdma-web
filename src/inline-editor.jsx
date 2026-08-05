import React, { useEffect, useRef, useState } from 'react';
import { getSupabase, publicAssetUrl } from './supabase';

const editableProjects = [
  { slug: 'egg-break', title: 'EggBreak' },
  { slug: 'eagle-stone', title: 'Eagle Stone' },
  { slug: 'the-sanctuary', title: 'The Sanctuary' },
  { slug: 'ghar-culture', title: 'Ghar Culture' },
  { slug: 'helios-social', title: 'Helios Stone / Social' },
  { slug: 'agartha-social', title: 'Agartha / Social' }
];

export default function CaseEditBar({ slug, record, gallery }) {
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const media = useRef([]);

  useEffect(() => {
    let unsubscribe = () => {};
    getSupabase().then(supabase => {
      if (!supabase) return;
      supabase.auth.getSession().then(({ data }) => setSession(data.session));
      const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
      unsubscribe = () => data.subscription.unsubscribe();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    media.current = gallery.map(image => ({
      path: image.path || image.src,
      alt: image.alt || '',
      caption: image.caption || ''
    }));
  }, [record?.id, slug]);

  useEffect(() => {
    if (!session) return;
    document.body.classList.add('cms-editing');
    const fields = [...document.querySelectorAll('[data-cms-field]')];
    fields.forEach(field => {
      field.contentEditable = 'true';
      field.spellcheck = true;
    });

    async function editImage(event) {
      const image = event.target.closest('img[data-cms-image]');
      if (!image) return;
      event.preventDefault();
      const index = Number(image.dataset.cmsImage);

      if (event.shiftKey) {
        media.current[index] = { ...media.current[index], path: '' };
        image.closest('figure, .frame-visual')?.classList.add('cms-image-removed');
        setMessage('Image removed. Save to publish.');
        return;
      }

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        setBusy(true);
        setMessage('Uploading image…');
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
        const path = `${slug}/${Date.now()}-${safeName}`;
        const client = await getSupabase();
        const { error } = await client.storage.from('case-study-images').upload(path, file, {
          cacheControl: '31536000',
          contentType: file.type
        });
        setBusy(false);
        if (error) return setMessage(error.message);
        media.current[index] = { ...media.current[index], path };
        image.src = publicAssetUrl(path);
        setMessage('Image replaced. Save to publish.');
      };
      input.click();
    }

    document.addEventListener('click', editImage, true);
    return () => {
      document.body.classList.remove('cms-editing');
      fields.forEach(field => field.removeAttribute('contenteditable'));
      document.removeEventListener('click', editImage, true);
    };
  }, [session, slug]);

  if (!session) return null;

  async function save() {
    setBusy(true);
    setMessage('');
    const text = name => document.querySelector(`[data-cms-field="${name}"]`)?.innerText.trim() || '';
    const savedGallery = media.current.filter(image => image.path);
    const payload = {
      ...(record?.id ? { id: record.id } : {}),
      slug,
      title: text('title') || record.title,
      category: record.category || '',
      year: record.year || '',
      location: record.location || 'India',
      summary: text('summary'),
      brief_title: text('brief_title'),
      brief_body: text('brief_body'),
      overview_title: text('overview_title'),
      overview_body: text('overview_body'),
      scope: text('scope').split('\n').map(item => item.trim()).filter(Boolean),
      theme: record.theme || 'default',
      status: 'published',
      hero_image_path: savedGallery[0]?.path || '',
      gallery: savedGallery,
      updated_at: new Date().toISOString()
    };
    const client = await getSupabase();
    const { error } = await client.from('case_studies').upsert(payload, { onConflict: 'slug' });
    setBusy(false);
    setMessage(error ? error.message : 'Published.');
  }

  return (
    <aside className="inline-admin">
      <div><strong>Modern Day / Edit mode</strong><span>{message || 'Click text to edit · Click image to replace · Hold Shift and click to remove'}</span></div>
      <select value={slug} onChange={event => { window.location.href = `/work/${event.target.value}`; }} aria-label="Choose case study">
        {editableProjects.map(project => <option value={project.slug} key={project.slug}>{project.title}</option>)}
      </select>
      <a href="/studio">Projects</a>
      <button onClick={save} disabled={busy}>{busy ? 'Working…' : 'Save changes'}</button>
      <button className="inline-signout" onClick={async () => { const client = await getSupabase(); await client.auth.signOut(); window.location.href = '/'; }}>Sign out</button>
    </aside>
  );
}
