import { resolve } from 'node:path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
	plugins: [
		dts({
			exclude: '**.test.ts',
		}),
	],
	build: {
		lib: {
			entry: resolve(import.meta.dirname, './src/index.ts'),
			name: pkg.name,
		},
	},
});
