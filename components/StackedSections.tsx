"use client";

import { Children, ReactNode, useEffect, useRef } from "react";

/**
 * Empile ses enfants les uns sur les autres : chacun reste collé (sticky) au
 * même endroit le temps que le suivant remonte par-dessus. Celui qui se fait
 * recouvrir se réduit en zoomant légèrement et s'estompe — même technique
 * que le zoom du hero (wrapper non-sticky + mesure au scroll), en JS/CSS pur.
 */
export default function StackedSections({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const apply = () => {
      ticking = false;
      const wrappers = wrapperRefs.current;
      wrappers.forEach((wrapper, i) => {
        const card = cardRefs.current[i];
        // Le dernier de la pile n'est jamais recouvert : il reste net.
        if (!wrapper || !card || i === wrappers.length - 1) return;

        const rect = wrapper.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        const progress =
          scrollableDistance > 0
            ? Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
            : 0;

        const scale = 1 + progress * 0.06;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(1 - progress);
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", apply);
    };
  }, [items.length]);

  return (
    <div className="relative">
      {items.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          className="relative h-[60vh] md:h-[70vh]"
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="sticky top-24 bg-background will-change-transform"
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
