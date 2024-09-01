/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: `${process.env.B2_BUCKET_NAME}.${process.env.B2_ENDPOINT}`,
      },
    ],
  },
};

module.exports = nextConfig;
