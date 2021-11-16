import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// lib
import InfiniteScroll from 'react-infinite-scroll-component';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// components
import PhotoFeed from 'components/Feed/PhotoFeed';
import CirCularLoader from 'components/Loader/CirCularLoader';

// styles
import styles from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.js';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';

// util
import { generateShuffledArr } from 'util/arrUtil';
import { rangeRandom } from 'util/mathUtil';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

const SectionInfiniteList = () => {
  const classes = useStyles();

  // local state
  const [basedInfoReqParams, setBasedInfoReqParams] = useState({
    pageNo: 0,
    numOfRows: 0,
  });
  const [numOfRows] = useState(10);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [totalPageIdxArr, setTotalPageIdxArr] = useState([]);
  const [infBasedList, setInfBasedList] = useState([]);

  const {
    status: basedInfoStatus,
    data: basedInfo,
    error: basedInfoError,
    isFetching: basedInfoIsFetching,
    isFetched: basedInfoIsFetched,
    refetch: basedInfoRefecth,
  } = useBasedInfo(basedInfoReqParams);

  useEffect(() => {
    if (totalPageCount > 0) {
      setBasedInfoReqParams({ pageNo: rangeRandom(1, totalPageCount), numOfRows });
    }
  }, [totalPageCount]);

  // set Total Page Index Array
  useEffect(() => {
    if (basedInfoIsFetched) {
      const totalPage = Math.ceil(basedInfo.totalCount / numOfRows);
      const shuffledPageIdxes = generateShuffledArr(totalPage).filter((idx) => idx !== totalPage);

      setTotalPageCount((prev) => (prev !== totalPage ? totalPage : prev));
      setTotalPageIdxArr(shuffledPageIdxes);
    }
  }, [basedInfoIsFetched]);

  // set Infinite BasedList
  useEffect(() => {
    if (basedInfoIsFetched) {
      if (basedInfo.itemList.length > 0) {
        const basedItem = basedInfo.itemList;

        setInfBasedList((prev) => prev.concat(basedItem));
      }
    }
  }, [basedInfoIsFetched]);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2 style={{ fontWeight: 600 }}>추천 캠핑장 &#127969;</h2>
        </div>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={infBasedList.length}
          next={() => {
            setBasedInfoReqParams((prev) => ({
              pageNo: totalPageIdxArr[prev.pageNo + 1],
              numOfRows,
            }));
          }}
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
