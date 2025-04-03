import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['karyabangunsemesta.com', 'www.karyabangunsemesta.com'],
  },
  assetPrefix: '/',
  trailingSlash: true,
  basePath: '',
};

export default nextConfig;