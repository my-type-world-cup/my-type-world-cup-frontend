/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // unoptimized: true,
  },
  // output: "standalone",
  // ...(process.env.NEXT_PUBLIC_NODE_ENV === "prod" && {
  //   compiler: {
  //     removeConsole: {
  //       exclude: ["error", "warn"],
  //     },
  //   },
  // }),
};

if (process.env.NEXT_PUBLIC_NODE_ENV === "prod") {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  };
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
