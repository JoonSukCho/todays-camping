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

  const { data } = await axios
    .get(searchInfoURL, {
      params,
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
