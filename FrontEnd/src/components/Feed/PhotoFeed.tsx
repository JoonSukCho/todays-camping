import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// lib
import Carousel from 'react-slick';
import styled from 'styled-components';

// @material/core
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Modal,
  Tabs,
  Tab,
  IconButton,
  CardActions,
  Button,
  Collapse,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// modules
import {
  getCampSiteFeatures,
  getDetailAddress,
  getHomePageURL,
  getOperPd,
  getPhoneNumber,
  getSiteForms,
} from 'modules/getIntroInfo';

// @material-ui
import {
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
  FilterHdr as FilterHdrIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

// components
import ModalContent from 'components/Modal/ModalContent';
import ExpandMoreButton from 'components/Buttons/ExpandMoreButton';
import MapTabView from 'views/MapTabView/MapTabView';
import IntroTabView from 'views/IntroTabView/IntroTabView';
import IntroList from 'components/List/IntroList';
import IntroListItem from 'components/List/IntroListItem';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';
import TestImage1 from 'assets/img/sign.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
    padding: 8,
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

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeModalIcon: {
    float: 'right',
  },
}));

const TabPannelContainer = styled.div`
  padding: 20px 0;
`;

const HomePageLink = styled.a`
  text-decoration: none;
  color: #3182f6;
`;

const ListContainer = styled.div``;

const TabPannel = (props) => {
  const { children, id, value, index, ...other } = props;

  return (
    <TabPannelContainer role="tabpanel" hidden={value !== index} id={id} {...other}>
      {value === index && <div>{children}</div>}
    </TabPannelContainer>
  );
};

const PhotoFeed = (props) => {
  const { basedItem } = props;
  const classes = useStyles();

  const [tabIdx, setTabIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [expandFeed, setExpandFeed] = useState<boolean>(false);

  const changeTab = useCallback((e, newIdx) => {
    setTabIdx(newIdx);
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const feedExpand = () => {
    setExpandFeed(!expandFeed);
  };

  // list
  const [introList] = useState([
    {
      icon: HomeIcon,
      title: '홈페이지',
      contents: basedItem.homepage ? (
        <HomePageLink href={getHomePageURL(basedItem)} target="_blank" rel="noreferrer">
          {getHomePageURL(basedItem)}
        </HomePageLink>
      ) : (
        '정보 미제공'
      ),
    },
    {
      icon: ScheduleIcon,
      title: '운영 기간',
      contents: getOperPd(basedItem),
    },
    {
      icon: LocationOnIcon,
      title: '주소',
      contents: getDetailAddress(basedItem),
    },
    {
      icon: FilterHdrIcon,
      title: '사이트 형태',
      contents: getSiteForms(basedItem),
    },
    {
      icon: PhoneIcon,
      title: '전화번호',
      contents: getPhoneNumber(basedItem),
    },
    {
      icon: SearchIcon,
      title: '특징',
      contents: getCampSiteFeatures(basedItem),
    },
  ]);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={basedItem.facltNm || 'Title'} subheader={getDetailAddress(basedItem)} />
        <CardMedia
          className={classes.media}
          image={basedItem.firstImageUrl ? basedItem.firstImageUrl : ReadyImage}
          onClick={openModal}
        />
        {/* <CardContent>
          <ContentText>{basedItem.lineIntro || ''}</ContentText>
        </CardContent> */}
        <CardActions disableSpacing>
          <Button size="small" color="primary">
            이미지 더보기
          </Button>
          <ExpandMoreButton expanded={expandFeed} handler={feedExpand} />
        </CardActions>
        <Collapse in={expandFeed} timeout="auto" unmountOnExit>
          <CardContent>
            <ListContainer>
              <IntroList>
                {introList.map((intro, idx) => {
                  return (
                    <React.Fragment key={intro.title}>
                      <IntroListItem key={intro.title} title={intro.title} Icon={intro.icon}>
                        {intro.contents}
                      </IntroListItem>
                    </React.Fragment>
                  );
                })}
              </IntroList>
            </ListContainer>
          </CardContent>
        </Collapse>
      </Card>

      <Modal className={classes.modal} open={modalOpen} onClose={closeModal}>
        <ModalContent>
          <IconButton className={classes.closeModalIcon} onClick={closeModal}>
            <CloseIcon />
          </IconButton>
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
            <IntroTabView basedItem={basedItem} />
          </TabPannel>
          <TabPannel id="map-tab" value={tabIdx} index={1}>
            <MapTabView basedItem={basedItem} />
          </TabPannel>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoFeed;
