import React from 'react';
// nodejs library to set properties for components

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
}

const useStyles = makeStyles({
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
});

const GridContainer = ({
  children,
  className,
  ...rest
}: GridContainerProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid + ' ' + className} {...rest}>
      {children}
    </Grid>
  );
};
export default GridContainer;
