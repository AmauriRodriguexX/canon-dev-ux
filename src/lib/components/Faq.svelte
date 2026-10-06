<script lang="ts">
	import type { Faq } from '#lib/families';

	// Respuestas basadas en la información publicada por Canon; nada de precios ni plazos no confirmados.
	let { faqs, title = 'Antes de cotizar' }: { faqs: Faq[]; title?: string } = $props();
	let openFaqs = $state(new Set<string>());

	function toggleFaq(question: string) {
		const nextOpenFaqs = new Set(openFaqs);
		if (nextOpenFaqs.has(question)) nextOpenFaqs.delete(question);
		else nextOpenFaqs.add(question);
		openFaqs = nextOpenFaqs;
	}
</script>

<section id="preguntas" class="bg-paper py-24 sm:py-32">
	<div class="container-x grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<p class="eyebrow text-canon" data-reveal="fade">Preguntas frecuentes</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.4rem)] leading-[1.02] font-semibold" data-reveal="lines">{title}</h2>
		</div>
		<div class="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
			{#each faqs as f, index (f.q)}
				{@const isOpen = openFaqs.has(f.q)}
				<button
					type="button"
					id={`pregunta-${index}`}
					class="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold sm:text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canon focus-visible:ring-offset-4"
					aria-expanded={isOpen}
					aria-controls={`respuesta-${index}`}
					onclick={() => toggleFaq(f.q)}
				>
					<span class="min-w-0">{f.q}</span>
					<span
						class="faq-icon grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/15"
						class:faq-icon-open={isOpen}
						aria-hidden="true"
					></span>
				</button>
				<div
					id={`respuesta-${index}`}
					class="faq-panel"
					class:faq-panel-open={isOpen}
					role="region"
					aria-labelledby={`pregunta-${index}`}
					aria-hidden={!isOpen}
					inert={!isOpen}
				>
					<div class="faq-panel-clip">
						<p class="max-w-2xl pb-7 leading-relaxed text-stone">{@html f.a}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-panel {
		display: grid;
		grid-template-rows: 0fr;
		translate: 0 -0.35rem;
		opacity: 0;
		transition:
			grid-template-rows 560ms cubic-bezier(0.22, 1, 0.36, 1),
			translate 560ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 320ms ease;
	}

	.faq-panel-open {
		grid-template-rows: 1fr;
		translate: 0 0;
		opacity: 1;
	}

	.faq-panel-clip {
		min-height: 0;
		overflow: hidden;
	}

	.faq-icon {
		position: relative;
		transform-origin: center;
		transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.faq-icon::before,
	.faq-icon::after {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.9rem;
		height: 1.5px;
		border-radius: 999px;
		background: currentColor;
		content: '';
		transform-origin: center;
	}

	.faq-icon::before {
		transform: translate(-50%, -50%);
	}

	.faq-icon::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	.faq-icon-open {
		transform: rotate(45deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.faq-panel,
		.faq-icon {
			transition-duration: 0.01ms;
		}
	}
</style>
