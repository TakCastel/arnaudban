"use client";

import { useTheme } from "@/lib/useTheme";
import { RiCameraLensFill, RiCameraLensLine } from "react-icons/ri";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center"
      aria-label={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'light' ? <RiCameraLensFill size={20} /> : <RiCameraLensLine size={20} />}
    </button>
  );
}
