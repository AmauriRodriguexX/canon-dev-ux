// Familias del portafolio de formato amplio de Canon México.
// Fuente: canon.com.mx/formato-amplio-{rollo-a-rollo,cama-plana,tecnico} (copias en web/legacy).
// No añadir cifras, plazos ni promesas que no estén publicados por Canon.

export interface Spec {
	label: string;
	value: string;
}

export interface Model {
	id: string;
	name: string;
	segment: string;
	image: string;
	tagline: string;
	keySpecs: Spec[];
	specs: Spec[];
	applications?: string;
	/** La ficha publicada no es confiable: se muestra sin especificaciones y con nota de validación. */
	pendingSpecs?: boolean;
}

export interface Tech {
	id: string;
	name: string;
	title: string;
	text: string;
}

export interface Surface {
	id: string;
	name: string;
	note?: string;
}

export interface GuideQuestion {
	key: string;
	q: string;
	opts: { v: string; l: string }[];
}

export interface Faq {
	q: string;
	/** Puede incluir enlaces <a>; el contenido es propio, no de usuarios. */
	a: string;
}

export interface Family {
	slug: 'rollo-a-rollo' | 'cama-plana' | 'tecnico';
	name: string;
	series: string;
	slogan: string;
	h1: string;
	lead: string;
	seoTitle: string;
	seoDescription: string;
	heroImage: { src: string; alt: string; width: number; height: number };
	chips: Spec[];
	/** Para qué sirve, en lenguaje de la tarea (hub y comparativa). */
	forWhat: string;
	printsOn: string;
	surfacesTitle: string;
	surfacesText: string;
	surfacesKind: 'materiales' | 'aplicaciones';
	surfaces: Surface[];
	modelsTitle: string;
	modelsText: string;
	models: Model[];
	techTitle: string;
	techs: Tech[];
	benefits: { title: string; text: string }[];
	awards: string[];
	certifications: string[];
	guideIntro: string;
	guide: GuideQuestion[];
	resolveGuide: (a: Record<string, string>) => { modelId: string; reasons: string[] };
	faqs: Faq[];
}

import { links } from './data';

const resourceLink = `<a class="link-u font-semibold text-ink" href="${links.resources}" target="_blank" rel="noopener">centro de recursos de Canon</a>`;
const supportFaq: Faq = {
	q: 'Ya tengo un equipo Canon y necesito ayuda técnica.',
	a: `Para soporte, refacciones o servicio de un equipo instalado, visita el <a class="link-u font-semibold text-ink" href="${links.support}" target="_blank" rel="noopener">portal de soporte técnico</a>. Este formulario es para asesoría comercial.`
};

// ───────────────────────────── ROLLO A ROLLO · Colorado (UVgel) ─────────────────────────────

const coloradoMedia = [
	{ label: 'Ancho del rollo', value: '1,625 mm' },
	{ label: 'Espesor / peso del rollo', value: 'Hasta 1.6 mm · hasta 50 kg' }
];

