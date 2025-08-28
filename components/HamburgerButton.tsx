"use client";

import { useId } from "react";

export default function HamburgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <button
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      aria-controls="mobile-menu-panel"
      onClick={onToggle}
      className="md:hidden relative z-[80] h-8 w-8 border border-foreground rounded-full bg-background grid place-items-center"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute block h-[1.5px] w-3 bg-foreground transition-transform duration-300 ease-in-out -translate-y-[6px]"
        style={{
          transform: open ? ("translateY(0) rotate(45deg)" as any) : "",
        }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute block h-[1.5px] w-3 bg-foreground transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute block h-[1.5px] w-3 bg-foreground transition-transform duration-300 ease-in-out translate-y-[6px]"
        style={{
          transform: open ? ("translateY(0) rotate(-45deg)" as any) : "",
        }}
      />
    </button>
  );
}
