import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta del Manual de Identidad SIN FRONTERAS
        marca: {
          azul: "#000F9F", // Zaffre
          "azul-claro": "#3A52D6",
          rojo: "#D52B1E", // Maximum Red
          tinta: "#0A0E1A", // fondo casi-negro azulado (look del anuncio)
          "tinta-2": "#111827",
          hueso: "#F4F4F4", // Cultured
          papel: "#EDE7D9", // papel rasgado del anuncio
        },
      },
      fontFamily: {
        display: ['"Archivo"', '"Arial Narrow"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
