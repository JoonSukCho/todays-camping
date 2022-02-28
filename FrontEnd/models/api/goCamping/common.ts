export interface _iGCResponse {
  response: {
    header: _iGCResponseHeader;
    body: _iGCResponseBody;
  };
}

export interface _iGCResponseHeader {
  resultCode: string;
  resultMsg: string;
}

export interface _iGCResponseBody {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface _iCommonItem {
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
  siteBottomCl1?: number; // 잔디
  siteBottomCl2?: number; // 파쇄석
  siteBottomCl3?: number; // 테크
  siteBottomCl4?: number; // 자갈
  siteBottomCl5?: number; // 맨흙
  sbrsCl?: string; // 부대시설
  animalCmgCl?: string; // 애완동물 출입
  operPdCl?: string; // 운영기간
  operDeCl?: string; // 운영일
}
