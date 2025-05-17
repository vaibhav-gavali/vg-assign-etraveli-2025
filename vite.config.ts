/// <reference types="vitest" />
// means that the test property isn't recognized in your vite.config.ts file — 
// this usually happens because Vitest types aren't included in your Vite config environment.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  // Testing Setup
  test: {
    include: ['src/**/*.test.{js,ts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/testing/setup.ts',
  },
  // Github deployment Setup
  base: '/vg-assign-etraveli-2025/'
})
