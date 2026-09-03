import { motion } from "framer-motion";
import { HeartHandshake, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * ACOMPAÑAMIENTO PRESENCIAL / ADULTOS MAYORES. Momento cálido, humano — el
 * alma del servicio. Voz "nuestro equipo" (sin nombrar a Lupita). Énfasis en
 * adultos mayores: tranquilidad para la familia. CTA ancla al formulario.
 * Fondo papel (segundo momento de luz) para separar del registro oscuro.
 */

const PUNTOS = [
  {
    icon: Users,
    titulo: "Para tu mamá o tu papá",
    texto:
      "Ya no manejan hasta la ciudad, no quieren molestar a nadie, y tú no puedes faltar al trabajo. Nosotros pasamos por ellos y los llevamos.",
  },
  {
    icon: HeartHandshake,
    titulo: "Cuando la familia está lejos",
    texto:
      "Tus hijos están en el otro lado, no hay quién te lleve, y no sabes ni por dónde queda. Ese día, no vas solo: vamos contigo.",
  },
  {
    icon: ShieldCheck,
    titulo: "Si estás lejos y te preocupa",
    texto:
      "Sabemos lo que es no poder estar. Muchos como tú se sentían culpables de no acompañar a los suyos — hasta que supieron que alguien de confianza ya iba con ellos.",
  },
];

export function Acompanamiento() {
  return (
    <section
      id="acompanamiento"
      className="paper-grain relative scroll-mt-20 overflow-hidden bg-marca-papel px-6 py-24 text-marca-tinta md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-12">
          {/* Texto principal — columna izquierda */}
          <Reveal className="md:col-span-6">
            <div>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold uppercase leading-[0.92]">
                No tienes que{" "}
                <span className="text-marca-rojo">hacerlo solo.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-marca-tinta/75">
                Llegar a un consulado que no conoces, en una ciudad que no es la
                tuya, y no tener a nadie al lado… da nervios. Y está bien
                sentirlo.
              </p>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-marca-tinta/75">
                Por eso, si lo pides, alguien de nuestro equipo{" "}
                <strong className="text-marca-tinta">
                  va contigo el día de tu cita
                </strong>
                . Te espera, entra contigo y no se despega hasta que terminas.
              </p>

              <a
                href="#diagnostico"
                className="group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-marca-tinta px-8 py-4 text-base font-bold text-marca-hueso transition hover:scale-[1.03]"
              >
                Quiero que me acompañen
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Puntos — columna derecha, apilados */}
          <div className="space-y-5 md:col-span-6">
            {PUNTOS.map((p, i) => (
              <motion.div
                key={p.titulo}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 rounded-2xl bg-white/60 p-5 shadow-[0_10px_30px_-15px_rgba(10,14,26,0.2)]"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-marca-rojo/10 text-marca-rojo">
                  <p.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold uppercase leading-tight">
                    {p.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-marca-tinta/65">
                    {p.texto}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
