<script lang="ts">
	import { staticUrl } from '#lib/paths';
	import { links } from '#lib/data';
	import { goToForm } from '#lib/lead-state.svelte';

	// Qué pasa después de enviar (sin plazos que ventas no haya confirmado)
	const steps = [
		{ t: 'Cuéntanos tu proyecto', d: 'Materiales, medidas y volumen aproximado. Si aún no sabes qué equipo necesitas, también sirve.' },
		{ t: 'Un especialista Canon te contacta', d: 'Revisa tu caso y resuelve dudas técnicas sobre la gama Arizona.' },
		{ t: 'Definen juntos el siguiente paso', d: 'Configuración recomendada, cotización y lo que tu operación necesite para arrancar.' }
	];
</script>

<section class="bg-paper py-24 sm:py-32">
	<div class="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="relative overflow-hidden rounded-[2rem]" data-reveal="mask">
			<img src={staticUrl('/img/asesoria.webp')} alt="Equipo revisando un proyecto en una reunión de asesoría" width="709" height="463" loading="lazy" class="aspect-[4/3] w-full object-cover" />
			<div aria-hidden="true" class="pps-line absolute inset-x-0 bottom-0 h-1"></div>
		</div>
		<div>
			<p class="eyebrow text-canon" data-reveal="fade">Cómo funciona</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.4rem)] leading-[1.02] font-semibold" data-reveal="lines">
				De la idea a la configuración correcta
			</h2>
			<ol class="mt-10 space-y-7" data-stagger>
				{#each steps as s, i (s.t)}
					<li class="grid grid-cols-[2.75rem_1fr] gap-4">
						<span class="grid size-11 place-items-center rounded-full bg-ink font-display text-sm font-semibold text-white">{i + 1}</span>
						<div>
							<h3 class="text-xl font-semibold">{s.t}</h3>
							<p class="mt-1.5 leading-relaxed text-stone">{s.d}</p>
						</div>
					</li>
				{/each}
			</ol>
			<div class="mt-10 flex flex-wrap items-center gap-5">
				<button class="btn btn-primary" onclick={() => goToForm({ position: 'como-funciona', intent: 'quote' })} data-magnetic>
					Solicitar cotización <span class="arrow" aria-hidden="true">→</span>
				</button>
				<a href={links.support} target="_blank" rel="noopener" class="link-u text-sm text-stone">¿Ya tienes un equipo Canon? Soporte técnico ↗</a>
			</div>
		</div>
	</div>
</section>
