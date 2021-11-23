import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  height: 36px;
`;

const ModalHeader = ({ children }) => {
  return <Header>{children}</Header>;
};

export default ModalHeader;
