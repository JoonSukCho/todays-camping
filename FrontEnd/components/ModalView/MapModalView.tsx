import React from 'react';
import KakaoMap from 'components/KakaoMap';

interface MapModalViewProps {
  mapX: number;
  mapY: number;
}

const MapModalView = ({ mapX, mapY }: MapModalViewProps) => {
  return (
    <>
      <KakaoMap coordinate={{ mapX, mapY }} />
    </>
  );
};

export default MapModalView;
