import React, { useState } from 'react';

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

// @material-ui

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

// models
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// modules
import { getDetailAddress } from 'util/basedItem';

// components
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import ExpandMoreButton from 'components/Buttons/ExpandMoreButton';
import ImageModalView from 'components/ModalView/ImageModalView';
import IntroList from 'components/IntroList';
import ModalContainer from 'components/Modal/ModalContainer';
import LikeButton from 'components/Buttons/LikeButton';

interface PhotoFeedProps {
  basedItem: _iBasedItem;
  isSearchResultPage?: boolean;
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

const PhotoFeed = ({ basedItem, isSearchResultPage }: PhotoFeedProps) => {
  const classes = useStyles();

  const [imageModalOpenFlag, imageModalOpen, imageModalClose] = useModal();

  const [feedExpand, setFeedExpand] = useState<boolean>(false);

  const expandFeed = () => {
    setFeedExpand(!feedExpand);
  };

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <CardHeader
          classes={{
            title: classes.headerTitle,
          }}
          className={classes.header}
          title={basedItem.facltNm}
          subheader={getDetailAddress(basedItem.addr1, basedItem.addr2)}
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
          {!isSearchResultPage && <LikeButton basedItem={basedItem} />}
          {basedItem.firstImageUrl && (
            <IconButton onClick={imageModalOpen} color="primary">
              <PhotoLibraryIcon />
            </IconButton>
          )}
          <ExpandMoreButton expanded={feedExpand} handler={expandFeed} />
        </CardActions>
        <Collapse in={feedExpand} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
            <IntroList basedItem={basedItem}></IntroList>
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
            <ImageModalView contentId={basedItem.contentId} />
          </ModalContent>
          <ModalFooter>
            <Button autoFocus onClick={imageModalClose} color="primary">
              닫기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default PhotoFeed;
