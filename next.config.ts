import type { NextConfig } from "next";
require("dotenv").config();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // openweathermap 제공 이미지
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
