<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { links } from '#lib/data';
	import { families } from '#lib/families';
	import { goToForm } from '#lib/lead-state.svelte';
	import { familyUrl, homeUrl, staticUrl } from '#lib/paths';

	let scrolled = $state(false);
	let hidden = $state(false);
	const path = $derived(page.url.pathname.replace(/\.html$/, '').replace(/\/+$/, '').split('/').pop() ?? '');

	onMount(() => {
		let last = window.scrollY;
		const onScroll = () => {
			const y = window.scrollY;
			scrolled = y > 24;
			// En escritorio el header (con su CTA) es el botón persistente: nunca se oculta.
			const mobile = window.innerWidth < 768;
			if (mobile && y > last + 6 && y > 480) hidden = true;
			else if (!mobile || y < last - 6 || y < 480) hidden = false;
			last = y;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] {hidden ? '-translate-y-full' : ''}"
	onfocusin={() => (hidden = false)}
>
	<div class="pps-line h-[2px] w-full"></div>
	<div class="transition-colors duration-500 {scrolled ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'bg-transparent'}">
		<div class="container-x flex h-[4.5rem] items-center justify-between gap-6">
			<a href={homeUrl()} class="flex shrink-0 items-center gap-3" aria-label="Canon · Soluciones de formato amplio">
				<img src={staticUrl('/brand/canon-logo-white.png')} alt="Canon" width="110" height="23" class="h-[22px] w-auto" />
				<span class="hidden border-l border-white/20 pl-3 text-xs font-medium tracking-wide text-white/60 sm:inline">Formato amplio</span>
			</a>

			<nav aria-label="Familias de formato amplio" class="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
				{#each families as f (f.slug)}
					{@const active = path === f.slug}
					<a
						href={familyUrl(f.slug)}
						aria-current={active ? 'page' : undefined}
						class="rounded-full px-4 py-2 text-sm font-medium transition-colors {active ? 'bg-white text-ink' : 'text-white/75 hover:bg-white/10 hover:text-white'}"
					>
						{f.name}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-5">
				<a href={links.support} target="_blank" rel="noopener" class="hidden text-sm text-white/60 transition-colors hover:text-white xl:inline">
					¿Ya tienes un equipo? Soporte
				</a>
				<button class="btn btn-primary min-h-11 px-5 text-sm" onclick={() => goToForm({ position: 'header' })} data-magnetic>
					Solicitar cotización
				</button>
			</div>
		</div>
	</div>
</header>
