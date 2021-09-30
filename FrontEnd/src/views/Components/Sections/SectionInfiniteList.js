import React, { useEffect, useState } from 'react';

// lib
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQueryClient } from 'react-query';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// components
import PhotoCard from 'components/Card/PhotoCard';

// styles
import styles from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.js';
import { Grid } from '@material-ui/core';

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';
import useImageInfo from 'Hooks/api/useImageInfo';

const useStyles = makeStyles(styles);

const shuffleArr = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const SectionInfiniteList = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [basedInfoReqParams, setBasedInfoReqParams] = useState({
    pageNo: 0,
    numOfRows: 0,
  });

  const [imageInfoReqParams, setImageInfoReqParams] = useState({
    contentId: 0,
  });

  const [infBasedList, setInfBasedList] = useState([]);

  const {
    status: basedInfoStatus,
    data: basedInfo,
    error: basedInfoError,
    isFetching: basedInfoIsFetching,
    isFetched: basedInfoIsFetched,
    refetch: basedInfoRefecth,
  } = useBasedInfo(basedInfoReqParams);

  // get basedInfo Total Count
  useEffect(() => {
    setBasedInfoReqParams({ pageNo: 0, numOfRows: 0 });
  }, []);

  useEffect(() => {
    if (basedInfo) {
      const basedItem = basedInfo.itemList[0];
      setInfBasedList((prev) => prev.concat(basedItem));
    }
  }, [basedInfo]);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2 style={{ fontWeight: 600 }}>추천 캠핑장</h2>
        </div>
        <InfiniteScroll
          dataLength={infBasedList.length}
          next={() => {
            setTimeout(() => {
              setBasedInfoReqParams((prev) => ({
                pageNo: prev.pageNo + 1,
                numOfRows: 1,
              }));
            }, 1000);
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
            {infBasedList &&
              infBasedList.map((infBasedItem, idx) => (
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
