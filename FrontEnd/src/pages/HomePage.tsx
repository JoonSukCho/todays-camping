import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const HomePage = () => {
  const { isLoading, error, data, refetch } = useQuery(
    'apiData',
    () =>
      axios
        .get('http://localhost:3001/goCamping/searchList', {
          params: {
            pageNo: 1,
            numOfRows: 2,
            keyword: '강원도',
          },
        })
        .then((res) => res.data.response.body.items),
    {
      onError: () => {
        console.log('error');
      },
    },
  );

  const getAPIData = () => {
    axios
      .get('http://localhost:3001/goCamping/basedList', {
        params: {
          pageNo: 1,
          numOfRows: 2,
        },
      })
      .then((res) => {
        console.log(res);
        // console.log(res.data.response.body.items);
      });
  };

  return (
    <div>
      <button type="button" onClick={getAPIData}>
        getData
      </button>
    </div>
  );
};

export default HomePage;
