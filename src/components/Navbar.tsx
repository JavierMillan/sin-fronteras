import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ENLACES = [
  { href: "#historias", label: "Historias" },
  { href: "#proceso", label: "Cómo funciona" },
];

/**
 * Nav N5 — floating pill (archetype Hallmark). Pastilla flotante translúcida
 * que se vuelve sólida al hacer scroll. No es la barra full-width genérica.
 * Móvil: wordmark + CTA (los enlaces ancla viven en el cuerpo).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-colors duration-300 sm:px-5",
          scrolled
            ? "border-[var(--hairline)] bg-marca-tinta/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Wordmark tipográfico (coherente con la fuente display de marca; no
            depende del PNG con fondo blanco). Las 3 estrellas = 3 décadas. */}
        <a
          href="#top"
          aria-label="SIN FRONTERAS · Visas y Pasaportes — inicio"
          className="flex flex-col leading-none"
        >
          <span className="font-display text-lg font-extrabold uppercase tracking-tight text-marca-hueso sm:text-xl">
            Sin<span className="text-marca-azul-claro">·</span>Fronteras
          </span>
          <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-marca-hueso/45">
            Visas y Pasaportes
          </span>
        </a>

        {/* Enlaces (desktop) */}
        <div className="hidden items-center gap-7 md:flex">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-sm font-medium text-marca-hueso/70 transition-colors hover:text-marca-hueso"
            >
              {e.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#diagnostico"
          className="inline-flex items-center gap-1.5 rounded-full bg-marca-rojo px-4 py-2 text-sm font-bold text-white transition hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-hueso"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Diagnóstico gratis</span>
          <span className="sm:hidden">Diagnóstico</span>
        </a>
      </div>
    </motion.nav>
  );
}
