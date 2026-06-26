import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Miedo } from "./components/Miedo";
import { Reencuadre } from "./components/Reencuadre";
import { Historias } from "./components/Historias";
import { ComoFunciona } from "./components/ComoFunciona";
import { FormularioPrecalificacion } from "./components/FormularioPrecalificacion";
import { Cierre } from "./components/Cierre";
import { MessageCircle } from "lucide-react";

/**
 * Landing one-page de pre-calificación SIN FRONTERAS.
 * Recorrido: Identificación → Miedo → Reencuadre → Historias → Cómo funciona →
 * Pre-calificación → Cierre. El botón flotante lleva al formulario (no a
 * WhatsApp en frío): primero pre-califica, luego WhatsApp con datos.
 */
export default function App() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <Miedo />
      <Reencuadre />
      <Historias />
      <ComoFunciona />
      <FormularioPrecalificacion />
      <Cierre />

      {/* Botón flotante → diagnóstico (embudo: pre-calificar antes de WhatsApp) */}
      <a
        href="#diagnostico"
        aria-label="Hacer mi pre-calificación gratis"
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-xl shadow-black/30 transition hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
          Pre-calificación gratis
        </span>
      </a>
    </main>
  );
}
