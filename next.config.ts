import { withNextLocator } from "@next-locator/babel-plugin/dist/config.mjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
},
};

export default withNextLocator(nextConfig);