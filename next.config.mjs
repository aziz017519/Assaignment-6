/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // API-র ছবি যেকোনো https ডোমেইন থেকে আসতে পারে
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
