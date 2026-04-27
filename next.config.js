/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🔥 Needed when behind nginx / reverse proxy
  output: "standalone",

  // Optional but useful
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
