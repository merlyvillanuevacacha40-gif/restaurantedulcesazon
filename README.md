# Dulce Sazón Restaurante · ¡Comida con amor!

Web moderna de restaurante construida solo con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks). Es **responsive** (mobile-first) e **inclusiva**.

## Cómo verla
- Opción A: abre `index.html` con doble clic.
- Opción B (recomendada): `cd dulce-sazon` y luego `npx serve .` o `python -m http.server 8000`.

## Favicon y logo
- `favicon.png` (128×128, 37 KB) — **tu logo original optimizado** para la pestaña del navegador. Generado desde `logo-restaurant.png` (1254×1254, 1,6 MB) para que cargue rápido.
- `apple-touch-icon.png` (180×180) — ícono para iPhone/iPad al guardar la web.
- `favicon.svg` — favicon vectorial alternativo con gorro de chef y “DS” (rosa #EC4899).
- `logo.svg` — logo completo recreado en vector (badge rosa, chef, hamburguesa, papas, “Dulce Sazón Restaurante · ¡Comida con amor!”).
- El header usa tu imagen original `logo-restaurant.png`. Si quieres regenerar el favicon tras cambiar el logo, redimensiona `logo-restaurant.png` a 128×128 y guárdalo como `favicon.png`.

## Estructura
```
dulce-sazon/
├── index.html    # header, hero, carta, galería, testimonios, reservas, contacto
├── styles.css    # mobile-first, variables, breakpoints 640/900px
├── script.js     # carta, pedido, reservas, testimonios, A+/A- (tamaño de texto)
├── favicon.svg   # favicon
└── logo.svg      # logo vectorial (reemplazable por logo.png)
```

## Funcionalidades (JS)
| Funcionalidad | Cómo funciona |
|---|---|
| Carta desde datos | Array `MENU` en `script.js` → DOM |
| Filtro + buscador | Botones `aria-pressed` + búsqueda combinables |
| Detalle de plato | `<dialog>` nativo con alérgenos/kcal |
| Pedido | Agregar, +/−, total en vivo, vaciar |
| Reserva | Validación inline con `aria-describedby`, código simulado |
| Testimonios | Slider anterior/siguiente, pausa con `prefers-reduced-motion` |
| Extra inclusivo | Botones **A- / A+** que agrandan el texto y lo guardan en `localStorage` |

> Sin backend: la reserva se simula en el navegador. Para producción, enviar con `fetch()` a una API.

## Responsive
- **Móvil (<640px):** 1 columna, menú hamburguesa, botones ≥48px.
- **Tablet (≥640px):** grillas 2 columnas.
- **Escritorio (≥900px):** nav horizontal, hero/reservas 2 columnas, carta 3 columnas.

## Inclusión / accesibilidad
- HTML semántico, *skip-link*, foco visible `:focus-visible`, etiquetas reales, errores con `aria-invalid`/`aria-describedby`, `role="status"`.
- Contraste AA, unidades `rem`, badges con texto (no solo color).
- `prefers-reduced-motion` y `prefers-contrast: more` respetados.
- Imágenes con `alt` descriptivo, `loading="lazy"`, todo operable con teclado.

## Personalización rápida
- **Nombre/textos/horarios:** `index.html`
- **Platos/precios:** array `MENU` en `script.js` (`hamburguesas`, `papas`, `postres`, `bebidas`)
- **Colores/tipografías:** `:root` en `styles.css`
