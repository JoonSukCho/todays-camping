import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

// core components
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Parallax from 'components/Parallax/Parallax.js';

// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks';
import SectionInfiniteList from 'components/Sections/SectionInfiniteList';

// Image
import ScrollGuide from 'components/ScrollGuide/ScrollGuide';

const Home: NextPage = (props) => {
  const { ...rest } = props;

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
      <Header
        brand="오늘의 캠핑"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax image={'/img/campfire-background.gif'}>
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <TitleContainer>
                <Title>오늘의 캠핑</Title>
                <SubTitle>우리나라의 다양한 캠핑지를 만나보세요.</SubTitle>
              </TitleContainer>
            </GridItem>
          </GridContainer>
          <ScrollGuide />
        </ParallaxContent>
      </Parallax>

      <BodyContainer>
        <SectionInfiniteList />
      </BodyContainer>
      {/* <Footer /> */}
    </div>
  );
};

const ParallaxContent = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const TitleContainer = styled.div`
  color: #ffffff;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 4.2rem;
  font-weight: 600;
  display: inline-block;
  position: relative;

  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 1.313rem;
  max-width: 500px;
  margin: 10px 0 0;

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const BodyContainer = styled.div`
  background: #ffffff;
  position: relative;
  z-index: 3;
  border-radius: 6px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

export default Home;
