/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cdn.sanity.io","cdn.shopify.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
