import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

// type & interface
import { _iSignUpParams } from 'models/api/users/signUp';

// useQuery는 generic만 지원
const useSignUp = () => {
  let signUpURL = `https://todays-camping.herokuapp.com/users/auth/signUp`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.LOCAL_IP_ADDRESS;
    const serverPort = process.env.LOCAL_SERVER_PORT;

    signUpURL = `${ipAddress}:${serverPort}/users/auth/signUp`;
  }

  return useMutation<Response, AxiosError, _iSignUpParams>(
    (params) => {
      return axios.post(signUpURL, params);
    },
    {
      retry: 0,
    },
  );
};

export default useSignUp;
