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
  // Enable rewrites in development mode only
  ...(process.env.NODE_ENV === 'development'
    ? {
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'https://backend-kbs-web.vercel.app/api/:path*',
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;