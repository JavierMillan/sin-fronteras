import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { TESTIMONIOS } from "@/data/casos";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * ESPERANZA + PRUEBA — "Historias". Composición asimétrica (no split 50/50):
 * el teléfono INVADE desde la derecha-abajo cortado por el borde (bleed), el
 * texto se ancla arriba-izquierda. El teléfono tiene CUERPO 3D real: marco
 * grueso, frame, botones laterales, notch y profundidad por capas (translateZ).
 */
export function Historias() {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = TESTIMONIOS.length;
  const t = TESTIMONIOS[activo];

  useEffect(() => {
    if (pausado) return;
    const id = setTimeout(() => setActivo((i) => (i + 1) % total), 8000);
    return () => clearTimeout(id);
  }, [activo, pausado, total]);

  const ir = (dir: 1 | -1) => setActivo((i) => (i + dir + total) % total);

  return (
    <section
      id="historias"
      className="grain relative scroll-mt-20 overflow-hidden bg-marca-tinta-2 px-6 py-24 md:px-10 md:py-32"
    >
      {/* Río de luz diagonal cruzando la sección (conecta con el resto) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: "var(--rio-luz)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-y-12 md:grid-cols-12 md:items-center">
        {/* Texto — tercio superior-izquierdo */}
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-marca-rojo">Casos de éxito</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.92] text-marca-hueso">
              Estas son algunas
              <span className="block text-marca-azul-claro">de sus historias.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-marca-hueso/75">
              Personas reales que llegaron preparadas a su entrevista — varias
              después de una negativa previa. Mira cómo lo vivieron.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-marca-tinta/40 px-4 py-2 text-sm text-marca-hueso/70">
              <span className="text-base">🤝</span>
              Muchos llegaron por recomendación de familiares en EE.UU.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => ir(-1)}
                aria-label="Testimonio anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-marca-hueso transition hover:bg-marca-hueso/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => ir(1)}
                aria-label="Siguiente testimonio"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-marca-hueso transition hover:bg-marca-hueso/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="ml-1 text-sm text-marca-hueso/55">
                {activo + 1} / {total}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Teléfono — invade desde la derecha, rotado en perspectiva */}
        <div
          className="flex justify-center md:col-span-6 md:col-start-7 md:justify-end"
          style={{ perspective: "1600px" }}
        >
          <Reveal delay={0.15}>
            <div className="relative w-[min(280px,72vw)]">
              {/* Sombra proyectada al piso */}
              <div
                aria-hidden
                className="absolute -bottom-8 left-1/2 -z-10 h-12 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/60 blur-2xl"
              />

              {/* Chasis del teléfono con cuerpo 3D real */}
              <motion.div
                initial={{ rotateY: -16, rotateX: 6 }}
                whileInView={{ rotateY: -13, rotateX: 4 }}
                whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[9/19.5] rounded-[2.8rem] bg-gradient-to-br from-[#2a2d36] via-[#15171d] to-[#0a0b0f] p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Borde de luz (canto metálico) */}
                <div className="absolute inset-0 rounded-[2.8rem] ring-1 ring-white/10" />

                {/* Botones laterales (volumen + power) — dan grosor real */}
                <span className="absolute -left-[3px] top-[22%] h-12 w-[3px] rounded-l bg-[#0a0b0f]" />
                <span className="absolute -left-[3px] top-[36%] h-16 w-[3px] rounded-l bg-[#0a0b0f]" />
                <span className="absolute -right-[3px] top-[28%] h-20 w-[3px] rounded-r bg-[#0a0b0f]" />

                {/* Bisel interior negro */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.55rem] bg-black p-[6px]">
                  {/* Pantalla */}
                  <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-black">
                    {/* Notch / isla dinámica */}
                    <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0"
                      >
                        {t.video ? (
                          <video
                            ref={videoRef}
                            src={t.video}
                            poster={t.poster}
                            muted
                            playsInline
                            autoPlay
                            loop
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLVideoElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <img
                            src={t.poster}
                            alt={`Testimonio de ${t.nombre}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.opacity = "0";
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/35" />

                        {/* Badge resultado */}
                        <div className="absolute left-3 top-9 inline-flex items-center gap-1.5 rounded-full bg-marca-azul/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                          <BadgeCheck className="h-3 w-3" />
                          {t.resultado}
                        </div>

                        {/* Cita + nombre */}
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="font-hand text-lg font-bold leading-snug text-white">
                            “{t.cita}”
                          </p>
                          <p className="mt-1.5 text-xs font-semibold text-white/90">
                            {t.nombre}{" "}
                            <span className="font-normal text-white/50">· {t.lugar}</span>
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Barras de progreso tipo stories */}
                    <div className="absolute inset-x-3 top-8 z-10 flex gap-1.5">
                      {TESTIMONIOS.map((tt, i) => (
                        <span
                          key={tt.id}
                          className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25"
                        >
                          <motion.span
                            className="block h-full bg-white"
                            initial={{ width: i < activo ? "100%" : "0%" }}
                            animate={{
                              width:
                                i < activo
                                  ? "100%"
                                  : i === activo && !pausado
                                  ? "100%"
                                  : i === activo
                                  ? "30%"
                                  : "0%",
                            }}
                            transition={{
                              duration: i === activo && !pausado ? 8 : 0.3,
                              ease: "linear",
                            }}
                          />
                        </span>
                      ))}
                    </div>

                    {/* Play/pausa */}
                    <button
                      onClick={() => setPausado((p) => !p)}
                      aria-label={pausado ? "Reanudar" : "Pausar"}
                      className={cn(
                        "absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
                      )}
                    >
                      {pausado ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
