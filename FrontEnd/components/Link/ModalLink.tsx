import React from 'react';
import LinkText from './LinkText';

const ModalLink = ({ children, onClick }) => {
  return <LinkText onClick={onClick}>{children}</LinkText>;
};

export default ModalLink;
