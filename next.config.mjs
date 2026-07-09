/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  transpilePackages: ['three', 'gsap', '@gsap/react', 'lenis'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/coimbatore',
        destination: '/locations/coimbatore',
        permanent: true,
      },
      {
        source: '/bangalore',
        destination: '/locations/bangalore',
        permanent: true,
      },
      {
        source: '/chennai',
        destination: '/locations/chennai',
        permanent: true,
      },
      {
        source: '/hosur',
        destination: '/locations/hosur',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
