import styled from 'styled-components';

// core components
import AppLayout from 'components/Layout/AppLayout';
import MainSection from 'components/MainSection';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import KeywordSearchForm from 'components/Form/KeywordSearchForm';

// Icons
import ScrollGuide from 'components/ScrollGuide';

// models
import { _iBasedInfoReqParams } from 'models/api/goCamping/basedInfo';
import InfiniteScrollFeeds from 'components/InfiniteScrollFeeds';
import axios from 'axios';
import { useEffect } from 'react';

const Home = ({ data }) => {
  useEffect(() => {
    console.log('data', data);
  }, [data]);
  return (
    <AppLayout>
      <Parallax image="/img/campfire-background.gif">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <TitleContainer>
                <Title>오늘의 캠핑</Title>
                <SubTitle>우리나라의 다양한 캠핑지를 만나보세요.</SubTitle>
              </TitleContainer>
              <KeywordSearchForm />
            </GridItem>
          </GridContainer>
          <ScrollGuide />
        </ParallaxContent>
      </Parallax>
      <MainSection>
        <InfiniteScrollFeeds />
      </MainSection>
    </AppLayout>
  );
};

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

export default Home;

export const getServerSideProps = async (ctx) => {
  const { data } = await axios
    .get(
      'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/basedList',
      {
        params: {
          pageNo: 1,
          numOfRows: 10,
          ServiceKey: process.env.SERVICE_KEY,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          _type: 'json',
        },
        timeout: 5000,
      },
    )
    .catch((err) => {
      console.log('error !!!');
      throw new Error('Server Error');
    });

  return { props: { data: data.response.body } };
};
