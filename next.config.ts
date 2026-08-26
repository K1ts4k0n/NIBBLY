import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/NIBBLY" : "",
  images: { unoptimized: true },
};

export default nextConfig;
