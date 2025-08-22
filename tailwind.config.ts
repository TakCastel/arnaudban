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
    },
  },
  plugins: [],
} satisfies Config;
