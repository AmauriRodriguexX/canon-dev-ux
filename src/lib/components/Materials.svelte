<script lang="ts">
	import type { Family } from '#lib/families';

	let { family }: { family: Family } = $props();
	const technical = $derived(family.surfacesKind === 'aplicaciones');
</script>

<!-- Texturas generadas en CSS/SVG con una "impresión" que se cura con luz al pasar el cursor -->
<section id="materiales" class="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
	<div class="container-x relative z-10">
		<div class="grid items-end gap-6 lg:grid-cols-12">
			<div class="lg:col-span-8">
				<p class="eyebrow text-mist" data-reveal="fade">{technical ? 'Aplicaciones' : 'Versatilidad de materiales'}</p>
				<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.9rem)] leading-[1.02] font-semibold" data-reveal="lines">
					{family.surfacesTitle}
				</h2>
			</div>
			<p class="text-lg leading-relaxed text-mist lg:col-span-4" data-reveal="fade">{family.surfacesText}</p>
		</div>

		<ul class="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stagger>
			{#each family.surfaces as m, i (m.id)}
				<li class="group relative overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 {technical ? 'aspect-[4/5]' : 'aspect-[4/5] sm:aspect-square'}">
					<div class="mat mat-{m.id} transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"></div>
					{#if !technical}
						<!-- Gráfico impreso sobre el material -->
						<div
							aria-hidden="true"
							class="absolute inset-[18%] rounded-[40%_60%_55%_45%] opacity-80 mix-blend-multiply transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:inset-[12%] group-hover:rotate-6"
							style="background: conic-gradient(from {i * 45}deg, #df252d, #ffb703, #2ec4b6, #527ee3, #8a4fb0, #df252d)"
						></div>
					{/if}
					<!-- Barrido de luz (curado LED / paso del cabezal) -->
					<div aria-hidden="true" class="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#9b8cff]/40 to-transparent opacity-0 transition-all duration-[1200ms] group-hover:left-[120%] group-hover:opacity-100"></div>
					<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 sm:p-5 sm:pt-16">
						<span class="font-display text-base font-semibold sm:text-lg">{m.name}</span>
						{#if m.note}<span class="mt-1 block text-xs text-white/60">{m.note}</span>{/if}
					</div>
				</li>
			{/each}
		</ul>
		<p class="mt-6 text-xs text-mist">Texturas ilustrativas. La compatibilidad por modelo y configuración está en cada ficha técnica.</p>
	</div>
</section>
