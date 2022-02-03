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

const IconAvatar = styled(Avatar)`
  color: ${({ theme }) => theme.palette.primary.main} !important;
  background-color: #ffffff !important;
`;

const useStyles = makeStyles(() => ({
  denseListItem: {
    paddingLeft: 0,
    paddingBottom: 0,
  },
  listItemText: {
    fontWeight: 500,
  },
}));

const IntroListItem = (props) => {
  const { Icon, title, children } = props;
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.denseListItem}>
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
    </ListItem>
  );
};

export default IntroListItem;
