/** @type {import('next').NextConfig} */

// eslint-disable-next-line
const withNextIntl = require('next-intl/plugin')('./src/intl/i18n.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
