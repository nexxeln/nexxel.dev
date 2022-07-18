/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bit.ly"],
  },
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
