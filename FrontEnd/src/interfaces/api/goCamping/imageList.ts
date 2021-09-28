import { _iGCResponseBody } from 'interfaces/api/goCamping/common';

// interface
export interface _iImageListReqParams {
  contentId: number;
}

export interface _iImageListBody extends _iGCResponseBody {
  items: _iImageList;
}

export interface _iImageList {
  item?: Array<_iImageItem>;
}

export interface _iImageItem {
  contentId: number; // contentId
  createdtime: string; // 이미지 생성 시간
  imageUrl: string; // 이미지 url
  modifiedtime: string; // 이미지 수정 시간
  serialnum: number;
}
