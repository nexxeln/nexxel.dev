import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
    // reactCompiler: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
