import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Actions sets this for project pages; local development stays at '/'.
  base: process.env.VITE_BASE_PATH || '/',
});
