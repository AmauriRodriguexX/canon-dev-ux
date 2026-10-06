<script lang="ts">
	import { families } from '#lib/families';
	import { goToForm } from '#lib/lead-state.svelte';
	import { familyUrl, staticUrl } from '#lib/paths';

	const highlight: Record<string, { label: string; value: string }> = {
		'rollo-a-rollo': { label: 'Colorado M5', value: 'hasta 159 m²/h' },
		'cama-plana': { label: 'Espesor', value: 'hasta 50.8 mm' },
		tecnico: { label: 'Línea mínima', value: '0.02 mm' }
	};
	const cardImage: Record<string, string> = {
		'rollo-a-rollo': '/img/colorado-m5-pro.webp',
		'cama-plana': '/img/arizona-1300.webp',
		tecnico: '/img/tz-32000-z36.webp'
	};
</script>

<section class="grain relative overflow-clip bg-ink pt-[4.6rem] text-white">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0">
		<div class="absolute -left-40 top-10 size-[44rem] rounded-full bg-pps-red/20 blur-[150px]"></div>
		<div class="absolute -right-32 top-1/3 size-[40rem] rounded-full bg-pps-blue/25 blur-[150px]"></div>
		<div class="absolute inset-0 opacity-[0.07] [background:linear-gradient(rgb(255_255_255)_1px,transparent_1px)_0_0/100%_72px,linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)_0_0/72px_100%] [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]"></div>
	</div>

	<div class="container-x relative z-10 pt-14 pb-20 sm:pt-20 lg:pb-28">
		<div class="grid items-end gap-8 lg:grid-cols-12">
			<div class="lg:col-span-8">
				<p class="eyebrow text-mist" data-reveal="fade" data-now data-delay="0.05">
					<span class="pps-text">Canon Production Printing</span> · Portafolio de soluciones
				</p>
				<h1 class="mt-6 text-[clamp(2.6rem,1.2rem+4.8vw,5.6rem)] leading-[0.98] font-semibold" data-reveal="lines" data-now data-delay="0.15">
					Soluciones de impresión de formato amplio
				</h1>
			</div>
			<div class="lg:col-span-4" data-reveal="fade" data-now data-delay="0.5">
				<p class="text-lg leading-relaxed text-mist">
					Rollo a rollo, cama plana o técnico: elige por lo que necesitas imprimir. Si no estás seguro, un especialista Canon
					te orienta.
				</p>
				<button class="btn btn-primary mt-6" onclick={() => goToForm({ family: '', position: 'hub-hero', intent: 'help' })} data-magnetic>
					Hablar con un especialista <span class="arrow" aria-hidden="true">→</span>
				</button>
			</div>
		</div>

		<ul class="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3" data-reveal="fade" data-now data-delay="0.35">
			{#each families as f (f.slug)}
				<li class="spot group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl transition-colors duration-500 hover:border-white/25">
					<div class="relative px-6 pt-7 sm:px-8">
						<div class="flex items-center justify-between">
							<span class="eyebrow text-mist">{f.series}</span>
							<span class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{highlight[f.slug].label} · {highlight[f.slug].value}</span>
						</div>
						<h2 class="mt-4 text-3xl font-semibold sm:text-4xl">{f.name}</h2>
						<p class="mt-2 text-mist">{f.forWhat}</p>
					</div>
					<div class="relative mt-6 flex-1 px-6">
						<div aria-hidden="true" class="absolute inset-x-[12%] bottom-[10%] h-8 rounded-[50%] bg-black/70 blur-xl"></div>
						<img
							src={staticUrl(cardImage[f.slug])}
							alt="Canon {f.series}"
							width="882"
							height="415"
							loading="eager"
							class="relative mx-auto w-full max-w-[24rem] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
						/>
					</div>
					<div class="relative z-10 flex flex-wrap gap-3 px-6 pt-4 pb-7 sm:px-8">
						<a href={familyUrl(f.slug)} class="btn btn-ghost-dark flex-1">Ver equipos</a>
						<button class="btn btn-primary flex-1" onclick={() => goToForm({ family: f.slug, model: '', position: `hub-card-${f.slug}`, intent: 'quote' })}>
							Cotizar
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
