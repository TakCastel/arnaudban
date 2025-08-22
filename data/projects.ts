import type { Project } from "./project-type"; // si tu as un fichier de types séparé

export const projects: Project[] = [
  {
    slug: "noir-memoire",
    title: "Noir Mémoire",
    subtitle: "Fragments du réel",
    cover: "https://picsum.photos/seed/noir/800/600",
    vimeoId: "826394857",
    tags: ["art", "documentaire"],
    palette: "bw",
    blocks: [
      { type: "video", vimeoId: "826394857" },
      {
        type: "image",
        src: "https://picsum.photos/seed/noir1/1200/800",
        alt: "Still 1",
      },
      {
        type: "text",
        html: "<p>Exploration sensorielle de la mémoire urbaine.</p>",
      },
    ],
  },
  {
    slug: "bleu-electrique",
    title: "Bleu Électrique",
    subtitle: "Motion / Fashion",
    cover: "https://picsum.photos/seed/bleu/800/600",
    vimeoId: "391845123",
    tags: ["fashion", "motion"],
    palette: "blue-on-white",
    blocks: [
      {
        type: "image",
        src: "https://picsum.photos/seed/bleu1/1200/800",
        alt: "Visuel 1",
      },
      { type: "video", vimeoId: "391845123" },
      { type: "text", html: "<p>Couleurs, vitesse, matière.</p>" },
    ],
  },
  {
    slug: "geste-vide",
    title: "Geste Vide",
    subtitle: "Installation & silence",
    cover: "https://picsum.photos/seed/geste/800/600",
    tags: ["expérimental", "slow cinema"],
    palette: "bw",
    blocks: [
      { type: "image", src: "https://picsum.photos/seed/geste1/1200/800" },
      { type: "text", html: "<p>Un plan. Un souffle. Rien d’autre.</p>" },
    ],
  },
  {
    slug: "nuit-saturee",
    title: "Nuit Saturée",
    subtitle: "Clips / clubs / flash",
    cover: "https://picsum.photos/seed/nuit/800/600",
    vimeoId: "789456321",
    tags: ["clip", "club"],
    palette: "blue-on-white",
    blocks: [
      { type: "video", vimeoId: "789456321" },
      {
        type: "image",
        src: "https://picsum.photos/seed/nuit1/1200/800",
        alt: "Flashback",
      },
      { type: "text", html: "<p>Lumières qui claquent, souvenirs flous.</p>" },
    ],
  },
];
