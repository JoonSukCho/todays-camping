import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface ParallaxStyleProps {
  filtered?: boolean;
  image?: string;
  height?: number;
  bgColor?: string;
  transform?: number;
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
  const [transform, setTransform] = useState<number>(0);

  useEffect(() => {
    const resetTransform = () => {
      const windowScrollTop = window.pageYOffset / 3;
      setTransform(windowScrollTop);
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }

    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  }, []);

  return (
    <Container
      filtered={filtered}
      image={image}
      height={height}
      bgColor={bgColor}
      transform={transform}
    >
      {children}
    </Container>
  );
};

export default Parallax;

const Container = styled.div.attrs(
  ({ bgColor, filtered, height, image, transform }: ParallaxStyleProps) => ({
    bgColor: bgColor || '#000000',
    image: image
      ? `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${image})`
      : 'none',
    height: height ? `${height}px` : '100vh',
    transform,
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
  transform: translate3d(0, ${({ transform }) => transform}px, 0);
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
