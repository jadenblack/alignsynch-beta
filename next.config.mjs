/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.vercel-storage.com', 'public.blob.vercel-storage.com', 'localhost'],
    unoptimized: true,
  },
};

export default nextConfig;
