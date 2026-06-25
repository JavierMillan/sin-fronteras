/**
 * Testimonios en video para el feed tipo reel dentro del mockup de celular.
 * PLACEHOLDER: reemplazar `video` y `poster` con archivos reales en
 * /public/testimonios/ (con autorización). El primero refleja el caso semilla
 * real (esposa del fundador: visa negada → preparación → aprobada).
 */
export interface Testimonio {
  id: number;
  nombre: string;
  lugar: string;
  resultado: string;
  cita: string;
  video?: string; // ruta .mp4 en /public/testimonios/
  poster: string; // imagen de portada mientras carga el video
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 1,
    nombre: "María G.",
    lugar: "Michoacán",
    resultado: "Aprobada · tras una negativa previa",
    cita: "Ya me la habían negado. Esta vez llegué preparada y supe qué iba a pasar.",
    video: "/testimonios/testimonio-1.mp4",
    poster: "/testimonios/poster-1.jpg",
  },
  {
    id: 2,
    nombre: "Familia R.",
    lugar: "Jalisco",
    resultado: "4 visas aprobadas",
    cita: "Queríamos llevar a los niños a Disney y no sabíamos ni por dónde empezar.",
    video: "/testimonios/testimonio-2.mp4",
    poster: "/testimonios/poster-2.jpg",
  },
  {
    id: 3,
    nombre: "Jorge M.",
    lugar: "Nuevo León",
    resultado: "Aprobada · Canadá",
    cita: "Vivo lejos de un consulado y pensé que era imposible. No lo fue.",
    video: "/testimonios/testimonio-3.mp4",
    poster: "/testimonios/poster-3.jpg",
  },
  {
    id: 4,
    nombre: "Lucía T.",
    lugar: "CDMX",
    resultado: "Aprobada · 2ª vez",
    cita: "El primer 'no' me dolió. Pensé que ya había quedado marcada para siempre.",
    video: "/testimonios/testimonio-4.mp4",
    poster: "/testimonios/poster-4.jpg",
  },
];
