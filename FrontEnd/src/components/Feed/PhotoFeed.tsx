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
import ImageModalView from 'views/ModalView/ImageModalView';
import MapModalView from 'views/ModalView/MapModalView';
import IntroList from 'components/List/IntroList';
import IntroListItem from 'components/List/IntroListItem';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';
import useModal from 'Hooks/useModal';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';
import ModalContainer from 'components/Modal/ModalContainer';
import ModalLink from 'components/Link/ModalLink';
import TelLink from 'components/Link/TelLink';
import BackDropIOSWorkaround from 'components/BackDrop/BackDropIOSWorkaround';

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

  const [imageModalOpenFlag, imageModalOpen, imageModalClose] = useModal();
  const [mapModalOpenFlag, mapModalOpen, mapModalClose] = useModal();

  const [expandFeed, setExpandFeed] = useState<boolean>(false);

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
      icon: LocationOnIcon,
      title: '주소',
      contents: <ModalLink onClick={mapModalOpen}>{getDetailAddress(basedItem)}</ModalLink>,
    },
    {
      icon: PhoneIcon,
      title: '전화번호',
      contents: basedItem.tel ? (
        <TelLink tel={getPhoneNumber(basedItem)}>{getPhoneNumber(basedItem)}</TelLink>
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
      icon: FilterHdrIcon,
      title: '사이트 형태',
      contents: getSiteForms(basedItem),
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
        <CardHeader
          title={basedItem.facltNm}
          subheader={getDetailAddress(basedItem)}
          style={{ paddingLeft: 8 }}
        />
        <CardMedia
          className={classes.media}
          image={basedItem.firstImageUrl ? basedItem.firstImageUrl : ReadyImage}
        />
        {/* <CardContent>
          <ContentText>{basedItem.lineIntro || ''}</ContentText>
        </CardContent> */}
        <CardActions disableSpacing>
          <Button size="small" color="primary" onClick={imageModalOpen}>
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

      <Modal
        BackdropComponent={BackDropIOSWorkaround}
        className={classes.modal}
        open={imageModalOpenFlag}
        onClose={imageModalClose}
      >
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6" style={{ fontSize: '1rem' }}>
              {basedItem.facltNm}
            </Typography>
          </ModalHeader>
          <ModalContent>
            <ImageModalView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter onClose={imageModalClose} />
        </ModalContainer>
      </Modal>

      <Modal className={classes.modal} open={mapModalOpenFlag} onClose={mapModalClose}>
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6" variantMapping={{ h6: 'span' }} style={{ fontSize: '1rem' }}>
              {getDetailAddress(basedItem)}
            </Typography>
            <HomeIcon />
          </ModalHeader>
          <ModalContent>
            <MapModalView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter onClose={mapModalClose} />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default PhotoFeed;
