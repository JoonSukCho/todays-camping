// goCamping API 요청 공통 파라미터
export const GO_CAMPING_COMMON_PARAMS = {
  ServiceKey: process.env.SERVICE_KEY,
  MobileOS: 'ETC',
  MobileApp: 'AppTest',
  _type: 'json',
} as const;

// Infinite Scroll 요청 할 item 갯수
export const INFINITE_NUM_OF_ROWS = 10;
