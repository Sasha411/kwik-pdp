/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_URL: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    NEXT_PUBLIC_SHOPIFY_API_VERSION:
      process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION,
    NEXT_PUBLIC_RECOMMENDATION_API_URL:
      process.env.NEXT_PUBLIC_RECOMMENDATION_API_URL,
  },
};

export default nextConfig;
