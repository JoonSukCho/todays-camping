import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _iBasedInfoBody,
  _iBasedInfoReqParams,
  _iBasedInfoResponse,
  _tBasedInfo,
} from 'models/api/goCamping/basedInfo';

const getBasedInfo = async (params): Promise<_iBasedInfoResponse> => {
  const { data } = await axios
    .get('/api/basedList', {
      params: {
        ...params,
        ServiceKey: process.env.SERVICE_KEY,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        _type: 'json',
      },
      timeout: 5000,
    })
    .catch((err) => {
      throw new Error('Server Error');
    });

  const { resultCode } = data.response.header;

  if (resultCode === '0022') {
    throw new Error('일일 트래픽 초과');
  }

  const basedInfoBody: _iBasedInfoBody = data.response.body;
  const { totalCount, pageNo, numOfRows, items } = basedInfoBody;
  const basedInfo: _iBasedInfoResponse = {} as _iBasedInfoResponse;
  let basedList: _tBasedInfo[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const basedItem: _tBasedInfo[] | _tBasedInfo = items.item;

    if (Array.isArray(basedItem)) {
      basedList = basedItem;
    } else {
      basedList.push(basedItem);
    }
  }

  basedInfo.totalCount = totalCount;
  basedInfo.pageNo = pageNo;
  basedInfo.numOfRows = numOfRows;
  basedInfo.itemList = basedList;

  return basedInfo;
};

// useQuery는 generic만 지원
const useBasedInfo = (params: _iBasedInfoReqParams) => {
  return useQuery<_iBasedInfoResponse, Error>(
    ['basedInfo', params],
    () => getBasedInfo(params),
    {
      enabled: false,
      onError: (err) => {
        console.log('onError', err.message);
      },
    },
  );
};

export default useBasedInfo;
