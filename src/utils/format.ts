export function formatPriceGuaranies(price: number): string {
  return `Gs. ${price.toLocaleString('es-PY')}`;
}

export function generateSlug(marca: string, modelo: string, anio: number | undefined, id: string): string {
  const parts = [
    marca || '',
    modelo || '',
    anio ? anio.toString() : '',
    id.slice(0, 8)
  ].filter(Boolean);

  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateWhatsAppLink(numero: string, mensaje: string): string {
  let formattedNumber = numero.replace(/\D/g, '');

  if (formattedNumber.startsWith('0')) {
    formattedNumber = '595' + formattedNumber.slice(1);
  } else if (!formattedNumber.startsWith('595')) {
    formattedNumber = '595' + formattedNumber;
  }

  const encodedMessage = encodeURIComponent(mensaje);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}