const rollo: Family = {
	slug: 'rollo-a-rollo',
	name: 'Rollo a rollo',
	series: 'Colorado',
	slogan: 'La fuerza del gran formato con la precisión de UVgel',
	h1: 'Impresoras rollo a rollo para gráficos de gran formato',
	lead: 'Vinilos, textiles, papel tapiz y materiales sensibles al calor con tecnología UVgel: secado instantáneo, colores vibrantes y acabado mate o brillante desde un mismo equipo.',
	seoTitle: 'Impresoras rollo a rollo Canon Colorado UVgel | Cotiza tu equipo',
	seoDescription:
		'Serie Colorado con tecnología UVgel para vinilos, textiles y papel tapiz. Compara modelos M3, M5 y XL y solicita asesoría o cotización con un especialista Canon.',
	heroImage: { src: '/img/colorado-hero.webp', alt: 'Impresora rollo a rollo Canon Colorado con tecnología UVgel', width: 546, height: 457 },
	chips: [
		{ label: 'Ancho de rollo', value: '1,625 mm' },
		{ label: 'Serie M5', value: 'hasta 159 m²/h' },
		{ label: 'Resolución', value: 'hasta 1,800 dpi' }
	],
	forWhat: 'Gráficos de gran formato, señalización, punto de venta y decoración en materiales flexibles.',
	printsOn: 'Vinilos, textiles, papel tapiz, transparentes',
	surfacesTitle: 'Versatilidad inigualable en sustratos flexibles',
	surfacesText:
		'Produce impresiones duraderas de calidad en vinilos autoadhesivos, tejidos de poliéster, materiales sensibles al calor y papel. Imprime también en el interior del rollo y a doble cara.',
	surfacesKind: 'materiales',
	surfaces: [
		{ id: 'vinilo', name: 'Vinilos autoadhesivos' },
		{ id: 'textil', name: 'Tejidos de poliéster' },
		{ id: 'papel', name: 'Papel y papel tapiz' },
		{ id: 'sensible', name: 'Materiales sensibles al calor' },
		{ id: 'transparente', name: 'Transparentes' },
		{ id: 'texturizado', name: 'Texturizados' },
		{ id: 'reflectivo', name: 'Reflectivos', note: 'M5 PRO W' },
		{ id: 'magnetico', name: 'Magnéticos', note: 'Opcional' }
	],
	modelsTitle: 'Seis configuraciones Colorado, una misma tecnología UVgel',
	modelsText:
		'La serie M3 alcanza hasta 111 m²/h y la M5 hasta 159 m²/h. Las versiones PRO suman FLXfinish+ y las W tinta blanca UVgel.',
	models: [
		{
			id: 'colorado-m3',
			name: 'Colorado M3',
			segment: 'Hasta 111 m²/h',
			image: '/img/colorado-m3.webp',
			tagline: 'La entrada a UVgel: secado instantáneo y colores vibrantes en CMYK.',
			keySpecs: [
				{ label: 'Gloss', value: '111 m²/h' },
				{ label: 'Resolución', value: '1,800 dpi' },
				{ label: 'Tinta', value: 'UVgel CMYK' }
			],
			specs: [
				{ label: 'Velocidad de impresión', value: 'Gloss: hasta 111 m²/h.' },
				{ label: 'Calidad de imagen', value: 'Resolución hasta 1,800 dpi. Tecnología UVgel 460 (CMYK): secado instantáneo, colores vibrantes y máxima nitidez.' },
				...coloradoMedia,
				{ label: 'Compatible con', value: 'Vinilos, papeles sin recubrimiento, textiles, materiales sensibles al calor, transparentes y texturizados.' },
				{ label: 'Automatización', value: 'PAINT: monitoreo automático de boquillas para impresión continua. Mantenimiento automático. Curado LED UV a baja temperatura.' },
				{ label: 'Tintas y consumo', value: 'Botellas de 0.7 L recargables durante la impresión. Bajo consumo gracias a UVgel.' }
			]
		},
		{
			id: 'colorado-m3-pro',
			name: 'Colorado M3 PRO',
			segment: 'Hasta 111 m²/h',
			image: '/img/colorado-m3-pro.webp',
			tagline: 'Suma FLXfinish+: mate, brillo o ambos en una sola impresión.',
			keySpecs: [
				{ label: 'Gloss', value: '111 m²/h' },
				{ label: 'Matte', value: '36 m²/h' },
				{ label: 'FLXfinish+', value: '7 m²/h' }
			],
			specs: [
				{ label: 'Velocidad de impresión', value: 'Gloss: hasta 111 m²/h · Matte: hasta 36 m²/h · FLXfinish+: 7 m²/h (mate + brillo en una sola pasada).' },
				{ label: 'Calidad de imagen', value: 'Resolución hasta 1,800 dpi. Tecnología UVgel 460 (CMYK).' },
				...coloradoMedia,
				{ label: 'Compatible con', value: 'Vinilos, papeles sin recubrimiento, textiles, materiales sensibles al calor, transparentes y texturizados.' },
				{ label: 'Automatización', value: 'PAINT, mantenimiento automático y curado LED UV a baja temperatura.' }
			]
		},
		{
			id: 'colorado-m3-pro-w',
			name: 'Colorado M3 PRO W',
			segment: 'Hasta 111 m²/h',
			image: '/img/colorado-m3-pro-w.webp',
			tagline: 'Tinta blanca UVgel de alta opacidad y baja sedimentación.',
			keySpecs: [
				{ label: 'Gloss', value: '111 m²/h' },
				{ label: 'Tinta', value: 'UVgel + blanco' },
				{ label: 'FLXfinish+', value: 'Incluido' }
			],
			specs: [
				{ label: 'Velocidad de impresión', value: 'Gloss: hasta 111 m²/h · Matte: hasta 36 m²/h · FLXfinish+: 7 m²/h.' },
				{ label: 'Calidad de imagen', value: 'Resolución hasta 1,800 dpi. UVgel 460 con blanco: alta opacidad, baja sedimentación y 3× más rápido que tecnologías similares (según Canon).' },
				...coloradoMedia,
				{ label: 'Automatización PRO', value: 'PAINT con autocorrección de boquillas en tiempo real y mantenimiento automático.' },
				{ label: 'Arquitectura modular', value: 'Actualizable en campo: tinta blanca, FLXfinish+, velocidad ampliada, soporte magnético y modos especiales (texturas FLXture).' }
			]
		},
		{
			id: 'colorado-m5-pro',
			name: 'Colorado M5 PRO',
			segment: 'Hasta 159 m²/h',
			image: '/img/colorado-m5-pro.webp',
			tagline: 'Más velocidad para producción constante, con FLXfinish+.',
			keySpecs: [
				{ label: 'Gloss High Key', value: '159 m²/h' },
				{ label: 'Matte Express', value: '46 m²/h' },
				{ label: 'Tinta', value: 'UVgel CMYK' }
			],
			specs: [
				{ label: 'Velocidad de impresión', value: 'Gloss High Key: hasta 159 m²/h · Matte Express: hasta 46 m²/h · FLXfinish+: 7 m²/h (mate + brillo simultáneo).' },
				{ label: 'Calidad de imagen', value: 'Resolución hasta 1,800 dpi. Tintas UVgel 460 CMYK.' },
				{ label: 'Automatización PRO', value: 'PAINT con autocorrección de boquillas en tiempo real y mantenimiento automático.' },
				{ label: 'Arquitectura modular', value: 'Actualizable en campo: alta velocidad, FLXfinish+, soporte magnético y modos avanzados (FLXture).' }
			]
		},
		{
			id: 'colorado-m5-pro-w',
			name: 'Colorado M5 PRO W',
			segment: 'Hasta 159 m²/h',
			image: '/img/colorado-m5-pro-w.webp',
			tagline: 'La M5 con tinta blanca: reflectivos, transparentes y magnéticos.',
			keySpecs: [
				{ label: 'Gloss High Key', value: '159 m²/h' },
				{ label: 'Tinta', value: 'UVgel CMYKW' },
				{ label: 'Resolución', value: '1,800 dpi' }
			],
			specs: [
				{ label: 'Velocidad de impresión', value: 'Gloss High Key: hasta 159 m²/h · Matte Express: hasta 46 m²/h · FLXfinish+: 7 m²/h.' },
				{ label: 'Calidad de imagen', value: 'Resolución hasta 1,800 dpi. Tintas UVgel 460 CMYKW: blanco de alta opacidad, sin sedimentación y hasta 3× más rápido en modos multicapa (según Canon).' },
				...coloradoMedia,
				{ label: 'Imprime sobre', value: 'Vinilos, papeles sin recubrimiento, textiles, transparentes, texturizados, reflectivos y magnéticos (opcional).' },
				{ label: 'Arquitectura modular', value: 'Actualizable en campo: incrementos de velocidad, tinta blanca, FLXfinish+, soporte magnético y modos especiales (FLXture).' }
			]
		},
		{
			id: 'colorado-xl',
			name: 'Colorado XL',
			segment: 'Formato XL',
			image: '/img/colorado-xl.webp',
			tagline: 'Configuración y especificaciones con un especialista Canon.',
			keySpecs: [],
			specs: [],
			pendingSpecs: true
		}
	],
	techTitle: 'Automatización insuperable, de la tinta al enrollado',
	techs: [
		{
			id: 'uvgel',
			name: 'UVgel',
			title: 'Color de eco-solvente, secado de látex, temperatura de UV',
			text: 'Las tintas UVgel forman una capa delgada sobre el material y requieren menos tinta que una inyección tradicional. Combinan gama de color y resistencia a la luz, secado rápido sin olor y un proceso a baja temperatura con curado LED UV.'
		},
		{
			id: 'flxfinish',
			name: 'FLXfinish+',
			title: 'En un clic, dos acabados, una impresión',
			text: 'Elige acabado brillante o mate, e incluso ambos en una sola impresión, sin cambiar tintas, sustratos ni añadir un canal de barniz.'
		},
		{
			id: 'paint',
			name: 'Tecnología PAINT',
			title: 'Despreocúpate de vigilar la impresora',
			text: 'Un sensor piezoacústico supervisa cada inyector. Si detecta un fallo, lo desactiva temporalmente y lo compensa con los inyectores adyacentes para que la impresión continúe.'
		},
		{
			id: 'rmo',
			name: 'Operación continua',
			title: 'Rellena tinta y enrolla sin detenerte',
			text: 'Relleno de tinta durante la impresión, módulo de enrollado automatizado, impresión en el interior del rollo y a doble cara para pancartas y punto de venta.'
		}
	],
	benefits: [
		{ title: 'Automatización insuperable', text: 'Control ininterrumpido de inyectores, mantenimiento automático de cabezales, alimentación automática de sustratos y módulo de bobinado.' },
		{ title: 'Versatilidad inigualable', text: 'Impresiones duraderas en vinilos autoadhesivos, tejidos de poliéster, materiales sensibles al calor y papel.' },
		{ title: 'En un clic, dos acabados', text: 'Carteles satinados que destacan o papel tapiz con acabado mate y colores brillantes, desde un único dispositivo.' }
	],
	awards: ['Pinnacle Product Award', 'Pinnacle Technology Award · UVgel White Ink'],
	certifications: [
		'GREENGUARD Gold',
		'3M MCS Warranty',
		'Avery Dennison ICS Warranty',
		'AgBB',
		'M1 · Emission Classification',
		'Émissions dans l’air intérieur · A+',
		'EN15102 · CE Wallcoverings',
		'ASTM F793 Type II'
	],
	guideIntro: 'Tres preguntas para orientarte dentro de la serie Colorado. La configuración final la confirma un especialista.',
	guide: [
		{
			key: 'speed',
			q: '¿Qué productividad necesitas?',
			opts: [
				{ v: 'm3', l: 'Hasta 111 m²/h es suficiente' },
				{ v: 'm5', l: 'Necesito hasta 159 m²/h' }
			]
		},
		{
			key: 'white',
			q: '¿Necesitas tinta blanca?',
			opts: [
				{ v: 'si', l: 'Sí, necesito tinta blanca' },
				{ v: 'no', l: 'No, CMYK es suficiente' }
			]
		},
		{
			key: 'finish',
			q: '¿Quieres acabados mate y brillo (FLXfinish+)?',
			opts: [
				{ v: 'si', l: 'Sí, ambos acabados' },
				{ v: 'no', l: 'No es prioridad' }
			]
		}
	],
	resolveGuide: (a) => {
		const fast = a.speed === 'm5';
		const white = a.white === 'si';
		const finish = a.finish === 'si';
		const modelId = fast
			? white
				? 'colorado-m5-pro-w'
				: 'colorado-m5-pro'
			: white
				? 'colorado-m3-pro-w'
				: finish
					? 'colorado-m3-pro'
					: 'colorado-m3';
		const reasons = [fast ? 'Serie M5: hasta 159 m²/h en Gloss High Key.' : 'Serie M3: hasta 111 m²/h en Gloss.'];
		if (white) reasons.push('Incluye tinta blanca UVgel de alta opacidad.');
		if (finish || fast || white) reasons.push('Versión PRO con FLXfinish+: mate, brillo o ambos en una impresión.');
		if (!fast && !white && !finish) reasons.push('Las versiones PRO permiten sumar FLXfinish+ más adelante (arquitectura modular).');
		return { modelId, reasons };
	},
	faqs: [
		{
			q: '¿Qué es UVgel y en qué se diferencia de otras tintas?',
			a: 'Combina la gama de color y la resistencia a la luz de las tintas eco-solventes, el secado rápido y sin olor del látex y el proceso a baja temperatura de la tecnología UV. Forma una capa delgada sobre el material y usa menos tinta.'
		},
		{
			q: '¿Puedo imprimir mate y brillante con el mismo equipo?',
			a: 'Sí, con FLXfinish+ (versiones PRO): eliges mate, brillo o ambos en una sola impresión sin cambiar tintas, sustratos ni añadir un canal de barniz.'
		},
		{
			q: '¿Puedo ampliar mi equipo después?',
			a: 'Las versiones PRO tienen arquitectura modular actualizable en campo: tinta blanca, FLXfinish+, velocidad, soporte magnético y modos de textura FLXture, según el modelo.'
		},
		{
			q: '¿Qué materiales puedo imprimir?',
			a: 'Vinilos, papeles sin recubrimiento, textiles, materiales sensibles al calor, transparentes y texturizados. Las versiones W también reflectivos y magnéticos (opcional). Ancho de rollo de 1,625 mm y espesor hasta 1.6 mm.'
		},
		{ q: '¿Dónde descargo el brochure y las especificaciones?', a: `En el ${resourceLink} encontrarás el brochure de la serie Colorado M, sus especificaciones y la guía de la tecnología UVgel.` },
		supportFaq
	]
};

