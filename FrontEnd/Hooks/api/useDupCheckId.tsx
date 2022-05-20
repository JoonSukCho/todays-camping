import axios from 'axios';
import { useQuery } from 'react-query';

const dupCheckId = async (user_id: string): Promise<boolean> => {
  let dupCheckIdURL = `https://todays-camping.herokuapp.com/users/auth/duplicateCheck`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.LOCAL_IP_ADDRESS;
    const serverPort = process.env.LOCAL_SERVER_PORT;

    dupCheckIdURL = `${ipAddress}:${serverPort}/users/auth/duplicateCheck`;
  }

  const { data } = await axios
    .get(dupCheckIdURL, {
      params: {
        user_id,
      },
    })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

  return data.data;
};

const useDupCheckId = (params) => {
  return useQuery<any, Error>([params], () => dupCheckId(params), {
    enabled: false,
    retry: 0,
  });
};

export default useDupCheckId;
