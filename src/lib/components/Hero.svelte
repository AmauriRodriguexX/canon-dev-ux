<script lang="ts">
	import LeadForm from './LeadForm.svelte';
	import type { Family } from '#lib/families';
	import { goToForm } from '#lib/lead-state.svelte';
	import { scrollToEl } from '#lib/motion';
	import { homeUrl, staticUrl } from '#lib/paths';

	let { family }: { family: Family } = $props();
	// Las fotos de producto horizontales se muestran más anchas que las de encuadre 3/4
	const wide = $derived(family.heroImage.width / family.heroImage.height > 1.6);
</script>

<section class="grain relative overflow-clip bg-ink pt-[4.6rem] text-white">
	<!-- Iluminación de estudio -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0">
		<div class="absolute -left-40 top-1/3 size-[42rem] rounded-full bg-pps-red/25 blur-[140px]"></div>
		<div class="absolute -right-40 -top-20 size-[38rem] rounded-full bg-pps-blue/25 blur-[140px]"></div>
		<div class="absolute inset-0 opacity-[0.07] [background:linear-gradient(rgb(255_255_255)_1px,transparent_1px)_0_0/100%_72px,linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)_0_0/72px_100%] [mask-image:radial-gradient(ellipse_at_40%_40%,black,transparent_70%)]"></div>
	</div>

	<div class="container-x relative z-10 grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
		<!-- Mensaje -->
		<div class="lg:col-span-7 lg:row-start-1">
			<nav aria-label="Ruta" class="eyebrow text-mist" data-reveal="fade" data-now data-delay="0.05">
				<a href={homeUrl()} class="link-u hover:text-white">Formato amplio</a>
				<span class="mx-2 text-white/30">/</span>
				<span class="pps-text">{family.name} · {family.series}</span>
			</nav>
			<h1 class="mt-6 text-[clamp(2.5rem,1.2rem+4.4vw,5.2rem)] leading-[0.98] font-semibold" data-reveal="lines" data-now data-delay="0.2">
				{family.h1}
			</h1>
			<p class="mt-5 font-display text-lg text-white/70 italic" data-reveal="fade" data-now data-delay="0.4">“{family.slogan}”</p>
			<p class="mt-5 max-w-xl text-lg leading-relaxed text-mist" data-reveal="fade" data-now data-delay="0.55">{family.lead}</p>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal="fade" data-now data-delay="0.7">
				<button class="btn btn-primary" onclick={() => goToForm({ position: 'hero', intent: 'quote' })} data-magnetic>
					Solicitar cotización <span class="arrow" aria-hidden="true">→</span>
				</button>
				<button
					class="btn btn-ghost-dark"
					onclick={() => {
						const el = document.getElementById('elegir');
						if (el) scrollToEl(el);
					}}
				>
					Necesito ayuda para elegir
				</button>
			</div>
		</div>

		<!-- Formulario visible desde la entrada (auditoría F01/F02) -->
		<div class="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
			<div
				id="cotizar"
				class="spot relative rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8 lg:sticky lg:top-28"
				data-reveal="fade"
				data-now
				data-delay="0.35"
			>
				<div aria-hidden="true" class="pps-line absolute inset-x-8 top-0 h-px opacity-80"></div>
				<div class="relative z-10"><LeadForm {family} /></div>
			</div>
		</div>

		<!-- Producto en escena (en móvil va después del formulario) -->
		<div class="relative lg:col-span-7 lg:row-start-2" data-reveal="fade" data-now data-delay="0.45">
			<div aria-hidden="true" class="absolute inset-x-[10%] bottom-[16%] h-10 rounded-[50%] bg-black/70 blur-2xl"></div>
			<img
				src={staticUrl(family.heroImage.src)}
				alt={family.heroImage.alt}
				width={family.heroImage.width}
				height={family.heroImage.height}
				fetchpriority="high"
				class="relative mx-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)] {wide ? 'max-w-[46rem]' : 'max-w-[26rem]'}"
			/>
			<ul class="mt-8 grid grid-cols-3 gap-3 sm:gap-4" aria-label="Datos clave de la familia {family.name}">
				{#each family.chips as c (c.label)}
					<li class="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 backdrop-blur-md sm:px-4">
						<span class="block text-[11px] tracking-wide text-mist uppercase">{c.label}</span>
						<span class="mt-1 block font-display text-sm font-semibold sm:text-lg">{c.value}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
