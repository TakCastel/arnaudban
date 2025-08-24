import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background py-6 relative z-30" role="contentinfo">
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
        <div className="text-center">
          <Link
            href="/mentions-legales"
            className="text-sm text-foreground/70 hover:text-foreground hover:underline transition-colors duration-300"
            aria-label="Lire les mentions légales"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
