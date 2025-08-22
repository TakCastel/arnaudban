import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour le déploiement
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
