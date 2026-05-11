/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double-rendering (saves RAM)
  experimental: {
    webpackMemoryOptimizations: true,
  },
};
export default nextConfig;