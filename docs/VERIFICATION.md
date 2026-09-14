# Verificación de la landing

Fecha: 14 de septiembre de 2026.

- Compilación TypeScript y versión de producción con HTML prerenderizado: correctas.
- Navegador Chromium: sin errores de ejecución en la versión de producción.
- Anchuras revisadas: 320, 375, 390, 768, 1024, 1440 y 1920 px; sin desbordamiento horizontal.
- Pestañas de clientes: cambio por clic y navegación con flechas del teclado.
- Captura ampliada: apertura y cierre con Escape.
- Preguntas frecuentes: apertura y cierre nativos.
- Menú móvil: abre, navega y se cierra al elegir sección.
- Formulario: campos obligatorios y consentimiento validados; mensaje de WhatsApp codificado correctamente, incluidos caracteres especiales.
- La navegación a WhatsApp se interceptó durante las pruebas; no se envió ningún mensaje.
- Destinos de diagnóstico, privacidad y aviso legal comprobados.
- Revisión de contraste con axe y corrección de textos secundarios.
- Fuentes locales; sin etiquetas publicitarias ni analítica.

Las pruebas comprueban el envío hacia WhatsApp y el enlace de diagnóstico. No completan reservas reales ni evalúan sistemas externos que pertenecen a CorteApp.

## Ampliación de imágenes

Se añadieron cuatro capturas de apoyo en las soluciones y dos vistas móviles reales. Las seis imágenes se abren en un diálogo ampliable y se cierran con Escape. Revisión específica a 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal, imágenes cargadas y sin errores de ejecución ni incidencias en la comprobación automática de accesibilidad de los bloques nuevos.

## Diferenciación visual y movimiento

- Vídeo local: reproducción silenciosa en escritorio, pausa/reanudación manual y pausa fuera de pantalla verificadas.
- Móvil: imagen inicial y reproducción bajo petición comprobadas.
- Movimiento reducido y ahorro de datos: no se solicita el vídeo automáticamente.
- Fallo de carga del vídeo: permanece visible la imagen inicial.
- Parallax: desplazamiento del fondo comprobado; desactivado con movimiento reducido.
- Anchuras de 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal.
- Compilación correcta y sin errores de ejecución en Chromium. Comprobación automática axe de WCAG 2 A/AA y 2.1 AA sin incidencias; no equivale a una auditoría manual completa.
- Procedencia y tratamiento de los recursos documentados en `MEDIA.md`.
