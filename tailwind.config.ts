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
          DEFAULT: "#f8fafc", // fond blanc cassé bleu très légèrement
        },
        text: {
          DEFAULT: "#1e3a8a", // bleu marin sombre
        },
      },
      fontFamily: {
        sans: ["var(--font-moderat)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
