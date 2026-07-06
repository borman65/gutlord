/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Cache Components for better performance
  cacheComponents: true,
  // Note: React Compiler requires babel-plugin-react-compiler
  // Uncomment when installed: reactCompiler: true,
  experimental: {
    transitionIndicator: true,
  },
}

export default nextConfig
