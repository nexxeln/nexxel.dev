// @ts-check

/** 
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful 
 * for Docker builds. 
 */
await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["next-mdx-remote"],
};

const sentryConfig = {
  org: "david-0e",
  project: "davidadarme",
  sentryUrl: "https://sentry.io/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  automaticVercelMonitors: true,
};

export default withSentryConfig(config, sentryConfig);

// R2 Storage
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '$CLOUDFLARE_ACCOUNT_ID.r2.cloudflarestorage.com', // it reads from secrets
        pathname: '$CLOUDFLARE__R2_BUCKET_NAME', // it reads from secrets
      },
    ],
  },
};