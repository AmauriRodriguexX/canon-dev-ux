<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { states, printTypes, links } from '#lib/data';
	import { families, type Family } from '#lib/families';
	import { leadState } from '#lib/lead-state.svelte';
	import { submitLead, type LeadResult } from '#lib/lead';
	import { track, trackOnce } from '#lib/analytics';

	// Sin `family` (hub) el formulario pregunta por la familia; con `family` ofrece sus equipos.
	let { family }: { family?: Family } = $props();

	const defaultPrint: Record<string, string> = {
		'rollo-a-rollo': 'Gráficos de gran formato',
		'cama-plana': 'Impresión en materiales rígidos',
		tecnico: 'Planos y documentos técnicos'
	};
	const formId = $derived(`formato-amplio-${family?.slug ?? 'hub'}`);
	const currentFamily = $derived(family ?? families.find((f) => f.slug === leadState.family));
	const modelOptions = $derived(currentFamily?.models ?? []);

	type FieldKey = 'name' | 'email' | 'phone' | 'state' | 'consent';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let stateMx = $state('');
	let company = $state('');
	let printType = $state('');
	let message = $state('');
	let consent = $state(false);
	let marketing = $state(false);
	let showDetails = $state(false);

	let touched = $state<Record<FieldKey, boolean>>({ name: false, email: false, phone: false, state: false, consent: false });
	let submitted = $state(false);
	let status = $state<'idle' | 'sending' | LeadResult['status']>('idle');
	let receiptId = $state('');
	let started = false;
	let root: HTMLFormElement;

	const helpIntent = $derived(leadState.intent === 'help' && !leadState.model);
	const submitLabel = $derived(helpIntent ? 'Solicitar asesoría' : 'Solicitar cotización');

	const errors = $derived({
		name: name.trim().length < 2 ? 'Escribe tu nombre.' : '',
		email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? 'Escribe un correo válido, por ejemplo nombre@empresa.com.' : '',
		phone: phone.replace(/\D/g, '').length < 10 ? 'Escribe un teléfono de al menos 10 dígitos.' : '',
		state: !stateMx ? 'Elige tu estado para asignarte un especialista.' : '',
		consent: !consent ? 'Necesitamos tu aceptación para contactarte.' : ''
	});
	const show = (k: FieldKey) => (submitted || touched[k]) && !!errors[k];

	function start() {
		if (started) return;
		started = true;
		track('lead_form_start', { form_id: formId, family: leadState.family || undefined, model: leadState.model || undefined });
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'sending') return; // bloqueo de doble envío
		submitted = true;
		const invalid = (Object.keys(errors) as FieldKey[]).filter((k) => errors[k]);
		if (invalid.length) {
			track('lead_form_error', { form_id: formId, error_fields: invalid.join(',') });
			await tick();
			// Enfoca el primer campo inválido dentro de este formulario (auditoría T03)
			root.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
			return;
		}

		status = 'sending';
		track('lead_submit_attempt', { form_id: formId, family: leadState.family || 'sin-familia', model: leadState.model || 'sin-modelo' });
		const result = await submitLead(
			{ name, email, phone, state: stateMx, family: leadState.family, model: leadState.model, company, printType, message, consent, marketing },
			formId,
			crypto.randomUUID()
		);
		status = result.status;
		if (result.status === 'accepted') {
			receiptId = result.id;
			// Conversión solo tras aceptación verificada por el servidor (auditoría T01/T05)
			track('generate_lead', { form_id: formId, family: leadState.family || 'sin-familia', model: leadState.model || 'sin-modelo' });
		} else if (result.status === 'rejected') {
			track('lead_form_error', { form_id: formId, error_code: result.code });
		}
	}

	onMount(() => {
		leadState.family = family?.slug ?? '';
		leadState.model = '';
		printType = family ? defaultPrint[family.slug] : '';
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((en) => en.isIntersecting)) {
					trackOnce(`lead_form_view-${formId}`, 'lead_form_view', { form_id: formId });
					io.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(root);
		return () => io.disconnect();
	});
</script>

<form
	bind:this={root}
	onsubmit={onSubmit}
	onfocusin={start}
	novalidate
	class="relative text-white"
	aria-labelledby="lead-title"
