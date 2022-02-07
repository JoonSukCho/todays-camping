import React from 'react';
import styled from 'styled-components';

// @material-ui/core
import { List } from '@material-ui/core';

const GridList = styled(List)`
  @media (min-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const IntroList = ({ children }) => {
  return <GridList>{children}</GridList>;
};

export default IntroList;