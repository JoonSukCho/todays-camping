import { useEffect, useState } from 'react';
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

// Hooks
import useBasedInfo from 'Hooks/api/useBasedInfo';

// util
import { generateShuffledArr } from 'util/utils';

// models
import { _iBasedInfoReqParams } from 'models/api/goCamping/basedInfo';
import ErrorResponse from 'components/ErrorResponse';

const NUM_OF_ROWS = 10;
const totalCount = 2910;
const totalPage = Math.ceil(totalCount / NUM_OF_ROWS);
const shuffledPageIdxArr = generateShuffledArr(totalPage).filter(
  (idx) => idx !== totalPage,
);

const InfiniteScrollFeeds = () => {
  const dispatch = useDispatch();

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

  // 좋아요 목록 요청
  useEffect(() => {
    dispatch({
      type: REQUEST_LIKE_LIST,
    });
  }, []);

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

  if (basedInfoError)
    return <ErrorResponse errorMessage={basedInfoError.message} />;
  return (
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
  );
};

const EndMessageComponent = styled(Typography)`
  font-weight: 600;
  margin-top: 36px;
  text-align: center;
`;

export default InfiniteScrollFeeds;
