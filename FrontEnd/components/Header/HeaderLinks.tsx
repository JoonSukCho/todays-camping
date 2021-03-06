/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'reducers';
import { REQUEST_USER_INFO } from 'reducers/user';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import styles from 'public/jss/material-kit-react/components/headerLinksStyle.js';

// components
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import SignUpForm from 'components/Form/SignUpForm';
import LoginForm from 'components/Form/LoginForm';

// Hooks
import useModal from 'Hooks/useModal';
import useLogout from 'Hooks/api/useLogout';

const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userInfo, userInfoLoading } = useSelector(
    (state: RootState) => state.user,
  );

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

  const moveLikeListPage = () => {
    if (!userInfo) {
      alert('로그인 후 이용할 수 있습니다.');
      return false;
    }
    Router.push('/like-list');
  };

  // logout callback
  useEffect(() => {
    if (logoutSuccess) {
      dispatch({
        type: REQUEST_USER_INFO,
      });

      Router.push('/');
    }
  }, [logoutSuccess]);

  return (
    <>
      {userInfo ? (
        <>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Button href="/" className={classes.navLink}>
                Home
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button onClick={moveLikeListPage} className={classes.navLink}>
                좋아요 리스트
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                className={classes.navLink}
                style={{ textTransform: 'none', cursor: 'default' }}
              >
                {userInfo.user_id}님
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button className={classes.navLink} onClick={requestLogout}>
                로그아웃
              </Button>
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Button href="/" className={classes.navLink}>
                Home
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button onClick={moveLikeListPage} className={classes.navLink}>
                좋아요 리스트
              </Button>
            </ListItem>
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
          </List>
        </>
      )}

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
            <LoginForm
              moveSignUpModal={moveSignUpModal}
              closeLoginModal={loginModalClose}
            />
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
            <SignUpForm closeSignUpModal={signUpModalClose} />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

const ModalContainer = styled(Card)`
  width: 100%;
  z-index: 12;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0 16px;
  max-width: 360px;
`;

export default HeaderLinks;
