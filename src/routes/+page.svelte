<script lang="ts">
	import HubHero from '#lib/components/HubHero.svelte';
	import Compare from '#lib/components/Compare.svelte';
	import HubContact from '#lib/components/HubContact.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import { links } from '#lib/data';
	import { staticUrl } from '#lib/paths';

	const title = 'Impresoras de formato amplio Canon | Rollo a rollo, cama plana y técnico';
	const description =
		'Portafolio de formato amplio de Canon México: Colorado rollo a rollo, Arizona de cama plana e imagePROGRAF TZ técnico. Compara familias y habla con un especialista.';

	const faqs = [
		{
			q: '¿Qué diferencia hay entre rollo a rollo, cama plana y técnico?',
			a: 'Rollo a rollo (Colorado) imprime gráficos sobre materiales flexibles como vinilos, textiles y papel tapiz. Cama plana (Arizona) imprime sobre rígidos y objetos irregulares como madera, vidrio o acrílico. Técnico (imagePROGRAF TZ) produce planos CAD y documentos de arquitectura e ingeniería.'
		},
		{
			q: '¿Necesito saber qué equipo quiero para pedir asesoría?',
			a: 'No. En el formulario puedes elegir “Aún no lo sé”. Un especialista revisa lo que necesitas imprimir y te orienta hacia la familia y el equipo adecuados.'
		},
		{
			q: '¿Dónde descargo brochures y especificaciones?',
			a: `En el <a class="link-u font-semibold text-ink" href="${links.resources}" target="_blank" rel="noopener">centro de recursos de Canon</a> encontrarás brochures y especificaciones de cada serie.`
		},
		{
			q: 'Ya tengo un equipo Canon y necesito ayuda técnica.',
			a: `Para soporte, refacciones o servicio, visita el <a class="link-u font-semibold text-ink" href="${links.support}" target="_blank" rel="noopener">portal de soporte técnico</a>. Este formulario es para asesoría comercial.`
		}
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={staticUrl('/img/colorado-hero.webp')} />
	<meta property="og:locale" content="es_MX" />
</svelte:head>

<HubHero />
<Compare />
<HubContact />
<Faq {faqs} title="Antes de elegir" />
