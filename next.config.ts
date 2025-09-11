import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lodash-es'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.picsum.photos",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "group.beincom.com",
        port: "",
        pathname: "**",
      }
    ]
  },
};

module.exports = nextConfig;
