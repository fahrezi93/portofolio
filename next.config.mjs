/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'njenjctrbcqpgeosoiob.supabase.co' },
      // Supabase storage uses this pattern
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
    // Optimasi gambar untuk performa
    formats: ['image/avif', 'image/webp'], // AVIF first for better compression
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  transpilePackages: ['three'],
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion', 'lucide-react'],
  },
  // Optimasi bundle
  webpack: (config, { dev, isServer }) => {
    // Optimasi untuk production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Pisahkan vendor libraries yang besar
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            radixUI: {
              name: 'radix-ui',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              chunks: 'all',
              priority: 25,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
