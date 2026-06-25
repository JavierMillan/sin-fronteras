import { motion } from "framer-motion";
import { ClipboardCheck, CalendarCheck, PlaneTakeoff } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * CÓMO FUNCIONA — secuencia editorial en zigzag (no 3 cards iguales).
 * Cada paso alterna lado, con número gigante marca de agua y una línea
 * vertical que cose la secuencia (continuity → guía el ojo hacia abajo).
 */

const PASOS = [
  {
    icon: ClipboardCheck,
    n: "01",
    titulo: "Diagnóstico gratis",
    texto:
      "Respondes 5 preguntas y entendemos tu caso: si ya te negaron, para cuándo viajas y desde qué estado.",
  },
  {
    icon: CalendarCheck,
    n: "02",
    titulo: "Cita + preparación",
    texto:
      "Te conseguimos cita real y te preparamos para la entrevista: montamos tu evidencia con coherencia para que tu historia se entienda bien.",
  },
  {
    icon: PlaneTakeoff,
    n: "03",
    titulo: "Llegas sólido",
    texto:
      "Te acompañamos hasta el día de la entrevista. Llegas tranquilo, preparado y con todo en regla.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="proceso"
      className="grain relative scroll-mt-20 overflow-hidden bg-marca-tinta px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Encabezado anclado a la izquierda, no centrado */}
        <Reveal>
          <p className="eyebrow text-marca-rojo">Cómo funciona</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] text-marca-hueso">
            Tres pasos, cero enredos.
          </h2>
        </Reveal>

        {/* Secuencia en zigzag con línea de continuidad */}
        <div className="relative mt-16">
          {/* Línea vertical que cose los pasos (solo desktop) */}
          <span
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--hairline)] to-transparent md:block"
          />

          <div className="space-y-16 md:space-y-24">
            {PASOS.map((p, i) => {
              const derecha = i % 2 === 1;
              return (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: derecha ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative md:w-1/2 ${
                    derecha ? "md:ml-auto md:pl-16" : "md:pr-16 md:text-right"
                  }`}
                >
                  {/* Número gigante marca de agua */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-10 select-none font-display text-[7rem] font-extrabold leading-none text-marca-hueso/[0.05] md:text-[9rem] ${
                      derecha ? "left-0" : "right-0"
                    }`}
                  >
                    {p.n}
                  </span>

                  <div
                    className={`relative flex items-start gap-4 ${
                      derecha ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-marca-azul/20 text-marca-azul-claro">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-tight text-marca-hueso">
                        {p.titulo}
                      </h3>
                      <p className="mt-2 max-w-sm text-marca-hueso/70">
                        {p.texto}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
