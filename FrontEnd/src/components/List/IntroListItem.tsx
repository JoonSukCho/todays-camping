import React, { ReactElement } from 'react';
import styled from 'styled-components';

// @material-ui/core
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

const DenseListItem = styled(ListItem)`
  padding-left: 0px;
  padding-bottom: 0px;
`;

const IntroListItem = (props) => {
  const { Icon, title, children } = props;
  return (
    <DenseListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: '#3182f6' }} variant="square">
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={children} />
    </DenseListItem>
  );
};

export default IntroListItem;
