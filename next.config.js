/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    useTypeScriptCli: true,
  },
};

module.exports = nextConfig;
