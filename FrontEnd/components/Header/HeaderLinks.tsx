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
          홈
        </Button>
      </ListItem>

      {/* <ListItem className={classes.listItem}>
        <Button href="/test-page" color="transparent" className={classes.navLink}>
          테스트
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/login-page" color="transparent" className={classes.navLink}>
          로그인
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href={`https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URI}`}
          color="transparent"
          className={classes.navLink}
        >
          로그아웃
        </Button>
      </ListItem> */}

      {/* 아이콘 버튼 예제 */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}
