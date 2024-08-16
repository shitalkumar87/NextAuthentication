/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds: true,
      },

      env: {
        JWT_SECRET: process.env.Token_Secret,
      },
};

export default nextConfig;
