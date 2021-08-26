// https://codesandbox.io/s/br8br?file=/src/features/todoList/todoSlice.ts

// open api
// https://kevink1113.tistory.com/entry/React-JS-%EA%B3%B5%EA%B3%B5%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%8F%AC%ED%84%B8-%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80-API-%ED%95%9C%EA%B5%AD%ED%99%98%EA%B2%BD%EA%B3%B5%EB%8B%A8-%EB%8C%80%EA%B8%B0%EC%98%A4%EC%97%BC%EC%A0%95%EB%B3%B4%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { requestAPI } from './modules/requestAPI';

const callAPI = async () => {
  axios.get('http://localhost:3001/api').then((res) => console.log(res));
};

const App = () => {
  useEffect(() => {
    callAPI();
  }, []);

  return <div>Hello</div>;
};

export default App;
