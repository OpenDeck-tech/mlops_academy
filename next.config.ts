import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Use process.cwd() to get the current working directory dynamically
  outputFileTracingRoot: path.join(process.cwd()),
  turbopack: {
    root: path.join(process.cwd()),
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
