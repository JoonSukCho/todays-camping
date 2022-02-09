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
  let searchInfoURL = `https://todays-camping.herokuapp.com/goCamping/searchList`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    searchInfoURL = `${ipAddress}:${serverPort}/goCamping/searchList`;
  }

  const { data } = await axios.get(searchInfoURL, {
    params,
  });

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
    },
  );
};

export default useSearchInfo;
