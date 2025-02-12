import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.licdn.com',
      'avatars.githubusercontent.com',  // Add both domains
    ],
  },
};

export default nextConfig;
