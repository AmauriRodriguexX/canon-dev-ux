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

<section class="grain relative overflow-clip bg-ink pt-[4.6rem] text-white lg:min-h-svh lg:pt-0">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0">
		<div class="absolute -left-40 top-10 size-[44rem] rounded-full bg-pps-red/20 blur-[150px]"></div>
		<div class="absolute -right-32 top-1/3 size-[40rem] rounded-full bg-pps-blue/25 blur-[150px]"></div>
		<div class="absolute inset-0 opacity-[0.07] [background:linear-gradient(rgb(255_255_255)_1px,transparent_1px)_0_0/100%_72px,linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)_0_0/72px_100%] [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]"></div>
	</div>

	<div class="container-x relative z-10 pt-10 pb-12 sm:pt-20 lg:flex lg:min-h-svh lg:flex-col lg:justify-start lg:pt-28 lg:pb-6">
		<div class="grid items-start gap-8 lg:grid-cols-12">
			<div class="lg:col-span-12">
				<p class="eyebrow text-mist" data-reveal="fade" data-now data-delay="0.05">
					<span class="pps-text">Canon Production Printing</span> · Portafolio de soluciones
				</p>
				<h1 class="mt-2 text-[clamp(2rem,7.5vw,3rem)] leading-[1.02] font-semibold sm:mt-3 sm:text-[clamp(2.6rem,1.2rem+4.8vw,5.6rem)] lg:text-[clamp(2.4rem,3.3vw,3.75rem)]" data-reveal="lines" data-now data-delay="0.15">
					Soluciones de impresión de formato amplio
				</h1>
				<div class="mt-4 max-w-4xl" data-reveal="fade" data-now data-delay="0.5">
					<p class="text-base leading-relaxed text-mist lg:text-lg">
					Rollo a rollo, cama plana o técnico: elige por lo que necesitas imprimir. Si no estás seguro, un especialista Canon
					te orienta.
					</p>
					<button class="btn btn-primary mt-4" onclick={() => goToForm({ family: '', position: 'hub-hero', intent: 'help' })} data-magnetic>
						Hablar con un especialista <span class="arrow" aria-hidden="true">→</span>
					</button>
				</div>
			</div>
		</div>

		<ul class="mt-10 grid gap-3 sm:gap-4 lg:mt-7 lg:grid-cols-3" data-reveal="fade" data-now data-delay="0.35">
			{#each families as f (f.slug)}
				<li class="spot group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl transition-colors duration-500 hover:border-white/25 lg:min-h-0">
					<div class="relative px-5 pt-5 sm:px-8 sm:pt-7 lg:pt-5">
						<div class="flex items-center justify-between">
							<span class="eyebrow text-mist">{f.series}</span>
							<span class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{highlight[f.slug].label} · {highlight[f.slug].value}</span>
						</div>
						<h2 class="mt-3 text-2xl font-semibold sm:mt-4 sm:text-4xl lg:mt-3 lg:text-2xl xl:text-3xl">{f.name}</h2>
						<p class="mt-2 text-sm text-mist sm:text-base lg:text-sm">{f.forWhat}</p>
					</div>
					<div class="relative mt-4 flex-1 px-5 sm:mt-6 sm:px-6 lg:mt-3">
						<div aria-hidden="true" class="absolute inset-x-[12%] bottom-[10%] h-8 rounded-[50%] bg-black/70 blur-xl"></div>
						<img
							src={staticUrl(cardImage[f.slug])}
							alt="Canon {f.series}"
							width="882"
							height="415"
							loading="eager"
							class="relative mx-auto w-full max-h-32 max-w-[24rem] object-contain transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.04] sm:max-h-none lg:max-h-36"
						/>
					</div>
					<div class="relative z-10 flex flex-wrap gap-2 px-5 pt-3 pb-4 sm:gap-3 sm:px-8 sm:pt-4 sm:pb-7 lg:pt-3 lg:pb-5">
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
