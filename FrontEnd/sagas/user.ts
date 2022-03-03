import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  REQUEST_USER_INFO,
  SUCCESS_USER_INFO,
  ERROR_USER_INFO,
} from 'reducers/user';
import {
  isValidRefreshToken,
  resetRefreshToken,
  setRefreshTokenToHeader,
} from 'util/auth';

const getUserInfo = async () => {
  let userInfoURL = `https://todays-camping.herokuapp.com/users/userInfo`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    userInfoURL = `${ipAddress}:${serverPort}/users/userInfo`;
  }

  if (isValidRefreshToken()) {
    setRefreshTokenToHeader();
  } else {
    resetRefreshToken();
  }

  const { data } = await axios.get(userInfoURL).catch((err) => {
    throw new Error(err.response.data.message);
  });

  const userInfo = data.data;

  return userInfo;
};

function* getUserInfoSaga() {
  try {
    const userInfo = yield call(getUserInfo);

    yield put({ type: SUCCESS_USER_INFO, payload: userInfo });
  } catch (err) {
    yield put({ type: ERROR_USER_INFO, payload: err.message });
  }
}

function* watchGetUserInfo() {
  yield takeLatest(REQUEST_USER_INFO, getUserInfoSaga);
}

export default function* userSaga() {
  yield all([fork(watchGetUserInfo)]);
}
