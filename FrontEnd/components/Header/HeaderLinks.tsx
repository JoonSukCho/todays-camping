/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Button, Modal, Typography } from '@material-ui/core';

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
import useLogout from 'Hooks/api/useLogout';
import useUserInfo from 'Hooks/api/useUserInfo';

const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();

  const {
    data: userInfo,
    loading: isUserInfoLoading,
    refetch: refetchUserInfo,
  } = useUserInfo({ enabled: true });
  const { mutate: logoutMutate, isSuccess: logoutSuccess } = useLogout();

  const [loginModalOpenFlag, loginModalOpen, loginModalClose] = useModal();
  const [signUpModalOpenFlag, signUpModalOpen, signUpModalClose] = useModal();

  const moveSignUpModal = () => {
    signUpModalOpen();
    loginModalClose();
  };

  const requestLogout = () => {
    logoutMutate();
  };

  useEffect(() => {
    if (logoutSuccess) {
      Router.push('/');
      refetchUserInfo();
    }
  }, [logoutSuccess]);

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button href="/" className={classes.navLink}>
            Home
          </Button>
        </ListItem>
        {!isUserInfoLoading && userInfo ? (
          <>
            <ListItem className={classes.listItem}>
              <Button className={classes.navLink} onClick={requestLogout}>
                로그아웃
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem className={classes.listItem}>
              <Button className={classes.navLink} onClick={loginModalOpen}>
                로그인
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button className={classes.navLink} onClick={signUpModalOpen}>
                회원가입
              </Button>
            </ListItem>
          </>
        )}
      </List>

      {/* 로그인 모달 */}
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={loginModalOpenFlag}
        onClose={loginModalClose}
      >
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6">로그인</Typography>
          </ModalHeader>
          <ModalContent>
            <LoginForm moveSignUpModal={moveSignUpModal} />
          </ModalContent>
        </ModalContainer>
      </Modal>

      {/* 회원가입 모달 */}
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={signUpModalOpenFlag}
        onClose={signUpModalClose}
      >
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6">회원가입</Typography>
          </ModalHeader>
          <ModalContent>
            <SignUpForm />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default HeaderLinks;
