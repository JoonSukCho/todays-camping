import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// lib
import Carousel from 'react-slick';
import styled from 'styled-components';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';

// @material/core
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Modal, Tabs, Tab } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import MapTabPage from 'views/MapTabPage/MapTabPage';
import IntroTabPage from 'views/IntroTabPage/IntroTabPage';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';
import TestImage1 from 'assets/img/sign.jpg';
import TestImage2 from 'assets/img/main-background.jpg';
import TestImage3 from 'assets/img/landing-bg.jpg';
import ModalContent from 'components/Modal/ModalContent';

const useMainStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    '&:hover': {
      cursor: 'pointer',
      // transform: 'scale(1.1)',
      // transition: 'all 0.3s ease-in-out',
    },
  },
  expand: {
    marginLeft: 'auto',
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const TabPannelContainer = styled.div`
  padding: 20px 0;
`;

const TabPannel = (props) => {
  const { children, id, value, index, ...other } = props;

  return (
    <TabPannelContainer role="tabpanel" hidden={value !== index} id={id} {...other}>
      {value === index && <div>{children}</div>}
    </TabPannelContainer>
  );
};

const PhotoCard = (props) => {
  const { basedItem } = props;
  const mainClasses = useMainStyles();
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // local state
  const [tabIdx, setTabIdx] = useState(0);

  const changeTab = useCallback((e, newIdx) => {
    setTabIdx(newIdx);
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={basedItem.facltNm || 'Title'}
          subheader={`${basedItem.addr1 || ''} ${basedItem.addr2 || ''}`}
        />

        <CardMedia
          className={classes.media}
          image={basedItem.firstImageUrl ? basedItem.firstImageUrl : ReadyImage}
          onClick={openModal}
        />
        <CardContent>
          <p
            style={{
              fontSize: '1rem',
              color: '#626262',
            }}
          >
            {basedItem.lineIntro || ''}
          </p>
        </CardContent>
      </Card>

      <Modal className={classes.modal} open={modalOpen} onClose={closeModal}>
        <ModalContent>
          <Tabs
            style={{ color: '#333' }}
            value={tabIdx}
            onChange={changeTab}
            indicatorColor="primary"
          >
            <Tab label="캠핑장 소개" id="introduce-tab" />
            <Tab label="캠핑장 위치" id="map-tab" />
          </Tabs>
          <TabPannel id="introduce-tab" value={tabIdx} index={0}>
            <IntroTabPage basedItem={basedItem} />
          </TabPannel>
          <TabPannel id="map-tab" value={tabIdx} index={1}>
            <MapTabPage basedItem={basedItem} />
          </TabPannel>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoCard;
