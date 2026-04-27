/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Essential for Docker/VPS deployments behind Nginx
  output: "standalone",

  // ✅ Optimization for simple hosting or static exports
  images: {
    unoptimized: true,
  },

  // 🔥 Next-Level: Security Headers
  // As an IAM expert, you know headers are the first line of defense
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // ✅ Next-Level: Pipeline Redirects
  // Ensures clean navigation if you ever change your routing structure
  async redirects() {
    return [
      {
        source: "/applied",
        destination: "/control/jobs?tab=applied",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;