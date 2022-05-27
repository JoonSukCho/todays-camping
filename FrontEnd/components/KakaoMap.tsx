import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  text-align: center;
`;

const Map = styled.div`
  width: 100%;
  height: 700px;

  @media (max-width: 640px) {
    height: 300px;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    height: 500px;
  }
`;

const KakaoMap = (props) => {
  const { coordinate } = props;
  const { mapX, mapY } = coordinate;

  useEffect(() => {
    const container = document.getElementById('kakao-map');

    // new 로 생성해주지 않으면 CORS 에러로 리턴시켜버린다.
    const options = {
      center: new window.kakao.maps.LatLng(mapY, mapX),
      level: 8,
    };
    const map = new window.kakao.maps.Map(container, options);

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    const markerPos = new window.kakao.maps.LatLng(mapY, mapX);
    const marker = new window.kakao.maps.Marker({
      position: markerPos,
    });
    marker.setMap(map);
  }, []);

  return (
    <MapContainer>
      <Map id="kakao-map" />
    </MapContainer>
  );
};

export default KakaoMap;
