export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  cover: string; // /images/xxx.jpg
  vimeoId?: string; // pour player
  tags?: string[];
  palette?: "bw" | "blue-on-white";
  blocks?: Array<
    | { type: "video"; vimeoId: string }
    | { type: "image"; src: string; alt?: string }
    | { type: "text"; html: string }
  >;
};

export const projects: Project[] = [
  {
    slug: "film-x",
    title: "Film X",
    subtitle: "Director’s Cut",
    cover: "/images/film-x.jpg",
    vimeoId: "123456789",
    tags: ["commercial", "fashion"],
    palette: "blue-on-white",
    blocks: [
      { type: "video", vimeoId: "123456789" },
      { type: "image", src: "/images/film-x-still-1.jpg" },
      { type: "text", html: "<p>Notes de tournage…</p>" },
    ],
  },
];
