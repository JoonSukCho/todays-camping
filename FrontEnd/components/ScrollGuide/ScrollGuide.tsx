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
      <ScrollGuideText>키워드가 생각나지 않는다면?</ScrollGuideText>
    </Container>
  );
};

export default ScrollGuide;
