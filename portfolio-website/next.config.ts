import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  images: {
    domains: ['kyounginn.com', 'www.kyounginn.com'],
  },
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NODE_ENV === 'production' 
      ? 'https://kyounginn.com' 
      : 'http://localhost:3000'
  }
};

export default nextConfig;
