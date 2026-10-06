<script lang="ts">
	import type { Family } from '#lib/families';
	import { goToForm } from '#lib/lead-state.svelte';
	import { track } from '#lib/analytics';
	import { staticUrl } from '#lib/paths';

	let { family }: { family: Family } = $props();

	let answers = $state<Record<string, string>>({});
	const done = $derived(family.guide.every((q) => answers[q.key]));
	const result = $derived(done ? family.resolveGuide(answers) : null);
	const rec = $derived(result ? family.models.find((m) => m.id === result.modelId) ?? null : null);

	function pick(key: string, v: string) {
		answers[key] = v;
		if (family.guide.every((q) => answers[q.key])) {
			const r = family.resolveGuide(answers);
			track('selector_result', { family: family.slug, model: r.modelId });
		}
	}
	function reset() {
		answers = {};
	}
</script>

<section id="elegir" class="bg-paper-200 py-24 sm:py-32" data-hide-sticky>
	<div class="container-x grid gap-12 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<p class="eyebrow text-canon" data-reveal="fade">Guía rápida · {family.series}</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.4rem)] leading-[1.02] font-semibold" data-reveal="lines">
				¿No sabes qué equipo necesitas?
			</h2>
			<p class="mt-5 text-lg leading-relaxed text-stone" data-reveal="fade">{family.guideIntro}</p>
		</div>

		<div class="lg:col-span-8" data-reveal="fade">
			<div class="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgb(11_11_14/0.35)] ring-1 ring-black/5 sm:p-10">
				<div class="space-y-9">
					{#each family.guide as q, qi (q.key)}
						<fieldset>
							<legend class="flex items-center gap-3 font-display text-lg font-semibold">
								<span class="grid size-7 place-items-center rounded-full text-xs tabular-nums {answers[q.key] ? 'bg-ink text-white' : 'bg-black/5 text-stone'}">{qi + 1}</span>
								{q.q}
							</legend>
							<div class="mt-4 grid gap-2.5 {q.opts.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}">
								{#each q.opts as o (o.v)}
									<label class="relative flex min-h-14 items-center rounded-2xl px-4 py-3 text-[0.95rem] ring-1 transition-all duration-300 has-[:checked]:bg-ink has-[:checked]:text-white has-[:checked]:ring-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pps-blue {answers[q.key] === o.v ? '' : 'ring-black/10 hover:ring-black/30'}">
										<input type="radio" name="{family.slug}-{q.key}" value={o.v} class="sr-only" checked={answers[q.key] === o.v} onchange={() => pick(q.key, o.v)} />
										{o.l}
									</label>
								{/each}
							</div>
						</fieldset>
					{/each}
				</div>

				<div class="mt-10 border-t border-black/5 pt-8" aria-live="polite">
					{#if rec && result}
						<div class="grid items-center gap-6 sm:grid-cols-[1fr_1.1fr]">
							<img src={staticUrl(rec.image)} alt="Canon {rec.name}" class="w-full" loading="lazy" />
							<div>
								<p class="eyebrow text-canon">Tu punto de partida</p>
								<h3 class="mt-2 text-3xl font-semibold">{rec.name}</h3>
								<ul class="mt-4 space-y-2 text-stone">
									{#each result.reasons as r (r)}
										<li class="flex gap-2.5"><span class="mt-2.5 h-px w-3 shrink-0 bg-canon"></span>{r}</li>
									{/each}
								</ul>
							</div>
						</div>
						<div class="mt-7 flex flex-wrap gap-3">
							<button class="btn btn-primary" onclick={() => goToForm({ model: rec.name, intent: 'quote', position: 'selector' })}>
								Cotizar {rec.name} <span class="arrow" aria-hidden="true">→</span>
							</button>
							<button class="btn btn-ghost-light" onclick={() => goToForm({ model: '', intent: 'help', position: 'selector-ayuda' })}>
								Prefiero que me oriente un especialista
							</button>
							<button class="px-2 text-sm font-medium text-stone underline-offset-4 hover:underline" onclick={reset}>Empezar de nuevo</button>
						</div>
					{:else}
						<p class="text-stone">
							{family.guide.length > 1 ? 'Elige una opción en cada pregunta para ver la recomendación.' : 'Elige una opción para ver la recomendación.'}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
