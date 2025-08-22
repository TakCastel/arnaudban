// Types pour les projets
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
}

export const projects: Project[] = [
  // COURT METRAGES / PROJETS PERSONNELS
  {
    slug: "doug-2020",
    title: "Doug",
    subtitle: "2020 - Réalisation, montage et étalonnage",
    cover: "/assets/DOUG.png",
    description: "Un projet de fiction que j'ai écrit et réalisé pendant ma première année d'école de cinéma. C'est un exercice de style à la Tarantino dont le projet d'origine faisait une dizaine de pages mais a dû être raccourci à cause du covid.",
  },
  {
    slug: "invisible-2021",
    title: "Invisible",
    subtitle: "2021 - Réalisation, tournage, montage et étalonnage",
    cover: "/assets/INVISIBLE.png",
    description: "Mon projet de fin d'études et un des films les plus difficiles et éprouvants que j'ai jamais réalisé. Avec ce documentaire j'ai tenté de montrer que des gens qui souffrent dans l'ombre ne sont pas reconnus par le gouvernement. J'espère que leurs voix seront entendues.",
  },
  {
    slug: "goutte-de-trop-2023",
    title: "Goutte de trop",
    subtitle: "2023 - Montage et étalonnage",
    cover: "/assets/GOUTTE_DE_TROP.png",
    description: "Un petit projet de fiction réalisé dans le cadre du festival KINO-A. Le but de ce festival est de réaliser sans budget et entre passionés, des productions audiovisuelles autour d'une thématique choisie à l'avance et avec différentes contraintes à respecter.",
  },
  {
    slug: "tel-esprit-qui-croyait-prendre-2024",
    title: "Tel esprit qui croyait prendre",
    subtitle: "2024 - 1er assistant caméra, montage et étalonnage",
    cover: "/assets/TEL_ESPRIT.png",
    description: "Un projet de court-métrage réalisé pour le festival KINO-A. En tant qu'assistant caméra 1er, j'ai eu la responsabilité de maintenir la netteté de l'image et d'assister le chef opérateur.",
  },
  {
    slug: "belitre-2024",
    title: "Bêlitre",
    subtitle: "2024 - 1er assistant caméra",
    cover: "/assets/BELITRE.png",
    description: "Projet en tant qu'assistant caméra 1er. L'assistant caméra 1er est responsable de la netteté de l'image. C'est un poste technique qui demande de la précision et de la concentration.",
  },
  {
    slug: "arabesque-2019",
    title: "Arabesque",
    subtitle: "2019 - Réalisation, montage et étalonnage",
    cover: "/assets/ARABESQUE.png",
    description: "La collaboration avec une danseuse a été un travail intéressant. Il s'agissait de créer un dialogue avec une professionnelle alors que je suis étranger à cet univers. Les échanges pour déterminer quels mouvements feraient partie de la chorégraphie et lesquels colleraient bien à la composition musicale que nous avions demandé à Augustin Birraux.",
  },
  {
    slug: "3-femmes-2024",
    title: "3 femmes",
    subtitle: "2024 - Étalonnage et compositing",
    cover: "https://picsum.photos/seed/3femmes/800/600",
    description: "Un travail d'étalonnage qui vient vraiment accompagner la narration de l'histoire. La trame se déroule dans les années folles qui s'illustre au début du film par un noir et blanc au format 4/3. Mais alors qu'une information apporte un souffle nouveau de liberté sur le personnage principal, le ratio de l'image s'étire et le noir et blanc laisse place à une colorimétrie saturée et irréaliste qui reprends les codes du Teal and Orange.",
  },

  // COMMANDES
  {
    slug: "synapson",
    title: "Synapson",
    subtitle: "Montage",
    cover: "/assets/SYNAPSON.png",
    description: "Aftermovie pour une soirée dans la cave à vin Maison Sinae à Chusclan. La soirée accueillait de multiples DJ's dont Synapson et Monsieur et Madame Benoît. Monter un aftermovie demande de capturer l'essence de la soirée en quelques minutes.",
  },
  {
    slug: "midnight-cthulhu-and-you-2024",
    title: "Midnight, cthulhu and you",
    subtitle: "2024 - Réalisation, montage et étalonnage",
    cover: "/assets/MIDNIGHT_CTHULHU.jpg",
    description: "Projet personnel réalisé avec mon cousin qui est tatoueur professionnel. Le tatouage portant sur l'univers de HP Lovecraft, je désirais m'éloigner de la vidéo de tatouage traditionnelle pour tenter une mise en scène plus fantastique.",
  },
  {
    slug: "on-dit-delle-2021",
    title: "On dit d'elle",
    subtitle: "2021 - Réalisation, tournage, montage et étalonnage",
    cover: "/assets/ON DIT DELLE.png",
    description: "La chanteuse Miss Myriam m'a approché afin de réaliser le clip de son single On dit d'elle. Pour ce clip j'ai été cherché du côté de l'esthétique Rococo avec des influences telles que le Marie Antoinette de Sofia Coppola. Le clip a fait partie de la sélection du festival 1ère marche en 2023.",
  },
  {
    slug: "amour-molotov-2019",
    title: "Amour Molotov",
    subtitle: "2019 - Tournage et montage",
    cover: "/assets/AMOUR_MOLOTOV.png",
    description: "J'ai été approché par le groupe Dub Silence pour capter et monter une live session enregistrée au studio Octavox à Poisat. Enregistrer une session live demande de l'anticipation et de la réactivité.",
  },
  {
    slug: "concept-pub-san-pellegrino",
    title: "Concept pub : San Pellegrino",
    subtitle: "Concept publicitaire",
    cover: "/assets/SANPELLEGRINO.png",
    description: "Voici un concept de publicité que j'ai réalisé en une journée à la maison de mes parents afin de me monter un début de port-folio. Parfois, les meilleures idées naissent sous la contrainte.",
  },
  {
    slug: "baladi-jazz-project",
    title: "Baladi jazz project",
    subtitle: "Tournage, montage et étalonnage",
    cover: "/assets/BALADI.png",
    description: "Demande de captation d'un concert dans un théâtre du centre ville d'Avignon. Les clients ont tellement aimé les images qu'ils ont également demandé à ce que je monte un petit teaser.",
  },
  {
    slug: "charly-poete-poete",
    title: "Charly poète poète",
    subtitle: "Tournage, montage et étalonnage",
    cover: "/assets/CHARLY_POETE.png",
    description: "J'ai accompagné cet artiste pendant une tournée Au bourget du lac et à Voiron afin de faire les captations de son spectacle. J'ai ensuite mélangé les deux captations pour garder les meilleurs moments de chacune en un seul montage.",
  },
  {
    slug: "id-logistics",
    title: "ID Logistics",
    subtitle: "Projet corporate",
    cover: "https://picsum.photos/seed/idlogistics/800/600",
    description: "Projet corporate pour ID Logistics. Travailler pour une entreprise comme ID Logistics demande de comprendre leurs enjeux de communication. Il faut créer du contenu qui reflète leur identité de marque tout en étant engageant pour leur audience.",
  },
  {
    slug: "quartiers-dete-mission-locale-avignon",
    title: "Quartiers d'été, mission locale d'Avignon",
    subtitle: "Projet social",
    cover: "/assets/QUARTIERS_DETE.png",
    description: "Projet pour la mission locale d'Avignon dans le cadre des quartiers d'été. Travailler avec la mission locale d'Avignon m'a permis de m'impliquer dans un projet à fort impact social.",
  },
  {
    slug: "les-jeunes-font-leurs-show-mission-locale-orange",
    title: "Les jeunes font leurs show, mission locale d'Orange",
    subtitle: "Projet social",
    cover: "/assets/JEUNES_FONT_LEURS_SHOW.png",
    description: "Projet pour la mission locale d'Orange dans le cadre de l'initiative 'Les jeunes font leurs show'. Cette initiative permet aux jeunes de s'exprimer artistiquement et de prendre confiance en eux.",
  },
  {
    slug: "ecotubeurs",
    title: "Ecotubeurs",
    subtitle: "Projet environnemental",
    cover: "/assets/ECOTUBEURS.png",
    description: "Projet Ecotubeurs. Travailler sur un projet environnemental comme Ecotubeurs est particulièrement gratifiant. C'est important de contribuer à la sensibilisation aux enjeux écologiques à travers la création audiovisuelle.",
  },
];
