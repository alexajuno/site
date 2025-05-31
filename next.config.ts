import withMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
