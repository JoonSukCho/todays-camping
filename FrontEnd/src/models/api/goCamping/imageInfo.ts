import { _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tImageItem = _iImageItem[] | _iImageItem;

// interfaces
export interface _iImageInfoReqParams {
  contentId: number;
}

export interface _iImageInfoBody extends _iGCResponseBody {
  items: {
    item?: _tImageItem;
  };
}

export interface _iImageInfo {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _iImageItem[];
}

export interface _iImageItem {
  contentId: number; // contentId
  createdtime: string; // 이미지 생성 시간
  imageUrl: string; // 이미지 url
  modifiedtime: string; // 이미지 수정 시간
  serialnum: number;
}
