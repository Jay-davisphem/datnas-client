import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["upload.wikimedia.org"],
  },
  videos: {
    domains: ["youtube.com", "www.youtube.com", "i.ytimg.com"],
  },
};

export default nextConfig;
