/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "wp-blog-home-task.local",
      },
    ],
    dangerouslyAllowSVG: false,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
