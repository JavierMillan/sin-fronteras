/**
 * Prueba social del expediente: testimonios en video (subtítulos quemados,
 * porque el reproductor arranca en muted), la hoja de aprobación de cada caso y
 * las fotos de reencuentro. Material real provisto por Lupita — son clientes
 * reales, así que cualquier cambio de copy debe seguir reflejando lo que
 * dijeron en cámara. Quien no se identifica por nombre va como folio de
 * expediente: inventarle un nombre sería atribuirle una identidad falsa.
 */
export interface Testimonio {
  id: number;
  nombre: string;
  lugar: string;
  resultado: string;
  cita: string;
  video: string;
  poster: string;
  /** Sin rostro a cuadro: se narra en off sobre el paisaje. */
  sinRostro?: boolean;
}

export interface Cita {
  id: number;
  /** Ata la cita a su testimonio: son personas reales, la cita mostrada tiene
   *  que ser de quien está en pantalla. */
  testimonioId: number;
  texto: string;
  autor: string;
  lugar: string;
}

export interface Aprobacion {
  id: number;
  foto: string;
  alt: string;
}

/** Videos reales, en el orden del folio 01-04 del índice. */
export const TESTIMONIOS: Testimonio[] = [
  {
    id: 1,
    nombre: "Marichui",
    lugar: "Michoacán",
    resultado: "Visas aprobadas",
    cita: "Me aprobaron las visas gracias a Sin Fronteras.",
    video: `${import.meta.env.BASE_URL}testimonios/testimonio-1.mp4`,
    poster: `${import.meta.env.BASE_URL}testimonios/poster-1.jpg`,
  },
  {
    id: 3,
    nombre: "Expediente 02",
    lugar: "México",
    resultado: "Canadá · va por la americana",
    cita: "Ya me llegó mi visa. Los asesores me prepararon bastante bien.",
    video: `${import.meta.env.BASE_URL}testimonios/testimonio-3.mp4`,
    poster: `${import.meta.env.BASE_URL}testimonios/poster-3.jpg`,
  },
  {
    id: 2,
    nombre: "Agustín",
    lugar: "De vacaciones en Canadá",
    resultado: "Visa canadiense",
    cita: "Miren dónde ando. Confíen en ellos, se los dice un amigo.",
    video: `${import.meta.env.BASE_URL}testimonios/testimonio-2.mp4`,
    poster: `${import.meta.env.BASE_URL}testimonios/poster-2.jpg`,
    sinRostro: true,
  },
  {
    id: 4,
    nombre: "Expediente 04",
    lugar: "Latinoamérica",
    resultado: "Visa canadiense",
    cita: "Los mejores aliados en visas estadounidenses y canadienses.",
    video: `${import.meta.env.BASE_URL}testimonios/testimonio-4.mp4`,
    poster: `${import.meta.env.BASE_URL}testimonios/poster-4.jpg`,
  },
];

/** Una cita por testimonio, atada por `testimonioId`: la frase que se lee es
 *  de quien está en pantalla, sacada de lo que dijo en cámara. */
export const CITAS: Cita[] = [
  {
    id: 1,
    testimonioId: 1,
    texto: "Me aprobaron las visas gracias a Sin Fronteras.",
    autor: "Marichui",
    lugar: "Michoacán",
  },
  {
    id: 2,
    testimonioId: 3,
    texto: "Ya viajé dos veces a Canadá. Ahora vamos por la americana, con toda la familia.",
    autor: "Expediente 02",
    lugar: "México",
  },
  {
    id: 3,
    testimonioId: 2,
    texto: "Miren dónde ando. Confíen en ellos, se los dice un amigo.",
    autor: "Agustín",
    lugar: "De vacaciones en Canadá",
  },
  {
    id: 4,
    testimonioId: 4,
    texto: "Los mejores aliados en visas estadounidenses y canadienses.",
    autor: "Expediente 04",
    lugar: "Latinoamérica",
  },
];

/** Misma hoja verde, distintas personas: el patrón es el mensaje. */
export const APROBACIONES: Aprobacion[] = [
  { id: 1, foto: `${import.meta.env.BASE_URL}testimonios/aprobacion-1.jpg`, alt: "Clienta muestra su visa aprobada" },
  { id: 2, foto: `${import.meta.env.BASE_URL}testimonios/aprobacion-2.jpg`, alt: "Familia con su visa aprobada" },
  { id: 3, foto: `${import.meta.env.BASE_URL}testimonios/aprobacion-3.jpg`, alt: "Clienta con su documento de viaje" },
  { id: 4, foto: `${import.meta.env.BASE_URL}testimonios/aprobacion-4.jpg`, alt: "Cliente con su visa aprobada" },
];

/** Para qué sirvió la visa: el cierre emocional de la sección. */
export const REENCUENTROS = [
  { id: 1, foto: `${import.meta.env.BASE_URL}testimonios/familia-1.jpg`, alt: "Familia reunida en casa" },
  { id: 2, foto: `${import.meta.env.BASE_URL}testimonios/familia-2.jpg`, alt: "Familia reunida al aire libre" },
  { id: 3, foto: `${import.meta.env.BASE_URL}testimonios/familia-3.jpg`, alt: "Celebración del Día del Padre" },
  { id: 4, foto: `${import.meta.env.BASE_URL}testimonios/familia-4.jpg`, alt: "Pareja frente al Golden Gate" },
];
