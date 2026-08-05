import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let supabaseClient = null;
let supabasePromise = null;

export async function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (supabaseClient) return supabaseClient;
  supabasePromise ??= import('@supabase/supabase-js').then(({ createClient }) => {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    return supabaseClient;
  });
  return supabasePromise;
}

export function publicAssetUrl(path, fallback = '') {
  if (/^(https?:\/\/|\/)/i.test(path || '')) return path;
  if (!isSupabaseConfigured || !path) return fallback;
  return `${supabaseUrl}/storage/v1/object/public/case-study-images/${path}`;
}

export function useCaseStudy(slug) {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    let active = true;

    getSupabase().then(supabase => {
      if (!active || !supabase) return;
      supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()
        .then(({ data }) => {
          if (active && data) setRecord(data);
        });
    });

    return () => {
      active = false;
    };
  }, [slug]);

  return record;
}

export function usePublishedProjectSlugs() {
  const [state, setState] = useState({ loaded: false, slugs: [] });

  useEffect(() => {
    let active = true;
    getSupabase().then(supabase => {
      if (!active || !supabase) return;
      supabase
        .from('case_studies')
        .select('slug')
        .eq('status', 'published')
        .then(({ data, error }) => {
          if (active) setState({ loaded: !error, slugs: error ? [] : (data || []).map(item => item.slug) });
        });
    });
    return () => { active = false; };
  }, []);

  return state;
}
