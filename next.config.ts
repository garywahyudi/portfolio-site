import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure rewrites to proxy API requests to the FastAPI backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "development" 
          ? "http://localhost:8000/:path*" // Remove the /api prefix when forwarding to FastAPI
          : "/api/:path*"
      }
    ];
  },
  // Configuration for Turbopack (stable API)
  turbopack: {
    rules: {
      // Don't include Python files in the build process
      "*.py": ["!"],
    },
  },
  // Disable Next.js handling of Python files if using webpack
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  }
};

export default nextConfig;
