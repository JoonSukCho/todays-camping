import classNames from 'classnames';
import { Button, IconButton, List, ListItem, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  GitHub as GitHubIcon,
  Mail as MailIcon,
  Book as BookIcon,
} from '@material-ui/icons';

import styles from 'public/jss/material-kit-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

const Footer = (props) => {
  const classes = useStyles();
  const footerClasses = classNames({
    [classes.footer]: true,
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Tooltip title="Blog">
                <IconButton
                  href="https://chojs28-dev.notion.site/chojs28-dev/JS-DevLog-fadf338bf8b0448e86eba897d69b0b8a"
                  className={classes.linkButton}
                  target="_blank"
                >
                  <BookIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip title="Mail">
                <IconButton
                  href="mailto:chojs28@gmail.com"
                  className={classes.linkButton}
                  target="_blank"
                >
                  <MailIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip title="Github">
                <IconButton
                  href="https://github.com/JoonSukCho"
                  className={classes.linkButton}
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          MADE BY &nbsp;&nbsp;&nbsp;
          <strong>CHOJS28</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
