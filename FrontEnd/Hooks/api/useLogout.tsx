import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

// useQuery는 generic만 지원
const useLogout = () => {
  let logoutURL = `https://todays-camping.herokuapp.com/users/auth/logout`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    logoutURL = `${ipAddress}:${serverPort}/users/auth/logout`;
  }

  return useMutation<Response, AxiosError>(
    () => {
      return axios.get(logoutURL);
    },
    {
      onError: (err) => {
        console.log('Logout Error', err);
      },
    },
  );
};

export default useLogout;
