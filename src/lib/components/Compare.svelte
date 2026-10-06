<script lang="ts">
	import { families } from '#lib/families';
	import { familyUrl } from '#lib/paths';

	// Comparativa con datos publicados por Canon en cada familia
	const rows: { label: string; get: (slug: string) => string }[] = [
		{ label: 'Ideal para', get: (s) => families.find((f) => f.slug === s)!.forWhat },
		{ label: 'Imprime sobre', get: (s) => families.find((f) => f.slug === s)!.printsOn },
		{
			label: 'Tecnología clave',
			get: (s) => ({ 'rollo-a-rollo': 'UVgel · FLXfinish+ · PAINT', 'cama-plana': 'VariaDot · FLXflow · PRISMAelevate', tecnico: 'LUCIA TD · doble rollo · apilador' })[s]!
		},
		{
			label: 'Dato clave',
			get: (s) => ({ 'rollo-a-rollo': 'Rollo de 1,625 mm · hasta 159 m²/h', 'cama-plana': 'Hasta 308 × 250 cm · hasta 220 m²/h', tecnico: 'Hasta 243 impresiones tamaño D/h' })[s]!
		},
		{ label: 'Equipos', get: (s) => families.find((f) => f.slug === s)!.models.map((m) => m.name.replace('imagePROGRAF ', '')).join(' · ') }
	];
</script>

<section class="bg-paper py-24 sm:py-32">
	<div class="container-x">
		<div class="max-w-3xl">
			<p class="eyebrow text-canon" data-reveal="fade">Comparativa</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.6rem)] leading-[1.02] font-semibold" data-reveal="lines">
				¿Qué familia se ajusta a tu trabajo?
			</h2>
		</div>

		<!-- Escritorio: tabla; móvil: una tarjeta por familia (sin scroll horizontal) -->
		<div class="mt-14 hidden overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-black/5 md:block" data-reveal="fade">
			<table class="w-full text-left">
				<caption class="sr-only">Comparativa de familias de formato amplio Canon</caption>
				<thead>
					<tr class="border-b border-black/5">
						<th scope="col" class="w-48 p-6"><span class="sr-only">Característica</span></th>
						{#each families as f (f.slug)}
							<th scope="col" class="p-6 align-bottom">
								<span class="eyebrow text-stone">{f.series}</span>
								<a href={familyUrl(f.slug)} class="link-u mt-1 block font-display text-2xl font-semibold">{f.name}</a>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-black/5">
					{#each rows as r (r.label)}
						<tr>
							<th scope="row" class="p-6 align-top text-sm font-semibold">{r.label}</th>
							{#each families as f (f.slug)}<td class="p-6 align-top leading-relaxed text-stone">{r.get(f.slug)}</td>{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<ul class="mt-10 space-y-4 md:hidden" data-stagger>
			{#each families as f (f.slug)}
				<li class="rounded-[1.5rem] bg-white p-6 ring-1 ring-black/5">
					<span class="eyebrow text-stone">{f.series}</span>
					<a href={familyUrl(f.slug)} class="mt-1 block font-display text-2xl font-semibold">{f.name} →</a>
					<dl class="mt-4 space-y-3">
						{#each rows as r (r.label)}
							<div>
								<dt class="text-xs font-semibold tracking-wide text-ink uppercase">{r.label}</dt>
								<dd class="mt-0.5 text-sm leading-relaxed text-stone">{r.get(f.slug)}</dd>
							</div>
						{/each}
					</dl>
				</li>
			{/each}
		</ul>
	</div>
</section>
