<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import StickyCta from '#lib/components/StickyCta.svelte';
	import { initMotion } from '#lib/motion';
	import { captureAttribution } from '#lib/analytics';

	let { children } = $props();
	let cleanup: (() => void) | undefined;

	onMount(() => captureAttribution());
	// El movimiento se reinicia en cada página (navegación del lado del cliente)
	afterNavigate(() => {
		cleanup?.();
		cleanup = initMotion();
	});
	beforeNavigate(() => {
		cleanup?.();
		cleanup = undefined;
	});
</script>

<a href="#cotizar" class="sr-only z-[60] rounded-full bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Ir al formulario de cotización</a>
<Header />
<main>
	{@render children()}
</main>
<Footer />
{#key page.url.pathname}
	<StickyCta />
{/key}
