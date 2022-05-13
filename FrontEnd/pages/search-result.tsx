import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import { Search as SearchIcon } from '@material-ui/icons';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import AppLayout from 'components/Layout/AppLayout';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import MainSection from 'components/MainSection';
import useSearchInfo from 'Hooks/api/useSearchInfo';
import PhotoFeed from 'components/PhotoFeed';
import CirCularLoader from 'components/CirCularLoader';
import KeywordSearchForm from 'components/Form/KeywordSearchForm';
import ErrorResponse from 'components/ErrorResponse';

import { _iSearchInfoReqParams } from 'models/api/goCamping/searchInfo';

const NUM_OF_ROWS = 10;
const SearchResult = ({ router: { query } }) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchInfoReqParams, setSearchInfoReqParams] =
    useState<_iSearchInfoReqParams>(null);

  const {
    data: searchInfo,
    error: searchInfoError,
    isFetched: searchInfoIsFetched,
    refetch: getSearchInfo,
  } = useSearchInfo(searchInfoReqParams);

  const handlePageClick = (e: { selected: number }) => {
    setPageNo(e.selected + 1);
  };

  useEffect(() => {
    if (query.keyword) {
      setSearchInfoReqParams((prevState) => {
        if (prevState) {
          if (prevState.keyword !== query.keyword) {
            setPageNo(1);

            return {
              numOfRows: NUM_OF_ROWS,
              keyword: query.keyword,
              pageNo: 1,
            };
          }
        }

        return {
          numOfRows: NUM_OF_ROWS,
          pageNo,
          keyword: query.keyword,
        };
      });
    }
  }, [query, pageNo]);

  useEffect(() => {
    if (searchInfoReqParams) {
      getSearchInfo();
    }
  }, [searchInfoReqParams]);

  return (
    <AppLayout>
      <Parallax height={170} bgColor="rgba(0, 0, 0, 0.8)">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <KeywordSearchForm initialValue={query.keyword} spacing={70} />
            </GridItem>
          </GridContainer>
        </ParallaxContent>
      </Parallax>
      <MainSection>
        {searchInfoError && (
          <ErrorResponse errorMessage={searchInfoError.message} />
        )}
        <GridContainer>
          {searchInfoIsFetched && !searchInfoError ? (
            searchInfo.itemList.length > 0 ? (
              searchInfo.itemList.map((searchItem, idx) => (
                <GridItem key={String(idx)}>
                  <PhotoFeed basedItem={searchItem} />
                </GridItem>
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
                <NoResultText>검색 결과가 없습니다.</NoResultText>
                <NoResultSubText>추천 키워드</NoResultSubText>
                <NoResultSubText
                  style={{
                    marginTop: 0,
                    color: '#565656',
                    fontSize: '1.1rem',
                  }}
                >
                  숲, 바다, 오토, 애견, 야영장
                </NoResultSubText>
              </NoResultContainer>
            )
          ) : (
            <LoaderContainer>
              <CirCularLoader />
            </LoaderContainer>
          )}

          {searchInfoIsFetched &&
            !searchInfoError &&
            searchInfo.itemList.length > 0 && (
              <nav style={{ width: '100%', paddingBottom: 8, marginTop: 8 }}>
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={
                    searchInfo.totalCount === 0
                      ? 1
                      : Math.ceil(searchInfo.totalCount / NUM_OF_ROWS)
                  }
                  pageRangeDisplayed={2}
                  forcePage={pageNo - 1}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  previousLinkClassName="pagination-previous-link"
                  nextLinkClassName="pagination-next-link"
                  disabledClassName="pagination-link--disabled"
                  activeClassName="pagination-link--active"
                />
              </nav>
            )}
        </GridContainer>
      </MainSection>
    </AppLayout>
  );
};

const NoResultContainer = styled.div`
  width: 100%;
  height: calc(100vh - 443px);
  display: flex;
  flex-direction: column;
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

export default withRouter(SearchResult);
