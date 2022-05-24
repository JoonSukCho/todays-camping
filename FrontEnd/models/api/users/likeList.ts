import { _iCommonInfo } from 'models/api/goCamping/common';

export interface _iLikeListParams extends _iCommonInfo {}

export interface _iLikeItem {
  contentid: number; // Image랑 mapping에 필요한 id
  facltnm?: string; // 야영장명
  addr1?: string; // 주소
  addr2?: string; // 상세주소
  mapx?: number; // 경도(X)
  mapy?: number; // 위도(Y)
  tel?: string; // 전화번호
  homepage?: string; // 홈페이지 url
  firstimageurl?: string; // 대표이미지 url
  sitebottomcl1?: number; // 잔디
  sitebottomcl2?: number; // 파쇄석
  sitebottomcl3?: number; // 테크
  sitebottomcl4?: number; // 자갈
  sitebottomcl5?: number; // 맨흙
  sbrscl?: string; // 부대시설
  animalcmgcl?: string; // 애완동물 출입
  operpdcl?: string; // 운영기간
}
