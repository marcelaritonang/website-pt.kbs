import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['karyabangunsemesta.co', 'www.karyabangunsemesta.com'],
  },
  assetPrefix: '/',
  trailingSlash: true,
  basePath: '',
};

export default nextConfig;