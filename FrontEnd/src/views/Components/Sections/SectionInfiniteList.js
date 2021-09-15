import React, { useState } from 'react';

// lib
import InfiniteScroll from 'react-infinite-scroll-component';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// components
import PhotoCard from 'components/Card/PhotoCard';

// styles
import styles from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.js';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(styles);

const SectionInfiniteList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2 style={{ fontWeight: 600 }}>추천 캠핑장</h2>
        </div>
        <InfiniteScroll
          dataLength={items.length}
          next={() => {
            setTimeout(() => {
              setItems((prev) => prev.concat([5]));
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
            {items.map((item, idx) => (
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
