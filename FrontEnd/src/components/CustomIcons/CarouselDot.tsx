import React from 'react';
import styled from 'styled-components';

const Dot = styled.span`
  display: inline-block;
  border-radius: 50%;
  margin-right: 16px;
  width: ${(props) => (props.active ? '12px' : '8px')};
  height: ${(props) => (props.active ? '12px' : '8px')};
  margin-bottom: ${(props) => (props.active ? 0 : '2px')};
  background-color: ${(props) => (props.active ? '#3182f6' : '#ffffff')};
  box-shadow: 0px 8px 11px -1px ${(props) => (props.active ? '#3182f6' : '#eeeeee')};
`;

const CarouselDot = ({ active }) => {
  return (
    <>
      <Dot active={active} />
    </>
  );
};

export default CarouselDot;
