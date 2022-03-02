import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* height: 34px; */
`;

const ModalHeader = ({ children, ...rest }) => {
  return <Header {...rest}>{children}</Header>;
};

export default ModalHeader;
