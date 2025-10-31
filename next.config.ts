import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/PortfolioORBIT" : "",
  assetPrefix: isProd ? "/PortfolioORBIT/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/PortfolioORBIT" : "",
  },
};

export default nextConfig;
