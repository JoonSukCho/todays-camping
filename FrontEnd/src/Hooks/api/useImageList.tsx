import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

// type & interface
import {
  _iImageItem,
  _iImageList,
  _iImageListBody,
  _iImageListReqParams,
} from 'interfaces/api/goCamping/imageList';

const getImageList = async (params): Promise<Array<_iImageItem>> => {
  const { data } = await axios.get('http://localhost:4001/goCamping/imageList', {
    params,
  });

  const imageListBody: _iImageListBody = data.response.body;
  const imageList: _iImageList = imageListBody.items;
  let imageListArray: Array<_iImageItem> = [];

  if (_.has(imageList, 'item')) {
    imageListArray = imageList.item;
  }

  return imageListArray;
};

const useImageList = (params: _iImageListReqParams) => {
  return useQuery<Array<_iImageItem>, Error>('imageList', () => getImageList(params));
};

export default useImageList;
