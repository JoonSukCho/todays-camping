import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import store from './store';
import App from './App';

const qureyClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false, // 자동으로 쿼리의 요청 함수가 호출되도록 한다. (useEffect 처럼)
      // refetchOnMount: false, // 컴포넌트가 mount 될 때마다 요청 x
      // refetchOnWindowFocus: false, // 화면이 focus 될 때마다 요청 x
      onSuccess: (data) => {},
      onError: (err) => {},
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={qureyClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
);
