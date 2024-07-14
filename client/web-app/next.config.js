/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                pathname: '**',
            },
        ],
    },
    output: 'standalone',
};

module.exports = nextConfig;
