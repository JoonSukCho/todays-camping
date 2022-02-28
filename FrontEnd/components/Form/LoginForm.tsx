import axios, { AxiosError } from 'axios';
import { Button, TextField } from '@material-ui/core';
import { useQueryClient, useMutation } from 'react-query';
import { useEffect } from 'react';
import CirCularLoader from 'components/Loader/CirCularLoader';

const LoginForm = () => {
  const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
  const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

  // 로그인 mutation
  const {
    data: loginData,
    mutate: loginMutate,
    isLoading: loginIsLoading,
    isError: loginIsError,
    isSuccess: loginIsSuccess,
    error: loginError,
  } = useMutation<Response, AxiosError>(
    (params) => {
      return axios.post(`${ipAddress}:${serverPort}/users/auth/login`, params);
    },
    {
      onError: (err) => {
        // console.log(err);
      },
    },
  );

  // 로그아웃 mutation
  const {
    data: logoutData,
    mutate: logoutMutate,
    isLoading: logoutIsLoading,
    isError: logoutIsError,
    isSuccess: logoutIsSuccess,
    error: logoutError,
  } = useMutation<Response, AxiosError>(
    () => {
      return axios.get(`${ipAddress}:${serverPort}/users/auth/logout`);
    },
    {
      onError: (err) => {
        // console.log(err);
      },
    },
  );

  const submitLogin = () => {
    loginMutate({
      user_id: 'chojs',
      user_password: '1234',
    });
  };

  const submitLogout = () => {
    logoutMutate();
  };

  useEffect(() => {
    if (loginError) {
      console.log(loginError.response.data);
    }
  }, [loginIsLoading]);

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  useEffect(() => {
    if (logoutError) {
      console.log(logoutError.response.data);
    }
  }, [logoutIsLoading]);

  useEffect(() => {
    console.log(logoutData);
  }, [logoutData]);

  return (
    <div>
      {loginIsLoading && <CirCularLoader />}
      <Button onClick={submitLogin} color="primary">
        로그인
      </Button>
      <Button onClick={submitLogout} color="primary">
        로그아웃
      </Button>
    </div>
  );
};

export default LoginForm;
