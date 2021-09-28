import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

export interface _iImageListParams {
  contentId: number;
}

export interface _iImageList {
  response: {
    header: any;
    body: any;
  };
}

interface _iImageListHeader {
  resultCode: string;
  resultMsg: string;
}

interface _iImageListBody {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item?: Array<_iImageItem>;
  };
}

interface _iImageItem {
  contentId: number; // contentId
  createdtime: string; // 이미지 생성 시간
  imageUrl: string; // 이미지 url
  modifiedtime: string; // 이미지 수정 시간
  serialnum: number;
}

const getImageList = async (params) => {
  const { data } = await axios.get('http://localhost:4001/goCamping/imageList', {
    params,
  });

  const imageListBody: _iImageListBody = data.response.body;
  const imageListItems = imageListBody.items;

  if (_.has(imageListItems, 'item')) {
    const imageList: Array<_iImageItem> = imageListItems.item;

    return imageList;
  }

  return [];
};

const useImageList = (params: any) => {
  return useQuery('imageList', () => getImageList(params));
};

export default useImageList;
