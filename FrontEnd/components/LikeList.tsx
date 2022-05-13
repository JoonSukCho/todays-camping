import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// reducer
import { RootState } from 'reducers';
import { REQUEST_LIKE_LIST } from 'reducers/likeList';

// components
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import GridContainer from 'components/Grid/GridContainer';
import CirCularLoader from 'components/CirCularLoader';
import LikeListItem from 'components/LikeListItem';

const LikeList = () => {
  const dispatch = useDispatch();
  const { likeList, likeListDone, likeListLoading } = useSelector(
    (state: RootState) => state.likeList,
  );

  useEffect(() => {
    dispatch({
      type: REQUEST_LIKE_LIST,
    });
  }, []);

  return (
    <GridContainer>
      {likeListLoading ? (
        <LoaderContainer>
          <CirCularLoader />
        </LoaderContainer>
      ) : likeListDone && likeList.length > 0 ? (
        likeList.map((likeItem, idx) => (
          <LikeListItem key={likeItem.contentid} likeItem={likeItem} />
        ))
      ) : (
        <NoResultContainer>
          <SearchIcon
            style={{
              color: 'rgba(0,0,0,0.54)',
              alignSelf: 'center',
              fontSize: '4rem',
            }}
          />
          <NoResultText>아직 좋아요 한 피드가 없습니다.</NoResultText>
          <Button
            href="/"
            color="primary"
            variant="contained"
            style={{ marginTop: 16 }}
          >
            좋아요 하러 가기
          </Button>
        </NoResultContainer>
      )}
    </GridContainer>
  );
};

const NoResultContainer = styled.div`
  width: 100%;
  height: calc(100vh - 443px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 90px 0px;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: calc(100vh - 443px);
  margin: 90px 0px;
`;

const NoResultText = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #3182f6;
`;

const NoResultSubText = styled.h3`
  font-size: 1.313rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 38px;
`;

export default LikeList;
