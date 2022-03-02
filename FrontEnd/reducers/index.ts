import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import user, { User } from 'reducers/user';
import likeList, { LikeList } from 'reducers/likeList';

export interface RootState {
  user: User;
  likeList: LikeList;
}

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const reducers = combineReducers({ user, likeList });

      return reducers(state, action);
    }
  }
};

export default rootReducer;
