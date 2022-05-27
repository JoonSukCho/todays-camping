import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface ParallaxStyleProps {
  filtered?: boolean;
  image?: string;
  height?: number;
  bgColor?: string;
}

interface ParallaxProps extends ParallaxStyleProps {
  children?: React.ReactNode;
}

const Parallax = ({
  filtered,
  children,
  image,
  height,
  bgColor,
}: ParallaxProps) => {
  const ContainerRef = useRef(null);

  useEffect(() => {
    const resetTransform = () => {
      const windowScrollTop = window.pageYOffset / 3;

      const $container = ContainerRef.current;
      if ($container) {
        $container.style.transform = `translateY(${windowScrollTop}px)`;
      }
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }

    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  }, [ContainerRef]);

  return (
    <Container
      ref={ContainerRef}
      filtered={filtered}
      image={image}
      height={height}
      bgColor={bgColor}
      // transform={transform}
    >
      {children}
    </Container>
  );
};

export default Parallax;

const Container = styled.div.attrs(
  ({ bgColor, filtered, height, image }: ParallaxStyleProps) => ({
    bgColor: bgColor || '#000000',
    image: image
      ? `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${image})`
      : 'none',
    height: height ? `${height}px` : '100vh',
    filtered,
  }),
)`
  background-color: ${({ bgColor }) => bgColor};
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: ${({ image }) => image};
  height: ${({ height }) => height};
  max-height: 1000px;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;

  ${({ filtered }) =>
    filtered &&
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
`;
