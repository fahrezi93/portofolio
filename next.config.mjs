/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Compress responses with gzip/brotli
  compress: true,

  // Remove X-Powered-By header (minor security + perf)
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'njenjctrbcqpgeosoiob.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
      { protocol: 'https', hostname: 'lastfm.freetls.fastly.net' },
      { protocol: 'https', hostname: '**.mzstatic.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
    // Tree-shake large packages — only import what's used
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      'lucide-react',
      'gsap',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
    ],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,

            // Framer Motion in its own async chunk
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'async', // 'async' = only loaded when needed, not in main bundle
              priority: 30,
              enforce: true,
            },

            // Radix UI in its own chunk
            radixUI: {
              name: 'radix-ui',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },

            // GSAP in its own chunk (only loaded by components that need it)
            gsap: {
              name: 'gsap',
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              chunks: 'async',
              priority: 25,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
