import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ddd.hijack.uz/api/v1";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    if (!API_BASE) {
      return [];
    }

    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_BASE}/:path*`,
      },
    ];
  },
};

export default nextConfig;
