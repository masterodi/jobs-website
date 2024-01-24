import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  server: { port: 3000 },
  plugins: [solid(), solidSvg()],
});
