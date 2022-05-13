import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

// lib
import Carousel from 'react-slick';
import styled from 'styled-components';

// Hooks
import useModal from 'Hooks/useModal';

// @material/core
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

// @material-ui
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import PhoneIcon from '@material-ui/icons/Phone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

// models
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// modules
import {
  getCampSiteFeatures,
  getDetailAddress,
  getHomePageURL,
  getOperPd,
  getPhoneNumber,
  getSiteForms,
} from 'modules/getIntroInfo';

// components
import OuterLink from 'components/Link/OuterLink';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import ExpandMoreButton from 'components/Buttons/ExpandMoreButton';
import ImageModalView from 'components/ModalView/ImageModalView';
import MapModalView from 'components/ModalView/MapModalView';
import IntroList from 'components/IntroList';
import IntroListItem from 'components/IntroListItem';
import ModalContainer from 'components/Modal/ModalContainer';
import ModalLink from 'components/Link/ModalLink';
import TelLink from 'components/Link/TelLink';
import LikeButton from 'components/Buttons/LikeButton';

interface PhotoFeedProps {
  basedItem: _iBasedItem;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
    padding: '8px 0px',
  },
  header: {
    paddingLeft: 0,
    paddingBottom: 8,
  },
  headerTitle: {
    fontWeight: 600,
    color: '#4a4a4a',
  },
  content: {
    paddingTop: 0,
    paddingLeft: 8,
  },
  footer: {
    paddingLeft: 0,
    paddingRight: 0,
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

const PhotoFeed = ({ basedItem }: PhotoFeedProps) => {
  const classes = useStyles();

  const [imageModalOpenFlag, imageModalOpen, imageModalClose] = useModal();
  const [mapModalOpenFlag, mapModalOpen, mapModalClose] = useModal();

  const [feedExpand, setFeedExpand] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const expandFeed = () => {
    setFeedExpand(!feedExpand);
  };

  // list
  const [introList] = useState([
    {
      icon: HomeIcon,
      title: '홈페이지',
      contents: basedItem.homepage ? (
        <OuterLink href={getHomePageURL(basedItem)}>
          {getHomePageURL(basedItem)}
        </OuterLink>
      ) : (
        '정보 미제공'
      ),
    },
    {
      icon: LocationOnIcon,
      title: '주소',
      contents: (
        <ModalLink onClick={mapModalOpen}>
          {getDetailAddress(basedItem)}
        </ModalLink>
      ),
    },
    {
      icon: PhoneIcon,
      title: '전화번호',
      contents: basedItem.tel ? (
        <TelLink tel={getPhoneNumber(basedItem)}>
          {getPhoneNumber(basedItem)}
        </TelLink>
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
      <Card className={classes.root} elevation={0}>
        <CardHeader
          classes={{
            title: classes.headerTitle,
          }}
          className={classes.header}
          title={basedItem.facltNm}
          subheader={getDetailAddress(basedItem)}
        />
        <CardMedia
          className={classes.media}
          image={
            basedItem.firstImageUrl
              ? basedItem.firstImageUrl
              : '/img/ready-image.jpg'
          }
        />
        <CardActions disableSpacing className={classes.footer}>
          <LikeButton basedItem={basedItem} />
          {basedItem.firstImageUrl && (
            <IconButton onClick={imageModalOpen} color="primary">
              <PhotoLibraryIcon />
            </IconButton>
          )}
          <ExpandMoreButton expanded={feedExpand} handler={expandFeed} />
        </CardActions>
        <Collapse in={feedExpand} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
            <ListContainer>
              <IntroList>
                {introList.map((intro, idx) => {
                  return (
                    <React.Fragment key={intro.title}>
                      <IntroListItem
                        key={intro.title}
                        title={intro.title}
                        Icon={intro.icon}
                      >
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
        className={classes.modal}
        open={imageModalOpenFlag}
        onClose={imageModalClose}
      >
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6">{basedItem.facltNm}</Typography>
          </ModalHeader>
          <ModalContent>
            <ImageModalView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter>
            <Button autoFocus onClick={imageModalClose} color="primary">
              닫기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>

      <Modal
        className={classes.modal}
        open={mapModalOpenFlag}
        onClose={mapModalClose}
      >
        <ModalContainer>
          <Popover
            open={open}
            anchorEl={anchorEl}
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                background: '#f5f6fa',
                padding: 8,
              },
            }}
          >
            <Typography variant="subtitle2">
              주소가 클립보드에 복사 되었습니다.
            </Typography>
          </Popover>
          <ModalHeader>
            <IconButton
              aria-describedby={id}
              size="small"
              style={{ marginRight: 8 }}
              onClick={(e) => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(getDetailAddress(basedItem));
                  handleClick(e);
                }

                return true;
              }}
            >
              <FileCopyIcon />
            </IconButton>
            <Typography variant="h6" variantMapping={{ h6: 'span' }}>
              {getDetailAddress(basedItem)}
            </Typography>
          </ModalHeader>
          <ModalContent>
            <MapModalView basedItem={basedItem} />
          </ModalContent>
          <ModalFooter>
            <Button autoFocus onClick={mapModalClose} color="primary">
              닫기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default PhotoFeed;
