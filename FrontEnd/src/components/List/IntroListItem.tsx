import React, { ReactElement } from 'react';

// @material-ui/core
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

const IntroListItem = (props) => {
  const { icon, title, children } = props;
  return (
    <ListItem alignItems="flex-start" style={{ paddingLeft: 0 }}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: icon.color }} variant="square">
          <icon.icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={children} />
    </ListItem>
  );
};

export default IntroListItem;
