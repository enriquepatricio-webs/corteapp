// Cambia estos datos para reutilizar la landing. No hay analítica ni etiquetas publicitarias.
export const contact = {
  whatsapp: "34640083856",
  email: "info@corteapp.es",
  bookingUrl: "https://www.corteapp.es/diagnostico/",
  privacyUrl: "https://www.corteapp.es/privacy-policy/",
  legalUrl: "https://www.corteapp.es/aviso-legal/",
};
export function whatsappUrl(
  message = "Hola, me gustaría hablar sobre un software a medida para mi empresa.",
) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
