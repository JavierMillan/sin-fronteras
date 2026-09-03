import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIOS, CITAS, APROBACIONES, REENCUENTROS } from "@/data/casos";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * ESPERANZA + PRUEBA — "Historias". Un testimonio protagonista a la vez, que
 * encadena con el siguiente al terminar, como una story: cuatro videos
 * corriendo en paralelo compiten entre sí y el ojo no sabe dónde mirar.
 *
 * Los demás casos se listan por nombre, no como miniaturas: un vertical de
 * teléfono es ilegible a 76px, y el nombre comunica cuántos hay igual de bien.
 *
 * Las fotos NO se emparejan con los videos: son personas distintas, y atarlas a
 * un testimonio concreto atribuía la hoja de aprobación de un señor mayor a una
 * clienta joven. Viven como galería —un muro donde el patrón (la misma hoja
 * verde en manos distintas) *es* el mensaje— y no como prueba de un caso.
 *
 * El material no se trata: la compresión de WhatsApp y la luz dura son evidencia
 * de que es gente real (ver §6.a del brand profile).
 */
export function Historias({ claro = false }: { claro?: boolean }) {
  const [activo, setActivo] = useState(0);
  const [conSonido, setConSonido] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = TESTIMONIOS.length;
  const t = TESTIMONIOS[activo];
  // La cita es de quien está en pantalla: son personas reales.
  const cita = CITAS.find((c) => c.testimonioId === t.id);

  // Avanza al terminar el clip, como una story: el ritmo lo marca el
  // testimonio, no un temporizador.
  // `avanzando` evita que el clip avance dos veces: `ended` y la red de
  // seguridad de `onTimeUpdate` pueden dispararse casi a la vez y saltarse un
  // testimonio. Se libera al montar el clip siguiente.
  const avanzando = useRef(false);
  const alTerminar = () => {
    if (avanzando.current) return;
    avanzando.current = true;
    setActivo((i) => (i + 1) % total);
  };

  // Progreso real del clip: la barra del testimonio activo se llena conforme
  // avanza el video, como en una story. Sin esto, las barras sólo dicen en cuál
  // vas, no cuánto falta.
  const [progreso, setProgreso] = useState(0);
  const alAvanzar = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!v.duration) return;
    setProgreso(v.currentTime / v.duration);
    // Red de seguridad: algunos navegadores móviles se detienen en el último
    // frame sin emitir `ended`, y la cadena se quedaría atorada ahí.
    if (v.duration - v.currentTime < 0.25) alTerminar();
  };

  // Cambiar `src` sobre el mismo <video> no reinicia la reproducción por sí
  // solo. Y no basta con llamar a play() tras load(): el clip aún no tiene
  // datos, la promesa se rechaza y la cadena se queda pausada en 0:00. Hay que
  // esperar a que haya buffer suficiente.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setProgreso(0);

    avanzando.current = false;

    const arrancar = () => {
      v.play().catch(() => {
        /* Autoplay bloqueado (p. ej. con sonido activo): el usuario reanuda. */
      });
    };

    v.load();
    if (v.readyState >= 3) arrancar();
    else v.addEventListener("canplay", arrancar, { once: true });

    return () => v.removeEventListener("canplay", arrancar);
  }, [activo]);

  const ir = (dir: 1 | -1) => setActivo((i) => (i + dir + total) % total);

  const btnNav = claro
    ? "border-marca-tinta/20 text-marca-tinta hover:bg-marca-tinta/10"
    : "border-[var(--hairline)] text-marca-hueso hover:bg-marca-hueso/10";
  const rotulo = claro ? "text-marca-tinta/50" : "text-marca-hueso/50";

  // Galería: la primera pieza manda, el resto la acompaña. Rompe la retícula
  // de cuatro iguales que hacía ver la sección como un mosaico monótono.
  const galeria = [...APROBACIONES, ...REENCUENTROS];

  return (
    <section
      id="historias"
      className={cn(
        "grain relative scroll-mt-20 overflow-hidden px-6 py-24 md:px-10 md:py-32",
        claro ? "bg-marca-hueso" : "bg-marca-tinta-2"
      )}
    >
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", claro ? "opacity-20" : "opacity-60")}
        style={{ backgroundImage: "var(--rio-luz)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <h2
              className={cn(
                "font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.92]",
                claro ? "text-marca-tinta" : "text-marca-hueso"
              )}
            >
              Estas son algunas
              <span className="block text-marca-azul-claro">de sus historias.</span>
            </h2>
            <p
              className={cn(
                "mt-6 max-w-md text-lg leading-relaxed",
                claro ? "text-marca-tinta/75" : "text-marca-hueso/75"
              )}
            >
              Gente como tú, que también tenía miedo de que le dijeran que no.
              A varios ya les habían negado la visa antes. Mira cómo les fue.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Testimonio protagonista */}
          <Reveal delay={0.1} className="lg:col-span-7">
            {/* Las flechas viven a los lados del video, no debajo: el contador
                "2 / 4" sobraba porque las barras de progreso ya dicen en cuál
                vas y cuánto falta. */}
            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
              <button
                onClick={() => ir(-1)}
                aria-label="Testimonio anterior"
                className={cn(
                  "absolute bottom-16 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition",
                  "sm:-left-14 sm:bottom-auto sm:top-1/2 sm:h-10 sm:w-10 sm:-translate-y-1/2",
                  claro ? "border-marca-tinta/15 bg-marca-hueso/80" : "border-[var(--hairline)] bg-marca-tinta/70",
                  btnNav
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => ir(1)}
                aria-label="Siguiente testimonio"
                className={cn(
                  "absolute bottom-16 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition",
                  "sm:-right-14 sm:bottom-auto sm:top-1/2 sm:h-10 sm:w-10 sm:-translate-y-1/2",
                  claro ? "border-marca-tinta/15 bg-marca-hueso/80" : "border-[var(--hairline)] bg-marca-tinta/70",
                  btnNav
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div
                className={cn(
                  "relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-black",
                  claro ? "shadow-2xl" : "border border-[var(--hairline)]"
                )}
              >
                {/* Un solo <video> que cambia de `src`, sin AnimatePresence: el
                    crossfade con `mode="wait"` retenía el montaje del siguiente
                    clip y la cadena se quedaba atorada en el primero. Una story
                    corta entre clips, no disuelve. */}
                <video
                  ref={videoRef}
                  src={t.video}
                  poster={t.poster}
                  muted={!conSonido}
                  playsInline
                  autoPlay
                  onEnded={alTerminar}
                  onTimeUpdate={alAvanzar}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-marca-azul/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {t.resultado}
                </span>

                <button
                  onClick={() => setConSonido((v) => !v)}
                  aria-label={conSonido ? "Silenciar testimonio" : "Escuchar testimonio"}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
                >
                  {conSonido ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                <div className="absolute inset-x-4 top-16 flex gap-1.5">
                  {TESTIMONIOS.map((tt, i) => (
                    <span key={tt.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
                      <span
                        className="block h-full rounded-full bg-white"
                        style={{
                          width: i < activo ? "100%" : i === activo ? `${progreso * 100}%` : "0%",
                        }}
                      />
                    </span>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm font-semibold text-white">
                    {t.nombre} <span className="font-normal text-white/60">· {t.lugar}</span>
                  </p>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Miniaturas y cita */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="flex flex-col gap-8">
              {/* Lista de nombres, no miniaturas: un vertical de teléfono es
                  ilegible a 76px, y ampliarlo solo hace ver la compresión. El
                  nombre comunica cuántos casos hay mejor que un thumbnail. */}
              <div>
                <p className={cn("text-xs font-bold uppercase tracking-wide", rotulo)}>
                  Más historias
                </p>
                <div className={cn("mt-3 border-t", claro ? "border-[var(--hairline-tinta)]" : "border-[var(--hairline)]")}>
                  {TESTIMONIOS.map((tt, i) => (
                    <button
                      key={tt.id}
                      onClick={() => setActivo(i)}
                      aria-current={i === activo}
                      className={cn(
                        "flex w-full items-baseline gap-3 border-b py-3 text-left transition-opacity",
                        claro ? "border-[var(--hairline-tinta)]" : "border-[var(--hairline)]",
                        i === activo ? "opacity-100" : "opacity-45 hover:opacity-80"
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-base font-extrabold uppercase leading-none tracking-tight",
                          claro ? "text-marca-tinta" : "text-marca-hueso"
                        )}
                      >
                        {tt.nombre}
                      </span>
                      <span className={cn("ml-auto text-[0.6875rem] font-semibold uppercase tracking-[0.14em]", rotulo)}>
                        {tt.resultado}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {cita && (
                <figure
                  className={cn(
                    "rounded-2xl p-6",
                    claro
                      ? "bg-marca-tinta text-marca-hueso"
                      : "border border-[var(--hairline)] bg-marca-tinta/60 text-marca-hueso"
                  )}
                >
                  <blockquote className="font-hand text-xl font-bold leading-snug">
                    “{cita.texto}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-semibold opacity-80">
                    {cita.autor} <span className="font-normal opacity-60">· {cita.lugar}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          </Reveal>
        </div>

        {/* Galería: el patrón es el mensaje — la misma hoja verde en manos
            distintas, y para qué sirvió. Alturas desiguales para que no se lea
            como otra retícula de cuatro. */}
        <Reveal delay={0.15}>
          <div className="mt-16">
            <p className={cn("text-xs font-bold uppercase tracking-wide", rotulo)}>
              Aprobaciones y reencuentros
            </p>
            {/* Móvil: tira horizontal con snap — apiladas en columnas añadían
                ~1.5 pantallas de scroll. Desktop: mosaico de alturas alternas. */}
            <div
              className={cn(
                "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3",
                "sm:block sm:columns-3 sm:overflow-visible lg:columns-4 sm:[&>*]:mb-3"
              )}
            >
              {galeria.map((g, i) => (
                <img
                  key={`${g.id}-${i}`}
                  src={g.foto}
                  alt={g.alt}
                  loading="lazy"
                  className={cn(
                    "h-[240px] w-auto shrink-0 snap-start rounded-xl object-cover",
                    "sm:h-auto sm:w-full sm:break-inside-avoid",
                    // Alturas alternas solo en desktop: rompe el mosaico regular.
                    i % 3 === 0 ? "sm:aspect-[4/5]" : i % 3 === 1 ? "sm:aspect-[3/4]" : "sm:aspect-square"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA en el punto de máxima intención: quien acaba de ver a alguien
            como él aprobado es quien más cerca está de intentarlo. Antes había
            que bajar siete pantallas más para encontrar dónde tocar. */}
        <Reveal delay={0.1}>
          <div
            className={cn(
              "mt-14 flex flex-col items-start gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between",
              claro ? "border-[var(--hairline-tinta)]" : "border-[var(--hairline)]"
            )}
          >
            <p className={cn("max-w-md text-lg", claro ? "text-marca-tinta/80" : "text-marca-hueso/80")}>
              ¿Tu caso se parece al de alguno de ellos?
            </p>
            <a
              href="#diagnostico"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-marca-rojo px-7 py-3.5 text-base font-bold text-white transition hover:scale-[1.03]"
            >
              Ver si califico
              <span className="text-sm font-normal opacity-80">· 2 min, gratis</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
