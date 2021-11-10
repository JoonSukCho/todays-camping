import React from 'react';

// @material-ui/core
import { List } from '@material-ui/core';

const IntroList = ({ children }) => {
  return <List style={{ width: '100%', maxWidth: 480 }}>{children}</List>;
};

export default IntroList;
