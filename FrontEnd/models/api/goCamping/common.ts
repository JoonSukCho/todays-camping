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
