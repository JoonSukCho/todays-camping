import { _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tBasedItem = _iBasedItem[] | _iBasedItem;

// interfaces
export interface _iBasedInfoReqParams {
  pageNo: number;
  numOfRows: number;
}

export interface _iBasedInfoBody extends _iGCResponseBody {
  items: {
    item?: _tBasedItem;
  };
}

export interface _iBasedInfo {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _iBasedItem[];
}

export interface _iBasedItem {
  contentId: number; // Image랑 mapping에 필요한 id
  facltNm?: string; // 야영장명
  lineIntro?: string; // 한줄소개
  intro?: string; // 소개
  addr1?: string; // 주소
  addr2?: string; // 상세주소

  // Add Other response...
}
