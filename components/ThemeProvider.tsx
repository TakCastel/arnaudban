// Ancien comportement : ce composant était "use client" et faisait
// `if (!mounted) return null`, ce qui vidait TOUT le HTML statique du site
// (header, contenu, footer) le temps que React s'hydrate côté client — sur
// un site en export statique, ça veut dire un <body> quasiment vide pour
// n'importe quel crawler qui n'exécute pas de JS. La prévention du flash de
// thème est maintenant gérée par un script inline dans app/layout.tsx qui
// s'exécute avant le premier paint, donc ce composant n'a plus besoin de
// bloquer le rendu : il se contente de rendre ses enfants normalement.
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

