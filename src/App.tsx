import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FAQ } from "./components/FAQ";
import { Reencuadre } from "./components/Reencuadre";
import { Historias } from "./components/Historias";
import { Acompanamiento } from "./components/Acompanamiento";
import { ComoFunciona } from "./components/ComoFunciona";
import { FormularioPrecalificacion } from "./components/FormularioPrecalificacion";
import { Cierre } from "./components/Cierre";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * CTA flotante. Aparece solo después del hero: mientras el hero está en
 * pantalla su propio botón ya ofrece la acción, y sumar el flotante ponía el
 * mismo texto tres veces a la vez (navbar + hero + flotante), que se lee como
 * insistencia y tapaba las cifras de experiencia.
 */
function BotonFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <a
      href="#diagnostico"
      aria-label="Ver si califico para la visa"
      className={`fixed bottom-5 right-5 z-50 flex min-h-[44px] items-center gap-2 rounded-full bg-marca-rojo px-5 py-3 text-sm font-bold text-white shadow-xl shadow-black/30 transition-all duration-300 hover:scale-105 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      Ver si califico
    </a>
  );
}

/**
 * Landing one-page de pre-calificación SIN FRONTERAS.
 *
 * Recorrido: Hero → Reencuadre → Historias → Acompañamiento → Cómo funciona →
 * Pre-calificación → FAQ → Cierre.
 *
 * El FAQ va DESPUÉS del formulario, no antes: las objeciones se resuelven
 * cuando ya existe el deseo. Puesto en la posición 2 obligaba a leer dudas
 * ajenas antes de tener una razón para quedarse.
 *
 * El botón flotante lleva al formulario (no a WhatsApp en frío): primero
 * pre-califica, luego WhatsApp.
 */
export default function App() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <Reencuadre />
      <Historias />
      <Acompanamiento />
      <ComoFunciona />
      <FormularioPrecalificacion />
      <FAQ />
      <Cierre />

      <BotonFlotante />
    </main>
  );
}
