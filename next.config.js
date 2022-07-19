/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com"],
  },
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
