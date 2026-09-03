import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * EL REENCUADRE — EL PICO DE LUZ de toda la página (mov. #1, #2, #3).
 * Único momento claro (fondo papel hueso) = el giro emocional miedo→alivio.
 * Prism: balance radial/calmo, papel rasgado gigante, manuscrita a tamaño
 * cartel, máximo contraste con el resto. ui-ux: tinta sobre papel ≈14:1 (AAA).
 */

const PILARES = [
  { titulo: "Te conseguimos la cita", detalle: "Nada de 'no hay lugar'. Buscamos tu cita y la agendamos por ti." },
  { titulo: "Armamos tu caso contigo", detalle: "Revisamos tu historia y tus papeles para que todo cuadre y tenga sentido." },
  { titulo: "Ensayamos tu entrevista", detalle: "Practicas antes con nosotros, para que el día real llegues sin sorpresas." },
];

export function Reencuadre() {
  return (
    <section className="paper-grain relative overflow-hidden bg-marca-papel px-6 py-28 text-marca-tinta md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl text-center">
        {/* Frase central a tamaño cartel, voz manuscrita */}
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-3xl font-hand text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] [text-wrap:balance]">
            No se trata solo de papeles. Se trata de que tu historia se entienda
            bien.
          </h2>
          <span className="mx-auto mt-6 block h-1 w-28 rounded bg-marca-rojo" />
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-marca-tinta/75">
            Aquí no eres un folio más en una fila. Nos sentamos contigo, revisamos
            tu caso como si fuera el nuestro, y no te mandamos a la entrevista
            hasta que estés{" "}
            <strong className="text-marca-tinta">listo de verdad.</strong>
          </p>
        </Reveal>

        {/* Tres pilares como recortes de papel rasgado */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILARES.map((p, i) => (
            <motion.div
              key={p.titulo}
              initial={{ opacity: 0, y: 24, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="torn bg-white/70 p-7 text-left shadow-[0_10px_30px_-12px_rgba(10,14,26,0.25)] backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-marca-rojo text-white">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold uppercase leading-tight">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-marca-tinta/65">
                {p.detalle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
