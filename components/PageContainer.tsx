import { ReactNode } from "react";

/**
 * Conteneur unique pour tout le contenu du site : même marge, même largeur
 * de lecture, partout, sans exception. `width="full"` n'existe que pour le
 * header/footer (chrome de page, pas du contenu) qui doivent aller jusqu'au
 * bord ; toute page de contenu utilise `<PageContainer>` sans prop.
 */
const widths = {
  default: "max-w-5xl",
  full: "",
} as const;

export default function PageContainer({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widths;
}) {
  return (
    <div
      className={`w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto ${widths[width]} ${className}`}
    >
      {children}
    </div>
  );
}
