<script lang="ts">
	import type { Faq } from '#lib/families';

	// Respuestas basadas en la información publicada por Canon; nada de precios ni plazos no confirmados.
	let { faqs, title = 'Antes de cotizar' }: { faqs: Faq[]; title?: string } = $props();
</script>

<section id="preguntas" class="bg-paper py-24 sm:py-32">
	<div class="container-x grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<p class="eyebrow text-canon" data-reveal="fade">Preguntas frecuentes</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.4rem)] leading-[1.02] font-semibold" data-reveal="lines">{title}</h2>
		</div>
		<div class="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
			{#each faqs as f (f.q)}
				<details class="group">
					<summary class="flex list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
						{f.q}
						<span class="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-transform duration-500 group-open:rotate-45" aria-hidden="true">+</span>
					</summary>
					<p class="max-w-2xl pb-7 leading-relaxed text-stone">{@html f.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
