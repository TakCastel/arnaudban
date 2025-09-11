/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration pour l'optimisation des images (désactivée pour l'export statique)
  images: {
    unoptimized: true,
  },

};

module.exports = nextConfig;
