import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

export interface _iBasedListParams {
  pageNo: number;
  numOfRows: number;
}

export interface _iBasedList {
  response: {
    header: _iBasedListHeader;
    body: _iBasedListBody;
  };
}

interface _iBasedListHeader {
  resultCode: string;
  resultMsg: string;
}

interface _iBasedListBody {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items:
    | string
    | {
        item?: Array<_iBasedItem>;
      };
}

interface _iBasedItem {
  contentId: number; // Image랑 mapping에 필요한 id
  facltNm?: string; // 야영장명
  lineIntro?: string; // 한줄소개
  intro?: string; // 소개
  addr1?: string; // 주소
  addr2?: string; // 상세주소

  // Add Other response...
}

const getBasedList = async (params): Promise<Array<_iBasedItem>> => {
  const { data } = await axios.get('http://localhost:4001/goCamping/basedList', {
    params,
  });

  const basedListBody: _iBasedListBody = data.response.body;
  const basedListItems = basedListBody.items;

  if (_.has(basedListItems, 'item')) {
    const basedList: Array<_iBasedItem> = basedListItems.item;

    return basedList;
  }

  return [];
};

const useBasedList = (params: _iBasedListParams) => {
  return useQuery('basedList', () => getBasedList(params));
};

export default useBasedList;
