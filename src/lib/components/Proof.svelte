<script lang="ts">
	import type { Family } from '#lib/families';

	let { family }: { family: Family } = $props();
	const hasAwards = $derived(family.awards.length > 0);
	const hasCerts = $derived(family.certifications.length > 0);
	// Repite la lista para que el desplazamiento horizontal no deje huecos
	const marquee = $derived(family.awards.length < 4 ? [...family.awards, ...family.awards, ...family.awards] : [...family.awards, ...family.awards.slice(0, 3)]);
</script>

<!-- Premios (si Canon los publica), certificaciones y beneficios de la familia -->
<section class="overflow-hidden border-y border-black/5 bg-paper py-20 sm:py-28" aria-labelledby="proof-title-{family.slug}">
	{#if hasAwards}
		<div class="container-x">
			<p class="eyebrow text-canon" data-reveal="fade">Reconocimientos de la serie {family.series}</p>
		</div>
		<div class="mt-8 select-none" aria-hidden="true">
			<div class="w-max whitespace-nowrap font-display text-[clamp(2.2rem,1rem+4vw,4.6rem)] leading-none font-semibold tracking-[-0.03em]" data-drift="left">
				{#each marquee as a, i (i)}
					<span class="mx-6 inline-block {i % 2 ? 'text-ink/25' : 'text-ink'}">{a}</span><span class="text-canon">✦</span>
				{/each}
			</div>
		</div>
		<ul class="sr-only">
			{#each family.awards as a (a)}<li>{a}</li>{/each}
		</ul>
	{/if}
	<h2 id="proof-title-{family.slug}" class="sr-only">Beneficios{hasAwards ? ', premios' : ''}{hasCerts ? ' y certificaciones' : ''} de {family.series}</h2>

	<div class="container-x grid gap-12 {hasAwards ? 'mt-16' : ''} {hasCerts ? 'lg:grid-cols-12' : ''}">
		{#if hasCerts}
			<div class="lg:col-span-5" data-reveal="fade">
				<h3 class="font-display text-xl font-semibold">Certificaciones</h3>
				<ul class="mt-5 flex flex-wrap gap-2">
					{#each family.certifications as c (c)}
						<li class="rounded-full bg-white px-3.5 py-2 text-sm text-ink ring-1 ring-black/5">{c}</li>
					{/each}
				</ul>
				<p class="mt-4 text-xs text-stone">Certificaciones informadas por Canon para la serie; la aplicabilidad varía según modelo y configuración.</p>
			</div>
		{/if}
		<ol class="grid gap-8 {hasCerts ? 'sm:grid-cols-3 lg:col-span-7' : 'sm:grid-cols-3'}" data-stagger>
			{#each family.benefits as b, i (b.title)}
				<li class="border-t border-ink/15 pt-6">
					<span class="font-display text-sm text-stone tabular-nums">0{i + 1}</span>
					<h3 class="mt-3 text-xl leading-tight font-semibold sm:text-2xl">{b.title}</h3>
					<p class="mt-3 leading-relaxed text-stone">{b.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
