/**
 * Préfixe un chemin absolu ("/assets/…") avec le basePath courant.
 *
 * En prod (VPS), NEXT_PUBLIC_BASE_PATH est vide : ne change rien.
 * En preview GitHub Pages (voir next.config.js), le site est servi sous
 * /arnaudban/ — nécessaire ici parce que `images.unoptimized: true` fait que
 * next/image n'ajoute pas lui-même le basePath au `src` (contrairement à
 * next/link et next/image en mode optimisé), donc on le fait à la main.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
