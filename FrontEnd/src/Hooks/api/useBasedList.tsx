import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

// type & interface
import {
  _iBasedItem,
  _iBasedList,
  _iBasedListBody,
  _iBasedListReqParams,
} from 'interfaces/api/goCamping/basedList';

const getBasedList = async (params): Promise<Array<_iBasedItem>> => {
  const { data } = await axios.get('http://localhost:4001/goCamping/basedList', {
    params,
  });

  const basedListBody: _iBasedListBody = data.response.body;
  const basedList: _iBasedList = basedListBody.items;
  let basedListArray: Array<_iBasedItem> = [];

  if (_.has(basedList, 'item')) {
    basedListArray = basedList.item;
  }

  return basedListArray;
};

// useQuery는 generic만 지원
const useBasedList = (params: _iBasedListReqParams) => {
  return useQuery<Array<_iBasedItem>, Error>('basedList', () => getBasedList(params));
};

export default useBasedList;
