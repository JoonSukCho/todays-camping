import axios from 'axios';
import React, { useEffect } from 'react';

// @material-ui/core
import CircularProgress from '@material-ui/core/CircularProgress';

const OAuth2RedirectHandler = ({ history }) => {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:4001/oauth/kakao/callback?code=${code}`,
    })
      .then((res) => {
        const ACCESS_TOKEN = res.data.accessToken;

        console.log(res);

        // accessToken은 다른 곳에 저장해야함!!
        localStorage.setItem('access-token', ACCESS_TOKEN);
        history.replace('/');
      })
      .catch((err) => {
        console.log('소셜 로그인 에러', err);
        alert('로그인 실패');
        history.replace('/login-page');
      });
  }, []);

  return (
    <div
      style={{
        background: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default OAuth2RedirectHandler;
