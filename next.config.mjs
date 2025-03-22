/** @type {import('next').NextConfig} */
// const isLocal = process.env.NODE_ENV !== "development";
const isLocal = true;
const nextConfig = isLocal
  ? {
      // basePath: "/ora-checkout",
      // assetPrefix: "/ora-checkout",
      output: "export",
      // distDir: "out",
      images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "oraliving.in",
            port: "",
            pathname: "/cdn/shop/files/**",
            search: "",
          },
        ],
      },
      reactStrictMode: true,
    }
  : {};

export default nextConfig;
