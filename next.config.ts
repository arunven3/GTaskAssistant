import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  serverComponentsExternalPackages: ["pdf-parse"],
};

export default withFlowbiteReact(nextConfig);
