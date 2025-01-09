/** @type {import('next').NextConfig} */
const isLocal = process.env.NODE_ENV !== "development";
const nextConfig = isLocal
  ? {
      basePath: "/ora-checkout",
      output: "export",
      reactStrictMode: true,
    }
  : {};

export default nextConfig;
