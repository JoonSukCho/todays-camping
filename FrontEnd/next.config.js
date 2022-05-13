const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([[withImages]], {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true,
    domains: ['gocamping.or.kr'],
  },
  webpack(config, { webpack }) {
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/:path*',
      },
    ];
  },
});
