/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bit.ly", "external-content.duckduckgo.com"],
  },
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
