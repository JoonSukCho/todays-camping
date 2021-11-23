import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Footer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-end;
`;

const ModalFooter = ({ onClose }) => {
  return (
    <Footer>
      <Button autoFocus onClick={onClose} color="primary">
        닫기
      </Button>
    </Footer>
  );
};

export default ModalFooter;
