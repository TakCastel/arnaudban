"use client";

import { useEffect, useRef } from "react";

/**
 * Filtre SVG bidon (invisible, 0×0) : convertit une image en niveaux de gris
 * puis remappe chaque niveau vers le duotone de marque (ombres → bleu,
 * lumières → beige). Monté une seule fois ici (layout racine) ; réutilisé
 * partout via la classe utilitaire `.duotone` (voir globals.css) qui
 * référence son id.
 *
 * Les couleurs ne sont PAS dupliquées ici : au montage, on lit --blue et
 * --beige directement depuis globals.css (seule source de vérité) et on en
 * dérive les tables de correspondance du filtre. Changer les deux variables
 * CSS suffit donc à faire suivre les miniatures aussi.
 */
export default function DuotoneFilters() {
  const funcRRef = useRef<SVGFEFuncRElement>(null);
  const funcGRef = useRef<SVGFEFuncGElement>(null);
  const funcBRef = useRef<SVGFEFuncBElement>(null);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const shadows = parseRgb(root.getPropertyValue("--blue"));
    const highlights = parseRgb(root.getPropertyValue("--beige"));
    if (!shadows || !highlights) return;

    const toTable = (shadow: number, highlight: number) =>
      `${(shadow / 255).toFixed(4)} ${(highlight / 255).toFixed(4)}`;

    funcRRef.current?.setAttribute("tableValues", toTable(shadows[0], highlights[0]));
    funcGRef.current?.setAttribute("tableValues", toTable(shadows[1], highlights[1]));
    funcBRef.current?.setAttribute("tableValues", toTable(shadows[2], highlights[2]));
  }, []);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <filter id="duotone">
        {/* Niveaux de gris (coefficients de luminance rec709), avant remap. */}
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0      0      0      1 0"
        />
        {/* type="discrete" (pas "table") : avec 2 valeurs, ça découpe le
            niveau de gris en 2 paliers francs — sous 50% → couleur ombre,
            au-dessus → couleur lumière — au lieu d'un dégradé continu
            entre les deux. C'est ce qui donne les 2 aplats plats du
            duotone plutôt qu'un fondu bleu/beige.
            tableValues posées en JS au montage (voir useEffect ci-dessus) :
            valeurs de repli identiques à --blue/--beige actuels, au cas où
            le JS n'aurait pas encore tourné (SSR / premier paint). */}
        <feComponentTransfer>
          <feFuncR ref={funcRRef} type="discrete" tableValues="0.1098 0.9216" />
          <feFuncG ref={funcGRef} type="discrete" tableValues="0.1725 0.8706" />
          <feFuncB ref={funcBRef} type="discrete" tableValues="0.7686 0.7686" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

/** Parse "rgb(28 44 196)" (ou "rgb(28, 44, 196)") en [r, g, b]. */
function parseRgb(value: string): [number, number, number] | null {
  const match = value.match(/rgb\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)\s*\)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}
