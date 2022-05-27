import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _iImageInfoBody,
  _iImageInfoReqParams,
  _iImageInfoResponse,
  _iImageInfo,
} from 'models/api/goCamping/imageInfo';
import { GO_CAMPING_COMMON_PARAMS } from 'constants/constants';

const getImageInfo = async (params): Promise<_iImageInfoResponse> => {
  const { data } = await axios.get('/api/imageList', {
    params: {
      ...params,
      ...GO_CAMPING_COMMON_PARAMS,
    },
  });

  const imageInfoBody: _iImageInfoBody = data.response.body;
  const { totalCount, pageNo, numOfRows, items } = imageInfoBody;
  const imageInfo: _iImageInfoResponse = {} as _iImageInfoResponse;
  let imageList: _iImageInfo[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const imageItem: _iImageInfo[] | _iImageInfo = items.item;

    if (Array.isArray(imageItem)) {
      imageList = imageItem;
    } else {
      imageList.push(imageItem);
    }
  }

  imageInfo.totalCount = totalCount;
  imageInfo.pageNo = pageNo;
  imageInfo.numOfRows = numOfRows;
  imageInfo.itemList = imageList;

  return imageInfo;
};

const useImageInfo = (params: _iImageInfoReqParams) => {
  return useQuery<_iImageInfoResponse, Error>(
    ['imageInfo', params],
    () => getImageInfo(params),
    {
      enabled: !!params,
    },
  );
};

export default useImageInfo;
