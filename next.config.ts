import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings = Turbopack serializable
    // https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack
    remarkPlugins: ["remark-gfm"] as never,
    rehypePlugins: [
      ["rehype-pretty-code", { theme: "github-dark", keepBackground: true }],
    ] as never,
  },
});

export default withMDX(nextConfig);
