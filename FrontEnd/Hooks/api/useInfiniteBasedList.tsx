import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

// type & interface
import { _iBasedInfoBody, _tBasedInfo } from 'models/api/goCamping/basedInfo';
import { _iCommonInfo } from 'models/api/goCamping/common';
import { GO_CAMPING_COMMON_PARAMS } from 'constants/constants';

interface _iPageParam {
  pageParam: {
    shuffledPageNumArr: number[];
    currentPageIdx: number;
  };
}

interface _iRandomBasedInfo {
  currentPageIdx: number;
  basedInfoList: _tBasedInfo[];
}

const getRandomBasedInfo = async ({
  pageParam,
}: _iPageParam): Promise<_iRandomBasedInfo> => {
  const { currentPageIdx, shuffledPageNumArr } = pageParam;

  const { data } = await axios
    .get('/api/basedList', {
      params: {
        ...GO_CAMPING_COMMON_PARAMS,
        pageNo: shuffledPageNumArr[currentPageIdx],
        numOfRows: 10,
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

const useInfiniteBasedInfo = ({ shuffledPageNumArr }) => {
  return useInfiniteQuery<_iRandomBasedInfo, Error>(
    ['infiniteBasedInfo'],
    ({
      // pageParam으로 사용할 프로퍼티를 정의
      pageParam = {
        currentPageIdx: 0,
        shuffledPageNumArr,
      },
    }) => getRandomBasedInfo({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return {
          currentPageIdx: lastPage.currentPageIdx + 1,
          shuffledPageNumArr,
        };
      },
      onError: (err) => {
        console.log('onError', err.message);
      },
    },
  );
};

export default useInfiniteBasedInfo;
