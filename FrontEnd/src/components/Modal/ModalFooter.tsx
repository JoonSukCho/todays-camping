import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Footer = styled.div`
  width: 100%;
  /* height: 34px; */
  display: flex;
  justify-content: flex-end;
`;

const ModalFooter = ({ children }) => {
  return <Footer>{children}</Footer>;
};

export default ModalFooter;
