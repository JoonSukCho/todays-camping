import { enableES5, produce } from 'immer';

const produceName = (...args) => {
  enableES5();

  return produce(...args);
};

export default produceName;
