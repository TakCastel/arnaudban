"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const cellClass =
  "group relative h-full flex items-center px-10 font-heading font-bold uppercase text-base tracking-wide text-hero-block-text transition-colors duration-200 hover:bg-hero-block-text hover:text-hero-block-bg";

function Divider() {
  // Trait simple et toujours visible — pas d'animation ici, pour ne pas
  // risquer qu'il reste invisible si une transition ne se déclenche pas.
  return <span className="w-px h-full bg-hero-block-text shrink-0" aria-hidden="true" />;
}

function NavLink({
  href,
  play,
  delay,
  children,
  ariaLabel,
}: {
  href: string;
  play: boolean;
  delay: number;
  children: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${cellClass} overflow-hidden transition-[opacity,transform] duration-400 ease-out ${
        play ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Effet "roulette" au survol : le texte visible part vers le bas
          pendant qu'une copie identique arrive par le haut. */}
      <span className="relative h-5 overflow-hidden inline-block">
        <span className="flex flex-col -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="h-5 flex items-center">{children}</span>
          <span className="h-5 flex items-center">{children}</span>
        </span>
      </span>
    </Link>
  );
}

export default function DesktopNav({ play }: { play: boolean }) {
  return (
    <nav
      className="hidden md:flex items-stretch h-full"
      role="navigation"
      aria-label="Navigation principale"
    >
      <Divider />
      <NavLink href="/projets" play={play} delay={80} ariaLabel="Voir les projets">
        Projets
      </NavLink>
      <Divider />
      <NavLink href="/services" play={play} delay={200} ariaLabel="Services">
        Services
      </NavLink>
      <Divider />
      <NavLink href="/about" play={play} delay={320} ariaLabel="À propos">
        À propos
      </NavLink>
      <Divider />
      <div
        className={`flex items-center transition-[opacity,transform] duration-400 ease-out ${
          play ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{ transitionDelay: "440ms" }}
      >
        <ThemeToggle className={cellClass} />
      </div>
      <Divider />
    </nav>
  );
}
