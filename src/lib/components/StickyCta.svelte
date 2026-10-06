<script lang="ts">
	import { onMount } from 'svelte';
	import { goToForm } from '#lib/lead-state.svelte';
	import { trackOnce } from '#lib/analytics';

	// CTA persistente móvil (auditoría Solución 2). En escritorio lo cumple el header fijo.
	// Se oculta sobre el formulario, el selector, el cierre y el footer para no tapar controles,
	// y mientras el visitante escribe en un campo.
	let pastHero = $state(false);
	let covered = $state(true);
	let typing = $state(false);
	const visible = $derived(pastHero && !covered && !typing);

	$effect(() => {
		if (visible) trackOnce('cta-sticky', 'commercial_cta_view', { cta_position: 'sticky' });
	});

	onMount(() => {
		const zones = document.querySelectorAll('#cotizar, [data-hide-sticky]');
		const inView = new Set<Element>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) e.isIntersecting ? inView.add(e.target) : inView.delete(e.target);
				covered = inView.size > 0;
			},
			{ threshold: 0.02 }
		);
		zones.forEach((z) => io.observe(z));
		const onScroll = () => (pastHero = window.scrollY > window.innerHeight * 0.9);
		// focusin/focusout también se disparan cuando Svelte retira del DOM un campo con foco
		// (p. ej. al mostrar la confirmación): se difiere la escritura para no mutar estado durante el render.
		const isField = (t: EventTarget | null) => (t as HTMLElement | null)?.matches?.('input, select, textarea') ?? false;
		const onFocusIn = (e: FocusEvent) => queueMicrotask(() => (typing = isField(e.target)));
		const onFocusOut = () => queueMicrotask(() => (typing = isField(document.activeElement)));
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		document.addEventListener('focusin', onFocusIn);
		document.addEventListener('focusout', onFocusOut);
		return () => {
			io.disconnect();
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('focusin', onFocusIn);
			document.removeEventListener('focusout', onFocusOut);
		};
	});
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden {visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[130%] opacity-0'}"
	inert={!visible}
>
	<div class="flex items-center gap-3 border-t border-white/10 bg-ink/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
		<button class="btn btn-primary min-h-12 flex-1" onclick={() => goToForm({ position: 'sticky' })}>
			Solicitar cotización <span class="arrow" aria-hidden="true">→</span>
		</button>
	</div>
</div>
