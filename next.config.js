/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/books',
                destination: '/book',
            },
            {
                source: '/books/:path*',
                destination: '/book/:path*',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/books',
                permanent: false
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.com'
            },
            {
                protocol: 'http',
                hostname: '**.com'
            },
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    }
}

module.exports = nextConfig
