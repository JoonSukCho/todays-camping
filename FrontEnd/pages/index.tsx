import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

// mui
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// core components
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import PhotoFeed from 'components/Feed/PhotoFeed';
import CirCularLoader from 'components/Loader/CirCularLoader';

// Icons
import ScrollGuide from 'components/ScrollGuide/ScrollGuide';

// styles
import styles from 'public/jss/material-kit-react/views/componentsSections/basicsStyle.js';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';

// util
import { generateShuffledArr } from 'util/arrUtil';

// models
import { _iBasedInfoReqParams } from 'models/api/goCamping/basedInfo';

interface HomeProps {
  shuffledPageIdxArr: number[];
}

const useStyles = makeStyles(styles);

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

const NUM_OF_ROWS = 10;

const Home = ({ shuffledPageIdxArr }: HomeProps) => {
  const classes = useStyles();

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
    if (basedInfoIsFetched && basedInfo.itemList.length > 0) {
      const basedItem = basedInfo.itemList;

      setInfBasedList((prev) => prev.concat(basedItem));
    }
  }, [basedInfoIsFetched]);

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
        <div className={classes.sections}>
          <div className={classes.container}>
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
                  <GridItem
                    key={String(idx)}
                    style={{ paddingTop: 16, paddingBottom: 16 }}
                  >
                    <PhotoFeed basedItem={infBasedItem} />
                  </GridItem>
                ))}
              </GridContainer>
            </InfiniteScroll>
          </div>
        </div>
      </BodyContainer>
      {/* <Footer /> */}
    </div>
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

const BodyContainer = styled.div`
  background: #ffffff;
  position: relative;
  z-index: 3;
  border-radius: 6px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let basedInfoURL = `https://todays-camping.herokuapp.com/goCamping/basedList`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    basedInfoURL = `${ipAddress}:${serverPort}/goCamping/basedList`;
  }

  const { data } = await axios.get(basedInfoURL, {
    params: {
      pageNo: 0,
      numOfRows: 0,
    },
  });
  const { totalCount } = data.response.body;

  const totalPage = Math.ceil(totalCount / NUM_OF_ROWS);
  const shuffledPageIdxArr = generateShuffledArr(totalPage).filter(
    (idx) => idx !== totalPage,
  );

  return {
    props: {
      shuffledPageIdxArr: shuffledPageIdxArr,
    },
  };
};

export default Home;
