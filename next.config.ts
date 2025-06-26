import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out for production server
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
