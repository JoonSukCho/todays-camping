import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { useQueryClient, useMutation } from 'react-query';
import { useEffect } from 'react';

// components
import CirCularLoader from 'components/Loader/CirCularLoader';

const SignUpForm = () => {
  const queryClient = useQueryClient();
  // queryKey에 params도 있는지 확인해야함
  // console.log(queryClient.getQueryData(['basedInfo']));

  const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
  const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;
  const { data, mutate, isLoading, isError, isSuccess, error } = useMutation(
    (params) => {
      return axios.post(`${ipAddress}:${serverPort}/users/auth/signUp`, params);
    },
    {
      onError: (err) => {
        // console.log(err);
      },
    },
  );

  const submitSignUp = () => {
    mutate({
      user_id: 'testIds',
      user_password: '12345',
      user_password_confirm: '12345',
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error.response.data);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {isLoading && <CirCularLoader />}
      <Button onClick={submitSignUp}>회원가입</Button>
    </div>
  );
};

export default SignUpForm;
