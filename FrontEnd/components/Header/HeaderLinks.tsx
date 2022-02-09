/*eslint-disable*/
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

import styles from 'public/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="/" className={classes.navLink}>
          Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://chojs28-dev.notion.site/chojs28-dev/JS-DevLog-fadf338bf8b0448e86eba897d69b0b8a"
          target="_blank"
          className={classes.navLink}
        >
          Blog
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="mailto:chojs28@gmail.com"
          target="_blank"
          className={classes.navLink}
        >
          Mail
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://github.com/JoonSukCho"
          target="_blank"
          className={classes.navLink}
        >
          Github
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <IconButton color="inherit" style={{ padding: '0.8rem' }}>
          <Apps />
        </IconButton>
      </ListItem> */}
    </List>
  );
}
