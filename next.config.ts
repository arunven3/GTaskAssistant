import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push({
      "node-llama-cpp": "commonjs node-llama-cpp",
    });
    return config;
  },
};

export default withFlowbiteReact(nextConfig);
