import { _iCommonItem, _iGCResponseBody } from 'models/api/goCamping/common';

// types
export type _tSearchItem = _iSearchItem[] | _iSearchItem;

// interfaces
export interface _iSearchInfoReqParams {
  pageNo: number;
  numOfRows: number;
  keyword?: string;
}

export interface _iSearchInfoBody extends _iGCResponseBody {
  items: {
    item?: _tSearchItem;
  };
}

export interface _iSearchInfo {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  itemList: _iSearchItem[];
}

export interface _iSearchItem extends _iCommonItem {}
