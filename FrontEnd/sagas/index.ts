import { all, fork } from 'redux-saga/effects';
import userSaga from 'sagas/user';
import likeListSaga from 'sagas/likeList';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(likeListSaga)]);
}
