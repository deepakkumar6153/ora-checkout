/** @type {import('next').NextConfig} */
// const isLocal = process.env.NODE_ENV !== "development";
const isLocal = false;
const nextConfig = isLocal
  ? {
      basePath: "/ora-checkout",
      assetPrefix: "/ora-checkout/",
      output: "export",
      distDir: "out",
      images: {
        unoptimized: true,
      },
      reactStrictMode: true,
    }
  : {};

export default nextConfig;
