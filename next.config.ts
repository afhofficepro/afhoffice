import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out for production server
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
