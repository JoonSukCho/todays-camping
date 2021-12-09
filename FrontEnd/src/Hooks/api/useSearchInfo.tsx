import { useQuery } from 'react-query';
import axios from 'axios';

const getBasedList = async () => {
  const { data } = await axios.get('http://localhost:3001/goCamping/basedList', {
    params: {
      pageNo: 1,
      nomOfRows: 10,
    },
  });

  return data;
};

const useBasedList = () => {
  return useQuery('basedList', getBasedList);
};

export default useBasedList;
