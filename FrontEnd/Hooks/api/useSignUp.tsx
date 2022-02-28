import axios from 'axios';
import { useMutation } from 'react-query';
import { _iSignUpParams } from 'models/api/users/signUp';

const useSignUp = (params: _iSignUpParams) => {
  return useMutation((res) => axios.post('/users/signUp', params), {
    onError: (err) => {
      console.log(err);
    },
  });
};
