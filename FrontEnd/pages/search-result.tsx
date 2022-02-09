import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import AppLayout from 'components/Layout/AppLayout';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import MainSection from 'components/Section/MainSection';
import useSearchInfo from 'Hooks/api/useSearchInfo';
import useInput from 'Hooks/useInput';
import { _iSearchInfoReqParams } from 'models/api/goCamping/searchInfo';

const SearchResult = () => {
  const [keyword, onChangeKeyword] = useInput<string>('');
  const [searchInfoReqParams, setSearchInfoReqParams] =
    useState<_iSearchInfoReqParams>(null);

  const {
    data: searchInfo,
    error: searchInfoError,
    isFetched: searchInfoIsFetched,
    refetch: getSearchInfo,
  } = useSearchInfo(searchInfoReqParams);

  const searchHandler = () => {
    setSearchInfoReqParams({
      numOfRows: 10,
      pageNo: 1,
      keyword,
    });
  };

  useEffect(() => {
    if (searchInfoReqParams) {
      getSearchInfo();
    }
  }, [searchInfoReqParams]);

  useEffect(() => {
    if (searchInfoIsFetched) {
      console.log(keyword, searchInfo);
    }
  }, [searchInfoIsFetched]);

  return (
    <AppLayout>
      <Parallax height={500} bgColor="rgba(0, 0, 0, 0.8)">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              {/* <TitleContainer>
                <Title>키워드 검색</Title>
              </TitleContainer> */}
              <div
                style={{
                  padding: '20px 0px 20px 0px',
                  marginTop: '25px',
                  borderRadius: '8px',
                  paddingBottom: '25px',
                }}
              >
                <TextField
                  autoFocus
                  placeholder="키워드 검색"
                  variant="outlined"
                  onChange={onChangeKeyword}
                  style={{ background: '#fff', borderRadius: 8, width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={searchHandler}
                      >
                        검색
                      </Button>
                    ),
                  }}
                />
              </div>
            </GridItem>
          </GridContainer>
        </ParallaxContent>
      </Parallax>
      <MainSection>
        <div style={{ height: 1000 }}>Section </div>
      </MainSection>
    </AppLayout>
  );
};

const TitleContainer = styled.div`
  color: #ffffff;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  display: inline-block;
  position: relative;

  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 1.313rem;
  max-width: 500px;
  margin: 10px 0 0;

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

export default SearchResult;
