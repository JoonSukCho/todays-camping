import React from 'react';
import styled from 'styled-components';
import { darken } from '@material-ui/core';

const LinkText = ({ children, ...rest }) => {
  return <CustomLinkText {...rest}>{children}</CustomLinkText>;
};

const CustomLinkText = styled.span`
  cursor: pointer;
  text-decoration: none;
  color: #3182f6;

  &:hover {
    color: ${darken('#3182f6', 0.4)};
    transition: color ease-in 0.1s;
  }
`;

export default LinkText;
