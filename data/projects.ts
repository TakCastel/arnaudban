// Types pour les projets
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
  date: string;
  keywords: string;
  videoUrl?: string;
}

export const projects: Project[] = [
  // COURT METRAGES / PROJETS PERSONNELS
  {
    slug: "doug-2020",
    title: "Doug",
    subtitle: "Court métrage de fiction",
    cover: "/assets/DOUG.webp",
    description: "Un projet de fiction que j'ai écrit et réalisé pendant ma première année d'école de cinéma.",
    date: "2020",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118775843"
  },
  {
    slug: "invisible-2021",
    title: "Invisible",
    subtitle: "Documentaire",
    cover: "/assets/INVISIBLE.webp",
    description: "Documentaire de fin d'études. Je suis parti filmer la vie austère d'une petite communauté de gens en Auvergne. Voici le témoignage de personnes qui souffrent dans l'ombre. Des invisibles à qui on ne donne pas la parole.",
    date: "2021",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118779210"
  },
  {
    slug: "goutte-de-trop-2023",
    title: "Goutte de trop",
    subtitle: "Court métrage de fiction",
    cover: "/assets/GOUTTE_DE_TROP.webp",
    description: "Fiction réalisée dans le cadre du festival KINO-A. Le but de ce festival est de réaliser sans budget et entre passionnés, des productions audiovisuelles autour d'une thématique et différentes contraintes à respecter.",
    date: "2023",
    keywords: "Réalisation, Montage, Étalonnage"
  },
  {
    slug: "tel-esprit-qui-croyait-prendre-2024",
    title: "Tel esprit qui croyait prendre",
    subtitle: "Court métrage de fiction",
    cover: "/assets/TEL_ESPRIT.webp",
    description: "Fiction réalisée dans le cadre du festival KINO-A. Les instructions du festival étaient de raconter une histoire autour d'un fait divers dans les années 30. Nous avons choisi l'engouement bien connu pour le spiritisme à cette époque-là.",
    date: "2024",
    keywords: "1er Assistant caméra, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118803011"
  },
  {
    slug: "belitre-2024",
    title: "Bêlitre",
    subtitle: "Court métrage de fiction",
    cover: "/assets/BELITRE.webp",
    description: "Avec tout ce qu'on raconte sur les intelligences artificielles, que vont penser les amis de Gaëlle après l'acquisition d'un nouveau compagnon robotique ? Attention si vous êtes sensibles au gore car la fin est un peu sanglante...",
    date: "2024",
    keywords: "1er Assistant caméra",
    videoUrl: "https://player.vimeo.com/video/1118798231"
  },
  {
    slug: "arabesque-2019",
    title: "Arabesque",
    subtitle: "Court métrage de fiction",
    cover: "/assets/ARABESQUE.webp",
    description: "Passer d'une émotion à l'autre sans un mot de dialogue. C'était le défi qu'on s'est lancés lors de cette collaboration avec la danseuse Agathe Petrini. Créer une chorégraphie brusque et saccadée qui se change en allégresse lorsque la musique d'Augustin Birraux s'adoucit.",
    date: "2019",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118801902"
  },
  {
    slug: "3-femmes-2024",
    title: "3 femmes",
    subtitle: "Court métrage de fiction",
    cover: "/assets/3_FEMMES.webp",
    description: "Deuxième projet du festival KINO sur les années folles. Une histoire de fait divers orchestrée par 3 femmes aux airs innocents.",
    date: "2024",
    keywords: "Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118804370"
  },

  // COMMANDES
  {
    slug: "synapson",
    title: "Synapson",
    subtitle: "After movie",
    cover: "/assets/SYNAPSON.webp",
    description: "Montage effectué pour la boîte de production Five Frames Studio. Un Aftermovie pour une soirée dans la cave à vin Maison Sinae à Chusclan. La soirée accueillait de multiples DJ's dont Synapson et Monsieur et Madame Benoît.",
    date: "2022",
    keywords: "Montage",
    videoUrl: "https://player.vimeo.com/video/1118802324"
  },
  {
    slug: "midnight-cthulhu-and-you-2024",
    title: "Midnight, cthulhu and you",
    subtitle: "Clip promotionnel",
    cover: "/assets/MIDNIGHT_CTHULHU.webp",
    description: "Ma passion pour les histoires fantastiques et H.P Lovecraft me pousse à m'éloigner de la vidéo de tatouage traditionnelle et à tenter de raconter le tatouage par d'autres moyens.",
    date: "2024",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118781259"
  },
  {
    slug: "on-dit-delle-2021",
    title: "On dit d'elle",
    subtitle: "Clip musical",
    cover: "/assets/ON DIT DELLE.webp",
    description: "La chanteuse Miss Myriam m'a approché afin de réaliser le clip de son single On dit d'elle. Pour ce clip j'ai voulu une esthétique Rococo avec des influences telles que le Marie Antoinette de Sofia Coppola. Le clip a fait partie de la sélection du festival 1ère marche en 2023.",
    date: "2021",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118798572"
  },
  {
    slug: "amour-molotov-2019",
    title: "Amour Molotov",
    subtitle: "Live session",
    cover: "/assets/AMOUR_MOLOTOV.webp",
    description: "Une live session enregistrée au studio Octavox à Poisat pour le groupe de musique Dub Silence.",
    date: "2019",
    keywords: "Captation, Montage",
    videoUrl: "https://player.vimeo.com/video/1118781471"
  },
  {
    slug: "concept-pub-san-pellegrino",
    title: "Concept pub san pellegrino",
    subtitle: "Publicité",
    cover: "/assets/SANPELLEGRINO.webp",
    description: "Se demander ce que l'on va faire aujourd'hui. Ouvrir le frigo et trouver une cannette de San Pellegrino. Improviser un concept de publicité pour se faire un début de portfolio. Merci aux copains Benjamin Martin et Lou Touchard pour leur aide.",
    date: "2022",
    keywords: "Réalisation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118803446"
  },
  {
    slug: "baladi-jazz-project",
    title: "Baladi jazz project",
    subtitle: "Concert",
    cover: "/assets/BALADI.webp",
    description: "Captation de la formation Baladi Jazz Project au Théâtre de l'oulle à Avignon. Le groupe a aimé les images et il m'a été demandé de monter un petit teaser avec celles-ci.",
    date: "2023",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118802169"
  },
  {
    slug: "charly-poete-poete",
    title: "Charly poete poete",
    subtitle: "Théâtre",
    cover: "/assets/CHARLY_POETE.webp",
    description: "J'ai accompagné cet artiste pendant une tournée au bourget du lac et à Voiron afin de faire les captations de son spectacle. Le montage est un mélange des meilleurs moments des deux captations.",
    date: "2024",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118774666"
  },
  {
    slug: "id-logistics",
    title: "ID logistics",
    subtitle: "Reportage corporate",
    cover: "/assets/ID_LOGISTICS.webp",
    description: "Aurélie Briquet, employée chez ID logistics, nous présente le métier de cariste. Une commande de ID logistics réalisée pendant mon contrat en tant que vidéaste chez Insercall.",
    date: "2024",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118797324"
  },
  {
    slug: "les-jeunes-font-leurs-show-mission-locale-orange",
    title: "Les jeunes font leurs show",
    subtitle: "Reportage",
    cover: "/assets/LJFLS.webp",
    description: "Les jeunes de la mission locale s'expriment à travers les arts de la scène. Projet réalisé pour la mission locale d'orange pendant mon contrat en tant que vidéaste chez Insercall.",
    date: "2024",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118781960"
  },
  {
    slug: "quartiers-dete-mission-locale-avignon",
    title: "Quartier d'été",
    subtitle: "Reportage",
    cover: "/assets/QUARTIERS_DETE.webp",
    description: "La cité de l'emploi mets en place des rencontres professionnelles un peu particulières… Sortir de l'entretien d'embauche traditionnel, se rencontrer autrement grâce à des activités comme l'escalade ou l'escape game. Projet réalisé pendant mon contrat en tant que vidéaste chez Insercall.",
    date: "2023",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118797680"
  },
  {
    slug: "ecotubeurs",
    title: "Ecotubeurs",
    subtitle: "Court métrage de fiction",
    cover: "/assets/ECOTUBEURS.webp",
    description: "Ecotubeurs est un dispositif qui permet à des élèves de primaire, collège ou lycée de réaliser des films courts sur le thème de l'écologie. Avec Florine Clap nous sommes intervenus pour accompagner les jeunes sur le plan technique du film qu'ils ont écrit.",
    date: "2025",
    keywords: "Montage, FX, Étalonnage"
  },
  {
    slug: "remise-des-diplomes-cfa",
    title: "Remise des diplômes CFA",
    subtitle: "After movie",
    cover: "/assets/CFA.webp",
    description: "Aftermovie de la soirée de remise des diplômes pour les étudiants du CFA du bâtiment à Avignon. Réalisé pendant mon contrat en tant que vidéaste chez Insercall.",
    date: "2023",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118784189"
  },
  {
    slug: "renovart",
    title: "Renov'Art",
    subtitle: "Reportage",
    cover: "/assets/RENOVART.webp",
    description: "Les jeunes de la mission locale d'orange racontent la rénovation d'un quartier de la ville à travers différents médiums artistiques. Projet réalisé pour la mission locale d'orange pendant mon contrat en tant que vidéaste chez Insercall.",
    date: "2023",
    keywords: "Captation, Montage, Étalonnage",
    videoUrl: "https://player.vimeo.com/video/1118804798"
  },
];
