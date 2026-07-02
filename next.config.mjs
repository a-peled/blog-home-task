// Uploads are served through a relative /wp-content/uploads path and proxied
// to WordPress via rewrites() below. The browser can't be given the internal
// docker hostname, and the image optimizer (running inside the nextjs
// container) can't reach the host's localhost:8080 — a same-origin path works
// for both sides.
const wordpressOrigin = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL).origin
  : "http://localhost:8080";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: false,
    unoptimized: process.env.NODE_ENV === "development",
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: `${wordpressOrigin}/wp-content/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
