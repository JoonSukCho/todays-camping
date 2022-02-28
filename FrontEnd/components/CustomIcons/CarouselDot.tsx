import React from 'react';
import styled, { css } from 'styled-components';

interface _iDotStyleProps {
  active: boolean;
}

const Dot = styled.span<_iDotStyleProps>`
  display: inline-block;
  border-radius: 50%;
  margin-right: 8px;
  margin-left: 8px;

  width: ${(props) => (props.active ? '10px' : '8px')};
  height: ${(props) => (props.active ? '10px' : '8px')};
  margin-bottom: 0px;
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
