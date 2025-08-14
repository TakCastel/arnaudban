"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Container from "./Container";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="hover:opacity-70">
    {children}
  </a>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/40">
      <Container className="flex items-center justify-between h-14">
        <Link href="/" className="font-semibold">
          ARNAUD BAN
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink href="#work">Work</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
