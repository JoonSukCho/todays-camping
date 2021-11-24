import React from 'react';
import { Backdrop, BackdropProps } from '@material-ui/core';

const BackDropIOSWorkaround = ({ ...rest }: BackdropProps) => {
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return <Backdrop {...rest} onTouchMove={onTouchMove} />;
};

export default BackDropIOSWorkaround;
