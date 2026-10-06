<script lang="ts">
	import { onMount } from 'svelte';
	import type { Family } from '#lib/families';

	let { family }: { family: Family } = $props();
	const technologies = $derived(family.techs);

	let active = $state(0);

	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const en of entries) if (en.isIntersecting) active = Number((en.target as HTMLElement).dataset.i);
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		document.querySelectorAll<HTMLElement>('#tecnologia [data-i]').forEach((s) => io.observe(s));
		return () => io.disconnect();
	});
</script>

{#snippet visual(id: string)}
	<svg viewBox="0 0 400 300" class="h-full w-full" aria-hidden="true">
		<defs>
			<linearGradient id="g-pps-{id}" x1="0" x2="1">
				<stop offset="0" stop-color="#df252d" /><stop offset=".55" stop-color="#8a4fb0" /><stop offset="1" stop-color="#527ee3" />
			</linearGradient>
		</defs>
		{#if id === 'flxflow'}
			<!-- Mesa sin zonas con flujo de aire; el material flota y se fija -->
			<polygon points="60,210 340,210 380,250 20,250" fill="#1d1d25" stroke="rgba(255,255,255,.18)" />
			{#each Array(9) as _, c}
				{#each Array(2) as _, r}
					<circle cx={70 + c * 33 + r * 8} cy={220 + r * 18} r="2" fill="rgba(255,255,255,.35)" />
				{/each}
			{/each}
			{#each Array(6) as _, i}
				<line x1={95 + i * 42} y1="205" x2={95 + i * 42} y2="185" stroke="#527ee3" stroke-width="2" stroke-linecap="round" class="air" style="animation-delay:{i * 0.18}s" />
			{/each}
			<g class="sheet">
				<polygon points="90,150 310,150 330,175 70,175" fill="url(#g-pps-{id})" opacity=".9" />
				<polygon points="70,175 330,175 330,180 70,180" fill="rgba(0,0,0,.35)" />
			</g>
			<text x="200" y="285" text-anchor="middle" class="lbl">HOLD · FLOAT · INSTANT SWITCH</text>
		{:else if id === 'variadot'}
			<!-- Cabezal y gotas de tres tamaños -->
			<g class="head"><rect x="40" y="40" width="90" height="34" rx="8" fill="#26262f" stroke="rgba(255,255,255,.2)" /><rect x="52" y="74" width="66" height="5" rx="2" fill="url(#g-pps-{id})" /></g>
			{#each [3, 5.5, 8, 4, 7, 3, 6] as r, i}
				<circle cx={60 + i * 10} cy="90" r={r} fill="url(#g-pps-{id})" class="drop" style="animation-delay:{i * 0.22}s" />
			{/each}
			{#each Array(26) as _, i}
				<circle cx={30 + i * 13} cy="235" r={2 + Math.abs(Math.sin(i * 0.5)) * 5} fill="url(#g-pps-{id})" opacity={0.35 + (i / 26) * 0.65} />
			{/each}
			<line x1="20" x2="380" y1="255" y2="255" stroke="rgba(255,255,255,.15)" />
			<text x="200" y="285" text-anchor="middle" class="lbl">GOTAS VARIABLES · 6–30 pl</text>
		{:else if id === 'prisma'}
			<!-- Capas que construyen relieve -->
			{#each Array(7) as _, i}
				<rect x={110 + i * 6} y={215 - i * 16} width={180 - i * 12} height="14" rx="3" fill="url(#g-pps-{id})" opacity={0.35 + i * 0.09} class="layer" style="animation-delay:{i * 0.16}s" />
			{/each}
			<line x1="330" x2="330" y1="215" y2="105" stroke="rgba(255,255,255,.5)" stroke-dasharray="3 4" />
			<text x="338" y="165" class="lbl" text-anchor="start">4 mm</text>
			<line x1="40" x2="360" y1="230" y2="230" stroke="rgba(255,255,255,.15)" />
			<text x="200" y="285" text-anchor="middle" class="lbl">RELIEVE TÁCTIL MULTICAPA</text>
		{:else if id === 'uvgel'}
			<!-- Capa delgada de gel sobre el sustrato, curada por LED UV -->
			<rect x="40" y="200" width="320" height="22" rx="3" fill="#2a2a33" stroke="rgba(255,255,255,.18)" />
			<rect x="40" y="190" width="320" height="10" rx="3" fill="url(#g-pps-{id})" class="gel" />
			<g class="led"><rect x="60" y="70" width="80" height="26" rx="6" fill="#26262f" stroke="rgba(255,255,255,.2)" /><rect x="70" y="96" width="60" height="5" rx="2" fill="#9b8cff" /><polygon points="70,101 130,101 150,185 50,185" fill="#9b8cff" opacity=".18" /></g>
			<text x="200" y="285" text-anchor="middle" class="lbl">GEL · CURADO LED UV · BAJA TEMPERATURA</text>
		{:else if id === 'flxfinish'}
			<!-- Mitad mate, mitad brillo en una sola impresión -->
			<rect x="60" y="70" width="280" height="160" rx="10" fill="url(#g-pps-{id})" />
			<rect x="200" y="70" width="140" height="160" rx="10" fill="rgba(0,0,0,.28)" />
			<rect x="60" y="70" width="140" height="160" rx="10" fill="url(#shine-{id})" class="shine" />
			<defs><linearGradient id="shine-{id}" x1="0" x2="1" y1="0" y2="1"><stop offset=".35" stop-color="#fff" stop-opacity="0" /><stop offset=".5" stop-color="#fff" stop-opacity=".55" /><stop offset=".65" stop-color="#fff" stop-opacity="0" /></linearGradient></defs>
			<text x="130" y="255" text-anchor="middle" class="lbl">BRILLO</text>
			<text x="270" y="255" text-anchor="middle" class="lbl">MATE</text>
			<text x="200" y="285" text-anchor="middle" class="lbl">DOS ACABADOS · UNA IMPRESIÓN</text>
		{:else if id === 'paint'}
			<!-- Fila de inyectores: uno falla y los vecinos compensan -->
			{#each Array(14) as _, i}
				<rect x={52 + i * 22} y="90" width="12" height="40" rx="3" fill={i === 6 ? '#ff6b70' : '#26262f'} stroke="rgba(255,255,255,.2)" class={i === 6 ? 'fail' : ''} />
				<line x1={58 + i * 22} x2={58 + i * 22} y1="135" y2="200" stroke={i === 6 ? 'transparent' : 'url(#g-pps-' + id + ')'} stroke-width={i === 5 || i === 7 ? 5 : 3} stroke-linecap="round" class="jet" style="animation-delay:{i * 0.07}s" />
			{/each}
			<line x1="40" x2="360" y1="212" y2="212" stroke="rgba(255,255,255,.15)" />
			<text x="200" y="285" text-anchor="middle" class="lbl">MONITOREO Y COMPENSACIÓN DE INYECTORES</text>
		{:else if id === 'lucia'}
			<!-- Cinco tintas de pigmento -->
			{#each ['#1c1c1c', '#000', '#00a3e0', '#e6007e', '#ffd400'] as c, i}
				<g class="drop" style="animation-delay:{i * 0.25}s"><path d="M{88 + i * 56} 70 C {74 + i * 56} 100, {74 + i * 56} 120, {88 + i * 56} 128 C {102 + i * 56} 120, {102 + i * 56} 100, {88 + i * 56} 70 Z" fill={c} stroke="rgba(255,255,255,.35)" /></g>
				<text x={88 + i * 56} y="160" text-anchor="middle" class="lbl">{['MBK', 'BK', 'C', 'M', 'Y'][i]}</text>
			{/each}
			<path d="M60 220 L 340 220 M 60 240 L 260 240" stroke="url(#g-pps-{id})" stroke-width="2" />
			<text x="200" y="285" text-anchor="middle" class="lbl">LUCIA TD · 5 COLORES DE PIGMENTO</text>
		{:else if id === 'dualroll'}
			<!-- Dos rollos con cambio automático -->
			<circle cx="120" cy="110" r="40" fill="#26262f" stroke="rgba(255,255,255,.2)" />
			<circle cx="120" cy="200" r="40" fill="#26262f" stroke="rgba(255,255,255,.2)" />
			<circle cx="120" cy="110" r="12" fill="#1a1a21" stroke="rgba(255,255,255,.3)" class="spin" />
			<circle cx="120" cy="200" r="12" fill="#1a1a21" stroke="rgba(255,255,255,.3)" class="spin" />
			<path d="M160 110 L 350 110" stroke="url(#g-pps-{id})" stroke-width="8" stroke-linecap="round" class="feed" />
			<path d="M160 200 L 300 200" stroke="rgba(255,255,255,.15)" stroke-width="8" stroke-linecap="round" />
			<text x="200" y="285" text-anchor="middle" class="lbl">DOBLE ROLLO · DETECCIÓN AUTOMÁTICA</text>
		{:else if id === 'stacker'}
			<!-- Planos que se apilan -->
			{#each Array(8) as _, i}
				<rect x={110 - i * 2} y={210 - i * 14} width={180 + i * 4} height="10" rx="2" fill={i === 7 ? 'url(#g-pps-' + id + ')' : '#e9e7e1'} opacity={0.35 + i * 0.08} class="layer" style="animation-delay:{i * 0.14}s" />
			{/each}
			<text x="200" y="285" text-anchor="middle" class="lbl">HASTA 100 IMPRESIONES ARCH E</text>
		{:else if id === 'secure'}
			<!-- Candado y documento -->
			<rect x="150" y="80" width="100" height="130" rx="8" fill="#e9e7e1" opacity=".12" stroke="rgba(255,255,255,.25)" />
			{#each Array(5) as _, i}<line x1="165" x2={225 - (i % 2) * 20} y1={102 + i * 16} y2={102 + i * 16} stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linecap="round" />{/each}
			<g class="lock"><rect x="215" y="150" width="56" height="44" rx="8" fill="url(#g-pps-{id})" /><path d="M227 150 v-12 a16 16 0 0 1 32 0 v12" fill="none" stroke="url(#g-pps-{id})" stroke-width="6" /></g>
			<text x="200" y="285" text-anchor="middle" class="lbl">PIN · CIFRADO · BORRADO SEGURO</text>
		{:else}
			<!-- Rollo que alimenta la mesa -->
			<circle cx="85" cy="120" r="42" fill="#26262f" stroke="rgba(255,255,255,.2)" />
			<circle cx="85" cy="120" r="14" fill="#1a1a21" stroke="rgba(255,255,255,.25)" class="spin" />
			<path d="M85 162 C 140 200, 200 205, 360 205" fill="none" stroke="url(#g-pps-{id})" stroke-width="10" stroke-linecap="round" class="feed" />
			<line x1="150" x2="380" y1="222" y2="222" stroke="rgba(255,255,255,.18)" />
			<text x="200" y="285" text-anchor="middle" class="lbl">FLEXIBLES · HASTA 220 cm</text>
		{/if}
	</svg>
{/snippet}

<section id="tecnologia" class="bg-ink text-white">
	<div class="container-x py-24 sm:py-32">
		<div class="max-w-3xl">
			<p class="eyebrow text-mist" data-reveal="fade">Tecnología {family.series}</p>
			<h2 class="mt-4 text-[clamp(2.1rem,1.2rem+3vw,3.9rem)] leading-[1.02] font-semibold" data-reveal="lines">
				{family.techTitle}
			</h2>
		</div>

		<div class="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
			<!-- Visual fijo (escritorio) -->
			<div class="hidden lg:block">
				<div class="sticky top-28 aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink-700 to-ink-800 p-8">
					<div aria-hidden="true" class="absolute -right-24 -top-24 size-72 rounded-full bg-pps-blue/20 blur-[90px]"></div>
					{#each technologies as t, i (t.id)}
						<div class="absolute inset-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] {active === i ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}">
							{@render visual(t.id)}
						</div>
					{/each}
					<div class="absolute bottom-6 left-8 flex gap-2">
						{#each technologies as t, i (t.id)}
							<span class="h-1 rounded-full transition-all duration-500 {active === i ? 'pps-line w-10' : 'w-4 bg-white/20'}"></span>
						{/each}
					</div>
				</div>
			</div>

			<ol class="space-y-6 lg:space-y-0">
				{#each technologies as t, i (t.id)}
					<li
							data-i={i}
						class="rounded-[1.5rem] border border-white/10 p-6 transition-opacity duration-500 sm:p-8 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:rounded-none lg:border-0 lg:border-l lg:p-0 lg:pl-10 {active === i ? 'lg:opacity-100' : 'lg:opacity-35'}"
					>
						<div class="mb-6 aspect-[4/3] rounded-2xl bg-ink-800 p-4 lg:hidden">{@render visual(t.id)}</div>
						<span class="font-display text-sm text-mist tabular-nums">0{i + 1} — {t.name}</span>
						<h3 class="mt-3 text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-tight font-semibold">{t.title}</h3>
						<p class="mt-4 max-w-lg text-lg leading-relaxed text-mist">{t.text}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	:global(.lbl) {
		fill: rgba(255, 255, 255, 0.55);
		font: 600 10px/1 'Inter Tight Variable', sans-serif;
		letter-spacing: 0.18em;
	}
	.air {
		animation: air 1.4s ease-in-out infinite;
	}
	@keyframes air {
		0%, 100% { opacity: 0.15; transform: translateY(6px); }
		50% { opacity: 1; transform: translateY(-6px); }
	}
	.sheet {
		animation: sheet 3.2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
	}
	@keyframes sheet {
		0%, 100% { transform: translateY(-18px); }
		45%, 70% { transform: translateY(14px); }
	}
	.head {
		animation: head 3s cubic-bezier(0.76, 0, 0.24, 1) infinite alternate;
	}
	@keyframes head {
		to { transform: translateX(220px); }
	}
	.drop {
		animation: drop 1.6s cubic-bezier(0.5, 0, 0.9, 0.6) infinite;
	}
	@keyframes drop {
		0% { opacity: 0; transform: translateY(0); }
		15% { opacity: 1; }
		90% { opacity: 1; transform: translateY(135px); }
		100% { opacity: 0; transform: translateY(140px); }
	}
	.layer {
		transform-box: fill-box;
		transform-origin: bottom;
		animation: layer 3.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
	}
	@keyframes layer {
		0% { opacity: 0; transform: scaleY(0); }
		25%, 85% { opacity: 1; transform: scaleY(1); }
		100% { opacity: 0; }
	}
	.spin {
		transform-box: fill-box;
		transform-origin: center;
		animation: spin 4s linear infinite;
		stroke-dasharray: 8 6;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	.gel {
		transform-box: fill-box;
		transform-origin: left;
		animation: gel 3s cubic-bezier(0.76, 0, 0.24, 1) infinite;
	}
	@keyframes gel {
		0% { transform: scaleX(0); }
		60%, 100% { transform: scaleX(1); }
	}
	.led {
		animation: head 3s cubic-bezier(0.76, 0, 0.24, 1) infinite alternate;
	}
	.shine {
		animation: shine 2.8s ease-in-out infinite;
	}
	@keyframes shine {
		0%, 100% { opacity: 0.2; }
		50% { opacity: 1; }
	}
	.jet {
		animation: air 1.2s ease-in-out infinite;
	}
	.fail {
		animation: shine 1s steps(2) infinite;
	}
	.lock {
		animation: sheet 3s cubic-bezier(0.76, 0, 0.24, 1) infinite;
	}
	.feed {
		stroke-dasharray: 30 14;
		animation: feed 1.2s linear infinite;
	}
	@keyframes feed {
		to { stroke-dashoffset: -44; }
	}
</style>
