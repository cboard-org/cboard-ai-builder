// eslint-disable-next-line
const withNextIntl = require('next-intl/plugin')('./src/intl/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['static.arasaac.org', 'api.arasaac.org', 'arasaac.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.arasaac.org',
        port: '',
        pathname: '/api/pictograms/**',
      },
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
      {
        protocol: 'https',
        hostname: '**.imaginepro.ai',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: '**.leonardo.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cognitiveservices.azure.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.microsofttranslator.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
