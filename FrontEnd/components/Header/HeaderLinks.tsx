/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Button, Modal } from '@material-ui/core';

import styles from 'public/jss/material-kit-react/components/headerLinksStyle.js';

// components
import ModalContainer from 'components/Modal/ModalContainer';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import SignUpForm from 'components/Form/SignUpForm';
import LoginForm from 'components/Form/LoginForm';

// Hooks
import useModal from 'Hooks/useModal';

const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();

  const [authModalOpenFlag, authModalOpen, authModalClose] = useModal();

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button href="/" className={classes.navLink}>
            Home
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button className={classes.navLink} onClick={authModalOpen}>
            로그인
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button className={classes.navLink} onClick={authModalOpen}>
            회원가입
          </Button>
        </ListItem>
      </List>

      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={authModalOpenFlag}
        onClose={authModalClose}
      >
        <ModalContainer>
          <ModalHeader>로그인</ModalHeader>
          <ModalContent>
            <SignUpForm />
            <LoginForm />
          </ModalContent>
          <ModalFooter>
            <Button>회원가입</Button>
            <Button onClick={authModalClose}>닫기</Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default HeaderLinks;
