import { Reveal } from "./Reveal";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import {
  construirLinkWhatsApp,
  WHATSAPP_VISIBLE,
  TELEFONO_VISIBLE,
} from "@/lib/utils";

/**
 * CIERRE — titular brutal asimétrico anclado a la izquierda (no centrado).
 * Contacto como tira editorial inferior. Río de luz + marca de agua.
 */
export function Cierre() {
  const linkDirecto = construirLinkWhatsApp(
    "¡Hola SIN FRONTERAS! Vengo de su página y quiero información sobre mi visa."
  );

  return (
    <footer className="grain relative overflow-hidden bg-marca-tinta px-6 pb-12 pt-28 md:px-10 md:pt-36">
      {/* Río de luz */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: "var(--rio-luz)" }}
      />
      {/* Estrellas marca de agua (eco de las 3 décadas del logo) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[16vw] font-extrabold leading-none text-marca-hueso/[0.03]"
      >
        ★★★
      </span>

      <div className="relative mx-auto max-w-6xl">
        {/* Titular sangrando a la izquierda, escala brutal */}
        <Reveal>
          <p className="eyebrow text-marca-rojo">Da el primer paso</p>
          <h2 className="-ml-1 mt-5 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.85] text-marca-hueso">
            Que nada detenga{" "}
            <span className="text-marca-azul-claro">tus sueños.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-marca-hueso/75">
            Llega sólido a tu entrevista, con quien sí sabe prepararte.
          </p>

          <a
            href="#diagnostico"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-marca-rojo px-9 py-4 text-base font-bold text-white shadow-xl shadow-marca-rojo/25 transition hover:scale-[1.03]"
          >
            <MessageCircle className="h-5 w-5" />
            Hacer mi diagnóstico gratis
          </a>
        </Reveal>

        {/* Tira de contacto editorial — alineada a la izquierda, no centrada */}
        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-col gap-6 border-t border-[var(--hairline)] pt-10 sm:flex-row sm:flex-wrap sm:gap-12">
            <a
              href={linkDirecto}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-marca-hueso transition hover:text-marca-azul-claro"
            >
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-marca-hueso/50">
                  Escríbenos por WhatsApp
                </span>
                <span className="text-lg font-bold tabular">{WHATSAPP_VISIBLE}</span>
              </span>
            </a>

            <a
              href={`tel:+52${TELEFONO_VISIBLE.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-marca-hueso transition hover:text-marca-azul-claro"
            >
              <Phone className="h-6 w-6 text-marca-azul-claro" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-marca-hueso/50">
                  Llámanos
                </span>
                <span className="text-lg font-bold tabular">{TELEFONO_VISIBLE}</span>
              </span>
            </a>

            <div className="flex items-center gap-3 text-marca-hueso">
              <MapPin className="h-6 w-6 text-marca-rojo" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-marca-hueso/50">
                  Atendemos en
                </span>
                <span className="text-lg font-bold">Todo México</span>
              </span>
            </div>
          </div>
        </Reveal>

        <p className="mt-12 text-sm text-marca-hueso/40">
          SIN FRONTERAS · Visas y Pasaportes · Abriendo caminos, conectando
          sueños. · 34 años de experiencia.
        </p>
      </div>
    </footer>
  );
}
