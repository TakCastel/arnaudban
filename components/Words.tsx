import { Fragment } from "react";

/**
 * Découpe un texte en mots, chacun dans un cache (overflow hidden) d'où il
 * sort par le bas quand le <Cut> qui l'entoure entre en scène — décalé mot
 * après mot. En dehors d'un <Cut>, le texte s'affiche normalement.
 */
export default function Words({
  children,
  start = 0,
}: {
  children: string;
  // Décalage de départ dans la cascade, quand une phrase est coupée en
  // plusieurs <Words> (ex. autour d'un <em>).
  start?: number;
}) {
  const words = children.split(" ");
  return (
    <>
      {/* L'espace reste HORS du cache : en fin de bloc inline-block, il
          serait avalé et les mots se colleraient. */}
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word">
            <span style={{ "--i": start + i } as React.CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
