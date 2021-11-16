import React, { useEffect, useState } from 'react';

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

const useStyles = makeStyles(styles);

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
          <h2 style={{ fontWeight: 600 }}>추천 캠핑장</h2>
        </div>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={infBasedList.length}
          next={() => {
            setTimeout(() => {
              setBasedInfoReqParams((prev) => ({
                pageNo: totalPageIdxArr[prev.pageNo + 1],
                numOfRows,
              }));
            }, 200000);
          }}
          hasMore
          loader={<CirCularLoader />}
          // scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
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
