import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

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
import TestImage1 from 'assets/img/sign.jpg';
import TestImage2 from 'assets/img/main-background.jpg';
import TestImage3 from 'assets/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
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
  const [imageList, setImageList] = useState([]);
  const [imageInfoReqParams, setImageInfoReqParams] = useState({
    contentId: 0,
  });

  const {
    status: imageInfoStatus,
    data: imageInfo,
    error: imageInfoError,
    isFetching: imageInfoIsFetching,
    isFetched: imageInfoIsFetched,
    refetch: imageInfoRefecth,
  } = useImageInfo(imageInfoReqParams);

  useEffect(() => {
    if (basedItem) {
      setImageInfoReqParams({
        contentId: basedItem.contentId,
      });
    }
  }, [basedItem]);

  useEffect(() => {
    if (imageInfoIsFetched) {
      setImageList(imageInfo.itemList);
    }
  }, [imageInfoIsFetched]);

  useEffect(() => {
    console.log('imageList', imageList);
  }, [imageList]);

  // card expand handler
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={basedItem.facltNm || 'Title'}
        subheader="September 14, 2016"
      />
      <Carousel dots infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay={false}>
        {imageList.length > 0 ? (
          imageList.map((imageItem) => {
            return (
              <CardMedia
                key={imageItem.serialnum}
                className={classes.media}
                image={imageItem.imageUrl}
                title="Paella dish"
              />
            );
          })
        ) : (
          <CardMedia className={classes.media} image={TestImage1} title="Paella dish" />
        )}
      </Carousel>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PhotoCard;
