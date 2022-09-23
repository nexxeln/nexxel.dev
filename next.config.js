const { withContentlayer } = require("next-contentlayer");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.discordapp.com",
      "us-east-1.tixte.net",
      "raw.githubusercontent.com",
    ],
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
