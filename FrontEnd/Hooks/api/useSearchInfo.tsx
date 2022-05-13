import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _tSearchItem,
  _iSearchInfoBody,
  _iSearchInfoReqParams,
  _iSearchInfo,
  _iSearchItem,
} from 'models/api/goCamping/searchInfo';

const getSearchInfo = async (params): Promise<_iSearchInfo> => {
  const { data } = await axios
    .get('/api/searchList', {
      params: {
        ...params,
        ServiceKey: process.env.NEXT_PUBLIC_SERVICE_KEY,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        _type: 'json',
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
  const SearchInfo: _iSearchInfo = {} as _iSearchInfo;
  let SearchList: _iSearchItem[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const SearchItem: _tSearchItem = items.item;

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
  return useQuery<_iSearchInfo, Error>(
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
