import axios from 'axios';
import { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        '/api/basedList',
        // 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/basedList',
        {
          params: {
            ServiceKey:
              '8h6BbqRjS0gC4ZAL1Bw6yOwha9E6ODarC3CoZ3n9dOvfX0zdQEBEQXW3E23SiibPIzuPYckNU3ffeguQf9awtQ==',
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            pageNo: 1,
            numOfRows: 10,
            _type: 'json',
          },
        },
      );
      console.log(response);
    })();
  }, []);

  return <div></div>;
};

export default Test;
