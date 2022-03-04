import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_USER_INFO } from 'reducers/user';
import { REQUEST_LIKE_LIST } from 'reducers/likeList';

// components
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';

// Models
import { _iSignUpParams } from 'models/api/users/signUp';

// Hooks
import useSignUp from 'Hooks/api/useSignUp';
import useDupCheckId from 'Hooks/api/useDupCheckId';
import { IsValidatedID, IsValidatedPassword } from 'util/utils';
import useLogin from 'Hooks/api/useLogin';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    width: '100%',
    marginTop: 16,
  },
}));

const SignUpForm = ({ closeSignUpModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isValidID, setIsValidID] = useState(true);
  const [isValidPW, setISValidPW] = useState(true);
  const [isValidPWCheck, setISValidPWCheck] = useState(true);
  const [idHelperText, setIdHelperText] = useState('');

  const [userInputs, setUserInputs] = useState<_iSignUpParams>({
    user_id: '',
    user_password: '',
    user_password_confirm: '',
  });
  const { user_id, user_password, user_password_confirm } = userInputs;

  const {
    mutate: signUpMutate,
    isLoading: signUpIsLoading,
    isError: signUpIsError,
    isSuccess: signUpSuccess,
    error: signUpError,
  } = useSignUp();

  const { mutate: loginMutate, isSuccess: loginSuccess } = useLogin();

  const {
    isLoading: dupCheckIsLoading,
    isError: dupCheckIsError,
    isSuccess: dupCheckIsSuccess,
    error: dupCheckError,
    refetch: reqDupCheckId,
  } = useDupCheckId(user_id);

  const requestDupCheck = () => {
    reqDupCheckId();
  };

  const requestSignUp = () => {
    if (!IsValidatedID(user_id)) {
      setIsValidID(false);
      return false;
    }

    if (!IsValidatedPassword(user_password)) {
      setISValidPW(false);
      return false;
    }

    if (user_password !== user_password_confirm) {
      setISValidPWCheck(false);
      return false;
    }

    if (!dupCheckIsSuccess) {
      alert('아이디 중복 확인을 먼저 해주세요.');
      return false;
    }

    signUpMutate({
      user_id,
      user_password,
      user_password_confirm,
    });
  };
  const onInputChange = (e) => {
    setIdHelperText('');

    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      requestSignUp();
    }
  };

  useEffect(() => {
    if (!isValidID) {
      setIdHelperText('아이디는 영문자, 숫자로 1~20자리로 입력해주세요.');
    }
  }, [isValidID]);

  useEffect(() => {
    if (dupCheckIsError) {
      setIdHelperText(dupCheckError.message);
    }
  }, [dupCheckIsError]);

  useEffect(() => {
    if (dupCheckIsSuccess) {
      setIdHelperText('사용하실 수 있는 아이디 입니다.');
    }
  }, [dupCheckIsSuccess]);

  useEffect(() => {
    if (signUpIsError) {
      alert(signUpError.message);
    }
  }, [signUpIsError]);

  // 회원가입 callback
  useEffect(() => {
    if (signUpSuccess) {
      loginMutate({
        user_id,
        user_password,
      });
    }
  }, [signUpSuccess]);

  // 회원가입 후 로그인 callback
  useEffect(() => {
    if (loginSuccess) {
      closeSignUpModal();
      dispatch({
        type: REQUEST_USER_INFO,
      });
      dispatch({
        type: REQUEST_LIKE_LIST,
      });
    }
  }, [loginSuccess]);

  return (
    <div>
      <TextField
        id="user_id"
        name="user_id"
        label="아이디"
        variant="outlined"
        required
        fullWidth
        margin="normal"
        value={user_id}
        error={!isValidID || dupCheckIsError}
        helperText={idHelperText}
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: 90 }}
              onClick={requestDupCheck}
            >
              {dupCheckIsLoading ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                '중복 확인'
              )}
            </Button>
          ),
        }}
        onChange={onInputChange}
        onKeyPress={onEnterPress}
      />
      <TextField
        id="user_password"
        name="user_password"
        type="password"
        label="비밀번호"
        variant="outlined"
        required
        fullWidth
        margin="normal"
        value={user_password}
        error={!isValidPW}
        helperText={
          !isValidPW
            ? '8~20자의 영문 대소문자, 숫자, 특수문자(!@#$%^*+=-)만 사용 가능합니다.'
            : ''
        }
        onChange={onInputChange}
        onKeyPress={onEnterPress}
      />
      <TextField
        id="user_password_confirm"
        name="user_password_confirm"
        type="password"
        label="비밀번호 확인"
        variant="outlined"
        required
        fullWidth
        margin="normal"
        value={user_password_confirm}
        error={!isValidPWCheck}
        helperText={!isValidPWCheck ? '비밀번호가 일치하지 않습니다.' : ''}
        onChange={onInputChange}
        onKeyPress={onEnterPress}
      />
      <Button
        className={classes.loginButton}
        onClick={requestSignUp}
        color="primary"
        variant="contained"
      >
        {signUpIsLoading ? (
          <CircularProgress size={26} color="inherit" />
        ) : (
          '회원 가입'
        )}
      </Button>
    </div>
  );
};

export default SignUpForm;
