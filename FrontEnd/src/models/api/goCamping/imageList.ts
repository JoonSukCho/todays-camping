import { _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tImageList = _iImageItem[] | _iImageItem;

// interface
export interface _iImageListReqParams {
  contentId: number;
}

export interface _iImageListBody extends _iGCResponseBody {
  items: _iImageListItems;
}

export interface _iImageListItems {
  item?: _tImageList;
}

export interface _iImageItem {
  contentId: number; // contentId
  createdtime: string; // 이미지 생성 시간
  imageUrl: string; // 이미지 url
  modifiedtime: string; // 이미지 수정 시간
  serialnum: number;
}
