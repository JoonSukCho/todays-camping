import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

// mui
import { Typography } from '@material-ui/core';

// core components
import AppLayout from 'components/Layout/AppLayout';
import MainSection from 'components/Section/MainSection';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import PhotoFeed from 'components/Feed/PhotoFeed';
import CirCularLoader from 'components/Loader/CirCularLoader';
import KeywordSearchForm from 'components/Form/KeywordSearchForm';

// Icons
import ScrollGuide from 'components/ScrollGuide/ScrollGuide';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';

// util
import { generateShuffledArr } from 'util/utils';

// models
import { _iBasedInfoReqParams } from 'models/api/goCamping/basedInfo';
import ErrorResponse from 'components/Error/ErrorResponse';

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

const NUM_OF_ROWS = 10;
const totalCount = 2910;
const totalPage = Math.ceil(totalCount / NUM_OF_ROWS);
const shuffledPageIdxArr = generateShuffledArr(totalPage).filter(
  (idx) => idx !== totalPage,
);
const Home = () => {
  // local state
  const [basedInfoReqParams, setBasedInfoReqParams] =
    useState<_iBasedInfoReqParams>({
      pageNo: 0,
      numOfRows: 0,
    });
  const [infBasedList, setInfBasedList] = useState([]);

  const {
    data: basedInfo,
    error: basedInfoError,
    isFetched: basedInfoIsFetched,
    refetch: getBasedInfo,
  } = useBasedInfo(basedInfoReqParams);

  // Infinite Scroll의 next data 요청
  const fetchNextData = () => {
    if (shuffledPageIdxArr.length > 0) {
      setBasedInfoReqParams((prev) => ({
        pageNo: shuffledPageIdxArr[prev.pageNo + 1],
        numOfRows: NUM_OF_ROWS,
      }));
    }
  };

  // basedInfo 요청 (parameter가 변경될 때 요청을 보낸다)
  useEffect(() => {
    if (basedInfoReqParams.pageNo !== 0) {
      getBasedInfo();
    }
  }, [basedInfoReqParams]);

  // Infinite Based List를 만든다.
  useEffect(() => {
    if (
      basedInfoIsFetched &&
      !basedInfoError &&
      basedInfo.itemList.length > 0
    ) {
      const basedItem = basedInfo.itemList;

      setInfBasedList((prev) => prev.concat(basedItem));
    }
  }, [basedInfoIsFetched]);

  return (
    <AppLayout>
      <Parallax image={'/img/campfire-background.gif'}>
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
        {basedInfoError ? (
          <ErrorResponse errorMessage={basedInfoError.message} />
        ) : (
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={infBasedList.length}
            next={fetchNextData}
            hasMore
            loader={<CirCularLoader />}
            endMessage={
              <EndMessageComponent variant="h4">
                더 이상 피드가 없습니다. &#128517;
              </EndMessageComponent>
            }
          >
            <GridContainer>
              {infBasedList.map((infBasedItem, idx) => (
                <GridItem key={String(idx)}>
                  <PhotoFeed basedItem={infBasedItem} />
                </GridItem>
              ))}
            </GridContainer>
          </InfiniteScroll>
        )}
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
