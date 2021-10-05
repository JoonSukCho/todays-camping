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
  manageSttus?: string; // 운영상태, 관리상태
  featureNm?: any; // 특징
  induty?: string; // 업종
  mapX?: number; // 경도(X)
  mapY?: number; // 위도(Y)
  tel?: string; // 전화번호
  homepage?: string; // 홈페이지 url
  resveUrl?: string; // 예약페이지
  firstImageUrl?: string; // 대표이미지 url

  // Add Other response...
}
