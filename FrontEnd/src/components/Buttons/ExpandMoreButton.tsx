import React, { useState } from 'react';
import styled from 'styled-components';

// @material-ui
import { IconButton } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

interface ButtonProps {
  expanded: boolean;
  handler: Function;
}

const Button = styled(IconButton)`
  transform: ${(props) => (props.expanded === 'true' ? 'rotate(180deg)' : 'rotate(0deg)')};
  margin-left: auto;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ExpandMoreButton = ({ expanded, handler }: ButtonProps): JSX.Element => {
  return (
    <Button
      onClick={handler}
      expanded={expanded.toString()}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </Button>
  );
};

export default ExpandMoreButton;
