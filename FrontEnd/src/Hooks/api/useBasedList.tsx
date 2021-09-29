import { useQuery } from 'react-query';
import axios from 'axios';
import * as _ from 'lodash';

// type & interface
import {
  _tBasedList,
  _iBasedListItems,
  _iBasedListBody,
  _iBasedListReqParams,
} from 'models/api/goCamping/basedList';

const getBasedList = async (params): Promise<_tBasedList> => {
  const { data } = await axios.get('http://localhost:4001/goCamping/basedList', {
    params,
  });

  const basedListBody: _iBasedListBody = data.response.body;
  const basedListItems: _iBasedListItems = basedListBody.items;
  let basedList: _tBasedList = [];

  if (_.has(basedListItems, 'item')) {
    basedList = basedListItems.item;
  }

  return basedList;
};

// useQuery는 generic만 지원
const useBasedList = (params: _iBasedListReqParams) => {
  return useQuery<_tBasedList, Error>(['basedList', params], () => getBasedList(params), {
    enabled: !!params,
  });
};

export default useBasedList;
