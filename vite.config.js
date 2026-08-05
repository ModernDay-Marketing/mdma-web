import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps) => deps.filter(dep =>
        !dep.includes('three') &&
        !dep.includes('supabase') &&
        !dep.includes('cms') &&
        !dep.includes('inline-editor') &&
        !dep.includes('modcon') &&
        !dep.includes('dat')
      )
    },
    rollupOptions: {
      output: {
        manualChunks: {
          supabase: ['@supabase/supabase-js'],
          motion: ['gsap', 'gsap/ScrollTrigger'],
          three: ['three'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
});
