import Link from "next/link";
import Cut from "@/components/Cut";
import Words from "@/components/Words";
import Slugline from "@/components/Slugline";

// 404 en langage de monteur : la page a sauté au montage. Court, une blague
// et deux sorties, rien de plus.
export default function NotFound() {
  return (
    // Pas de <main> ici : le layout en fournit déjà un (un seul par page).
    <div className="bg-background text-foreground min-h-[calc(100vh-80px)] flex flex-col justify-center pt-12 md:pt-16 pb-20 md:pb-28">
      <Slugline>Int. Salle de montage — Chutes — Nuit</Slugline>
      <Cut className="px-4 md:px-10">
        <h1 className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[18vw] md:text-[11vw]">
          <Words>Plan coupé</Words>
          <br />
          <Words start={2}>au montage</Words>
        </h1>
      </Cut>
      <Cut className="px-4 md:px-10 mt-8 md:mt-12 md:ml-[50%] max-w-md">
        <p className="text-base md:text-lg leading-relaxed opacity-80">
          Erreur 404 : cette page n&apos;existe pas, ou elle a changé de place
          dans la timeline.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 font-heading uppercase tracking-[0.2em] text-sm md:text-base">
          <Link href="/" className="end-link">
            Retour au début →
          </Link>
          <Link href="/projets" className="end-link opacity-70 hover:opacity-100">
            Tous les projets →
          </Link>
        </div>
      </Cut>
    </div>
  );
}
