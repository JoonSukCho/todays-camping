import axios from 'axios';
import React, { useEffect } from 'react';

const OAuth2RedirectHandler = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:4001/oauth/kakao/callback?code=${code}`,
    }).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <p>
        <a
          href={`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_LOGOUT_REDIRECT_URI}`}
        >
          Logout
        </a>
      </p>
    </div>
  );
};

export default OAuth2RedirectHandler;
