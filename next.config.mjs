/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ Add this line to disable Turbopack
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
