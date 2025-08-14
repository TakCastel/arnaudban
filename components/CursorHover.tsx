"use client";
import { useEffect } from "react";

export default function CursorHover() {
  useEffect(() => {
    const el = document.body;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0
                 [mask-image:radial-gradient(150px_at_var(--mx)_var(--my),#000_0%,transparent_60%)]
                 bg-white/2 dark:bg-white/3 transition"
    />
  );
}
