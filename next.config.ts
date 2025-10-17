import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    jsx: true,
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "dracula",
          keepBackground: true,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

export default nextConfig;
