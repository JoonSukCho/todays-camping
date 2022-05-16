import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_USER_INFO } from 'reducers/user';
import { REQUEST_LIKE_LIST } from 'reducers/likeList';

// components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [isValidPW, setIsValidPW] = useState(true);
  const [isValidPWCheck, setIsValidPWCheck] = useState(true);
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

  // 회원가입 요청
  const requestSignUp = () => {
    if (dupCheckIsLoading) {
      setIdHelperText('아이디 중복 체크 중입니다.');
      return false;
    }

    if (user_id === '') {
      setIdHelperText('아이디를 입력해주세요.');
      setIsValidID(false);
      return false;
    }

    if (user_password === '') {
      setIsValidPW(false);
      return false;
    }

    if (user_password_confirm === '') {
      setIsValidPWCheck(false);
      return false;
    }

    signUpMutate({
      user_id,
      user_password,
      user_password_confirm,
    });
  };

  // 엔터키를 누르면 회원가입 요청
  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      requestSignUp();
    }
  };

  // input change 핸들러
  const onInputChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setUserInputs({
        ...userInputs,
        [name]: value,
      });
    },
    [userInputs],
  );

  // 아이디 유효성 검사
  useEffect(() => {
    if (user_id !== '') {
      if (IsValidatedID(user_id)) {
        setIsValidID(true);
      } else {
        setIdHelperText('아이디는 영문자, 숫자로 2~20자리로 입력해주세요.');
        setIsValidID(false);
      }
    }
  }, [user_id]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (user_password !== '') {
      setIsValidPW(IsValidatedPassword(user_password));
    }
  }, [user_password]);

  // 비밀번호 확인
  useEffect(() => {
    if (user_password_confirm !== '') {
      setIsValidPWCheck(user_password === user_password_confirm);
    }
  }, [user_password_confirm]);

  // 아이디 중복 없음
  useEffect(() => {
    if (dupCheckIsSuccess && isValidID) {
      setIdHelperText('사용하실 수 있는 아이디 입니다.');
    }
  }, [dupCheckIsSuccess]);

  // 아이디 중복
  useEffect(() => {
    if (dupCheckIsError) {
      setIdHelperText(dupCheckError.message);
    }
  }, [dupCheckIsError]);

  // 회원가입 에러 처리
  useEffect(() => {
    if (signUpIsError && signUpError.response) {
      alert(signUpError.response.data.message);
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

  // 회원가입 후 로그인 성공 시 callback
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
        onBlur={() => {
          reqDupCheckId();
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
            ? '비밀번호는 8자 이상의 영문 소문자, 숫자, 특수문자(!@#$%^*+=-)를 모두 포함해야 합니다.'
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
