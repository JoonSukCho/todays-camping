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
import {
  _iBasedInfoBody,
  _iBasedInfoReqParams,
} from 'models/api/goCamping/basedInfo';
import InfiniteScrollFeeds from 'components/InfiniteScrollFeeds';
import axios from 'axios';
import {
  GO_CAMPING_COMMON_PARAMS,
  INFINITE_NUM_OF_ROWS,
} from 'constants/constants';
import { generateShuffledArr } from 'util/utils';

const Home = ({ shuffledPageNumArr }) => {
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
        <InfiniteScrollFeeds shuffledPageNumArr={shuffledPageNumArr} />
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

// 랜덤한 피드를 요청하기 위해 전체 페이지 갯수를 요청 후,
// page number를 shuffle한 배열을 만듦.
export const getServerSideProps = async (ctx) => {
  try {
    const { data } = await axios
      .get(
        'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/basedList',
        {
          params: {
            ...GO_CAMPING_COMMON_PARAMS,
            pageNo: 1,
            numOfRows: 0,
          },
        },
      )
      .catch((err) => {
        throw new Error('Server Error');
      });

    const basedInfoBody: _iBasedInfoBody = data.response.body;
    const { totalCount } = basedInfoBody;
    const shuffledPageNumArr = generateShuffledArr(
      Math.ceil(totalCount / INFINITE_NUM_OF_ROWS),
    );

    return { props: { shuffledPageNumArr } };
  } catch (error) {
    return { props: { shuffledPageNumArr: [] } };
  }
};
