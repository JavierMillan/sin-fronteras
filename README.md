# SIN FRONTERAS — Landing de pre-calificación

Landing one-page que pre-califica prospectos de **visa de turista (EE.UU./Canadá)** y los envía a
WhatsApp ya con sus datos. Sitio estático (Vite + React + Tailwind + framer-motion), pensado para
**GitHub Pages** sin backend.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # genera /dist
npm run preview  # previsualiza el build
```

## Deploy a GitHub Pages (automático con GitHub Actions)

El repo incluye `.github/workflows/deploy.yml`: en cada `git push` a `main`, GitHub compila el
proyecto y publica la versión estática. **Tú no corres el build a mano.**

Configuración inicial (una sola vez):

1. Crea el repo en GitHub. **Si NO se llama `sin-fronteras`**, edita `base` en `vite.config.ts`
   a `"/<nombre-del-repo>/"`. Si usas dominio propio, pon `base: "/"`.
2. Sube el código:
   ```bash
   git init
   git add .
   git commit -m "Landing SIN FRONTERAS"
   git remote add origin https://github.com/TU_USUARIO/sin-fronteras.git
   git push -u origin main
   ```
3. En GitHub → **Settings → Pages → Source: GitHub Actions**.

A partir de ahí, tu flujo de siempre publica los cambios:
```bash
git add .
git commit -m "cambié un texto"
git push
```

## Imágenes a colocar en `/public`

- `hero.jpg` — retrato del hero (la imagen del anuncio "mujer en la ventana" o una variante).
- `casos/caso-1.jpg … caso-4.jpg` — fotos de los casos de éxito (con autorización).

Mientras no existan, la página degrada con elegancia (fondos de marca).

## Personalización rápida

- **WhatsApp / teléfono:** `src/lib/utils.ts`.
- **Casos de éxito:** `src/data/casos.ts` (placeholder → reemplazar por reales).
- **Colores de marca:** `tailwind.config.ts` (paleta del Manual de Identidad).
- **Campos del formulario:** `src/components/FormularioPrecalificacion.tsx` (array `PASOS`).
