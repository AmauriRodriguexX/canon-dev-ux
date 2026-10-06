<script lang="ts">
	import { goToForm } from '#lib/lead-state.svelte';

	let { word = 'Formato amplio' }: { word?: string } = $props();
</script>

<section class="grain relative overflow-hidden bg-ink py-28 text-white sm:py-40" data-hide-sticky>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0">
		<div class="absolute left-1/2 top-1/2 size-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,#df252d,#8a4fb0,#527ee3,#df252d)] opacity-25 blur-[120px]"></div>
	</div>
	<div aria-hidden="true" class="absolute inset-x-0 top-10 select-none">
		<div class="w-max whitespace-nowrap font-display text-[clamp(5rem,2rem+12vw,15rem)] leading-none font-semibold tracking-[-0.05em] text-white/[0.04]" data-drift="left">
			{word} · {word} · {word} · {word}
		</div>
	</div>
	<div class="container-x relative z-10 text-center">
		<h2 class="mx-auto max-w-4xl text-[clamp(2.4rem,1.2rem+4vw,5rem)] leading-[1] font-semibold" data-reveal="lines">
			Cuéntanos qué quieres imprimir
		</h2>
		<p class="mx-auto mt-6 max-w-xl text-lg text-mist" data-reveal="fade">
			Un especialista Canon te ayudará a evaluar el equipo y los siguientes pasos para tu proyecto.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-reveal="fade">
			<button class="btn btn-primary" onclick={() => goToForm({ position: 'cierre', intent: 'quote' })} data-magnetic>
				Solicitar cotización <span class="arrow" aria-hidden="true">→</span>
			</button>
			<button class="btn btn-ghost-dark" onclick={() => goToForm({ position: 'cierre-ayuda', intent: 'help', model: '' })}>
				Necesito ayuda para elegir
			</button>
		</div>
	</div>
</section>
