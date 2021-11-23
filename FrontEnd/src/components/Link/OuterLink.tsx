import React from 'react';
import LinkText from './LinkText';

interface _iLinkParams {
  href: string;
  children: string;
}

const OuterLink = ({ href, children }: _iLinkParams) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <LinkText>{children}</LinkText>
    </a>
  );
};

export default OuterLink;
