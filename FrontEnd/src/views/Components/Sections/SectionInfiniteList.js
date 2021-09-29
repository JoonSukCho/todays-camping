import React, { useEffect, useState } from 'react';

// lib
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
import useBasedList from 'Hooks/api/useBasedList';
import useImageList from 'Hooks/api/useImageList';

const useStyles = makeStyles(styles);

const shuffleArr = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const SectionInfiniteList = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const [basedListReqParams, setBasedListReqParams] = useState({
    pageNo: 0,
    numOfRows: 0,
  });

  const [imageListReqParams, setImageListReqParams] = useState({
    contentId: 0,
  });

  const [basedList, setBasedList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const {
    status: basedListStatus,
    data: basedListArr,
    error: basedListError,
    isFetching: basedListIsFetching,
    refetch: basedListRefecth,
  } = useBasedList(basedListReqParams);

  const {
    status: imageListStatus,
    data: imageListArr,
    error: imageListError,
    isFetching: imageListIsFetching,
    refetch: imageListRefecth,
  } = useImageList(imageListReqParams);

  useEffect(() => {
    // imageListRefecth();
  }, []);

  useEffect(() => {
    if (basedListArr) {
      setImageListReqParams({
        contentId: basedListArr.contentId,
      });
      setBasedList((prev) => prev.concat(basedListArr));
    }
  }, [basedListArr]);

  useEffect(() => {
    // console.log(imageListArr);
  }, [imageListArr]);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2 style={{ fontWeight: 600 }}>추천 캠핑장</h2>
        </div>
        <InfiniteScroll
          dataLength={basedList.length}
          next={() => {
            setBasedListReqParams((prev) => ({
              pageNo: prev.pageNo + 1,
              numOfRows: 1,
            }));
            // setTimeout(() => {}, 1000);
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
            {basedList &&
              basedList.map((item, idx) => (
                <Grid key={String(idx)} item lg={12} xs={12}>
                  <PhotoCard>Hello</PhotoCard>
                </Grid>
              ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SectionInfiniteList;
