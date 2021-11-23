import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Card } from '@material-ui/core';

type DivProps = React.HTMLProps<HTMLDivElement>;

const Container = styled(Card)`
  width: 100%;
  z-index: 12;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;

  @media (min-width: 0px) {
    max-width: 350px;
    height: 434px;
  }

  @media (min-width: 576px) {
    max-width: 500px;
    height: 434px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
    height: 634px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
    height: 634px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
    height: 634px;
  }
`;

const ModalContainer = forwardRef<HTMLDivElement, DivProps>(({ children }, ref) => {
  return (
    <Container ref={ref} tabIndex={-1}>
      {children}
    </Container>
  );
});

export default ModalContainer;
