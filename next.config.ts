import type { NextConfig } from "next";
import nextRoutes from "nextjs-routes/config";

const withRoutes = nextRoutes();

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

export default withRoutes(nextConfig);
