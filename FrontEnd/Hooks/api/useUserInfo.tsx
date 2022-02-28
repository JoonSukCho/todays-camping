import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'recoils/Atoms/user';
import axios from 'axios';

export default function useUserInfo(
  { enabled }: { enabled: boolean } = { enabled: false },
) {
  let userInfoURL = `https://todays-camping.herokuapp.com/users/userInfo`;

  if (process.env.NODE_ENV === 'development') {
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

    userInfoURL = `${ipAddress}:${serverPort}/users/userInfo`;
  }

  const [{ loading, data, error }, set] = useRecoilState(userState);

  const fetchData = useCallback(async () => {
    set({ loading: true, data: null, error: null });
    try {
      const { data } = await axios.get(userInfoURL);
      const userInfo = data.data;

      set({ loading: false, data: userInfo, error: null });
    } catch (e) {
      set({ loading: false, data: null, error: e });
    }
  }, [set]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    fetchData();
  }, [enabled, fetchData]);

  return {
    loading,
    data,
    error,
    refetch: fetchData,
  };
}
