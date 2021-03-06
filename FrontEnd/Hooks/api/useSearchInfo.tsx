import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _iSearchInfoBody,
  _iSearchInfoReqParams,
  _iSearchInfoResponse,
  _tSearchInfo,
} from 'models/api/goCamping/searchInfo';
import { GO_CAMPING_COMMON_PARAMS } from 'constants/constants';

const getSearchInfo = async (params): Promise<_iSearchInfoResponse> => {
  const { data } = await axios
    .get('/api/searchList', {
      params: {
        ...params,
        ...GO_CAMPING_COMMON_PARAMS,
      },
      timeout: 7000,
    })
    .catch((err) => {
      throw new Error('Server Error');
    });

  const { resultCode } = data.response.header;
  if (resultCode === '0022') {
    throw new Error('일일 트래픽 초과');
  }

  const SearchInfoBody: _iSearchInfoBody = data.response.body;
  const { totalCount, pageNo, numOfRows, items } = SearchInfoBody;
  const SearchInfo: _iSearchInfoResponse = {} as _iSearchInfoResponse;
  let SearchList: _tSearchInfo[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const SearchItem: _tSearchInfo[] | _tSearchInfo = items.item;

    if (Array.isArray(SearchItem)) {
      SearchList = SearchItem;
    } else {
      SearchList.push(SearchItem);
    }
  }

  SearchInfo.totalCount = totalCount;
  SearchInfo.pageNo = pageNo;
  SearchInfo.numOfRows = numOfRows;
  SearchInfo.itemList = SearchList;

  return SearchInfo;
};

// useQuery는 generic만 지원
const useSearchInfo = (params: _iSearchInfoReqParams) => {
  return useQuery<_iSearchInfoResponse, Error>(
    ['searchInfo', params],
    () => getSearchInfo(params),
    {
      enabled: false,
      onError: (err) => {
        console.log('onError', err.message);
      },
    },
  );
};

export default useSearchInfo;
