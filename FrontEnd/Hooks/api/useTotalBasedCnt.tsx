import { useQuery } from 'react-query';
import axios from 'axios';

// type & interface
import { _iBasedInfoBody } from 'models/api/goCamping/basedInfo';

const getTotalBasedCnt = async (): Promise<number> => {
  let basedInfoURL = `https://todays-camping.herokuapp.com/goCamping/basedList`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    basedInfoURL = `${ipAddress}:${serverPort}/goCamping/basedList`;
  }

  const { data } = await axios.get(basedInfoURL, {
    params: {
      pageNo: 0,
      numOfRows: 0,
    },
  });

  const basedInfoBody: _iBasedInfoBody = data.response.body;
  const { totalCount } = basedInfoBody;

  return totalCount;
};

// useQuery는 generic만 지원
const useTotalBasedCnt = () => {
  return useQuery(['totalBasedCnt'], () => getTotalBasedCnt(), {
    enabled: false,
  });
};

export default useTotalBasedCnt;
