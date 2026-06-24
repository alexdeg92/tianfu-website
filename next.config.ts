import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080],
    imageSizes: [96, 128, 256, 384],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
