import { atom } from 'recoil';

const keywordState = atom({
  key: 'keyword',
  default: '',
});

export { keywordState };
