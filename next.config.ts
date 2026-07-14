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
    ],
  },
};

export default nextConfig;
