"use client";

import { useTheme } from "@/lib/useTheme";
import { RiCameraLensFill, RiCameraLensLine } from "react-icons/ri";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={className || "text-foreground p-1 flex items-center justify-center transition-transform duration-500 ease-out hover:rotate-90"}
      aria-label={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
      aria-pressed={theme === 'dark'}
      type="button"
    >
      <span aria-hidden="true">
        {theme === 'light' ? <RiCameraLensFill size={20} /> : <RiCameraLensLine size={20} />}
      </span>
    </button>
  );
}
