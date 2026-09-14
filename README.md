# CORTE.App — Landing de software y CRM a medida

Landing responsive para una campaña de Google Ads. Incluye proyectos reales, cinco componentes de Magic UI publicados en el catálogo 21st, galería ampliable, preguntas frecuentes y contacto por WhatsApp y diagnóstico.

## Puesta en marcha

Requiere Node.js 22.12+ (24 recomendado).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` genera `dist/` con HTML prerenderizado, fuentes locales y recursos estáticos. Vercel utiliza `vercel.json`.

## Copiar para el cliente

1. Copiar o clonar el repositorio.
2. Revisar los destinos de contacto en `src/config.ts`.
3. Adaptar el contenido en `src/App.tsx` y la marca en `src/styles.css` y `public/brand/`.
4. Importar el repositorio en Vercel y publicar; no necesita variables de entorno.

## Contacto

El formulario valida nombre, empresa y aceptación de privacidad y abre WhatsApp con un mensaje preparado. El visitante debe revisarlo y enviarlo allí. **No almacena contactos y no muestra un envío ficticio.** La segunda vía dirige a la reserva real de diagnóstico de CorteApp. También hay acceso directo por WhatsApp y correo electrónico.

## Medición

Por petición expresa, no se incluyen Google Tag Manager, Google Ads, Analytics, píxeles, cookies de seguimiento ni eventos de conversión. La medición deberá configurarse más adelante si el cliente la solicita. No hay dependencias de servidores de fuentes externos.

## Recursos y licencias

Consultar `docs/COMPONENTS.md` y `docs/MAGIC-UI-LICENSE.md`. Solo las capturas revisadas de `public/projects` se publican. Los originales privados de referencia quedan fuera del repositorio.

## Verificación

Compilación TypeScript, prerenderizado y revisión en navegador de escritorio y móvil, pestañas con teclado, galería, preguntas frecuentes, menú, validación del formulario y destinos de contacto. No se envían mensajes reales durante las pruebas.
