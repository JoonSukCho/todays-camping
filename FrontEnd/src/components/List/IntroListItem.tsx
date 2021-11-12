import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

// @material-ui/core
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const DenseListItem = styled(ListItem)`
  padding-left: 0px;
  padding-bottom: 0px;
`;

const useStyles = makeStyles(() => ({
  listItemText: {
    fontWeight: 500,
  },
}));

const IntroListItem = (props) => {
  const { Icon, title, children } = props;
  const classes = useStyles();

  return (
    <DenseListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: '#3182f6' }} variant="square">
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={title}
        secondary={children}
        style={{ fontWeight: 500 }}
      />
    </DenseListItem>
  );
};

export default IntroListItem;
