const shuffleArr = (arr: any[]): any[] => {
  return arr.sort(() => Math.random() - 0.5);
};

export const generateShuffledArr = (length: number): any[] => {
  const arr = [];

  for (let i = 0; i < length; i += 1) {
    arr.push(i);
  }

  return shuffleArr(arr);
};
