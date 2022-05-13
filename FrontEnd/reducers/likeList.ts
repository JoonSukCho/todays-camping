import produce from 'produce';
import { _iLikeItem } from 'models/api/users/likeList';

export interface LikeList {
  likeListLoading: boolean;
  likeListDone: boolean;
  likeListError: Error;
  likeList: _iLikeItem[];
}

export const initialState: LikeList = {
  likeListLoading: false,
  likeListDone: false,
  likeListError: null,
  likeList: null,
};

export const REQUEST_LIKE_LIST = 'REQUEST_LIKE_LIST';
export const SUCCESS_LIKE_LIST = 'SUCCESS_LIKE_LIST';
export const ERROR_LIKE_LIST = 'ERROR_LIKE_LIST';

const user = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_LIKE_LIST:
        draft.likeListLoading = true;
        draft.likeListDone = false;
        draft.likeListError = null;
        break;
      case SUCCESS_LIKE_LIST:
        draft.likeListLoading = false;
        draft.likeListDone = true;
        draft.likeListError = null;
        draft.likeList = action.payload;
        break;
      case ERROR_LIKE_LIST:
        draft.likeListLoading = false;
        draft.likeListDone = false;
        draft.likeListError = action.payload;
        draft.likeList = null;
        break;
      default:
        break;
    }
  });
};

export default user;
