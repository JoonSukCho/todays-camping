import { _iCommonInfo, _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tBasedInfo = _iCommonInfo;

// interfaces
export interface _iBasedInfoReqParams {
  pageNo: number;
  numOfRows: number;
}

export interface _iBasedInfoResponse {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _tBasedInfo[];
}

export interface _iBasedInfoBody extends _iGCResponseBody {
  items: {
    item?: _tBasedInfo[] | _tBasedInfo;
  };
}
