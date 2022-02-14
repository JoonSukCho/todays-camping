import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _tBasedItem,
  _iBasedInfoBody,
  _iBasedInfoReqParams,
  _iBasedInfo,
  _iBasedItem,
} from 'models/api/goCamping/basedInfo';

const getBasedInfo = async (params): Promise<_iBasedInfo> => {
  let basedInfoURL = `https://todays-camping.herokuapp.com/goCamping/basedList`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    basedInfoURL = `${ipAddress}:${serverPort}/goCamping/basedList`;
  }

  const { data } = await axios
    .get(basedInfoURL, {
      params,
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
  const basedInfo: _iBasedInfo = {} as _iBasedInfo;
  let basedList: _iBasedItem[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const basedItem: _tBasedItem = items.item;

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
  return useQuery<_iBasedInfo, Error>(
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
