# Canon México · Formato amplio — portafolio de captación

Rediseño del portafolio de **Soluciones de Formato Amplio** de Canon México (hoy en WordPress + Elementor), orientado a recuperar leads de Paid Media según la auditoría UX/CRO de `../auditoria-canon/`.

| Ruta | Contenido | Página actual de Canon |
|---|---|---|
| `/` | Hub: las tres familias por lo que imprimen, comparativa y contacto general | — |
| `/rollo-a-rollo` | Serie **Colorado** (UVgel): M3, M3 PRO, M3 PRO W, M5 PRO, M5 PRO W, XL | `formato-amplio-rollo-a-rollo` |
| `/cama-plana` | Serie **Arizona**: 135 GT, 1300 GTF, 2300 GTF, 6100 Mark II | `formato-amplio-cama-plana` (la auditada) |
| `/tecnico` | Serie **imagePROGRAF TZ**: TZ‑32000 y TZ‑32000 Z36 | `formato-amplio-tecnico` |

- **Stack:** SvelteKit 3 · Svelte 5 (runes) · Tailwind CSS 4 · GSAP + Lenis · build estático (`adapter-static`, un `index.html` por ruta).
- **Contenido:** sale de las páginas actuales (copias en `legacy/`). Todo vive en `src/lib/families.ts` (una entrada por familia, misma plantilla). No añadir cifras, plazos ni promesas sin respaldo de Canon.

## Comandos (pnpm)

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm check        # tipos y Svelte
pnpm build        # genera build/ (HTML estático)
pnpm preview      # sirve build/
```

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` instala dependencias, genera el sitio estático y lo publica al subir cambios a `main` (también se puede ejecutar manualmente desde Actions). Sube el contenido de `build/`; las rutas de familia se generan como carpetas con `index.html`, por lo que funcionan al abrirlas directamente.

La primera vez, en el repositorio abre **Settings → Pages** y selecciona **GitHub Actions** como origen. El workflow toma el prefijo del repositorio desde `actions/configure-pages`, así que `pnpm dev` sigue usando `http://localhost:5173/` y Pages puede servir el sitio bajo `/canon-dev-ux/`.

## Cómo resuelve la auditoría (en cada familia)

| Hallazgo | Solución |
|---|---|
| F01 · Sin acción comercial al inicio | H1 por familia + «Solicitar cotización» y «Necesito ayuda para elegir»; header con CTA fijo en escritorio |
| F02 · Formulario tras imagen y ficha | Formulario visible en el hero (escritorio a la derecha; móvil tras los CTA). Tarjetas con «Cotizar este equipo» |
| F03 · Ficha técnica antes de convertir | La ficha abre con el CTA arriba; especificaciones debajo |
| F04 · 9 campos | 4 obligatorios (nombre, correo, teléfono, estado) + equipo opcional; el resto en «Agregar detalles» |
| F05 · Campos genéricos | Labels persistentes, `type=email/tel`, `autocomplete`, `aria-invalid` + `aria-describedby` |
| F06 · CTA «Enviar» | «Solicitar cotización» / «Solicitar asesoría» y qué pasa después, sin plazos inventados |
| F07 · Salidas que compiten | Soporte técnico diferenciado; recursos como enlace secundario |
| F08 · Scroll horizontal en móvil | Tarjetas verticales; la comparativa del hub es tabla en escritorio y tarjetas en móvil |
| F09 · Selección poco guiada | Guía «¿Cuál elijo?» por familia con la segmentación real de Canon; en el hub, elección por lo que se imprime |
| T01 · Éxito permisivo | `src/lib/lead.ts`: solo `{ success: true, id }` en JSON muestra éxito; lo demás es fallo y conserva los datos |
| T02 · Formularios duplicados | Un formulario por página (`#cotizar`); los CTA llevan a él con familia y modelo como contexto |
| T03 · Errores con scroll exterior | Foco al primer campo inválido dentro del formulario |
| T04 · Atribución | UTM, gclid/gbraid/wbraid/fbclid, URL de llegada y referrer en el payload |
| T05 / §11 · Medición | `dataLayer`: `commercial_cta_view/click`, `product_detail_open`, `lead_form_view/start/error`, `lead_submit_attempt`, `selector_result`, `resource_click` y `generate_lead` **solo** tras aceptación del servidor. `form_id` = `formato-amplio-{hub|familia}` |

## Conectar el formulario

Copia `.env.example` a `.env` y define `PUBLIC_LEAD_ENDPOINT` **antes de `pnpm build`**. El endpoint recibe `POST` JSON (con `family`, `model`, `form_id` y atribución) y cabecera `Idempotency-Key`, y debe responder `{ "success": true, "id": "<folio>" }`. Sin endpoint, el formulario muestra «Vista previa del envío» y no envía datos.

## Pendientes antes de publicar

- Endpoint/CRM real y prueba de recepción extremo a extremo; GTM (`GTM-K3648F6D`) con consentimiento.
- **Validar con Canon:**
  - **Colorado XL:** su ficha en el sitio actual repite los datos del M5 PRO W (rollo de 1,625 mm). Aquí se muestra sin especificaciones.
  - **Técnico:** premios y certificaciones aparecen como «Premio 1 / Certificado 1» en el sitio actual; aquí se omiten.
  - **Colorado:** las botellas de tinta figuran como 0.7 L en la ficha del M3 y como «1 L y depósito de 2.5 L» en las características.
  - Brochures por modelo: hoy se enlaza al centro de recursos porque los botones del sitio actual apuntan a `#`.
- Fotografías reales de aplicaciones: los materiales usan texturas ilustrativas en CSS.
- El formulario permanece en modo de vista previa hasta conectar `PUBLIC_LEAD_ENDPOINT`; el build de Pages no configura ni publica credenciales del CRM.
