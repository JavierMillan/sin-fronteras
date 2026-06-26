import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Contador } from "./Contador";

/* Hallmark · macrostructure: Marquee Hero ASIMÉTRICO (encuadre cinematográfico) · genre: atmospheric
 * theme: marca · pre-emit critique: P5 H5 E5 S5 R5 V5
 *
 * Dirección A "El encuadre desbalanceado" (Prism):
 * - Titular anclado al TERCIO INFERIOR-IZQUIERDO, sangrando, escala brutal. NO centrado.
 * - 2/3 derechos = bloque de foto tratado (río de luz + grano). Listo para enchufar /hero.jpg.
 * - Eyebrow ROTADO 90° en el margen izquierdo (crédito de cine).
 * - Stats como números marca de agua, no cajas.
 * Regla de tercios real; espacio negativo desbalanceado (aire arriba-izquierda).
 */

export function Hero() {
  return (
    <header
      id="top"
      className="grain relative isolate min-h-[100svh] w-full overflow-hidden bg-marca-tinta"
    >
      {/* ───────── Capa de foto / atmósfera: 2/3 DERECHOS a sangre ───────── */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
        <img
          src="/hero.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[58%_30%] opacity-30 md:opacity-90"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Río de luz diagonal cruzando el bloque derecho */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: "var(--rio-luz)" }}
        />
        {/* Fundido fuerte al borde izquierdo para que el titular siempre lea (figure/ground) */}
        <div className="absolute inset-0 bg-gradient-to-r from-marca-tinta via-marca-tinta/85 to-marca-tinta/20 md:via-marca-tinta/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-marca-tinta via-transparent to-marca-tinta/40" />
      </div>

      {/* ───────── Eyebrow ROTADO 90° en el margen izquierdo (crédito de cine) ───────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
      >
        <span className="flex origin-center -rotate-90 items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.35em] text-marca-hueso/55">
          <span className="h-px w-12 bg-marca-rojo" />
          Turista · Estudiante · Trabajo
        </span>
      </motion.div>

      {/* ───────── Contenido anclado al TERCIO INFERIOR-IZQUIERDO ───────── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-24">
        {/* Eyebrow horizontal solo en móvil/tablet (el rotado es desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-marca-hueso/70 lg:hidden"
        >
          <span className="h-px w-8 bg-marca-rojo" />
          Turista · Estudiante · Trabajo
        </motion.div>

        {/* Titular — escala brutal, sangra a la izquierda fuera del margen */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="-ml-1 max-w-[15ch] font-display text-[clamp(3rem,10vw,8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.03em] text-marca-hueso [overflow-wrap:break-word] md:-ml-2"
        >
          Tu visa, en manos{" "}
          <span className="text-marca-azul-claro">de los expertos.</span>
        </motion.h1>

        {/* Bloque de apoyo — desplazado a la izquierda, ancho contenido (tensión asimétrica) */}
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="md:col-span-6 lg:col-span-5"
          >
            <p className="font-hand text-2xl leading-snug text-marca-hueso/85">
              No se trata solo de papeles. Se trata de que tu historia se
              entienda bien.
            </p>
            <p className="mt-4 text-base leading-relaxed text-marca-hueso/70">
              Te acompañamos en visas de turista, estudiante y trabajo para
              EE.UU. y Canadá — con la preparación y la coherencia que tu caso
              necesita. <strong className="text-marca-hueso">Pre-califica gratis en 2 minutos.</strong>
            </p>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="#diagnostico"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-marca-rojo px-8 py-4 text-base font-bold text-white shadow-xl shadow-marca-rojo/25 transition hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-hueso"
              >
                <MessageCircle className="h-5 w-5" />
                Hacer mi pre-calificación
              </a>
              <span className="text-sm text-marca-hueso/55">
                Gratis · sin compromiso
              </span>
            </div>
          </motion.div>

          {/* Stats como tira inferior alineada a la base, números tabulares */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-end gap-8 md:col-span-6 md:col-start-7 md:justify-end lg:col-start-9 lg:col-span-4"
          >
            <Stat valor={<Contador valor={34} />} etiqueta="años de experiencia" />
            <span className="mb-1 h-10 w-px bg-marca-hueso/15" />
            <Stat
              valor={<Contador valor={10} prefijo="+" sufijo="K" />}
              etiqueta="trámites realizados"
            />
            <span className="mb-1 hidden h-10 w-px bg-marca-hueso/15 sm:block" />
            <div className="hidden min-w-0 sm:block">
              <dt className="font-display text-3xl font-extrabold leading-none text-marca-hueso md:text-4xl">
                LatAm
              </dt>
              <dd className="mt-1.5 max-w-[12ch] text-[0.7rem] leading-tight text-marca-hueso/55">
                atendemos toda Latinoamérica
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>

      {/* Indicador de scroll, anclado a la izquierda (no centrado) */}
      <motion.a
        href="#miedo"
        aria-label="Bajar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-6 z-10 text-marca-hueso/35 transition-colors hover:text-marca-hueso md:left-10"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </motion.a>
    </header>
  );
}

function Stat({
  valor,
  etiqueta,
}: {
  valor: React.ReactNode;
  etiqueta: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="font-display text-3xl font-extrabold leading-none text-marca-hueso md:text-4xl">
        {valor}
      </dt>
      <dd className="mt-1.5 max-w-[10ch] text-[0.7rem] leading-tight text-marca-hueso/55">
        {etiqueta}
      </dd>
    </div>
  );
}
