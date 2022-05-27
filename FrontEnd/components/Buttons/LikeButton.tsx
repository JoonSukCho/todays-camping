import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
// components
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Hooks
import { usePushLike, usePopLike } from 'Hooks/api/useLikeList';

const useStyles = makeStyles(() => ({
  isLike: {
    color: '#fb3958',
  },
  isNotLike: {
    color: '#7e7e7e',
  },
}));

const LikeButton = ({ basedInfo }) => {
  const classes = useStyles();

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const likeList = useSelector((state: RootState) => state.likeList.likeList);

  const { mutate: pushLike, isSuccess: pushLikeSuccess } = usePushLike();
  const { mutate: popLike, isSuccess: popLikeSuccess } = usePopLike();

  const [isLike, setIsLike] = useState(false);

  // Init 좋아요 Set
  useEffect(() => {
    if (likeList) {
      setIsLike(
        !!likeList.find(
          (likeInfo) => likeInfo.contentid === basedInfo.contentId,
        ),
      );
    }
  }, [likeList]);

  const handleLikeList = () => {
    if (!userInfo) {
      alert('로그인 후 이용할 수 있습니다.');
      return false;
    }

    if (isLike) {
      popLike(basedInfo);
      setIsLike(false);
    } else {
      pushLike(basedInfo);
      setIsLike(true);
    }
  };

  return (
    <>
      <IconButton
        className={isLike ? classes.isLike : classes.isNotLike}
        onClick={handleLikeList}
      >
        <FavoriteIcon />
      </IconButton>
    </>
  );
};

export default LikeButton;
