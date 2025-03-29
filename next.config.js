/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/d/**',
      },
      {
        protocol: 'https',
        hostname: 'oraliving.in',
        port: '',
        pathname: '/cdn/shop/files/**',
      },
    ],
  },
}

module.exports = nextConfig 