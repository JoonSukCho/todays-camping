import { _iCommonItem, _iGCResponseBody } from 'models/api/goCamping/common';

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

export interface _iBasedItem extends _iCommonItem {}
