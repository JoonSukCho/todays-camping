import React, { useState } from 'react';
import clsx from 'classnames';

// @material-ui
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

interface ButtonProps {
  expanded: boolean;
  handler: () => void;
}

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ExpandMoreButton = ({ expanded, handler }: ButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <IconButton
      onClick={handler}
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};

export default ExpandMoreButton;
