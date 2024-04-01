// eslint-disable-next-line
const withNextIntl = require('next-intl/plugin')('./src/intl/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      //only for allow use test boards
      'cboardgroupdiag483.blob.core.windows.net',
      'static.arasaac.org',
      'globalsymbols.com',
    ],
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
