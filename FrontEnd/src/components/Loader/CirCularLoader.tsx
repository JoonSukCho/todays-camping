import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const CenterProgress = styled(CircularProgress)`
  position: relative;
  margin-top: 150px;
  margin-bottom: 70px;
  left: calc(50% - 20px);
`;

const CirCularLoader = () => {
  return <CenterProgress />;
};

export default CirCularLoader;
