import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// lib
import InfiniteScroll from 'react-infinite-scroll-component';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// components
import PhotoFeed from 'components/Feed/PhotoFeed';
import CirCularLoader from 'components/Loader/CirCularLoader';

// styles
import styles from 'public/jss/material-kit-react/views/componentsSections/basicsStyle.js';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';
import useTotalBasedCnt from 'Hooks/api/useTotalBasedCnt';

// util
import { generateShuffledArr } from 'util/arrUtil';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// models
import { _iBasedInfoReqParams } from 'models/api/goCamping/basedInfo';

const useStyles = makeStyles(styles);

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

const NUM_OF_ROWS = 10;
const SectionInfiniteList = () => {
  const classes = useStyles();

  // local state
  const [basedInfoReqParams, setBasedInfoReqParams] = useState<_iBasedInfoReqParams>({
    pageNo: 0,
    numOfRows: 0,
  });
  const [shuffledPageIdxArr, setShuffledPageIdxArr] = useState([]);
  const [infBasedList, setInfBasedList] = useState([]);

  const {
    data: basedInfo,
    error: basedInfoError,
    isFetched: basedInfoIsFetched,
    refetch: getBasedInfo,
  } = useBasedInfo(basedInfoReqParams);

  const {
    data: totalBasedCnt,
    error: totalBasedCntError,
    isFetching: totalBasedCntIsFetching,
    isFetched: totalBasedCntIsFetched,
    refetch: getTotalBasedCnt,
  } = useTotalBasedCnt();

  // Infinite Scroll의 next 요청
  const fetchNextData = () => {
    setBasedInfoReqParams((prev) => ({
      pageNo: shuffledPageIdxArr[prev.pageNo + 1],
      numOfRows: NUM_OF_ROWS,
    }));
  };

  // Init 하면 basedInfo의 total 갯수를 가져온다.
  useEffect(() => {
    getTotalBasedCnt();
  }, []);

  // 랜덤 페이지 요청을 보내기 위한 셔플 배열 생성
  useEffect(() => {
    if (totalBasedCntIsFetched) {
      const totalPage = Math.ceil(totalBasedCnt / NUM_OF_ROWS);
      const shuffledPageIdxArr = generateShuffledArr(totalPage).filter((idx) => idx !== totalPage);

      setShuffledPageIdxArr(shuffledPageIdxArr);
    }
  }, [totalBasedCntIsFetched]);

  // basedInfo 요청 (parameter가 변경될 때 요청을 보낸다)
  useEffect(() => {
    if (basedInfoReqParams.pageNo !== 0) {
      getBasedInfo();
    }
  }, [basedInfoReqParams]);

  // Infinite Based List를 만든다.
  useEffect(() => {
    if (basedInfoIsFetched) {
      if (basedInfo.itemList.length > 0) {
        const basedItem = basedInfo.itemList;

        setInfBasedList((prev) => prev.concat(basedItem));
      }
    }
  }, [basedInfoIsFetched]);

  if (totalBasedCntIsFetching) return <CirCularLoader />;
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={infBasedList.length}
          next={fetchNextData}
          hasMore
          loader={<CirCularLoader />}
          // scrollableTarget="scrollableDiv"
          endMessage={
            <EndMessageComponent variant="h4">
              더 이상 피드가 없습니다. &#128517;
            </EndMessageComponent>
          }
        >
          <GridContainer>
            {infBasedList.map((infBasedItem, idx) => (
              <GridItem key={String(idx)} style={{ paddingTop: 16, paddingBottom: 16 }}>
                <PhotoFeed basedItem={infBasedItem} />
              </GridItem>
            ))}
          </GridContainer>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SectionInfiniteList;
