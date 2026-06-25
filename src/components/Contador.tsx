import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Contador que sube hasta `valor` al entrar en viewport (mov. #9).
 * Respeta prefers-reduced-motion (ui-ux-pro-max: reduced-motion) → muestra
 * el valor final directo. Soporta prefijo/sufijo ("+", "K", "Todo México").
 */
export function Contador({
  valor,
  prefijo = "",
  sufijo = "",
  textoFijo,
  duracion = 1400,
}: {
  valor?: number;
  prefijo?: string;
  sufijo?: string;
  textoFijo?: string; // para "Todo México" — no es número
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (textoFijo || valor === undefined || !enVista) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setN(valor);
      return;
    }

    let raf = 0;
    const inicio = performance.now();
    const tick = (ahora: number) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // ease-out cúbico (curva de salida calmada, sin bounce)
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(valor * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enVista, valor, duracion, textoFijo]);

  return (
    <span ref={ref} className="tabular">
      {textoFijo ?? `${prefijo}${n.toLocaleString("es-MX")}${sufijo}`}
    </span>
  );
}
