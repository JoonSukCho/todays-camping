import React from 'react';
import LinkText from './LinkText';

interface _iLinkParams {
  tel: string;
  children: string;
}

const TelLink = ({ tel, children }: _iLinkParams) => {
  return (
    <a href={`tel:${tel}`}>
      <LinkText>{children}</LinkText>
    </a>
  );
};

export default TelLink;
