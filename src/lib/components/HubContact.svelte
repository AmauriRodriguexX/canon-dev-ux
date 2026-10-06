<script lang="ts">
	import LeadForm from './LeadForm.svelte';
	import { links } from '#lib/data';

	const steps = [
		{ t: 'Cuéntanos qué imprimes', d: 'Materiales, medidas y volumen aproximado. No necesitas saber qué familia ni qué equipo.' },
		{ t: 'Un especialista Canon te contacta', d: 'Revisa tu caso y te orienta entre rollo a rollo, cama plana o técnico.' },
		{ t: 'Definen juntos el siguiente paso', d: 'Configuración recomendada, cotización y lo que tu operación necesite.' }
	];
</script>

<section class="grain relative overflow-clip bg-ink py-24 text-white sm:py-32">
	<div aria-hidden="true" class="pointer-events-none absolute -left-40 bottom-0 size-[40rem] rounded-full bg-pps-red/20 blur-[140px]"></div>
	<div class="container-x relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
		<div class="lg:col-span-6">
			<p class="eyebrow text-mist" data-reveal="fade">Asesoría comercial</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.6rem)] leading-[1.02] font-semibold" data-reveal="lines">
				¿No sabes por dónde empezar? Te orientamos
			</h2>
			<ol class="mt-12 space-y-8" data-stagger>
				{#each steps as s, i (s.t)}
					<li class="grid grid-cols-[2.75rem_1fr] gap-4">
						<span class="grid size-11 place-items-center rounded-full bg-white font-display text-sm font-semibold text-ink">{i + 1}</span>
						<div>
							<h3 class="text-xl font-semibold">{s.t}</h3>
							<p class="mt-1.5 leading-relaxed text-mist">{s.d}</p>
						</div>
					</li>
				{/each}
			</ol>
			<a href={links.support} target="_blank" rel="noopener" class="link-u mt-10 inline-block text-sm text-mist">¿Ya tienes un equipo Canon? Soporte técnico ↗</a>
		</div>
		<div class="lg:col-span-5 lg:col-start-8">
			<div
				id="cotizar"
				class="spot relative rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8"
				data-reveal="fade"
			>
				<div aria-hidden="true" class="pps-line absolute inset-x-8 top-0 h-px opacity-80"></div>
				<div class="relative z-10"><LeadForm /></div>
			</div>
		</div>
	</div>
</section>
