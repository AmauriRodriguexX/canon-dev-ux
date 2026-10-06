<script lang="ts">
	import { links } from '#lib/data';
	import type { Family, Model } from '#lib/families';
	import { goToForm } from '#lib/lead-state.svelte';
	import { track } from '#lib/analytics';
	import { staticUrl } from '#lib/paths';

	let { family }: { family: Family } = $props();
	const models = $derived(family.models);

	let dialog: HTMLDialogElement;
	let active = $state<Model | null>(null);
	let opener: HTMLElement | null = null;

	function openSheet(m: Model, e: MouseEvent) {
		opener = e.currentTarget as HTMLElement;
		active = m;
		dialog.showModal();
		track('product_detail_open', { family: family.slug, model: m.name });
	}
	function closeSheet() {
		dialog.close();
	}
	function quoteFromSheet(m: Model) {
		dialog.close();
		goToForm({ model: m.name, intent: 'quote', position: 'ficha' });
	}
	// Un color por segmento, en el orden en que aparecen en la familia
	const dots = ['bg-emerald-400', 'bg-amber-400', 'bg-canon', 'bg-pps-blue'];
	const segments = $derived([...new Set(models.map((m) => m.segment))]);
	const segColor = (seg: string) => dots[segments.indexOf(seg) % dots.length];
	const cols = $derived(models.length > 4 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2');
</script>

<section id="equipos" class="bg-paper py-24 sm:py-32">
	<div class="container-x">
		<div class="grid items-end gap-6 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<p class="eyebrow text-canon" data-reveal="fade">{family.name} · serie {family.series}</p>
				<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.9rem)] leading-[1.02] font-semibold" data-reveal="lines">
					{family.modelsTitle}
				</h2>
			</div>
			<p class="text-lg leading-relaxed text-stone lg:col-span-5" data-reveal="fade">{family.modelsText}</p>
		</div>

		<ul class="mt-16 grid gap-5 {cols}" data-stagger>
			{#each models as m, i (m.id)}
				<li class="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgb(0_0_0/0.04)] ring-1 ring-black/5 transition-shadow duration-700 hover:shadow-[0_40px_80px_-40px_rgb(11_11_14/0.35)]">
					<div class="relative overflow-hidden bg-gradient-to-b from-[#eceae4] to-white px-6 pt-8 pb-2">
						<div class="flex items-center justify-between text-xs font-medium">
							<span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-ink ring-1 ring-black/5">
								<span class="size-1.5 rounded-full {segColor(m.segment)}"></span>{m.segment}
							</span>
							<span class="font-display text-stone tabular-nums">0{i + 1}</span>
						</div>
						<img
							src={staticUrl(m.image)}
							alt="Canon {m.name}"
							width="882"
							height="415"
							loading="lazy"
							class="mx-auto mt-4 w-full max-w-[30rem] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.04]"
						/>
					</div>
					<div class="flex flex-1 flex-col p-7 sm:p-8">
						<h3 class="text-2xl font-semibold sm:text-[1.75rem]">{m.name}</h3>
						<p class="mt-2 text-stone">{m.tagline}</p>
						{#if m.pendingSpecs}
							<p class="mt-6 rounded-2xl bg-paper px-4 py-3.5 text-sm text-stone ring-1 ring-black/5">
								Especificaciones en validación con Canon. Un especialista te comparte la configuración y la ficha vigente.
							</p>
						{:else}
						<dl class="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-black/5 ring-1 ring-black/5 sm:grid-cols-3">
							{#each m.keySpecs as s (s.label)}
								<div class="flex items-baseline justify-between gap-3 bg-paper/60 px-4 py-3 sm:block sm:px-3 sm:py-3.5">
									<dt class="text-[11px] tracking-wide text-stone uppercase">{s.label}</dt>
									<dd class="mt-1 font-display text-[0.95rem] font-semibold sm:text-base">{s.value}</dd>
								</div>
							{/each}
						</dl>
						{/if}
						<div class="mt-auto flex flex-wrap gap-3 pt-7">
							<button class="btn btn-primary" onclick={() => goToForm({ model: m.name, intent: 'quote', position: 'tarjeta' })}>
								Cotizar este equipo <span class="arrow" aria-hidden="true">→</span>
							</button>
							{#if !m.pendingSpecs}
								<button class="btn btn-ghost-light" onclick={(e) => openSheet(m, e)} aria-haspopup="dialog">Ver ficha técnica</button>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<p class="mt-10 text-center text-sm text-stone" data-reveal="fade">
			¿Buscas el brochure completo?
			<a href={links.resources} target="_blank" rel="noopener" class="link-u font-semibold text-ink" onclick={() => track('resource_click', { resource: 'centro-de-recursos', family: family.slug })}>
				Descárgalo en el centro de recursos ↗
			</a>
		</p>
	</div>
</section>

<!-- Ficha técnica: la acción comercial va primero, las especificaciones después (auditoría F03) -->
<dialog
	bind:this={dialog}
	onclose={() => opener?.focus()}
	onclick={(e) => e.target === dialog && closeSheet()}
	class="m-auto max-h-[92dvh] w-[min(56rem,calc(100%-1.5rem))] overflow-hidden rounded-[1.75rem] bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
	aria-labelledby="sheet-title"
>
	{#if active}
		<div class="flex max-h-[92dvh] flex-col">
			<div class="flex items-start justify-between gap-4 border-b border-black/5 p-6 sm:p-8">
				<div>
					<p class="eyebrow text-canon">{active.segment}</p>
					<h3 id="sheet-title" class="mt-2 text-3xl font-semibold">{active.name}</h3>
				</div>
				<button class="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-black/10 transition hover:bg-ink hover:text-white" onclick={closeSheet} aria-label="Cerrar ficha técnica">
					<svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
				</button>
			</div>
			<div class="overflow-y-auto overscroll-contain" data-lenis-prevent>
				<div class="grid items-center gap-6 bg-gradient-to-b from-[#eceae4] to-white p-6 sm:grid-cols-[1.2fr_1fr] sm:p-8">
					<img src={staticUrl(active.image)} alt="" class="w-full" width="882" height="415" />
					<div>
						<p class="text-stone">{active.tagline}</p>
						<button class="btn btn-primary mt-5 w-full" onclick={() => active && quoteFromSheet(active)}>
							Cotizar {active.name} <span class="arrow" aria-hidden="true">→</span>
						</button>
					</div>
				</div>
				<dl class="divide-y divide-black/5 px-6 pb-4 sm:px-8">
					{#each active.specs as s (s.label)}
						<div class="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
							<dt class="text-sm font-semibold">{s.label}</dt>
							<dd class="text-[0.95rem] leading-relaxed text-stone">{s.value}</dd>
						</div>
					{/each}
					{#if active.applications}
						<div class="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
							<dt class="text-sm font-semibold">Aplicaciones</dt>
							<dd class="text-[0.95rem] leading-relaxed text-stone">{active.applications}</dd>
						</div>
					{/if}
				</dl>
				<div class="flex flex-wrap items-center justify-between gap-4 border-t border-black/5 bg-paper px-6 py-5 sm:px-8">
					<a href={links.resources} target="_blank" rel="noopener" class="link-u text-sm font-semibold">Brochure y especificaciones completas ↗</a>
					<button class="btn btn-primary min-h-11 text-sm" onclick={() => active && quoteFromSheet(active)}>Cotizar este equipo</button>
				</div>
			</div>
		</div>
	{/if}
</dialog>
