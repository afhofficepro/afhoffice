/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true
  },
  webpack: (config, { isServer }) => {
    // Fix for EISDIR error on Windows
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
