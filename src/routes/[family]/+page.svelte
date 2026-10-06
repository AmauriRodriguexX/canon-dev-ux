<script lang="ts">
	import { familyBySlug } from '#lib/families';
	import Hero from '#lib/components/Hero.svelte';
	import Models from '#lib/components/Models.svelte';
	import Materials from '#lib/components/Materials.svelte';
	import Technology from '#lib/components/Technology.svelte';
	import Selector from '#lib/components/Selector.svelte';
	import Proof from '#lib/components/Proof.svelte';
	import Consult from '#lib/components/Consult.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { staticUrl } from '#lib/paths';

	let { data } = $props();
	// Las funciones de la guía no son serializables: la familia se resuelve aquí a partir del slug
	const family = $derived(familyBySlug(data.slug)!);
</script>

<svelte:head>
	<title>{family.seoTitle}</title>
	<meta name="description" content={family.seoDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={family.seoTitle} />
	<meta property="og:description" content={family.seoDescription} />
	<meta property="og:image" content={staticUrl(family.heroImage.src)} />
	<meta property="og:locale" content="es_MX" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `Canon ${family.series} · ${family.name}`,
		itemListElement: family.models.map((m, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: { '@type': 'Product', name: `Canon ${m.name}`, brand: { '@type': 'Brand', name: 'Canon' } }
		}))
	})}</script>`}
</svelte:head>

{#key family.slug}
	<Hero {family} />
	<Models {family} />
	<Materials {family} />
	<Technology {family} />
	<Selector {family} />
	<Proof {family} />
	<Consult />
	<Faq faqs={family.faqs} />
	<FinalCta word={family.series} />
{/key}
