import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: "/Users/tobijohn/mlops_learning/mlops-academy",
    },
  },
  eslint: {
    // Don't fail build on ESLint warnings (only errors)
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on TypeScript errors (ESLint will catch them)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
