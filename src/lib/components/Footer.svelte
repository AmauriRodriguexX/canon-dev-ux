<script lang="ts">
	import { links } from '#lib/data';
	import { families } from '#lib/families';
	import { familyUrl, staticUrl } from '#lib/paths';
</script>

<footer class="bg-ink pb-12 text-white" data-hide-sticky>
	<div class="pps-line h-px w-full opacity-60"></div>
	<div class="container-x grid gap-10 pt-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
		<div>
			<img src={staticUrl('/brand/canon-logo-white.png')} alt="Canon" width="120" height="25" class="h-6 w-auto" loading="lazy" />
			<p class="mt-5 max-w-xs text-sm leading-relaxed text-mist">Soluciones de impresión de formato amplio: rollo a rollo, cama plana y técnico.</p>
		</div>
		<nav aria-label="Familias">
			<h2 class="eyebrow text-mist">Familias</h2>
			<ul class="mt-4 space-y-2.5 text-sm">
				{#each families as f (f.slug)}
					<li><a class="link-u text-white/85 hover:text-white" href={familyUrl(f.slug)}>{f.name} · {f.series}</a></li>
				{/each}
			</ul>
		</nav>
		<nav aria-label="Ayuda">
			<h2 class="eyebrow text-mist">Ayuda</h2>
			<ul class="mt-4 space-y-2.5 text-sm">
				<li><a class="link-u text-white/85 hover:text-white" href={links.resources} target="_blank" rel="noopener">Centro de recursos</a></li>
				<li><a class="link-u text-white/85 hover:text-white" href={links.support} target="_blank" rel="noopener">Soporte técnico</a></li>
				<li><a class="link-u text-white/85 hover:text-white" href={links.contact} target="_blank" rel="noopener">Contáctanos</a></li>
			</ul>
		</nav>
		<nav aria-label="Legal">
			<h2 class="eyebrow text-mist">Legal</h2>
			<ul class="mt-4 space-y-2.5 text-sm">
				<li><a class="link-u text-white/85 hover:text-white" href={links.privacy} target="_blank" rel="noopener">Políticas de privacidad</a></li>
				<li><a class="link-u text-white/85 hover:text-white" href={links.terms} target="_blank" rel="noopener">Términos y condiciones</a></li>
				<li><a class="link-u text-white/85 hover:text-white" href={links.home} target="_blank" rel="noopener">canon.com.mx</a></li>
			</ul>
		</nav>
	</div>
	<p class="container-x mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-mist">
		© 2026 Todos los derechos reservados propiedad de Canon Inc. y utilizados bajo licencia por Canon Mexicana S. de R.L. de C.V.
	</p>
</footer>
