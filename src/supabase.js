import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export function publicAssetUrl(path, fallback = '') {
  if (/^(https?:\/\/|\/)/i.test(path || '')) return path;
  if (!supabase || !path) return fallback;
  return supabase.storage.from('case-study-images').getPublicUrl(path).data.publicUrl;
}

export function useCaseStudy(slug) {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data }) => {
        if (active && data) setRecord(data);
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
    if (!supabase) return;
    let active = true;
    supabase
      .from('case_studies')
      .select('slug')
      .eq('status', 'published')
      .then(({ data, error }) => {
        if (active) setState({ loaded: !error, slugs: error ? [] : (data || []).map(item => item.slug) });
      });
    return () => { active = false; };
  }, []);

  return state;
}
