import React from 'react';
import styled from 'styled-components';
import ScrollGuideIcon from 'components/CustomIcons/ScrollGuideIcon';

const Container = styled.div`
  width: 100%;
  position: absolute;
  color: #fff;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
`;

const ScrollGuideText = styled.p`
  color: #ffffff;
  padding-top: 66px;
`;

const ScrollGuide = () => {
  return (
    <Container>
      <ScrollGuideIcon />
      <ScrollGuideText>스크롤을 내려보세요</ScrollGuideText>
    </Container>
  );
};

export default ScrollGuide;
