import React, { useEffect, useState } from 'react';

// lib
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQueryClient } from 'react-query';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// components
import PhotoCard from 'components/Card/PhotoCard';

// styles
import styles from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.js';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';
import useHistoryState from 'Hooks/useHistoryState';

// util
import { generateShuffledArr } from 'util/arrUtil';
import { rangeRandom } from 'util/mathUtil';

const useStyles = makeStyles(styles);

const SectionInfiniteList = () => {
  const classes = useStyles();

  // local state
  const [basedInfoReqParams, setBasedInfoReqParams] = useHistoryState(
    {
      pageNo: 0,
      numOfRows: 0,
    },
    'basedInfoReqParams',
  );
  const [numOfRows] = useHistoryState(10, 'numOfRows');
  const [totalPageCount, setTotalPageCount] = useHistoryState(0, 'totalPageCount');
  const [totalPageIdxArr, setTotalPageIdxArr] = useHistoryState([], 'totalPageIdxArr');
  const [infBasedList, setInfBasedList] = useHistoryState([], 'infBasedList');

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
          dataLength={infBasedList.length}
          next={() => {
            setBasedInfoReqParams((prev) => ({
              pageNo: totalPageIdxArr[prev.pageNo + 1],
              numOfRows,
            }));
          }}
          hasMore
          loader={<h4>Loading...</h4>}
          // scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid container spacing={8} style={{ flexGrow: 1 }}>
            {infBasedList.map((infBasedItem, idx) => (
              <Grid key={String(idx)} item lg={12} xs={12}>
                <PhotoCard basedItem={infBasedItem}>Hello</PhotoCard>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SectionInfiniteList;
