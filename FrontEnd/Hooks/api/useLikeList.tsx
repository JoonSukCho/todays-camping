import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

// type & interface
import { _iLikeListParams } from 'models/api/users/likeList';

// 좋아요 목록 조회는 redux-saga로 구현

// 좋아요 목록 추가
const usePushLike = () => {
  let pushLikeListURL = `https://todays-camping.herokuapp.com/users/likeList/push`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    pushLikeListURL = `${ipAddress}:${serverPort}/users/likeList/push`;
  }

  return useMutation<Response, AxiosError, _iLikeListParams>(
    (params) => {
      return axios.post(pushLikeListURL, params);
    },
    {
      onError: (err) => {
        console.log('push like Error', err.response.data);
      },
    },
  );
};

// 좋아요 목록 제거
const usePopLike = () => {
  let popLikeListURL = `https://todays-camping.herokuapp.com/users/likeList/pop`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    popLikeListURL = `${ipAddress}:${serverPort}/users/likeList/pop`;
  }

  return useMutation<Response, AxiosError, _iLikeListParams>(
    (params) => {
      return axios.post(popLikeListURL, params);
    },
    {
      onError: (err) => {
        console.log('pop like Error', err.response.data);
      },
    },
  );
};

export { usePushLike, usePopLike };
