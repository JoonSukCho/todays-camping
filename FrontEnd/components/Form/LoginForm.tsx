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
import { _iLoginParams } from 'models/api/users/login';

// Hooks
import useLogin from 'Hooks/api/useLogin';
import { IsValidatedID } from 'util/utils';

interface LoginFormProps {
  moveSignUpModal: () => void;
  closeLoginModal: () => void;
}

const useStyles = makeStyles((theme) => ({
  loginButton: {
    width: '100%',
    marginTop: 16,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#7e7e7e',
  },
  signUp: {
    marginLeft: 6,
    color: '#333333',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 500,
  },
}));

const LoginForm = ({ moveSignUpModal, closeLoginModal }: LoginFormProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // 로그인 mutation
  const {
    mutate: loginMutate,
    isLoading: loginIsLoading,
    isError: loginIsError,
    isSuccess: loginSuccess,
    error: loginError,
  } = useLogin();

  const [isValidID, setIsValidID] = useState(true);
  const [isValidPW, setISValidPW] = useState(true);
  const [userInputs, setUserInputs] = useState<_iLoginParams>({
    user_id: '',
    user_password: '',
  });
  const { user_id, user_password } = userInputs;

  const requestLogin = () => {
    if (!IsValidatedID(user_id)) {
      setIsValidID(false);
      return false;
    }

    if (user_password.length === 0) {
      setISValidPW(false);
      return false;
    }

    loginMutate({
      user_id,
      user_password,
    });
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      requestLogin();
    }
  };

  useEffect(() => {
    if (loginIsError) {
      const { message } = loginError.response.data;
      alert(message);
    }
  }, [loginIsError]);

  // login callback
  useEffect(() => {
    if (loginSuccess) {
      closeLoginModal();
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
        error={!isValidID}
        helperText={
          !isValidID ? '아이디는 영문자, 숫자로 1~20자리로 입력해주세요.' : ''
        }
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
        helperText={!isValidPW ? '비밀번호는 필수 입력값 입니다.' : ''}
        onChange={onInputChange}
        onKeyPress={onEnterPress}
      />
      <Button
        className={classes.loginButton}
        onClick={requestLogin}
        color="primary"
        variant="contained"
      >
        {loginIsLoading ? (
          <CircularProgress size={26} color="inherit" />
        ) : (
          '로그인'
        )}
      </Button>
      <Typography variant="body2" className={classes.footer}>
        아직 회원이 아니신가요?
        <span className={classes.signUp} onClick={moveSignUpModal}>
          회원가입
        </span>
      </Typography>
    </div>
  );
};

export default LoginForm;
