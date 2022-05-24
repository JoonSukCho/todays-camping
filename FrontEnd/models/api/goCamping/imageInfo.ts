import { _iGCResponseBody } from 'models/api/goCamping/common';

// types

// interfaces
export interface _iImageInfoReqParams {
  contentId: number;
}

export interface _iImageInfoBody extends _iGCResponseBody {
  items: {
    item?: _iImageInfo[] | _iImageInfo;
  };
}

export interface _iImageInfoResponse {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _iImageInfo[];
}

export interface _iImageInfo {
  contentId: number; // contentId
  createdtime: string; // 이미지 생성 시간
  imageUrl: string; // 이미지 url
  modifiedtime: string; // 이미지 수정 시간
  serialnum: number;
}