// ───────────────────────────── CAMA PLANA · Arizona ─────────────────────────────

const cama: Family = {
	slug: 'cama-plana',
	name: 'Cama plana',
	series: 'Arizona',
	slogan: 'Donde tus ideas toman forma, en cualquier superficie',
	h1: 'Impresoras de cama plana para materiales rígidos',
	lead: 'Imprime en madera, vidrio, acrílico, metal o piezas irregulares con calidad casi fotorrealista. Cuéntanos qué necesitas producir y un especialista Canon te ayudará a elegir el equipo.',
	seoTitle: 'Impresoras de cama plana Canon Arizona | Cotiza tu equipo',
	seoDescription:
		'Impresión UV en cama plana para madera, vidrio, acrílico, metal y piezas irregulares. Compara la gama Arizona y solicita asesoría o cotización con un especialista Canon.',
	heroImage: { src: '/img/arizona-2300.webp', alt: 'Impresora de cama plana Canon Arizona 2300 GTF', width: 882, height: 415 },
	chips: [
		{ label: 'Área', value: '125 × 250 cm' },
		{ label: 'Espesor', value: 'hasta 50.8 mm' },
		{ label: '6100 Mark II', value: 'hasta 220 m²/h' }
	],
	forWhat: 'Señalización rígida, decoración, packaging y piezas especiales sobre objetos planos o irregulares.',
	printsOn: 'Madera, vidrio, acrílico, metal, cerámica',
	surfacesTitle: 'Transforma cualquier superficie en una oportunidad',
	surfacesText:
		'Imprime donde tu imaginación te lleve: madera, vidrio, acrílico, azulejos o formas irregulares. Arizona lo convierte todo en un lienzo, hasta 50.8 mm de espesor.',
	surfacesKind: 'materiales',
	surfaces: [
		{ id: 'madera', name: 'Madera' },
		{ id: 'vidrio', name: 'Vidrio' },
		{ id: 'acrilico', name: 'Acrílico' },
		{ id: 'metal', name: 'Metales' },
		{ id: 'azulejo', name: 'Azulejos y cerámica' },
		{ id: 'mdf', name: 'MDF' },
		{ id: 'canvas', name: 'Canvas' },
		{ id: 'carton', name: 'Cartón y corrugado' }
	],
	modelsTitle: 'Cuatro plataformas, del primer proyecto a la producción 24/7',
	modelsText: 'Compara velocidad, formato y volumen. Puedes cotizar cualquier equipo directamente o pedir ayuda si aún no sabes cuál te conviene.',
	models: [
		{
			id: 'arizona-135-gt',
			name: 'Arizona 135 GT',
			segment: 'Bajo volumen',
			image: '/img/arizona-135gt.webp',
			tagline: 'La entrada a la impresión UV en cama plana, con calidad casi fotorrealista.',
			keySpecs: [
				{ label: 'Velocidad máx.', value: '34.2 m²/h' },
				{ label: 'Área de impresión', value: '125 × 250 cm' },
				{ label: 'Productividad anual', value: 'Desde 2,000 m²' }
			],
			specs: [
				{ label: 'Tecnología', value: 'VariaDot CMYKW (5 canales) con gotas de 6–30 pl para calidad casi fotorrealista.' },
				{ label: 'Velocidad máxima', value: 'Hasta 34.2 m²/h en modo Express.' },
				{ label: 'Área y tipo de impresión', value: 'Cama plana true‑flatbed de 125 × 250 cm, hasta 50.8 mm de espesor.' },
				{ label: 'Roll Media Option', value: 'Impresión en flexibles hasta 220 cm de ancho.' },
				{ label: 'Tintas UV‑curables', value: 'IJC357: CMYK en 800 ml + Blanco en 1 L.' },
				{ label: 'Productividad anual recomendada', value: 'Desde 2,000 m²/año.' },
				{ label: 'Operación', value: 'Automated Printhead Maintenance + curado LED‑UV instant‑on.' }
			],
			applications: 'Rígidos y flexibles: vidrio, madera, metales, tiles, MDF, canvas, acrílicos y más.'
		},
		{
			id: 'arizona-1300-gtf',
			name: 'Arizona 1300 GTF',
			segment: 'Bajo volumen',
			image: '/img/arizona-1300.webp',
			tagline: 'FLXflow, blanco y barniz para aplicaciones decorativas y táctiles.',
			keySpecs: [
				{ label: 'Velocidad máx.', value: '50.9 m²/h' },
				{ label: 'Área de impresión', value: '125 × 250 cm' },
				{ label: 'Canales', value: '4 / 6 / 8' }
			],
			specs: [
				{ label: 'Tecnología', value: 'VariaDot (4/6/8 canales) con gotas variables 6–42 pl para calidad cercana a fotográfica.' },
				{ label: 'Velocidad máxima', value: 'Hasta 50.9 m²/h en modo High‑Key (según configuración: 1340/1360/1380 GTF).' },
				{ label: 'Área y tipo de impresión', value: 'Cama plana true‑flatbed de 125 × 250 cm, hasta 50.8 mm de espesor.' },
				{ label: 'Tecnología de mesa', value: 'FLXflow: flujo de aire con mesa sin zonas, para sujeción mejorada y cambios rápidos de trabajo.' },
				{ label: 'Material flexible (opcional)', value: 'Roll Media Option para flexibles de hasta 219 cm de ancho.' },
				{ label: 'Tintas UV‑curables', value: '1340 GTF: CMYK · 1360 GTF: CMYK + White/Varnish · 1380 GTF: CMYK + White/Varnish + Light C/M.' },
				{ label: 'Operación', value: 'Automated Printhead Maintenance. Curado LED‑UV con encendido instantáneo.' }
			],
			applications: 'Canvas, madera, vidrio, azulejos, metales, cartón, MDF y objetos irregulares. Compatible con táctiles, barniz, multicapa y aplicaciones decorativas.'
		},
		{
			id: 'arizona-2300-gtf',
			name: 'Arizona 2300 GTF',
			segment: 'Medio volumen',
			image: '/img/arizona-2300.webp',
			tagline: 'Más velocidad, registro preciso y doble cara para producción constante.',
			keySpecs: [
				{ label: 'Velocidad máx.', value: '89 m²/h' },
				{ label: 'Área de impresión', value: '125 × 250 cm' },
				{ label: 'Texto legible', value: 'Hasta 2 pt' }
			],
			specs: [
				{ label: 'Tecnología', value: 'VariaDot (4/6/8 canales) con gotas variables 6–30 pl para calidad casi fotográfica y texto legible hasta 2 pt.' },
				{ label: 'Velocidad máxima', value: 'Hasta 89 m²/h en modo High‑Key (según modelo 2340/2360/2380 GTF).' },
				{ label: 'Área y tipo de impresión', value: 'Cama plana true‑flatbed: 125 × 250 cm (4 × 8 pies), hasta 50.8 mm de espesor.' },
				{ label: 'Tecnología de mesa', value: 'Arizona FLOW: mesa sin zonas, mínimo enmascarado; 8 pines neumáticos para registro preciso, turn & tumble y doble cara.' },
				{ label: 'Material flexible (opcional)', value: 'Roll Media Option para flexibles de hasta 219–220 cm de ancho (según mercado).' },
				{ label: 'Tintas UV‑curables', value: '2340 GTF: CMYK · 2360 GTF: CMYK + White/Varnish · 2380 GTF: CMYK + White/Varnish + Light C/M.' },
				{ label: 'Operación', value: 'Limpieza de canal en solo 24 segundos. Curado LED‑UV con encendido instantáneo.' }
			],
			applications: 'Canvas, madera, vidrio, cerámica, metales, plásticos, cartón, MDF y objetos irregulares. Multicapa, barniz, tactilidad, doble cara precisa y multi‑board.'
		},
		{
			id: 'arizona-6100-mark-ii',
			name: 'Arizona 6100 Mark II',
			segment: 'Alto volumen',
			image: '/img/arizona-6100.webp',
			tagline: 'Formato XL y hasta 220 m²/h para producción continua de alto volumen.',
			keySpecs: [
				{ label: 'Velocidad máx.', value: '220 m²/h' },
				{ label: 'Área de impresión', value: '308 × 250 cm' },
				{ label: 'Operación', value: '24/7' }
			],
			specs: [
				{ label: 'Tecnología', value: 'VariaDot 3ª generación (6 o 7 canales) con gotas 6–30 pl para calidad foto‑realista.' },
				{ label: 'Velocidad máxima', value: 'Hasta 220 m²/h en modo High‑Key, para producción continua de alto volumen.' },
				{ label: 'Área y tipo de impresión', value: 'True‑flatbed XL: 308 × 250 cm (hasta 309 × 251 cm edge‑to‑edge), hasta 50.8 mm de espesor.' },
				{ label: 'Tecnología de mesa', value: 'XTS Mark II (vacío clásico) y XTHF Mark II (High‑Flow para porosos o difíciles). Pines neumáticos dual‑origin para producción 2‑up.' },
				{ label: 'Tintas UV', value: 'IJC261/IJC262 en bolsas de 2–3 L (CMYK + Light C/M). Opcional: White y canales adicionales.' },
				{ label: 'Operación', value: 'Automated Printhead Maintenance System (AMS) totalmente automático. Curado LED‑UV instantáneo.' },
				{ label: 'Mejoras Mark II', value: 'Modos Production Plus / Quality Plus; mejoras en controladora, almacenamiento y seguridad.' }
			],
			applications: 'POS, packaging digital, señalización rígida, corrugados, materiales porosos, decoración y paneles industriales. Ideal para 24/7 y tirajes altos.'
		}
	],
	techTitle: 'Precisión que se nota en la preparación y en el acabado',
	techs: [
		{ id: 'flxflow', name: 'FLXflow', title: 'Sujeta el material con aire, no con cinta', text: 'Un flujo de aire inteligente fija materiales pesados, lisos o irregulares sin zonas ni enmascarado. Los modos Hold, Float e Instant Switch aceleran la preparación y reducen tiempos muertos.' },
		{ id: 'variadot', name: 'VariaDot', title: 'Cada gota, del tamaño que pide la imagen', text: 'Microgotas para el detalle fino, gotas medias para transiciones suaves y gotas mayores para áreas saturadas: resultados casi fotorrealistas incluso en los modos más rápidos.' },
		{ id: 'prisma', name: 'PRISMAelevate', title: 'Relieve táctil de hasta 4 mm', text: 'Capas de tinta aplicadas con precisión generan texturas y relieves para señalización accesible, prototipos y piezas decorativas premium.' },
		{ id: 'roll', name: 'Roll Media Option', title: 'Rígidos y flexibles en el mismo equipo', text: 'Integración roll‑to‑roll para ampliar el rango de sustratos flexibles sin modificar el flujo de producción.' }
	],
	benefits: [
		{ title: 'Transforma cualquier superficie en una oportunidad', text: 'Imprime en madera, vidrio, acrílico o materiales complejos con total precisión.' },
		{ title: 'Más fluidez, menos fricción', text: 'Arizona elimina pasos innecesarios y reduce errores, para producir más en menos tiempo sin sacrificar creatividad.' },
		{ title: 'Imprime con impacto y con responsabilidad', text: 'Tintas seguras, bajo consumo y menos desperdicio: potencia tus resultados mientras cuidas tu entorno.' }
	],
	awards: [
		'iF Design Award',
		'PRINTING United Alliance · Pinnacle Product Awards',
		'Keypoint Intelligence · Outstanding Innovation Award',
		'DPI Vision Award',
		'Viscom Innovation Award',
		'Product of the Year Award',
		'Digital Output Readers’ Choice Top 50',
		'Gold Medal of Poznan',
		'Wide-Format Imaging · Top Flatbed Product'
	],
	certifications: ['GREENGUARD Gold', 'CE', 'UL / C‑UL‑US · TÜV SÜD', 'GS · German DGUV', 'EMC · Cetecom Advanced', 'RCM · Australia & New Zealand', 'M1 · Emission Classification', 'AgBB · Alemania'],
	guideIntro: 'Responde tres preguntas y te mostramos un punto de partida. La recomendación final la confirma un especialista con tus materiales y volumen reales.',
	guide: [
		{
			key: 'vol',
			q: '¿Cuánto planeas producir?',
			opts: [
				{ v: 'bajo', l: 'Estoy empezando o hago tirajes cortos' },
				{ v: 'medio', l: 'Producción constante, volumen medio' },
				{ v: 'alto', l: 'Alta producción continua, incluso 24/7' }
			]
		},
		{
			key: 'finish',
			q: '¿Buscas acabados con barniz, texturas o relieve?',
			opts: [
				{ v: 'si', l: 'Sí, piezas decorativas o táctiles' },
				{ v: 'no', l: 'No, principalmente impresión a color' }
			]
		},
		{
			key: 'flex',
			q: '¿También imprimirás materiales flexibles en rollo?',
			opts: [
				{ v: 'si', l: 'Sí, también flexibles' },
				{ v: 'no', l: 'Solo rígidos' }
			]
		}
	],
	resolveGuide: (a) => {
		let modelId = 'arizona-135-gt';
		if (a.vol === 'alto') modelId = 'arizona-6100-mark-ii';
		else if (a.vol === 'medio') modelId = 'arizona-2300-gtf';
		else if (a.finish === 'si') modelId = 'arizona-1300-gtf';
		const seg = { bajo: 'bajo volumen', medio: 'medio volumen', alto: 'alto volumen' }[a.vol] ?? '';
		const reasons = [`Canon la ubica en ${seg}.`];
		if (a.finish === 'si' && modelId !== 'arizona-135-gt' && modelId !== 'arizona-6100-mark-ii') reasons.push('Configuraciones con White/Varnish para barniz, multicapa y tactilidad.');
		if (a.flex === 'si')
			reasons.push(modelId === 'arizona-6100-mark-ii' ? 'Está pensada para rígidos de alto volumen: un especialista revisará contigo la opción para flexibles.' : 'Admite Roll Media Option para flexibles.');
		return { modelId, reasons };
	},
	faqs: [
		{ q: '¿Necesito saber qué modelo quiero para pedir una cotización?', a: 'No. Elige “Aún no lo sé” en el formulario o usa la guía rápida. Un especialista te ayuda a definir el equipo según tus materiales y volumen.' },
		{ q: '¿Qué materiales puedo imprimir?', a: 'Rígidos como madera, vidrio, acrílico, metales, azulejos, MDF y cartón, además de objetos irregulares, hasta 50.8 mm de espesor. Con Roll Media Option, también flexibles. La compatibilidad exacta depende del modelo.' },
		{ q: '¿Qué diferencia hay entre GTF y XTF?', a: 'El área de trabajo: GTF ofrece 1.25 × 2.5 m y XTF 2.5 × 3.08 m, ambas optimizadas para impresión full‑bleed, paneles grandes y piezas precortadas con registro estable.' },
		{ q: '¿Puedo imprimir con blanco, barniz o relieve?', a: 'Las configuraciones 1360/1380 y 2360/2380 GTF incluyen White/Varnish, y PRISMAelevate permite relieves táctiles de hasta 4 mm. Confírmalo con tu especialista para tu aplicación.' },
		{ q: '¿Dónde descargo el brochure y las especificaciones?', a: `En el ${resourceLink} encontrarás el brochure de la gama Arizona y sus especificaciones técnicas.` },
		supportFaq
	]
};

