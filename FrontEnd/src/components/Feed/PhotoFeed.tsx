import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

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
  CardActions,
  Button,
  Collapse,
  Typography,
  darken,
} from '@material-ui/core';

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
} from '@material-ui/icons';

// components
import OuterLink from 'components/Link/OuterLink';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import ExpandMoreButton from 'components/Buttons/ExpandMoreButton';
import IntroTabView from 'views/IntroTabView/IntroTabView';
import IntroList from 'components/List/IntroList';
import IntroListItem from 'components/List/IntroListItem';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';
import ModalContainer from 'components/Modal/ModalContainer';
import ModalLink from 'components/Link/ModalLink';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
    padding: 8,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ListContainer = styled.div``;

const PhotoFeed = (props) => {
  const { basedItem } = props;
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [expandFeed, setExpandFeed] = useState<boolean>(false);

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
        <OuterLink href={getHomePageURL(basedItem)}>{getHomePageURL(basedItem)}</OuterLink>
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
      contents: <ModalLink onClick={openModal}>{getDetailAddress(basedItem)}</ModalLink>,
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
        />
        {/* <CardContent>
          <ContentText>{basedItem.lineIntro || ''}</ContentText>
        </CardContent> */}
        <CardActions disableSpacing>
          <Button size="small" color="primary" onClick={openModal}>
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
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h5">이미지 더보기</Typography>
          </ModalHeader>
          <ModalContent>
            <IntroTabView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter onClose={closeModal} />
        </ModalContainer>
      </Modal>

      <Modal className={classes.modal} open={modalOpen} onClose={closeModal}>
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h5">이미지 더보기</Typography>
          </ModalHeader>
          <ModalContent>
            <IntroTabView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter onClose={closeModal} />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default PhotoFeed;
