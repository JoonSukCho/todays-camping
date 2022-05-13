import React from 'react';
import styled from 'styled-components';

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
