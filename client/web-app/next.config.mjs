/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'cdn.pixabay.com'
            }
        ]
    }
};

export default nextConfig;
