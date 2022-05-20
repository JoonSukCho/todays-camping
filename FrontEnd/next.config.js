const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_BUNDLE_ANALYZER === 'false',
});

module.exports = withPlugins(
  [
    [withImages],
    [
      withBundleAnalyzer,
      {
        compress: true,
      },
    ],
  ],
  {
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
    env: {
      REST_API_KEY: process.env.REST_API_KEY,
      REDIRECT_URI: process.env.REDIRECT_URI,
      LOGOUT_REDIRECT_URI: process.env.LOGOUT_REDIRECT_URI,
      KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
      LOCAL_IP_ADDRESS: process.env.LOCAL_IP_ADDRESS,
      LOCAL_SERVER_PORT: process.env.LOCAL_SERVER_PORT,
      GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
      SERVICE_KEY: process.env.SERVICE_KEY,
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
  },
);
