import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  target: 'node16',
  clean: true,
  minify: true,
  sourcemap: false, // Disable source maps to reduce package size
  dts: true,
  shims: true,
});
