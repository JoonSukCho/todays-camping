const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([[withImages]], {
  images: {
    disableStaticImages: true,
  },
  webpack(config, { webpack }) {
    return config;
  },
});
