import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

// Use as-any to avoid TypeScript version conflicts with next-pwa
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);
