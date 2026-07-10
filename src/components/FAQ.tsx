import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * FAQ empático (reinterpreta la antigua sección "Miedo"). Acordeón accesible
 * con las dudas reales del avatar. Respuestas RESPONSABLES: nunca garantizan
 * la aprobación. Cierra con el remate de acompañamiento experto.
 */

const PREGUNTAS = [
  {
    q: "¿Qué requiero para que me aprueben una visa?",
    a: "Cada caso es único y tiene su propia historia, así que no hay un checklist obligatorio que garantice la aprobación. Lo que sí, es que tu historia necesita sostenerse en tres puntos: un motivo importante que te haga regresar a tu país, una razón de viaje contundente, y comprobar que cuentas con el recurso económico para hacerlo (depende mucho de si tú pagas el viaje o alguien más). En tu valoración vemos tu caso y te decimos cómo cumplir cada uno.",
  },
  {
    q: "Me negaron la visa, ¿puedo volver a tramitarla?",
    a: "Sí, se puede volver a tramitar. Un 'no' no te cierra la puerta. Lo importante es no presentarte igual: primero analizamos por qué te la negaron y preparamos tu caso mejor antes de volver.",
  },
  {
    q: "¿Cuánto tiempo debo esperar para volver a tramitarla?",
    a: "No hay un tiempo definido de espera. Lo verdaderamente importante es analizar el motivo por el que fue negada — eso es lo que nos dice cómo preparar tu siguiente intento.",
  },
  {
    q: "¿Es muy caro tramitar una visa?",
    a: "No. Contamos con paquetes muy accesibles que se adaptan a tu presupuesto. Y considéralo así: hay quien paga muchísimo más por cruzar por otro lado, arriesgándolo todo — aquí lo haces bien, legal y acompañado en cada paso. En tu valoración te damos el número exacto de tu caso.",
  },
  {
    q: "¿Están tardadas las citas?",
    a: "Agendamos tu cita según la disponibilidad del momento y, a partir de ahí, logramos adelantarla de 3 a 4 meses. Nos encargamos de conseguirte el mejor tiempo posible para que no pierdas la oportunidad.",
  },
  {
    q: "¿Dónde es seguro que te la aprueben?",
    a: "Te seremos honestos: no hay un consulado que garantice la aprobación de tu visa. Lo que sí, es que la puedes agendar en cualquiera de los 9 consulados — Ciudad Juárez, Guadalajara, Hermosillo, Matamoros, Mérida, Monterrey, Nogales, Nuevo Laredo o Tijuana — y nosotros te preparamos a fondo para que llegues con la mejor versión de tu caso.",
  },
  {
    q: "¿Están aprobando visas ahorita?",
    a: "Sí. Hasta el momento no hay ningún comunicado oficial que impida hacer solicitudes de visa. Se siguen aprobando — y depende, sobre todo, de qué tan bien preparado llegues.",
  },
];

function Item({
  q,
  a,
  abierto,
  onToggle,
}: {
  q: string;
  a: string;
  abierto: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--hairline)]">
      <button
        onClick={onToggle}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-marca-azul-claro"
      >
        <span className="font-display text-lg font-bold uppercase leading-tight text-marca-hueso sm:text-xl">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--hairline)] text-marca-hueso transition-transform duration-300 ${
            abierto ? "rotate-45 bg-marca-rojo" : ""
          }`}
        >
          <Plus className="h-5 w-5" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-marca-hueso/70">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="grain relative scroll-mt-20 overflow-hidden bg-marca-tinta px-6 py-24 md:px-10 md:py-32"
    >
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow text-marca-rojo">¿Tienes alguna duda?</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] text-marca-hueso">
            Es completamente normal.
          </h2>
          <p className="mt-4 max-w-md text-lg text-marca-hueso/70">
            Estas son las preguntas que más nos hacen. Sin rodeos, con la verdad
            por delante.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            {PREGUNTAS.map((p, i) => (
              <Item
                key={p.q}
                q={p.q}
                a={p.a}
                abierto={abierto === i}
                onToggle={() => setAbierto(abierto === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>

        {/* Remate conservado — transición a la siguiente sección */}
        <Reveal delay={0.15}>
          <p className="-ml-1 mt-16 max-w-3xl font-display text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold uppercase leading-[0.98] text-marca-hueso">
            Te acompañamos con{" "}
            <span className="text-marca-rojo">
              expertos que sí saben preparar tu caso.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
