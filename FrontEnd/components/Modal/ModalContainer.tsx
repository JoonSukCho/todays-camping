import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';

type DivProps = React.HTMLProps<HTMLDivElement>;

const Container = styled(Card)`
  width: 100%;
  z-index: 12;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0 16px;

  @media (min-width: 0px) {
    max-height: 482px;
  }

  @media (min-width: 576px) {
    max-height: 482px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
    max-height: 682px;
  }
`;

const ModalContainer = forwardRef<HTMLDivElement, DivProps>(
  ({ children }, ref) => {
    return (
      <Container ref={ref} tabIndex={-1}>
        {children}
      </Container>
    );
  },
);

export default ModalContainer;
