import React, { forwardRef } from 'react';
import styled from 'styled-components';

type DivProps = React.HTMLProps<HTMLDivElement>;

const ContentContainer = styled.div`
  width: 100%;
  height: 95%;
  z-index: 12;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 16px 0;
  background-color: #ffffff;
  border-radius: 8px;

  @media (min-width: 0px) {
    max-width: 350px;
  }

  @media (min-width: 576px) {
    max-width: 500px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  } ;
`;

// @material-ui Issue
// Modal 내부에 function component를 처리하려면 forwardRef가 필요
const ModalContent = forwardRef<HTMLDivElement, DivProps>(({ children }, ref) => {
  return (
    <ContentContainer ref={ref} tabIndex={-1}>
      {children}
    </ContentContainer>
  );
});

export default ModalContent;
