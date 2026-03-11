import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/apps/lerp",
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
