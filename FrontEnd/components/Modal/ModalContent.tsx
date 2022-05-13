import React, { forwardRef } from 'react';
import styled from 'styled-components';

type DivProps = React.HTMLProps<HTMLDivElement>;

const ContentContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

// @material-ui Issue
// Modal 내부에 function component를 처리하려면 forwardRef가 필요
const ModalContent = forwardRef<HTMLDivElement, DivProps>(
  ({ children }, ref) => {
    return (
      <ContentContainer ref={ref} tabIndex={-1}>
        {children}
      </ContentContainer>
    );
  },
);

export default ModalContent;
