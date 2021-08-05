// https://codesandbox.io/s/br8br?file=/src/features/todoList/todoSlice.ts

// open api
// https://kevink1113.tistory.com/entry/React-JS-%EA%B3%B5%EA%B3%B5%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%8F%AC%ED%84%B8-%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80-API-%ED%95%9C%EA%B5%AD%ED%99%98%EA%B2%BD%EA%B3%B5%EB%8B%A8-%EB%8C%80%EA%B8%B0%EC%98%A4%EC%97%BC%EC%A0%95%EB%B3%B4%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { requestAPI } from './modules/requestAPI';

const App = () => {
  const API_KEY = '8h6BbqRjS0gC4ZAL1Bw6yOwha9E6ODarC3CoZ3n9dOvfX0zdQEBEQXW3E23SiibPIzuPYckNU3ffeguQf9awtQ%3D%3D';
  const requestURL = `/15003416/v1/uddi:a635e6c7-82cf-4714-b002-c7cf4cb20121_201609071527?page=1&perPage=10&ServiceKey=${API_KEY}`;

  const { data, isLoading, error } = useQuery('test', () => requestAPI(requestURL, 'get', {}));

  return <div>Hello</div>;
};

export default App;
