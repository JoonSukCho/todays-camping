import { _iCommonInfo, _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tSearchInfo = _iCommonInfo;
export type _tSearchInfoList = _tSearchInfo[];

// interfaces
export interface _iSearchInfoReqParams {
  pageNo: number;
  numOfRows: number;
  keyword?: string;
}

export interface _iSearchInfoResponse {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _tSearchInfo[];
}

export interface _iSearchInfoBody extends _iGCResponseBody {
  items: {
    item?: _tSearchInfoList | _tSearchInfo;
  };
}
