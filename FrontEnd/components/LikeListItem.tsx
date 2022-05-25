import { _tBasedInfo } from 'models/api/goCamping/basedInfo';

import GridItem from 'components/Grid/GridItem';
import PhotoFeed from 'components/PhotoFeed';
import { _iLikeItem } from 'models/api/users/likeList';

interface LikeListItemProps {
  likeItem: _iLikeItem;
}

const LikeListItem = ({ likeItem }: LikeListItemProps) => {
  const basedInfo: _tBasedInfo = {
    contentId: likeItem.contentid,
    facltNm: likeItem.facltnm,
    addr1: likeItem.addr1,
    addr2: likeItem.addr2,
    mapX: likeItem.mapx,
    mapY: likeItem.mapy,
    tel: likeItem.tel,
    homepage: likeItem.homepage,
    firstImageUrl: likeItem.firstimageurl,
    siteBottomCl1: likeItem.sitebottomcl1,
    siteBottomCl2: likeItem.sitebottomcl2,
    siteBottomCl3: likeItem.sitebottomcl3,
    siteBottomCl4: likeItem.sitebottomcl4,
    siteBottomCl5: likeItem.sitebottomcl5,
    sbrsCl: likeItem.sbrscl,
    animalCmgCl: likeItem.animalcmgcl,
    operPdCl: likeItem.operpdcl,
  };

  return (
    <GridItem>
      <PhotoFeed basedInfo={basedInfo} />
    </GridItem>
  );
};

export default LikeListItem;
