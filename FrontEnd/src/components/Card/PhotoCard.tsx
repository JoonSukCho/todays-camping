import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// lib
import Carousel from 'react-slick';

// @material/core
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

// @material/icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';
import TestImage1 from 'assets/img/sign.jpg';
import TestImage2 from 'assets/img/main-background.jpg';
import TestImage3 from 'assets/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PhotoCard = (props) => {
  const { basedItem } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  // card expand handler
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // console.log(basedItem);
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={basedItem.facltNm || 'Title'}
        subheader={`${basedItem.addr1 || ''} ${basedItem.addr2 || ''}`}
      />
      <CardMedia
        className={classes.media}
        image={basedItem.firstImageUrl ? basedItem.firstImageUrl : ReadyImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {basedItem.lineIntro || ''}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <Link
          to={{
            pathname: `/detail-page/${basedItem.contentId}`,
            state: {
              basedItem,
            },
          }}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PhotoCard;
