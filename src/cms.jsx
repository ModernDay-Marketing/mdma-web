import React, { useEffect, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from './supabase';
import projectCatalog from './project-catalog.json';
import { applyProjectCopy } from './project-copy';

const retired = new Set(['egg-break-packing-designing', 'egg-break-logo', 'fmn', 'pinnaki', 'lazy-chair', 'grey-rose', 'vianproperties', 'spice-hub', 'taamara', 'f45', 'handcraftfoods', 'autumn-leaf', 'greenpark', 'one-cloud', 'ultron']);
const coded = new Set(['egg-break', 'eagle-stone', 'the-sanctuary', 'ghar-culture', 'helios-social', 'agartha-social', 'pandora', 'sasyaa', 'luma', 'millet', 'shriyasom', 'hera', 'sepal', 'briskev', 'vian-valley', 'restaurant-showcase', 'wilderness-retreat', 'orka']);
const featured = [
  { slug:'egg-break', title:'EggBreak', category:'Brand & product design', wing:'Design', summary:'A category new liquid egg brand built from the object out.' },
  { slug:'helios-social', title:'Helios Stone', category:'Social media', wing:'Digital', summary:'A premium social system for a natural stone brand.' },
  { slug:'agartha-social', title:'Agartha', category:'Social media', wing:'Digital', summary:'A nature led content world for an earth home community.' }
];
const allProjects = [...new Map([
  ...featured,
  ...projectCatalog.filter(project => !retired.has(project.slug)).map(applyProjectCopy)
].map(project => [project.slug, {
  slug: project.slug,
  title: project.title === 'Sanctuary' ? 'The Sanctuary' : project.title,
  category: project.category || '',
  wing: project.wing || 'Design',
  summary: project.summary || '',
  sourceUrl: project.sourceUrl || '',
  isCoded: coded.has(project.slug)
}])).values()].sort((a, b) => a.wing.localeCompare(b.wing) || a.title.localeCompare(b.title));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
  }

  return (
    <main className="studio-login">
      <div className="studio-mark"><img src="/brand/modern-day-logo.png" alt="Modern Day" width="647" height="348" /><small>Studio</small></div>
      <form onSubmit={submit}>
        <p>Private edit mode</p>
        <h1>Edit the site<br />on the site.</h1>
        <label>Email<input type="email" value={email} onChange={event => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
        {message && <div className="studio-message error">{message}</div>}
        <button disabled={busy}>{busy ? 'Signing in…' : 'Enter Studio ↗'}</button>
      </form>
    </main>
  );
}

export default function Studio() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [busySlug, setBusySlug] = useState('');

  useEffect(() => {
    let unsubscribe = () => {};
    getSupabase().then(supabase => {
      if (!supabase) return setLoading(false);
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        setLoading(false);
      });
      const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
      unsubscribe = () => data.subscription.unsubscribe();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    let active = true;
    async function syncProjects() {
      setMessage('Syncing projects with Supabase…');
      const supabase = await getSupabase();
      const rows = allProjects.map(project => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        summary: project.summary,
        theme: 'registry',
        status: 'published'
      }));
      const { error: syncError } = await supabase.from('case_studies').upsert(rows, { onConflict: 'slug', ignoreDuplicates: true });
      if (syncError) {
        if (active) setMessage(syncError.message);
        return;
      }
      const { data, error } = await supabase.from('case_studies').select('slug,status,updated_at');
      if (!active) return;
      setRecords(data || []);
      setMessage(error ? error.message : `${allProjects.length} projects synced.`);
    }
    syncProjects();
    return () => { active = false; };
  }, [session]);

  async function setProjectStatus(project, status) {
    if (status === 'draft' && !window.confirm(`Delete ${project.title} from the website? You can restore it later from Studio.`)) return;
    setBusySlug(project.slug);
    setMessage(status === 'draft' ? `Deleting ${project.title}…` : `Restoring ${project.title}…`);
    const supabase = await getSupabase();
    const { error } = await supabase.from('case_studies').update({ status, updated_at: new Date().toISOString() }).eq('slug', project.slug);
    setBusySlug('');
    if (error) return setMessage(error.message);
    setRecords(current => current.map(record => record.slug === project.slug ? { ...record, status } : record));
    setMessage(status === 'draft' ? `${project.title} removed from Work.` : `${project.title} restored to Work.`);
  }

  if (!isSupabaseConfigured) return <main className="studio-loading">Supabase setup required.</main>;
  if (loading) return <main className="studio-loading">Opening Studio…</main>;
  if (!session) return <Login />;

  const statusBySlug = new Map(records.map(record => [record.slug, record.status]));
  const shownProjects = allProjects.filter(project => filter === 'All' || filter === project.wing || (filter === 'Deleted' && statusBySlug.get(project.slug) === 'draft')).filter(project => filter === 'Deleted' || statusBySlug.get(project.slug) !== 'draft');
  const deletedCount = allProjects.filter(project => statusBySlug.get(project.slug) === 'draft').length;

  return (
    <main className="studio-launcher">
      <header><div className="studio-mark"><img src="/brand/modern-day-logo.png" alt="Modern Day" width="647" height="348" /><small>Studio</small></div><button onClick={async () => { const supabase = await getSupabase(); await supabase.auth.signOut(); }}>Sign out</button></header>
      <section className="studio-project-manager">
        <p>Supabase project manager</p>
        <h1>All projects.</h1>
        <div className="studio-project-toolbar">
          <div>{['All', 'Design', 'Digital', 'Deleted'].map(option => <button className={filter === option ? 'active' : ''} onClick={() => setFilter(option)} key={option}>{option}{option === 'Deleted' ? ` ${deletedCount}` : ''}</button>)}</div>
          <span>{message}</span>
        </div>
        <div className="studio-project-list">
          {shownProjects.map((project, index) => {
            const deleted = statusBySlug.get(project.slug) === 'draft';
            return (
              <article className={deleted ? 'deleted' : ''} key={project.slug}>
                <span>{String(index + 1).padStart(2, '0')} / {project.wing} / {project.category}</span>
                <strong>{project.title}</strong>
                <div>
                  {!deleted && <a href={project.isCoded ? `/work/${project.slug}` : project.sourceUrl} target={project.isCoded ? undefined : '_blank'} rel={project.isCoded ? undefined : 'noreferrer'}>Open ↗</a>}
                  <button disabled={busySlug === project.slug} onClick={() => setProjectStatus(project, deleted ? 'published' : 'draft')}>{busySlug === project.slug ? 'Working…' : deleted ? 'Restore' : 'Delete'}</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
