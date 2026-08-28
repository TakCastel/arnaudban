"use client";

export default function HamburgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      aria-controls="mobile-menu-panel"
      onClick={onToggle}
      // Même logique que ThemeToggle : pas de cadre ni de fond, juste l'icône.
      className="md:hidden relative z-[80] w-8 h-6 flex items-center justify-center"
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute block h-[1.5px] w-7 transition-transform duration-300 ease-in-out ${
          // Fermé : le bouton est sur le header (bg-hero-block-bg), les barres
          // matchent son texte. Ouvert : le panneau plein écran passe en
          // bg-background — bg-hero-block-text (beige) y devient invisible en
          // thème clair (beige sur beige). bg-foreground s'adapte au thème.
          open ? "bg-foreground" : "bg-hero-block-text"
        }`}
        style={{
          transform: open ? "translateY(0) rotate(45deg)" : "translateY(-4px)",
        }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute block h-[1.5px] w-7 transition-transform duration-300 ease-in-out ${
          // Fermé : le bouton est sur le header (bg-hero-block-bg), les barres
          // matchent son texte. Ouvert : le panneau plein écran passe en
          // bg-background — bg-hero-block-text (beige) y devient invisible en
          // thème clair (beige sur beige). bg-foreground s'adapte au thème.
          open ? "bg-foreground" : "bg-hero-block-text"
        }`}
        style={{
          transform: open ? "translateY(0) rotate(-45deg)" : "translateY(4px)",
        }}
      />
    </button>
  );
}
