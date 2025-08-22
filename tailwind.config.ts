import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(239 246 255)", // fond bleu clair
        },
        text: {
          DEFAULT: "rgb(30 58 138)", // bleu marin sombre
        },
      },
      fontFamily: {
        sans: ["var(--font-moderat)", "sans-serif"],
      },
      // Amélioration de l'accessibilité
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Animations accessibles
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
