import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [{
      hostname: "673q4tstu3.ufs.sh"
    }]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
   async redirects() {
    return [
      {
        source: '/',
        destination: '/trips',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
