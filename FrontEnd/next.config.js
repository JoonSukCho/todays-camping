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
  },
  webpack(config, { webpack }) {
    return config;
  },
});