// ───────────────────────────── TÉCNICO · imagePROGRAF TZ ─────────────────────────────

const tzCommon: Spec[] = [
	{ label: 'Velocidad de impresión', value: 'Hasta 243 impresiones tamaño D por hora.' },
	{ label: 'Calidad de impresión', value: 'Resolución máx. 2400 × 1200 ppp. Grosor mínimo de línea: 0.02 mm.' },
	{ label: 'Sistema de tinta', value: 'LUCIA TD, pigmento de 5 colores (MBK, BK, C, M, Y). Depósitos de 330 ml / 700 ml.' },
	{ label: 'Manejo de materiales', value: 'Doble rollo con carga frontal automática. Grosor del material de 0.07 a 0.8 mm; diámetro máx. del rollo 6.9″.' },
	{ label: 'Salida del material', value: 'Apilador superior integrado para hasta 100 impresiones ARCH E y salida frontal con canasta.' },
	{ label: 'Consumibles', value: 'Tinta 330 ml: PFI‑340 / PFI‑341 · 700 ml: PFI‑740 / PFI‑741. Cabezal PF‑06 (FINE).' }
];

const tecnico: Family = {
	slug: 'tecnico',
	name: 'Técnico',
	series: 'imagePROGRAF TZ',
	slogan: 'Donde la precisión se une a la productividad',
	h1: 'Impresoras técnicas para planos y documentos CAD',
	lead: 'Para entornos donde el tiempo de entrega y la exactitud son críticos: líneas nítidas para CAD, arquitectura e ingeniería, carga automática y apilado de hasta 100 impresiones.',
	seoTitle: 'Impresoras técnicas Canon imagePROGRAF TZ | Cotiza tu equipo',
	seoDescription:
		'imagePROGRAF TZ‑32000 y TZ‑32000 Z36 para planos CAD, arquitectura e ingeniería. Compara impresora y multifuncional y solicita asesoría con un especialista Canon.',
	heroImage: { src: '/img/tz-hero.webp', alt: 'Impresora técnica Canon imagePROGRAF TZ‑32000', width: 934, height: 715 },
	chips: [
		{ label: 'Velocidad', value: '243 impresiones D/h' },
		{ label: 'Resolución', value: '2400 × 1200 ppp' },
		{ label: 'Línea mínima', value: '0.02 mm' }
	],
	forWhat: 'Planos CAD, arquitectura, ingeniería y carteles con impresión técnica continua.',
	printsOn: 'Planos CAD, carteles, documentos técnicos',
	surfacesTitle: 'Hecha para CAD, arquitectura e ingeniería',
	surfacesText:
		'Impresiones de alta calidad y resistentes al agua, con líneas nítidas y capas distintas en planos CAD. La nueva tinta magenta reproduce un rojo intenso para diseños y carteles.',
	surfacesKind: 'aplicaciones',
	surfaces: [
		{ id: 'plano', name: 'Planos CAD' },
		{ id: 'arquitectura', name: 'Arquitectura' },
		{ id: 'ingenieria', name: 'Ingeniería' },
		{ id: 'cartel', name: 'Carteles' }
	],
	modelsTitle: 'Impresora o multifuncional: la misma precisión',
	modelsText: 'Ambas comparten motor de impresión, tintas LUCIA TD y manejo de doble rollo. La Z36 suma escáner para copiar y digitalizar planos.',
	models: [
		{
			id: 'tz-32000',
			name: 'imagePROGRAF TZ‑32000',
			segment: 'Impresora',
			image: '/img/tz-32000.webp',
			tagline: 'Impresión técnica continua con doble rollo y apilador integrado.',
			keySpecs: [
				{ label: 'Velocidad', value: '243 imp. D/h' },
				{ label: 'Resolución', value: '2400 × 1200 ppp' },
				{ label: 'Rollos', value: 'Doble rollo' }
			],
			specs: tzCommon
		},
		{
			id: 'tz-32000-z36',
			name: 'imagePROGRAF TZ‑32000 Z36',
			segment: 'Multifuncional',
			image: '/img/tz-32000-z36.webp',
			tagline: 'La TZ‑32000 con escáner Z36 para copiar, digitalizar y enviar planos.',
			keySpecs: [
				{ label: 'Velocidad', value: '243 imp. D/h' },
				{ label: 'Escaneo B/N', value: 'Hasta 13 ips' },
				{ label: 'Escaneo color', value: 'Hasta 6 ips' }
			],
			specs: [
				...tzCommon,
				{ label: 'Escáner Z36', value: 'CIS (Contact Image Sensor) SingleSensor. Hasta 13 ips (B/N) y 6 ips (color) en tamaño D, según el brochure de la serie TZ.' },
				{ label: 'Funciones MFP', value: 'Scan‑to‑Copy, Scan‑to‑File y Scan‑to‑Email con el software SmartWorks MFP.' }
			]
		}
	],
	techTitle: 'Menos retrocesos, menos tiempo muerto, más capacidad',
	techs: [
		{ id: 'lucia', name: 'LUCIA TD', title: 'Cinco tintas de pigmento y una nueva magenta', text: 'Negro mate, negro, cian, amarillo y una magenta recién formulada: líneas detalladas, texto nítido y un rojo intenso, con impresiones resistentes al agua.' },
		{ id: 'dualroll', name: 'Manejo inteligente', title: 'Cambio automático de rollo y detección de material', text: 'Alimentación y detección del tipo, longitud y ancho del material, con cambio automático entre dos rollos: una operación aproximadamente 34 % más rápida, según Canon.' },
		{ id: 'stacker', name: 'Apilador integrado', title: 'Hasta 100 impresiones ARCH E sin intervención', text: 'Apilador superior de fácil acceso frontal, pantalla táctil intuitiva y software Direct Print Plus para minimizar errores de impresión.' },
		{ id: 'secure', name: 'Seguridad', title: 'Protege la información de tus proyectos', text: 'Comunicaciones cifradas, impresión segura con código PIN, autenticación avanzada y borrado seguro del disco duro.' }
	],
	benefits: [
		{ title: 'Calidad profesional sin interrupciones', text: 'Sistema de tintas LUCIA TD de 5 colores y mayor nitidez de línea para CAD, carteles y más.' },
		{ title: 'Mejora tu operación y flujo de trabajo', text: 'Cambio automático de materiales y detección de tipo, longitud y ancho para una operación más ágil.' },
		{ title: 'Alta capacidad para impresiones continuas', text: 'Cambia tinta y bobinas durante la impresión y apila hasta 100 planos ARCH E.' }
	],
	awards: [],
	certifications: [],
	guideIntro: 'Las dos comparten motor de impresión. La diferencia está en el escáner.',
	guide: [
		{
			key: 'scan',
			q: '¿Necesitas escanear, copiar o digitalizar planos?',
			opts: [
				{ v: 'si', l: 'Sí, también escanear y copiar' },
				{ v: 'no', l: 'No, solo imprimir' }
			]
		}
	],
	resolveGuide: (a) =>
		a.scan === 'si'
			? { modelId: 'tz-32000-z36', reasons: ['Escáner Z36: hasta 13 ips en B/N y 6 ips en color (tamaño D).', 'Scan‑to‑Copy, Scan‑to‑File y Scan‑to‑Email con SmartWorks MFP.'] }
			: { modelId: 'tz-32000', reasons: ['Hasta 243 impresiones tamaño D por hora.', 'Doble rollo con carga automática y apilador de 100 impresiones.'] },
	faqs: [
		{ q: '¿Qué diferencia hay entre la TZ‑32000 y la TZ‑32000 Z36?', a: 'Comparten motor de impresión, tintas y manejo de materiales. La Z36 incluye escáner CIS para copiar, digitalizar y enviar planos por correo con SmartWorks MFP.' },
		{ q: '¿Puedo cambiar tinta o rollo sin detener la impresión?', a: 'Sí. La serie TZ permite cambiar los depósitos de tinta y las bobinas de soporte durante la impresión.' },
		{ q: '¿Qué materiales admite?', a: 'Rollos de 0.07 a 0.8 mm de grosor y hasta 6.9″ de diámetro, con doble rollo y carga frontal automática.' },
		{ q: '¿Las impresiones resisten el agua?', a: 'Sí. Las tintas de pigmento LUCIA TD producen impresiones resistentes al agua, aptas para uso seguro en exteriores.' },
		{ q: '¿Dónde descargo el brochure y las especificaciones?', a: `En el ${resourceLink} encontrarás el brochure de la serie imagePROGRAF TZ y sus especificaciones.` },
		supportFaq
	]
};

export const families: Family[] = [rollo, cama, tecnico];
export const familyBySlug = (slug: string) => families.find((f) => f.slug === slug);
