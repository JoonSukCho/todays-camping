import { useQuery } from 'react-query';
import axios from 'axios';

const getImageList = async (params) => {
  const { data } = await axios.get('http://localhost:4001/goCamping/basedList', {
    params,
  });

  return data;
};

const useImageList = (params: any) => {
  return useQuery('basedList', () => getImageList(params));
};

export default useImageList;
