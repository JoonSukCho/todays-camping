import React from 'react';
import KakaoMap from 'components/Kakao/KakaoMap';

const MapTabPage = (props) => {
  const { basedItem } = props;
  const { mapX, mapY } = basedItem;

  return (
    <>
      <KakaoMap coordinate={{ mapX, mapY }} />
    </>
  );
};

export default MapTabPage;