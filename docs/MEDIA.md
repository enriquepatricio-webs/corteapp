# Recursos visuales y movimiento

## Secuencia de la cabecera

- Archivo: `public/media/product-tour.mp4`.
- Montaje original de capturas reales de Edisol, Aenogen y Dorado Telecom; no es una grabación de interacciones.
- H.264, 1280 × 720, 13,7 segundos, sin audio, aproximadamente 819 KB.
- Imagen inicial: `public/projects/edisol.webp`. Se muestra desde el primer HTML y permanece visible si el vídeo falla.
- Reproducción automática solo en escritorio, sin preferencia de movimiento reducido ni ahorro de datos.
- En móvil se reproduce mediante el botón «Ver vídeo».
- Incluye pausa manual y pausa automática al salir de pantalla o cambiar de pestaña.
- Se sirve desde el propio proyecto, sin reproductores de terceros, cookies o etiquetas.

## Fondo fotográfico de apoyo

- Archivo final: `public/media/software-studio.webp`.
- Creado con la herramienta integrada `image_gen`, después optimizado como WebP. No se utilizó la API ni el CLI de generación.
- Imagen conceptual decorativa: no representa las oficinas ni el equipo real de CorteApp.
- Movimiento parallax ligado al desplazamiento; se desactiva con `prefers-reduced-motion`.

Prompt final:

> Use case: ads-marketing. Asset: full-width cinematic background image for a premium Spanish custom software/CRM studio website, CORTE.App. Generate one photorealistic editorial still, landscape 1792x1024 or similar wide ratio. A refined contemporary software development workspace after dusk, close oblique view of two slim professional monitors on a charcoal desk on the RIGHT HALF of the frame. Screens display believable but indistinct blue-white dashboard blocks and a few code lines without any readable words, no people, no brand logos. Architectural glass partition reflections, restrained electric cobalt blue #155eef practical light, deep midnight navy #101b30 shadows, brushed aluminum, tactile real materials. LEFT HALF mostly clean dark negative space, with subtle blue ambient light suitable for a white headline overlay. A sophisticated quiet technology mood, real camera photography, natural depth of field, architectural composition, screen glow, no neon cyberpunk, no fantasy interfaces, no floating UI, no stock handshake imagery, no text, no watermarks. Intended as conceptual atmospheric website imagery, not a photograph of an actual company's office.

## Ritmo de secciones

Cabecera clara → franja de clientes azul noche → soluciones azul suave → proyectos blancos → fotografía oscura con parallax → dispositivos en azul de marca → proceso blanco → FAQ gris suave con tarjetas → contacto azul noche con formulario blanco.

Las etiquetas numeradas y la línea de progreso refuerzan la orientación. El contenido permanece legible durante las animaciones de entrada, incluso al desplazarse rápido.
