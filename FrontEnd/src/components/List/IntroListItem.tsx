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

const IconAvatar = styled(Avatar)`
  color: #3182f6;
  background-color: #ffffff;
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
        <IconAvatar variant="square">
          <Icon style={{ fontSize: 28 }} />
        </IconAvatar>
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={title}
        secondary={children}
        secondaryTypographyProps={{ style: { whiteSpace: 'normal', wordWrap: 'break-word' } }}
      />
    </DenseListItem>
  );
};

export default IntroListItem;
