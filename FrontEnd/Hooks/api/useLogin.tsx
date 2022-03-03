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

  return useMutation<any, AxiosError, _iLoginParams>(
    (params) => {
      return axios.post(loginURL, params).then((res) => {
        const { accessToken, refreshToken, expired } = res.data;
        axios.defaults.headers['access-token'] = `Bearer ${accessToken}`;
        axios.defaults.headers['refresh-token'] = `Bearer ${refreshToken}`;

        // refresh Token을 localStorage에 저장. (추후 DB에 저장으로 수정)
        localStorage.setItem('refreshToken', refreshToken);
        // refresh Token의 만료시간을 localStorage에 저장.
        localStorage.setItem('expired', expired);
        return res.data;
      });
    },
    {
      mutationKey: 'login',
      onError: (err) => {
        console.log('Login Error', err.response.data);
      },
    },
  );
};

export default useLogin;
