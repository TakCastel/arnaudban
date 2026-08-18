/**
 * Filtre SVG bidon (invisible, 0×0) : convertit une image en niveaux de gris
 * puis remappe chaque niveau vers le duotone de marque (ombres → bleu,
 * lumières → beige — mêmes valeurs que --blue/--beige dans globals.css).
 * Monté une seule fois ici (layout racine) ; réutilisé partout via la
 * classe utilitaire `.duotone` (voir globals.css) qui référence son id.
 */
export default function DuotoneFilters() {
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
        {/* rgb(28 44 196) → rgb(235 222 196), soit /255 par canal. */}
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.1098 0.9216" />
          <feFuncG type="table" tableValues="0.1725 0.8706" />
          <feFuncB type="table" tableValues="0.7686 0.7686" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
