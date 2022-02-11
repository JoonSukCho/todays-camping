import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import AppLayout from 'components/Layout/AppLayout';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import MainSection from 'components/Section/MainSection';
import useSearchInfo from 'Hooks/api/useSearchInfo';
import { _iSearchInfoReqParams } from 'models/api/goCamping/searchInfo';
import PhotoFeed from 'components/Feed/PhotoFeed';
import CirCularLoader from 'components/Loader/CirCularLoader';
import KeywordSearchForm from 'components/Form/KeywordSearchForm';

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
      setSearchInfoReqParams({
        numOfRows: NUM_OF_ROWS,
        pageNo,
        keyword: query.keyword,
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
      <Parallax height={300} bgColor="rgba(0, 0, 0, 0.8)">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <KeywordSearchForm initialValue={query.keyword} />
            </GridItem>
          </GridContainer>
        </ParallaxContent>
      </Parallax>
      <MainSection>
        <GridContainer>
          {searchInfoIsFetched ? (
            searchInfo.itemList.length > 0 ? (
              searchInfo.itemList.map((searchItem, idx) => (
                <GridItem
                  key={String(idx)}
                  style={{ paddingTop: 16, paddingBottom: 16 }}
                >
                  <PhotoFeed basedItem={searchItem} />
                </GridItem>
              ))
            ) : (
              <GridItem>검색 결과가 없습니다.</GridItem>
            )
          ) : (
            <CirCularLoader />
          )}
          {searchInfoIsFetched && (
            <nav style={{ width: '100%', paddingBottom: 8 }}>
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

export default withRouter(SearchResult);
