import axios from 'axios';

export const saveTokenAfterLogin = (
  accessToken: string,
  refreshToken: string,
  expired: string,
) => {
  axios.defaults.headers['access-token'] = `Bearer ${accessToken}`;
  axios.defaults.headers['refresh-token'] = `Bearer ${refreshToken}`;

  // refresh Token을 localStorage에 저장. (추후 DB에 저장으로 수정)
  localStorage.setItem('refreshToken', refreshToken);
  // refresh Token의 만료시간을 localStorage에 저장.
  localStorage.setItem('expired', expired);
};

export const isValidRefreshToken = () => {
  const expired = localStorage.getItem('expired');

  if (!expired) {
    return false;
  }

  const now = new Date().getTime();

  return now <= parseInt(expired, 10);
};

export const resetRefreshToken = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expired');
  axios.defaults.headers['refresh-token'] = `Bearer `;
};

export const setRefreshTokenToHeader = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  axios.defaults.headers['refresh-token'] = `Bearer ${refreshToken}`;
};
