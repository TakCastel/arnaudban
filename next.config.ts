import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour le déploiement sur Netlify
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
