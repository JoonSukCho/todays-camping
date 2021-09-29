import { _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tBasedList = _iBasedItem[] | _iBasedItem;

// interfaces
export interface _iBasedListReqParams {
  pageNo: number;
  numOfRows: number;
}

export interface _iBasedListBody extends _iGCResponseBody {
  items: _iBasedListItems;
}

export interface _iBasedListItems {
  item?: _tBasedList;
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
