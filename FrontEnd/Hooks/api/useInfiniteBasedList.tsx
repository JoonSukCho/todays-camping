import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

// type & interface
import { _iBasedInfoBody, _tBasedInfo } from 'models/api/goCamping/basedInfo';
import { generateShuffledArr } from 'util/utils';
import { _iCommonInfo } from 'models/api/goCamping/common';

interface _iRandomBasedInfo {
  currentPageIdx: number;
  basedInfoList: _tBasedInfo[];
}

const NUM_OF_ROWS = 10;
const totalCount = 2910;
const totalPage = Math.ceil(totalCount / NUM_OF_ROWS);
const shuffledPageIdxArr = generateShuffledArr(totalPage).filter(
  (idx) => idx !== totalPage,
);

const getRandomBasedInfo = async ({
  pageParam: currentPageIdx = 0,
}): Promise<_iRandomBasedInfo> => {
  const { data } = await axios
    .get('/api/basedList', {
      params: {
        pageNo: shuffledPageIdxArr[currentPageIdx],
        numOfRows: 10,
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
  const { items } = basedInfoBody;
  let basedInfoList: _tBasedInfo[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const basedInfo: _tBasedInfo[] | _tBasedInfo = items.item;

    if (Array.isArray(basedInfo)) {
      basedInfoList = basedInfo;
    } else {
      basedInfoList.push(basedInfo);
    }
  }

  return {
    currentPageIdx,
    basedInfoList,
  };
};

// useQuery는 generic만 지원
const useInfiniteBasedInfo = () => {
  return useInfiniteQuery<_iRandomBasedInfo, Error>(
    ['infiniteBasedInfo'],
    getRandomBasedInfo,
    {
      getNextPageParam: (lastPageIdx) => lastPageIdx.currentPageIdx + 1,
      onError: (err) => {
        console.log('onError', err.message);
      },
    },
  );
};

export default useInfiniteBasedInfo;
