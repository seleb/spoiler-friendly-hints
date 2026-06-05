import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, './src/index.ts'),
			name: pkg.name,
		},
	},
});
