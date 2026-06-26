import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

/**
 * EL MIEDO NOMBRADO — editorial roto (Dirección B). Las frases del avatar
 * son objeciones con CONTRASTE REAL (no gris invisible), a escala distinta,
 * tachadas en diagonal como "esto ya no". La conclusión irrumpe a sangre
 * izquierda rompiendo el grid. Asimétrico, columna pegada a la izquierda.
 */

const OBJECIONES = [
  "Ya gasté en gestores que prometieron y nunca me acomodaron la cita.",
  "Ya me la negaron una vez… ¿quién me asegura que ahora sí?",
  "No quiero volver a pasar el ridículo en la entrevista.",
  "Vivo lejos de un consulado y ni sé cómo se hace bien.",
];

export function Miedo() {
  return (
    <section
      id="miedo"
      className="grain relative scroll-mt-20 overflow-hidden bg-marca-tinta px-6 py-24 md:px-10 md:py-36"
    >
      {/* Palabra marca de agua de fondo (profundidad) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[22vw] font-extrabold uppercase leading-none text-marca-hueso/[0.03] md:text-[14vw]"
      >
        Miedo
      </span>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-marca-hueso/70">Si llegaste hasta aquí, esto te suena</p>
        </Reveal>

        {/* Objeciones — lista pegada a la izquierda, escala fuerte, alto contraste */}
        <ul className="mt-12 max-w-3xl space-y-7 md:space-y-8">
          {OBJECIONES.map((o, i) => (
            <motion.li
              key={o}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4"
            >
              <span className="mt-3 font-display text-sm font-bold text-marca-rojo">
                0{i + 1}
              </span>
              <span className="font-display text-2xl font-bold leading-tight text-marca-hueso/90 sm:text-3xl md:text-[2rem]">
                “{o}”
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Conclusión — irrumpe a sangre izquierda, escala brutal, palabra clave en rojo */}
        <Reveal delay={0.15}>
          <div className="mt-20 max-w-4xl">
            <p className="text-lg font-medium uppercase tracking-wide text-marca-hueso/50">
              No tienes que resolverlo solo.
            </p>
            <p className="-ml-1 mt-3 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] text-marca-hueso">
              Te acompañamos con{" "}
              <span className="text-marca-rojo">expertos que sí saben preparar tu caso.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
