import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite optimizar imágenes alojadas en Cloudinary (fotos de las
    // inteligencias), en vez de guardarlas en el repositorio de GitHub.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cloud.educaplay.com",
      },
    ],
  },
};

export default nextConfig;
