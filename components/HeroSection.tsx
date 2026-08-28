"use client";

import { useState, useEffect, useRef } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import HeroLoader from "./HeroLoader";

// Distance de SCROLL RÉELLE (en plus d'un écran) pendant laquelle la vidéo
// reste collée (sticky) à l'écran. Un élément sticky ne reste collé que le
// temps que son conteneur dépasse la hauteur d'écran : hauteur du wrapper =
// 100vh + cette valeur. Avec une valeur trop courte (30), les 10% de fondu
// du titre ne représentent que 3vh de scroll réel : invisible, on dirait
// qu'il ne disparaît jamais. Il faut assez de distance pour que la montée,
// le zoom et le fondu final se sentent vraiment.
const EXTRA_SCROLL_VH = 90;

export default function HeroSection({ id }: { id?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  // Passe à true une fois la signature "Réalisation / Montage" entièrement
  // apparue (voir le setTimeout plus bas) : sert de garde dans applyZoom
  // pour ne pas faire disparaître la flèche au scroll avant qu'elle ait eu
  // le temps d'apparaître.
  const heroEnteredRef = useRef(false);

  useEffect(() => {
    // Avec `autoPlay`, le navigateur peut charger la vidéo dès le parsing du
    // HTML statique, avant que React n'ait fini de s'hydrater et d'attacher
    // onLoadedData : l'événement part alors dans le vide et le loader tourne
    // indéfiniment. On vérifie readyState au montage pour rattraper ce cas.
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Filet de sécurité : si la vidéo ne déclenche ni onLoadedData ni onError
    // (connexion très lente, requête qui reste en attente), on affiche quand
    // même un état d'erreur au lieu de laisser le loader tourner indéfiniment.
    if (isLoaded || hasError) return;
    const timeout = setTimeout(() => {
      setHasError(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [isLoaded, hasError]);

  useEffect(() => {
    // Effet "scroll zoom" en JS/CSS pur. On ne peut pas mesurer la progression
    // depuis l'élément sticky lui-même : une fois collé en haut, son
    // getBoundingClientRect().top reste bloqué à 0. La technique standard
    // (celle de l'exemple motion.dev) est d'englober le sticky dans un
    // wrapper plus haut que l'écran et non-sticky, et de mesurer LA position
    // de ce wrapper : elle continue de bouger pendant tout le scroll.
    let ticking = false;

    const applyZoom = () => {
      ticking = false;
      const wrapper = wrapperRef.current;
      const zoom = zoomRef.current;
      const title = titleRef.current;
      if (!wrapper || !zoom) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const progress =
        scrollableDistance > 0
          ? Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
          : 0;

      // Vidéo : zoom + flou sur tout le scroll, PAS de fondu — elle reste
      // pleinement visible, juste de plus en plus zoomée/floutée.
      const scale = 1 + progress * 0.5; // 1 → 1.5
      const blur = progress * 24; // 0 → 24px

      zoom.style.transform = `scale(${scale})`;
      zoom.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";

      if (title) {
        // "ARNAUD BAN" monte sur tout le scroll, jusqu'en haut de l'écran,
        // mais nettement plus lentement que le scroll réel : il ne parcourt
        // que 40% de la distance effectivement scrollée (scrollableDistance),
        // pas une valeur fixe déconnectée de la vitesse de défilement.
        // Il disparaît par transparence progressive (pas de flou) : à partir
        // de 40% du scroll, de plus en plus transparent jusqu'à 100%.
        const riseDistance = scrollableDistance * 0.4;
        const titleY = -progress * riseDistance;
        const titleOpacity = 1 - Math.min(Math.max((progress - 0.4) / 0.6, 0), 1);

        title.style.transform = `translateY(${titleY}px)`;
        title.style.opacity = String(titleOpacity);
      }

      // Flèche "scroller en bas" : ne s'anime qu'une fois la signature
      // apparue (heroEnteredRef), puis s'estompe vite dès que le scroll
      // démarre (12% du scroll suffit) — plus la peine de la montrer une
      // fois qu'on est déjà en train de scroller.
      const arrow = arrowRef.current;
      if (arrow && heroEnteredRef.current) {
        const arrowOpacity = 1 - Math.min(progress / 0.12, 1);
        arrow.style.opacity = String(arrowOpacity);
        arrow.style.pointerEvents = arrowOpacity < 0.05 ? "none" : "auto";
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyZoom);
      }
    };

    applyZoom();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", applyZoom);

    // La flèche apparaît une fois la signature entièrement affichée (dernière
    // ligne "Par Arnaud Ban" : delay 1.6s + durée 0.6s, voir globals.css).
    const revealTimer = setTimeout(() => {
      heroEnteredRef.current = true;
      arrowRef.current?.classList.add("is-in");
      applyZoom();
    }, 2300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", applyZoom);
      clearTimeout(revealTimer);
    };
  }, []);

  // Clique sur la flèche : saute directement au prochain titre (le
  // paragraphe d'intro juste sous le hero, id="intro-title" dans
  // app/page.tsx), sans repasser par toute l'animation de zoom/scroll
  // intermédiaire. Même pattern que components/ScrollToAnchor.tsx.
  const scrollPastHero = () => {
    document
      .getElementById("intro-title")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={wrapperRef}
      // bg-hero-block-bg : une fois le sticky décollé, le reste du wrapper
      // (l'espace de scroll qui dépasse un écran) doit rester bleu/noir —
      // comme la vidéo déjà fondue et la section suivante, tout raccorde.
      className="relative -mt-20 bg-hero-block-bg"
      style={{ height: `calc(100vh + ${EXTRA_SCROLL_VH}vh)` }}
    >
      <section
        id={id}
        // Fond noir fixe (pas la variable de thème) : avant que la vidéo
        // n'apparaisse, on ne doit jamais entrevoir le bleu du thème clair.
        className="w-full h-screen sticky top-0 z-10 overflow-hidden bg-black"
        role="banner"
        aria-label="Section d'accueil - Arnaud Ban"
      >
        <div ref={zoomRef} className="absolute inset-0 will-change-transform">
          {/* Loader / état d'erreur qui s'affichent pendant le chargement */}
          <div
            className={`absolute inset-0 z-20 transition-opacity duration-300 ${
              isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <HeroLoader hasError={hasError} />
          </div>

          {/* Vidéo de fond : apparaît d'un coup dès qu'elle est prête, pas de
              fondu qui laisse le temps d'apercevoir ce qu'il y a derrière. */}
          {!hasError && (
            <div
              className="w-full h-full"
              style={{ opacity: isLoaded ? 1 : 0 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/hero-banner.mp4`}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                aria-label="Vidéo de présentation d'Arnaud Ban, réalisateur et monteur vidéo"
                onLoadedData={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </div>
          )}
        </div>

        {/* Signature en très grand, en mix-blend-mode : la couleur du texte
            s'inverse en continu selon ce qu'il y a derrière dans la vidéo.
            "Réalisation" apparaît, puis "Montage" part de sa position et
            descend prendre sa place en dessous, puis "Par Arnaud Ban" vient
            s'insérer entre les deux. Monte (lentement) et s'estompe au
            scroll (tout le bloc, via titleRef). */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 will-change-transform text-center"
        >
          <span className="animate-hero-signature-line font-heading font-bold text-[16vw] md:text-[11vw] tracking-tighter leading-none text-white mix-blend-difference select-none whitespace-nowrap">
            Réalisation
          </span>
          <span className="animate-hero-signature-sub font-heading text-[clamp(0.8rem,2vw,1.1rem)] tracking-[0.2em] uppercase my-[clamp(0.4rem,1.6vw,1rem)] text-white mix-blend-difference select-none whitespace-nowrap">
            Par Arnaud Ban
          </span>
          <span className="animate-hero-signature-descend font-heading font-bold text-[16vw] md:text-[11vw] tracking-tighter leading-none text-white mix-blend-difference select-none whitespace-nowrap">
            Montage
          </span>
        </div>

        {/* Indicateur "scroller en bas" : apparaît une fois la signature
            affichée, flèche qui rebondit doucement en continu. Clic = saute
            au prochain titre (#intro-title), sinon on peut simplement
            scroller normalement. */}
        <button
          ref={arrowRef}
          type="button"
          onClick={scrollPastHero}
          aria-label="Défiler vers le bas"
          className="hero-scroll-hint absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 text-white mix-blend-difference"
        >
          <RiArrowDownLine
            className="hero-scroll-hint-bounce w-8 h-8 md:w-9 md:h-9"
            aria-hidden="true"
          />
        </button>
      </section>
    </div>
  );
}
