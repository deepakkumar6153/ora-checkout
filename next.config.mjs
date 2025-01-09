/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: "/ora-checkout/",
  basePath: "/ora-checkout",
  output: "export",
};

export default nextConfig;
