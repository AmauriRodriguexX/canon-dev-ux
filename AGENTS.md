# AGENTS.md — Canon México · Formato amplio

Portafolio de captación con hub (`/`) y tres familias: `/rollo-a-rollo` (Colorado), `/cama-plana` (Arizona) y `/tecnico` (imagePROGRAF TZ). Contexto y mapa de la auditoría en [README.md](./README.md). Auditoría original: `../auditoria-canon/Auditoria-UX-CRO-Canon-PPS.md`. Copias del sitio actual (fuente de contenido): `legacy/` (cama plana en `index.html`; rollo y técnico en `pages/`).

## Reglas

- **Usar pnpm** (`pnpm dev`, `pnpm check`, `pnpm build`). pnpm 9: `onlyBuiltDependencies` vive en `package.json` (no hay `pnpm-workspace.yaml`).
- **GitHub Pages:** `BASE_PATH` se inyecta en el build desde `actions/configure-pages`; los enlaces y medios locales deben usar `src/lib/paths.ts` para respetar ese prefijo.
- **SvelteKit 3:** importar código propio con `#lib/...` según el mapa `imports` de `package.json` (no agregar un alias `$lib`). Las variables de entorno se declaran en `src/env.ts` (`defineEnvVars`) y se importan de `$app/env/public`, no de `$env/*`.
- **Contenido real únicamente** (`src/lib/families.ts` por familia; `src/lib/data.ts` lo compartido). Para una familia nueva basta añadir una entrada: la ruta `[family]` la prerenderiza. Nada de precios, plazos de respuesta, ROI ni métricas que Canon no haya publicado.
- **Un formulario por página** (`#cotizar`: hero en familias, sección de contacto en el hub). Cualquier CTA nuevo usa `goToForm({ family, model, intent, position })` de `src/lib/lead-state.svelte.ts`.
- **Contrato de éxito estricto** (`src/lib/lead.ts`): no relajarlo. `generate_lead` solo tras `{ success: true, id }`.
- **CTA persistente:** en escritorio es el header (nunca se oculta); en móvil la barra inferior, que se oculta sobre `#cotizar` y `[data-hide-sticky]`. No debe tapar controles.
- **Movimiento:** atributos `data-reveal="lines|fade|mask"`, `data-stagger`, `data-parallax`, `data-drift`, `data-magnetic`, clase `.spot`. Todo respeta `prefers-reduced-motion`.
- **Clases propias de CSS dentro de `@layer components`** (en `app.css`); fuera de capa ganan a las utilidades de Tailwind y rompen cosas como `lg:sticky`.
- **Cursor de mano** en todo lo clicable (regla base en `app.css`).
- Verificar en 1440 × 900 y 390 × 844 antes de entregar.
- Tras crear o mover rutas con `pnpm dev` encendido, reinicia el servidor: el SSR puede quedar en blanco y producir errores de hidratación falsos.
