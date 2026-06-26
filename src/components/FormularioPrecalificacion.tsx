import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Check } from "lucide-react";
import { cn, construirLinkWhatsApp } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * FORMULARIO DE PRE-CALIFICACIÓN ramificado (árbol). El conjunto de pasos se
 * calcula según respuestas previas: tipo de visa → país → primera vez/negada →
 * info básica → horario de preferencia. SIN backend: al terminar arma el
 * mensaje y abre WhatsApp con todos los datos. La cita de análisis tiene costo
 * (filtro de seriedad, acreditable al trámite) — se comunica antes de enviar.
 */

type Opcion = { valor: string; etiqueta: string };

interface Paso {
  id: keyof Respuestas;
  pregunta: string;
  ayuda?: string;
  tipo: "opciones" | "texto";
  opciones?: Opcion[];
  placeholder?: string;
}

interface Respuestas {
  visa: string;
  pais: string;
  historial: string;
  cuando: string;
  personas: string;
  pais_residencia: string;
  nombre: string;
  horario: string;
}

const RESPUESTAS_INICIALES: Respuestas = {
  visa: "",
  pais: "",
  historial: "",
  cuando: "",
  personas: "",
  pais_residencia: "",
  nombre: "",
  horario: "",
};

/**
 * Construye la secuencia de pasos según las respuestas ya dadas (árbol).
 * Esto permite ramificar: el historial solo se pregunta para turista, etc.
 */
