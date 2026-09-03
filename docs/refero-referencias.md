# Referencias Refero — SIN FRONTERAS

Patrones ya resueltos y probados que aplican a este proyecto, con el problema
concreto que resuelve cada uno. La idea no es copiar pantallas: es no reinventar
estructuras que millones de personas ya saben leer.

---

## 1. Lista numerada + pieza protagonista (la estructura de "Historias")

**El problema:** cómo mostrar 4 testimonios sin que compitan entre sí ni caigan
en miniaturas ilegibles.

| Referencia | Qué resuelve |
|---|---|
| [YouTube Music — álbum](https://refero.design/pages/d6d15bf8-083c-48fa-9639-28bc7a4dd144) | **La más aplicable.** Arte grande a la izquierda, lista numerada a la derecha: `nº · título · metadato secundario` con la duración alineada al borde derecho. La fila activa se distingue por peso tipográfico, no por caja ni fondo. |
| [Spotify — Liked Songs](https://refero.design/pages/35f041df-5c94-43e3-a278-6f3b7c692eac) | La misma gramática sobre fondo oscuro, con tabla de pistas y jerarquía por opacidad. |
| [Loom — video + capítulos](https://refero.design/pages/55e6a7d0-f148-48ee-9222-eeeb7f40daa4) | Capítulos como **texto plano con timestamp**, sin miniaturas ni tarjetas. Valida el argumento de no miniaturizar el video. |
| [Supercut](https://refero.design/pages/8b749203-9735-4f68-9d78-a7d676a5c2aa) | Reproductor con lista de capítulos al lado, en dos columnas. |
| [Ballpark — índice lateral](https://refero.design/pages/7713108f-4be9-43fa-8517-ac5157b875a3) | Índice fijo a la derecha para saltar entre secciones. |

**Lo que se toma:** la fila de índice `01 — MARICHUI · MICHOACÁN` con el resultado
alineado a la derecha, y el testimonio activo marcado por peso y opacidad.
**Lo que NO se toma:** el rail de navegación, el reproductor persistente inferior
y el fondo con gradiente de Spotify.

---

## 2. Editorial oscuro con reglas hairline (la piel de "Historias")

**El problema:** dar estructura sin tarjetas, y dejar que el color venga del
material documental en vez del CSS.

| Referencia | Qué resuelve |
|---|---|
| [Julia Krantz](https://juliakrantz.com) | **La más cercana a C.** Negro puro, divisores fantasma de 1px, texto en columnas separadas por reglas con ritmo archival, mosaico a sangre sin redondeo ni sombras. Clave: *la UI se queda monocroma y la fotografía aporta todo el color* — que es justo la doctrina del amarillo heredado. |
| [19–86](https://19-86.fr) | Reglas de 1px, alineación tabular, estructura de documento. Numeral gigante como monumento tipográfico: el modelo del folio `01–04`. |
| [Index](https://index-space.org) | Estructura tipo índice con cápsulas de contorno; imágenes documentales en bloques. |
| [Fonts In Use](https://fontsinuse.com) | Catálogo/archivo: metadato bajo cada pieza, denso y ordenado sin decoración. |
| [Koto](https://koto.com) | Agencia sobre carbón: bordes fantasma, divisores tenues, un único acento vivo. |
| [Liron Moran](https://www.lironmoran-interiors.com) | Foto vertical tratada como obra enmarcada sobre fondo oscuro, sin tratamiento. |

**Lo que se toma:** hairline como única estructura, cero sombras, radio mínimo,
metadato pequeño en mayúsculas con tracking, y la disciplina de dejar que el
color lo ponga el material.
**Lo que NO se toma:** el negro puro (el perfil de marca prohíbe `#000` — se usa
Tinta `#0A0E1A`), ni el registro de lujo frío.

---

## 3. Sin explotar todavía (oportunidades en otras secciones)

- **FAQ / acordeón:** [Mercury SAFE](https://refero.design/pages/92edcb08-b744-4dcc-9114-aeb322ec338c) — formulario por pasos, lista de razones a dos columnas, FAQ en acordeón y testimonios, todo en una landing de conversión. Aplicable al FAQ empático y al embudo de pre-calificación.
- **Formulario multi-paso:** el mismo Mercury resuelve el paso a paso con indicador, que es la forma del formulario ramificado.
- **Directorio / lista de casos:** [Deel — partners](https://refero.design/pages/ccb55279-bd1a-4521-be64-feca43432f70) — lista vertical de tarjetas anchas con logo a la izquierda y dato a la derecha.
- **Muro de prueba social mixto:** [Tango — customers](https://refero.design/pages/425be43a-711d-4a14-9449-dfed4943a24c) — videos y tarjetas de cita conviviendo en una misma retícula. Descartado para Historias (produce la monotonía de retícula), pero sirve si algún día hay 12+ testimonios y una página dedicada.

---

## Cómo usar esto

Al abordar una sección nueva, buscar primero en Refero el **patrón funcional**
(qué hace la sección), no la estética. La estética la manda
`brand-profile-sin-fronteras.md`; Refero aporta la estructura ya probada. Cuando
las dos chocan, gana el perfil de marca.
