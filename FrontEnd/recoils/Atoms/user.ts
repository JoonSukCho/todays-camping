import { atom } from 'recoil';
import { _iUserInfo } from 'models/api/users/userInfo';

interface UserState {
  loading: boolean;
  data: _iUserInfo | null;
  error: Error | null;
}

const userState = atom<UserState>({
  key: 'userState',
  default: {
    loading: false,
    data: null,
    error: null,
  },
});

export { userState };
