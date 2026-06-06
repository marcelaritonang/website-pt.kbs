import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karyabangunsemesta.com',
      },
      {
        protocol: 'https',
        hostname: 'www.karyabangunsemesta.com',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;