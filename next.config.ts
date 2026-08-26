import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/NIBBLY" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // `configure-pages` exposes GITHUB_PAGES during the deployment build.
  // Keeping the base path there ensures static assets resolve under /NIBBLY/.
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
