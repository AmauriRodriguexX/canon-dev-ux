import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
			sveltekit({
				// GitHub Pages project sites live below /<repository>; BASE_PATH is empty locally.
				paths: { base: process.env.BASE_PATH || '' },
				compilerOptions: {
				// Runes en todo el proyecto (excepto librerías).
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Sitio estático prerenderizado para GitHub Pages y otros hostings estáticos.
			adapter: adapter({ fallback: '404.html' })
		})
	]
});
