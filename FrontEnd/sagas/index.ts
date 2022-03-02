import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import userSaga from 'sagas/user';
import likeListSaga from 'sagas/likeList';

axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default function* rootSaga() {
  yield all([fork(userSaga), fork(likeListSaga)]);
}
