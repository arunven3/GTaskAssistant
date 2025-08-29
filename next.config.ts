import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push({
      "node-llama-cpp": "commonjs node-llama-cpp",
    });
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

export default withFlowbiteReact(nextConfig);
