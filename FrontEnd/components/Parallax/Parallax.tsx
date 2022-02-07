import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface ParallaxStyleProps {
  filter?: string;
  image?: string;
  small?: boolean;
  transform?: number;
}

interface ParallaxProps extends ParallaxStyleProps {
  children?: React.ReactNode;
}

const Parallax = ({ filter, children, image, small }: ParallaxProps) => {
  const [transform, setTransform] = useState<number>(0);

  useEffect(() => {
    let windowScrollTop;
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3;
    } else {
      windowScrollTop = 0;
    }

    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  }, []);

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform(windowScrollTop);
  };

  return (
    <Container filter={filter} image={image} small={small} transform={transform}>
      {children}
    </Container>
  );
};

export default Parallax;

const Container = styled.div<ParallaxStyleProps>`
  height: 100vh;
  max-height: 1000px;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${({ image }) => image});
  background-position: center center;
  background-size: 100%;
  background-color: #000000;
  background-repeat: no-repeat;
  transform: translate3d(0, ${({ transform }) => transform}px, 0);
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;

  ${({ filter }) =>
    filter &&
    css`
  &:before {
    background: rgba(0, 0, 0, 0.5);
  }
  &:after ,&:before {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      left: 0;
      top: 0;
      content: '';
    },
  `}

  ${({ small }) =>
    small &&
    css`
      height: 380px;
    `}
`;
