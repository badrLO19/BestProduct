/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.amazon.com',
      'm.media-amazon.com',
      'i.ebayimg.com',
      'ae01.alicdn.com',
      'img.leboncoin.fr',
      'www.darty.com',
      'i2.cdscdn.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
