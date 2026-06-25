import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Envoltura de animación "reveal on scroll" usada por todas las secciones.
 * Sube y aparece una sola vez al entrar en viewport. Respeta reduced-motion
 * (framer-motion lo detecta automáticamente vía MotionConfig del navegador).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
