import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Check } from "lucide-react";
import { cn, construirLinkWhatsApp } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * FORMULARIO DE PRE-CALIFICACIÓN (corazón de la página).
 * Multi-paso, una pregunta a la vez, barra de progreso. Filtro medio.
 * SIN backend: al terminar arma un mensaje y abre WhatsApp (wa.me) con todos
 * los datos. El lead llega calificado a "Lupita".
 */

type Opcion = { valor: string; etiqueta: string };

interface Paso {
  id: keyof Respuestas;
  pregunta: string;
  ayuda?: string;
  tipo: "opciones" | "texto" | "tel";
  opciones?: Opcion[];
  placeholder?: string;
}

interface Respuestas {
  tramite: string;
  cuando: string;
  historial: string;
  personas: string;
  estado: string;
  nombre: string;
}

const RESPUESTAS_INICIALES: Respuestas = {
  tramite: "",
  cuando: "",
  historial: "",
  personas: "",
  estado: "",
  nombre: "",
};

const PASOS: Paso[] = [
  {
    id: "tramite",
    pregunta: "¿Qué necesitas tramitar?",
    tipo: "opciones",
    opciones: [
      { valor: "Visa de turista EE.UU.", etiqueta: "Visa de turista · EE.UU." },
      { valor: "Visa de turista Canadá", etiqueta: "Visa de turista · Canadá" },
      { valor: "No estoy seguro", etiqueta: "Aún no estoy seguro" },
    ],
  },
  {
    id: "cuando",
    pregunta: "¿Para cuándo planeas viajar?",
    tipo: "opciones",
    opciones: [
      { valor: "En los próximos 3 meses", etiqueta: "En los próximos 3 meses" },
      { valor: "En 3 a 6 meses", etiqueta: "En 3 a 6 meses" },
      { valor: "En 6 a 12 meses", etiqueta: "En 6 a 12 meses" },
      { valor: "Solo estoy explorando", etiqueta: "Solo estoy explorando" },
    ],
  },
  {
    id: "historial",
    pregunta: "¿Has tramitado visa antes?",
    ayuda: "Esto nos ayuda a saber cómo prepararte mejor. No hay respuesta mala.",
    tipo: "opciones",
    opciones: [
      { valor: "Nunca he tramitado", etiqueta: "Nunca he tramitado" },
      { valor: "La tuve y venció", etiqueta: "La tuve y ya venció" },
      { valor: "Me la negaron", etiqueta: "Me la negaron una vez" },
      { valor: "La tengo vigente", etiqueta: "La tengo vigente" },
    ],
  },
  {
    id: "personas",
    pregunta: "¿Cuántas personas viajan?",
    tipo: "opciones",
    opciones: [
      { valor: "Solo yo", etiqueta: "Solo yo" },
      { valor: "2 personas", etiqueta: "2 personas" },
      { valor: "3 a 4 personas", etiqueta: "3 a 4 personas" },
      { valor: "5 o más", etiqueta: "5 o más" },
    ],
  },
  {
    id: "estado",
    pregunta: "¿Desde qué estado nos escribes?",
    ayuda: "Atendemos en todo México, presencial y a distancia.",
    tipo: "texto",
    placeholder: "Ej. Michoacán, Jalisco, CDMX…",
  },
  {
    id: "nombre",
    pregunta: "¿A nombre de quién preparamos el diagnóstico?",
    ayuda: "Es el último paso. Al enviar se abre WhatsApp con tus respuestas listas.",
    tipo: "texto",
    placeholder: "Tu nombre completo",
  },
];

