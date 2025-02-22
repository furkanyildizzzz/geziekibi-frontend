/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
