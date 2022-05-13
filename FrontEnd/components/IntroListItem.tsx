import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

interface IntroListItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  denseListItem: {
    paddingLeft: 0,
    paddingBottom: 0,
  },
  listItemText: {
    fontWeight: 500,
  },
}));

const IntroListItem = ({ icon, title, children }: IntroListItemProps) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" className={classes.denseListItem}>
      <ListItemAvatar>
        <IconAvatar variant="square">{icon}</IconAvatar>
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={title}
        secondary={children}
        secondaryTypographyProps={{
          style: { whiteSpace: 'normal', wordWrap: 'break-word' },
        }}
      />
    </ListItem>
  );
};

const IconAvatar = styled(Avatar)`
  color: ${({ theme }) => theme.palette.primary.main} !important;
  background-color: #ffffff !important;
`;

export default IntroListItem;