>
	{#if status === 'accepted' || status === 'preview'}
		<div class="py-6 text-center" role="status" aria-live="polite">
			<div class="mx-auto grid size-14 place-items-center rounded-full bg-white/10">
				<svg viewBox="0 0 24 24" class="size-7 text-white" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10" stroke-linecap="round" stroke-linejoin="round" /></svg>
			</div>
			{#if status === 'accepted'}
				<h3 class="mt-5 text-2xl font-semibold">Recibimos tu solicitud</h3>
				<p class="mx-auto mt-3 max-w-sm text-mist">
					Un especialista Canon revisará tu proyecto y te contactará. Tu folio es
					<strong class="font-semibold text-white">{receiptId}</strong>.
				</p>
			{:else}
				<h3 class="mt-5 text-2xl font-semibold">Vista previa del envío</h3>
				<p class="mx-auto mt-3 max-w-sm text-mist">
					El formulario validó tus datos, pero <strong class="text-white">aún no está conectado</strong> al sistema
					de Canon: no se envió ninguna información. Configura <code class="text-white">PUBLIC_LEAD_ENDPOINT</code>
					para recibir solicitudes reales.
				</p>
			{/if}
		</div>
	{:else}
		<div class="flex items-start justify-between gap-4">
			<div>
				<p class="eyebrow text-mist">Asesoría comercial</p>
				<h2 id="lead-title" class="mt-2 text-[1.65rem] leading-tight font-semibold">
					{#if !family}
						Habla con un especialista en formato amplio
					{:else if helpIntent}
						Te ayudamos a elegir tu {family.series}
					{:else}
						Cotiza tu equipo {family.slug === 'tecnico' ? 'técnico' : family.slug === 'cama-plana' ? 'de cama plana' : 'rollo a rollo'}
					{/if}
				</h2>
			</div>
		</div>
		<p class="mt-2 text-[0.95rem] leading-relaxed text-mist">
			Cuéntanos qué necesitas imprimir. Un especialista te ayudará a evaluar el equipo y los siguientes pasos.
		</p>

		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="lead-name" class="mb-1.5 block text-sm font-medium">Nombre completo</label>
				<input
					id="lead-name"
					class="field field-dark"
					autocomplete="name"
					bind:value={name}
					onblur={() => (touched.name = true)}
					aria-invalid={show('name')}
					aria-describedby={show('name') ? 'err-name' : undefined}
					required
				/>
				{#if show('name')}<p id="err-name" class="mt-1.5 text-sm text-[#ff9a9e]">{errors.name}</p>{/if}
			</div>

			<div>
				<label for="lead-email" class="mb-1.5 block text-sm font-medium">Correo de trabajo</label>
				<input
					id="lead-email"
					type="email"
					inputmode="email"
					class="field field-dark"
					autocomplete="email"
					placeholder="nombre@empresa.com"
					bind:value={email}
					onblur={() => (touched.email = true)}
					aria-invalid={show('email')}
					aria-describedby={show('email') ? 'err-email' : undefined}
					required
				/>
				{#if show('email')}<p id="err-email" class="mt-1.5 text-sm text-[#ff9a9e]">{errors.email}</p>{/if}
			</div>

			<div>
				<label for="lead-phone" class="mb-1.5 block text-sm font-medium">Teléfono</label>
				<input
					id="lead-phone"
					type="tel"
					inputmode="tel"
					class="field field-dark"
					autocomplete="tel"
					placeholder="55 1234 5678"
					bind:value={phone}
					onblur={() => (touched.phone = true)}
					aria-invalid={show('phone')}
					aria-describedby={show('phone') ? 'err-phone' : 'help-phone'}
					required
				/>
				{#if show('phone')}
					<p id="err-phone" class="mt-1.5 text-sm text-[#ff9a9e]">{errors.phone}</p>
				{:else}
					<p id="help-phone" class="sr-only">10 dígitos; puedes incluir lada internacional.</p>
				{/if}
			</div>

			<div>
				<label for="lead-state" class="mb-1.5 block text-sm font-medium">Estado</label>
				<select
					id="lead-state"
					class="field field-dark appearance-none"
					autocomplete="address-level1"
					bind:value={stateMx}
					onblur={() => (touched.state = true)}
					aria-invalid={show('state')}
					aria-describedby={show('state') ? 'err-state' : undefined}
					required
				>
					<option value="" disabled>Selecciona</option>
					{#each states as s (s)}<option value={s}>{s}</option>{/each}
				</select>
				{#if show('state')}<p id="err-state" class="mt-1.5 text-sm text-[#ff9a9e]">{errors.state}</p>{/if}
			</div>

			{#if !family}
				<div>
					<label for="lead-family" class="mb-1.5 block text-sm font-medium">
						Familia <span class="font-normal text-mist">(opcional)</span>
					</label>
					<select
						id="lead-family"
						class="field field-dark appearance-none"
						bind:value={leadState.family}
						onchange={() => (leadState.model = '')}
					>
						<option value="">Aún no lo sé</option>
						{#each families as f (f.slug)}<option value={f.slug}>{f.name} · {f.printsOn}</option>{/each}
					</select>
				</div>
			{/if}
			{#if modelOptions.length}
				<div class={family ? '' : 'sm:col-span-2'}>
					<label for="lead-model" class="mb-1.5 block text-sm font-medium">
						Equipo de interés <span class="font-normal text-mist">(opcional)</span>
					</label>
					<select id="lead-model" class="field field-dark appearance-none" bind:value={leadState.model}>
						<option value="">Aún no lo sé</option>
						{#each modelOptions as m (m.id)}<option value={m.name}>{m.name}</option>{/each}
					</select>
				</div>
			{/if}
		</div>

		<div class="mt-4">
			<button
				type="button"
				class="inline-flex items-center gap-2 text-left text-sm font-medium text-mist transition-colors hover:text-white"
				aria-expanded={showDetails}
				aria-controls="lead-details"
				onclick={() => (showDetails = !showDetails)}
			>
				<span class="grid size-5 place-items-center rounded-full border border-white/25 text-xs transition-transform duration-300 {showDetails ? 'rotate-45' : ''}">+</span>
				Agregar detalles de tu proyecto (opcional)
			</button>
			<div id="lead-details" class="grid gap-4 overflow-hidden transition-all duration-500 {showDetails ? 'mt-4 max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}" inert={!showDetails}>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="lead-company" class="mb-1.5 block text-sm font-medium">Empresa</label>
						<input id="lead-company" class="field field-dark" autocomplete="organization" bind:value={company} />
					</div>
					<div>
						<label for="lead-print" class="mb-1.5 block text-sm font-medium">¿Qué imprimes más?</label>
						<select id="lead-print" class="field field-dark appearance-none" bind:value={printType}>
							<option value="">Selecciona</option>
							{#each printTypes as p (p)}<option value={p}>{p}</option>{/each}
						</select>
					</div>
				</div>
				<div>
					<label for="lead-message" class="mb-1.5 block text-sm font-medium">Cuéntanos tu proyecto</label>
					<textarea id="lead-message" rows="3" class="field field-dark resize-none" placeholder="Materiales, medidas, volumen mensual…" bind:value={message}></textarea>
				</div>
			</div>
		</div>

		<div class="mt-5 space-y-3 text-sm">
			<div>
				<label class="flex items-start gap-3" for="lead-consent">
					<input
						id="lead-consent"
						type="checkbox"
						class="mt-0.5 size-5 shrink-0 accent-[#cc0000]"
						bind:checked={consent}
						onchange={() => (touched.consent = true)}
						aria-invalid={show('consent')}
						aria-describedby={show('consent') ? 'err-consent' : undefined}
						required
					/>
					<span class="text-mist">
						Acepto los <a class="link-u text-white" href={links.terms} target="_blank" rel="noopener">Términos y Condiciones</a>
						y el <a class="link-u text-white" href={links.privacy} target="_blank" rel="noopener">Aviso de Privacidad</a>.
					</span>
				</label>
				{#if show('consent')}<p id="err-consent" class="mt-1.5 pl-8 text-[#ff9a9e]">{errors.consent}</p>{/if}
			</div>
			<label class="flex items-start gap-3" for="lead-marketing">
				<input id="lead-marketing" type="checkbox" class="mt-0.5 size-5 shrink-0 accent-[#cc0000]" bind:checked={marketing} />
				<span class="text-mist">Quiero recibir novedades y promociones de Canon Mexicana.</span>
			</label>
		</div>

		{#if status === 'rejected'}
			<p class="mt-5 rounded-xl border border-[#ff6b70]/40 bg-[#ff6b70]/10 p-4 text-sm" role="alert">
				No pudimos confirmar el envío. Tus datos siguen aquí: inténtalo de nuevo o escríbenos desde
				<a class="link-u font-semibold" href={links.contact} target="_blank" rel="noopener">Contáctanos</a>.
			</p>
		{/if}

		<button type="submit" class="btn btn-primary mt-6 w-full" disabled={status === 'sending'} data-magnetic>
			{#if status === 'sending'}
				<span class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span> Enviando…
			{:else}
				{submitLabel} <span class="arrow" aria-hidden="true">→</span>
			{/if}
		</button>
		<p class="mt-3 text-center text-xs text-mist">
			Consulta cómo tratamos tus datos en el <a class="link-u" href={links.privacy} target="_blank" rel="noopener">Aviso de Privacidad</a>.
		</p>
	{/if}
</form>
