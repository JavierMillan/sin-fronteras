import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Número de WhatsApp del negocio en formato internacional (sin signos). */
export const WHATSAPP_NUMERO = "523541060478";
/** Teléfono para llamadas, formato visible. */
export const TELEFONO_VISIBLE = "354 112 0758";
export const WHATSAPP_VISIBLE = "354 106 0478";

/**
 * Construye el deep link de WhatsApp con un mensaje pre-llenado.
 * Funciona sin backend: el lead llega íntegro al WhatsApp del negocio.
 */
export function construirLinkWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
