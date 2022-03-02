import produce from 'produce';
import { _iUserInfo } from 'models/api/users/userInfo';

export interface User {
  userInfoLoading: boolean;
  userInfoDone: boolean;
  userInfoError: Error;
  userInfo: _iUserInfo;
}

export const initialState: User = {
  userInfoLoading: false,
  userInfoDone: false,
  userInfoError: null,
  userInfo: null,
};

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const SUCCESS_USER_INFO = 'SUCCESS_USER_INFO';
export const ERROR_USER_INFO = 'ERROR_USER_INFO';

const user = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_USER_INFO:
        draft.userInfoLoading = true;
        draft.userInfoDone = false;
        draft.userInfoError = null;
        break;
      case SUCCESS_USER_INFO:
        draft.userInfoLoading = false;
        draft.userInfoDone = true;
        draft.userInfoError = null;
        draft.userInfo = action.payload;
        break;
      case ERROR_USER_INFO:
        draft.userInfoLoading = false;
        draft.userInfoDone = false;
        draft.userInfoError = action.payload;
        draft.userInfo = null;
        break;
      default:
        break;
    }
  });
};

export default user;
