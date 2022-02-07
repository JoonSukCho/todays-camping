import React from 'react';
// nodejs library to set properties for components

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface GridContainerProps {
  children: JSX.Element;
  className: string;
}

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

const useStyles = makeStyles(styles);

const GridContainer = (props) => {
  const classes = useStyles();
  const { children, className, ...rest }: GridContainerProps = props;
  return (
    <Grid container className={classes.grid + ' ' + className} {...rest}>
      {children}
    </Grid>
  );
};
export default GridContainer;
