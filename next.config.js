// eslint-disable-next-line
const withNextIntl = require('next-intl/plugin')('./src/intl/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.arasaac.org',
        port: '',
        pathname: '/api/pictograms/**',
      },
      {
        protocol: 'https',
        hostname: 'arasaac.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'globalsymbols.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
      {
        protocol: 'https',
        hostname: '**.discordapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
