import React from 'react';

// @material-ui/core
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

// @material-ui/icons
import HomeIcon from '@material-ui/icons/Home';

// @material-ui/colors
import { blue } from '@material-ui/core/colors';

const IntroList = ({ children }) => {
  return <List style={{ width: '100%', maxWidth: 480 }}>{children}</List>;
};

export default IntroList;
