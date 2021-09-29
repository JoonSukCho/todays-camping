import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

// type & interface
import {
  _tImageList,
  _iImageListItems,
  _iImageListBody,
  _iImageListReqParams,
} from 'models/api/goCamping/imageList';

const getImageList = async (params): Promise<_tImageList> => {
  const { data } = await axios.get('http://localhost:4001/goCamping/imageList', {
    params,
  });

  const imageListBody: _iImageListBody = data.response.body;
  const imageListItems: _iImageListItems = imageListBody.items;
  let imageList: _tImageList = [];

  if (_.has(imageListItems, 'item')) {
    imageList = imageListItems.item;
  }

  return imageList;
};

const useImageList = (params: _iImageListReqParams) => {
  return useQuery<_tImageList, Error>(['imageList', params], () => getImageList(params), {
    enabled: !!params,
  });
};

export default useImageList;
