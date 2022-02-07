import React from 'react';

// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface GridItemProps {
  children: JSX.Element;
  className: string;
}

const styles = () =>
  createStyles({
    grid: {
      position: 'relative',
      width: '100%',
      minHeight: '1px',
      paddingRight: '15px',
      paddingLeft: '15px',
      flexBasis: 'auto',
    },
  });

const useStyles = makeStyles(styles);

const GridItem = (props) => {
  const classes = useStyles();
  const { children, className, ...rest }: GridItemProps = props;
  return (
    <Grid item className={classes.grid + ' ' + className} {...rest}>
      {children}
    </Grid>
  );
};

export default GridItem;