export function FormularioPrecalificacion() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>(RESPUESTAS_INICIALES);
  const [enviado, setEnviado] = useState(false);

  const actual = PASOS[paso];
  const valorActual = respuestas[actual.id];
  const esUltimo = paso === PASOS.length - 1;
  const progreso = ((paso + (valorActual ? 1 : 0)) / PASOS.length) * 100;

  const valido = useMemo(
    () => valorActual.trim().length > 0,
    [valorActual]
  );

  const setValor = (valor: string) =>
    setRespuestas((r) => ({ ...r, [actual.id]: valor }));

  const avanzar = () => {
    if (!valido) return;
    if (esUltimo) {
      finalizar();
    } else {
      setPaso((p) => p + 1);
    }
  };

  const retroceder = () => setPaso((p) => Math.max(0, p - 1));

  const finalizar = () => {
    const mensaje = [
      "¡Hola SIN FRONTERAS! Hice mi pre-calificación en la página:",
      "",
      `• Nombre: ${respuestas.nombre}`,
      `• Trámite: ${respuestas.tramite}`,
      `• Viajo: ${respuestas.cuando}`,
      `• Historial de visa: ${respuestas.historial}`,
      `• Personas: ${respuestas.personas}`,
      `• Estado: ${respuestas.estado}`,
      "",
      "Quiero saber si me aprobarían y cómo me preparan para la entrevista.",
    ].join("\n");

    setEnviado(true);
    window.open(construirLinkWhatsApp(mensaje), "_blank", "noopener");
  };

  return (
    <section
      id="diagnostico"
      className="scroll-mt-8 bg-gradient-to-b from-marca-tinta to-marca-azul/30 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow justify-center text-marca-rojo">
              Diagnóstico gratis · 2 minutos
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight text-marca-hueso md:text-4xl">
              Descubre si esta vez te aprobarían
            </h2>
            <p className="mt-3 max-w-md font-hand text-xl text-marca-hueso/70">
              Cuéntanos tu caso. Sin juzgar, sin compromiso — solo para saber
              cómo ayudarte mejor.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-marca-hueso/10 bg-marca-tinta-2/80 p-6 shadow-2xl backdrop-blur sm:p-8">
            {!enviado ? (
              <>
                {/* Barra de progreso */}
                <div className="mb-8">
                  <div className="mb-2 flex justify-between text-xs font-medium text-marca-hueso/60">
                    <span>
                      Paso {paso + 1} de {PASOS.length}
                    </span>
                    <span>{Math.round(progreso)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-marca-hueso/10">
                    <motion.div
                      className="h-full rounded-full bg-marca-rojo"
                      animate={{ width: `${progreso}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Pregunta animada */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={actual.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-marca-hueso md:text-2xl">
                      {actual.pregunta}
                    </h3>
                    {actual.ayuda && (
                      <p className="mt-2 text-sm text-marca-hueso/60">
                        {actual.ayuda}
                      </p>
                    )}

                    {actual.tipo === "opciones" ? (
                      <div className="mt-6 grid gap-3">
                        {actual.opciones!.map((op) => {
                          const sel = valorActual === op.valor;
                          return (
                            <button
                              key={op.valor}
                              onClick={() => setValor(op.valor)}
                              className={cn(
                                "flex items-center justify-between rounded-xl border px-5 py-4 text-left text-base font-medium transition",
                                sel
                                  ? "border-marca-rojo bg-marca-rojo/10 text-marca-hueso"
                                  : "border-marca-hueso/15 text-marca-hueso/80 hover:border-marca-hueso/40 hover:bg-marca-hueso/5"
                              )}
                            >
                              {op.etiqueta}
                              <span
                                className={cn(
                                  "flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 transition",
                                  sel
                                    ? "border-marca-rojo bg-marca-rojo text-white"
                                    : "border-marca-hueso/30"
                                )}
                              >
                                {sel && <Check className="h-4 w-4" strokeWidth={3} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        autoFocus
                        type={actual.tipo === "tel" ? "tel" : "text"}
                        inputMode={actual.tipo === "tel" ? "numeric" : "text"}
                        value={valorActual}
                        onChange={(e) => setValor(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && avanzar()}
                        placeholder={actual.placeholder}
                        className="mt-6 w-full rounded-xl border border-marca-hueso/20 bg-marca-tinta px-5 py-4 text-lg text-marca-hueso placeholder:text-marca-hueso/40 focus:border-marca-rojo focus:outline-none"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navegación */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={retroceder}
                    disabled={paso === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-marca-hueso/60 transition hover:text-marca-hueso disabled:invisible"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Atrás
                  </button>
                  <button
                    onClick={avanzar}
                    disabled={!valido}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition",
                      valido
                        ? esUltimo
                          ? "bg-[#25D366] text-white hover:scale-[1.03]"
                          : "bg-marca-rojo text-white hover:scale-[1.03]"
                        : "cursor-not-allowed bg-marca-hueso/10 text-marca-hueso/40"
                    )}
                  >
                    {esUltimo ? (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        Enviar por WhatsApp
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Confirmación tras envío */
              <div className="py-8 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                  <MessageCircle className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase text-marca-hueso">
                  ¡Casi listo!
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-marca-hueso/75">
                  Se abrió WhatsApp con tus datos. Solo presiona{" "}
                  <strong className="text-marca-hueso">enviar</strong> y te
                  respondemos hoy mismo con tu diagnóstico.
                </p>
                <button
                  onClick={finalizar}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-white transition hover:scale-[1.03]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Abrir WhatsApp de nuevo
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
