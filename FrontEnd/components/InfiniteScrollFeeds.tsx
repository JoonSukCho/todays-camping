import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

// reducer
import { useDispatch } from 'react-redux';
import { REQUEST_LIKE_LIST } from 'reducers/likeList';

// mui
import Typography from '@material-ui/core/Typography';

// core components

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import PhotoFeed from 'components/PhotoFeed';
import CirCularLoader from 'components/CirCularLoader';
import ErrorResponse from 'components/ErrorResponse';

// Hooks
import useInfiniteBasedInfo from 'Hooks/api/useInfiniteBasedList';

interface InfiniteScrollFeedsProps {
  shuffledPageNumArr: number[];
}

const InfiniteScrollFeeds = ({
  shuffledPageNumArr,
}: InfiniteScrollFeedsProps) => {
  const dispatch = useDispatch();

  const {
    data: allPagesData,
    hasNextPage,
    isFetching,
    isError,
    error,
    fetchNextPage,
  } = useInfiniteBasedInfo({ shuffledPageNumArr });

  const basedInfoList = useMemo(() => {
    if (allPagesData) {
      return allPagesData.pages
        .map((pageData) => pageData.basedInfoList)
        .flat();
    }

    return [];
  }, [allPagesData]);

  useEffect(() => {
    // 좋아요 목록 요청
    dispatch({
      type: REQUEST_LIKE_LIST,
    });

    // Init Data 요청
    fetchNextPage();
  }, []);

  if (isError) return <ErrorResponse errorMessage={error.message} />;
  if ((isFetching && !hasNextPage) || hasNextPage === undefined)
    return <CirCularLoader />;
  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={basedInfoList.length}
      next={fetchNextPage}
      hasMore
      loader={<CirCularLoader />}
      endMessage={
        <EndMessageComponent variant="h4">
          더 이상 피드가 없습니다. &#128517;
        </EndMessageComponent>
      }
    >
      <GridContainer>
        {basedInfoList.map((basedInfo, idx) => (
          <GridItem key={basedInfo.contentId}>
            <PhotoFeed basedInfo={basedInfo} />
          </GridItem>
        ))}
      </GridContainer>
    </InfiniteScroll>
  );
};

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

export default React.memo(InfiniteScrollFeeds);
