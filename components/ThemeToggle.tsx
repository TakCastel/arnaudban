"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full border overflow-hidden"
    >
      {/* diaphragme très simple */}
      <span
        className="absolute inset-0 transition-all duration-500
        [clip-path:circle(0%_at_50%_50%)] dark:[clip-path:circle(75%_at_50%_50%)] bg-black"
      ></span>
    </button>
  );
}
