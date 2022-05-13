import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// reducer
import { RootState } from 'reducers';
import { REQUEST_LIKE_LIST } from 'reducers/likeList';

// components
import { Search as SearchIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import AppLayout from 'components/Layout/AppLayout';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import MainSection from 'components/MainSection';
import PhotoFeed from 'components/PhotoFeed';
import CirCularLoader from 'components/CirCularLoader';

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
    <AppLayout>
      <Parallax height={170} bgColor="#fb3958">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <TitleContainer>
                <Title>좋아요 리스트</Title>
              </TitleContainer>
            </GridItem>
          </GridContainer>
        </ParallaxContent>
      </Parallax>
      <MainSection>
        <GridContainer>
          {likeListLoading ? (
            <LoaderContainer>
              <CirCularLoader />
            </LoaderContainer>
          ) : likeList && likeList.length > 0 ? (
            likeList.map((likeItem, idx) => {
              const basedItem: _iBasedItem = {
                contentId: likeItem.contentid,
                facltNm: likeItem.facltnm,
                addr1: likeItem.addr1,
                addr2: likeItem.addr2,
                mapX: likeItem.mapx,
                mapY: likeItem.mapy,
                tel: likeItem.tel,
                homepage: likeItem.homepage,
                firstImageUrl: likeItem.firstimageurl,
                siteBottomCl1: likeItem.sitebottomcl1,
                siteBottomCl2: likeItem.sitebottomcl2,
                siteBottomCl3: likeItem.sitebottomcl3,
                siteBottomCl4: likeItem.sitebottomcl4,
                siteBottomCl5: likeItem.sitebottomcl5,
                sbrsCl: likeItem.sbrscl,
                animalCmgCl: likeItem.animalcmgcl,
                operPdCl: likeItem.operpdcl,
              };

              return (
                <GridItem key={String(idx)}>
                  <PhotoFeed basedItem={basedItem} />
                </GridItem>
              );
            })
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
      </MainSection>
    </AppLayout>
  );
};

const TitleContainer = styled.div`
  color: #ffffff;
  text-align: left;
  margin-top: 59px;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
`;

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