function construirPasos(r: Respuestas): Paso[] {
  const pasos: Paso[] = [
    {
      id: "visa",
      pregunta: "¿Qué tipo de visa necesitas?",
      tipo: "opciones",
      opciones: [
        { valor: "Turista", etiqueta: "Visa de turista" },
        { valor: "Estudiante", etiqueta: "Visa de estudiante" },
        { valor: "Trabajo", etiqueta: "Visa de trabajo" },
        { valor: "No estoy seguro", etiqueta: "Aún no estoy seguro" },
      ],
    },
    {
      id: "pais",
      pregunta: "¿A qué país quieres viajar?",
      tipo: "opciones",
      opciones: [
        { valor: "Estados Unidos", etiqueta: "Estados Unidos" },
        { valor: "Canadá", etiqueta: "Canadá" },
        { valor: "Ambos", etiqueta: "Ambos / no lo decido aún" },
      ],
    },
    {
      id: "historial",
      pregunta: "¿Es tu primera vez tramitando esta visa?",
      ayuda: "Esto nos ayuda a saber cómo prepararte mejor. No hay respuesta mala.",
      tipo: "opciones",
      opciones: [
        { valor: "Primera vez", etiqueta: "Sí, es mi primera vez" },
        { valor: "Me la negaron", etiqueta: "Ya lo intenté y me la negaron" },
        { valor: "La tuve y venció", etiqueta: "La tuve y ya venció" },
        { valor: "La tengo vigente", etiqueta: "La tengo vigente" },
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
      id: "personas",
      pregunta: "¿Cuántas personas tramitan?",
      tipo: "opciones",
      opciones: [
        { valor: "Solo yo", etiqueta: "Solo yo" },
        { valor: "2 personas", etiqueta: "2 personas" },
        { valor: "3 a 4 personas", etiqueta: "3 a 4 personas" },
        { valor: "5 o más", etiqueta: "5 o más" },
      ],
    },
    {
      id: "pais_residencia",
      pregunta: "¿Desde qué país y ciudad nos escribes?",
      ayuda: "Atendemos toda Latinoamérica, presencial y a distancia.",
      tipo: "texto",
      placeholder: "Ej. México, Guadalajara · Colombia, Bogotá…",
    },
    {
      id: "nombre",
      pregunta: "¿A nombre de quién preparamos el análisis?",
      tipo: "texto",
      placeholder: "Tu nombre completo",
    },
    {
      id: "horario",
      pregunta: "¿Qué horario te queda mejor para tu cita?",
      ayuda: "Coordinamos la cita por WhatsApp en el horario que prefieras.",
      tipo: "opciones",
      opciones: [
        { valor: "Mañana", etiqueta: "Por la mañana" },
        { valor: "Tarde", etiqueta: "Por la tarde" },
        { valor: "Cualquier horario", etiqueta: "Cualquier horario me sirve" },
      ],
    },
  ];

  // Ramificación: si "no estoy seguro" del tipo, saltar el historial específico.
  if (r.visa === "No estoy seguro") {
    return pasos.filter((p) => p.id !== "historial");
  }
  return pasos;
}

export function FormularioPrecalificacion() {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>(RESPUESTAS_INICIALES);
  const [enviado, setEnviado] = useState(false);

  const pasos = useMemo(() => construirPasos(respuestas), [respuestas]);
  const actual = pasos[Math.min(indice, pasos.length - 1)];
  const valorActual = respuestas[actual.id];
  const esUltimo = indice === pasos.length - 1;
  const progreso = ((indice + (valorActual ? 1 : 0)) / pasos.length) * 100;

  const valido = useMemo(
    () => valorActual.trim().length > 0,
    [valorActual]
  );

  const setValor = (valor: string) =>
    setRespuestas((r) => ({ ...r, [actual.id]: valor }));

  const avanzar = () => {
    if (!valido) return;
    if (esUltimo) finalizar();
    else setIndice((i) => i + 1);
  };

  const retroceder = () => setIndice((i) => Math.max(0, i - 1));

  const finalizar = () => {
    const r = respuestas;
    const mensaje = [
      "¡Hola SIN FRONTERAS! Hice mi pre-calificación en la página y quiero agendar mi cita de análisis:",
      "",
      `• Nombre: ${r.nombre}`,
      `• Visa: ${r.visa}${r.pais ? ` (${r.pais})` : ""}`,
      r.historial ? `• Historial: ${r.historial}` : null,
      `• Viajo: ${r.cuando}`,
      `• Personas: ${r.personas}`,
      `• Desde: ${r.pais_residencia}`,
      `• Horario preferido: ${r.horario}`,
      "",
      "Entiendo que la cita de análisis tiene un costo y quiero agendarla.",
    ]
      .filter(Boolean)
      .join("\n");

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
              Pre-calificación · 2 minutos
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight text-marca-hueso md:text-4xl">
              Descubre si esta vez te aprobarían
            </h2>
            <p className="mt-3 max-w-md font-hand text-xl text-marca-hueso/70">
              Cuéntanos tu caso. Sin juzgar — solo para saber cómo prepararte
              mejor.
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
                      Paso {indice + 1} de {pasos.length}
                    </span>
                    <span className="tabular">{Math.round(progreso)}%</span>
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
                                "flex min-h-[44px] items-center justify-between rounded-xl border px-5 py-4 text-left text-base font-medium transition",
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
                        type="text"
                        value={valorActual}
                        onChange={(e) => setValor(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && avanzar()}
                        placeholder={actual.placeholder}
                        className="mt-6 w-full rounded-xl border border-marca-hueso/20 bg-marca-tinta px-5 py-4 text-lg text-marca-hueso placeholder:text-marca-hueso/40 focus:border-marca-rojo focus:outline-none"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nota de cita de pago — visible en el último paso */}
                {esUltimo && (
                  <p className="mt-6 rounded-xl border border-marca-hueso/10 bg-marca-tinta/60 px-4 py-3 text-sm text-marca-hueso/70">
                    La <strong className="text-marca-hueso">cita de análisis</strong>{" "}
                    tiene un costo de <strong className="text-marca-hueso">$500 MXN / $20 USD</strong>,{" "}
                    <strong className="text-marca-hueso">acreditable a tu trámite</strong> si
                    decides continuar. Así dedicamos tiempo real a tu caso.
                  </p>
                )}

                {/* Navegación */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={retroceder}
                    disabled={indice === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-marca-hueso/60 transition hover:text-marca-hueso disabled:invisible"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Atrás
                  </button>
                  <button
                    onClick={avanzar}
                    disabled={!valido}
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition",
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
                        Agendar mi cita
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
                  <strong className="text-marca-hueso">enviar</strong> y
                  coordinamos tu cita de análisis.
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
