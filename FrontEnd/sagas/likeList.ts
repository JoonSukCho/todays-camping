import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  REQUEST_LIKE_LIST,
  SUCCESS_LIKE_LIST,
  ERROR_LIKE_LIST,
} from 'reducers/likeList';
import {
  isValidRefreshToken,
  resetRefreshToken,
  setRefreshTokenToHeader,
} from 'util/auth';

const getLikeList = async () => {
  let likeListURL = `https://todays-camping.herokuapp.com/users/likeList/list`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    likeListURL = `${ipAddress}:${serverPort}/users/likeList/list`;
  }

  if (isValidRefreshToken()) {
    setRefreshTokenToHeader();
  } else {
    resetRefreshToken();
  }

  const { data } = await axios.get(likeListURL).catch((err) => {
    throw new Error(err.response.data.message);
  });

  const likeList = data.data;

  return likeList;
};

function* getLikeListSaga() {
  try {
    const likeList = yield call(getLikeList);

    yield put({ type: SUCCESS_LIKE_LIST, payload: likeList });
  } catch (err) {
    yield put({ type: ERROR_LIKE_LIST, payload: err.message });
  }
}

function* watchGetLikeList() {
  yield takeLatest(REQUEST_LIKE_LIST, getLikeListSaga);
}

export default function* userSaga() {
  yield all([fork(watchGetLikeList)]);
}
