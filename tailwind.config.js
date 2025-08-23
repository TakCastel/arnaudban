/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: "rgb(239 246 255)" },
        text: { DEFAULT: "rgb(30 58 138)" },
        // Pour les classes déjà utilisées dans tes comps:
        foreground: { DEFAULT: "rgb(30 58 138)" }, // utilisé par `from-foreground`, `text-foreground`
        brand: {
          blue: "#1e3a8a",
          "blue-light": "#3b82f6",
        },
        "text-muted": "#64748b", // si tu utilises border-text-muted etc.
      },
      fontFamily: {
        sans: ["var(--font-moderat)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
