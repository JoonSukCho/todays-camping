import React from 'react';
import KakaoMap from 'components/KakaoMap';

const MapModalView = (props) => {
  const { basedItem } = props;
  const { mapX, mapY } = basedItem;

  return (
    <>
      <KakaoMap coordinate={{ mapX, mapY }} />
    </>
  );
};

export default MapModalView;
