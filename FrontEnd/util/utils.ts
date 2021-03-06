// 배열을 섞는다.
export const shuffleArr = (arr: any[]): any[] => {
  return arr.sort(() => Math.random() - 0.5);
};

// 랜덤 배열을 만든다.
export const generateShuffledArr = (length: number): any[] => {
  const arr = [];

  for (let i = 0; i < length; i += 1) {
    arr.push(i);
  }

  return shuffleArr(arr);
};

// url validate
export const IsValidatedURL = (url: string) => {
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  return urlRegex.test(url);
};

// id validate
export const IsValidatedID = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{2,20}$/; // 대소문자, 숫자 검사

  return regex.test(id);
};

export const IsValidatedPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/; // 소문자, 숫자, 특수문자 검사

  return regex.test(password);
};

// 문자열 모든 공백 제거
export const removeAllBlank = (str: string): string => {
  return str.replace(/(\s*)/g, '');
};
