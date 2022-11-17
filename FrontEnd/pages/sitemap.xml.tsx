import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  const lastmod = new Date().toISOString();

  return getServerSideSitemap(ctx, [
    {
      loc: 'https://todays-camping.vercel.app',
      changefreq: 'daily',
      priority: 1,
      lastmod,
    },
  ]);
};

export default () => {
  return;
};
