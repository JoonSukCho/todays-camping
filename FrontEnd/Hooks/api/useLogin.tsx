import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

// type & interface
import { _iLoginParams } from 'models/api/users/login';

// useQuery는 generic만 지원
const useLogin = () => {
  let loginURL = `https://todays-camping.herokuapp.com/users/auth/login`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    loginURL = `${ipAddress}:${serverPort}/users/auth/login`;
  }

  return useMutation<Response, AxiosError, _iLoginParams>(
    (params) => {
      return axios.post(loginURL, params);
    },
    {
      onError: (err) => {
        console.log('Login Error', err);
      },
    },
  );
};

export default useLogin;
