import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import {
  _tImageItem,
  _iImageInfoBody,
  _iImageInfoReqParams,
  _iImageInfo,
  _iImageItem,
} from 'models/api/goCamping/imageInfo';

const getImageInfo = async (params): Promise<_iImageInfo> => {
  const ipAddress = process.env.REACT_APP_IP_ADDRESS;
  const serverPort = process.env.REACT_APP_SERVER_PORT;
  const { data } = await axios.get(`${ipAddress}:${serverPort}/goCamping/imageList`, {
    params,
  });

  const imageInfoBody: _iImageInfoBody = data.response.body;
  const { totalCount, pageNo, numOfRows, items } = imageInfoBody;
  const imageInfo: _iImageInfo = {} as _iImageInfo;
  let imageList: _iImageItem[] = [];

  if (Object.prototype.hasOwnProperty.call(items, 'item')) {
    const imageItem: _tImageItem = items.item;

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
  return useQuery<_iImageInfo, Error>(['imageInfo', params], () => getImageInfo(params), {
    enabled: !!params,
  });
};

export default useImageInfo;
