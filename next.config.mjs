/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                hostname:'media.geeksforgeeks.org',
                port: '',
                // pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
