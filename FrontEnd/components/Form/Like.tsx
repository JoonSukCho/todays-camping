import axios, { AxiosError } from 'axios';
import { Button, TextField } from '@material-ui/core';
import { useQueryClient, useMutation } from 'react-query';
import { useEffect } from 'react';
import CirCularLoader from 'components/Loader/CirCularLoader';

const Like = () => {
  const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
  const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT;

  return <div></div>;
};

export default Like;
