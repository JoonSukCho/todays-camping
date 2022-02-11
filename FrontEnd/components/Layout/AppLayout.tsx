import { NextSeo } from 'next-seo';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import Footer from 'components/Footer/Footer';
import TopButton from 'components/Buttons/TopButton';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <NextSeo
        title="오늘의 캠핑"
        description="국내의 다양한 캠핑지를 만나보세요"
        canonical="https://todays-camping.vercel.app"
        openGraph={{
          type: 'website',
          url: 'https://todays-camping.vercel.app',
          title: '국내의 다양한 캠핑지, 오늘의 캠핑',
          description: '국내의 다양한 캠핑지를 만나보세요',
          site_name: 'todays-camping',
        }}
      />
      <Header brand="오늘의 캠핑" rightLinks={<HeaderLinks />} fixed />
      {children}
      <TopButton />
      <Footer />
    </div>
  );
};

export default AppLayout;
