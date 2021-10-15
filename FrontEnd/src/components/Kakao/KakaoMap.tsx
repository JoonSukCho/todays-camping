import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

declare global {
  interface Window {
    kakao: any;
  }
}

const useStyles = makeStyles(() => ({
  section: {
    padding: '70px 0',
    textAlign: 'center',
  },

  title: {
    color: '#3c4858',
    fontWeight: 600,
  },
}));

const KakaoMap = (props) => {
  const classes = useStyles();
  const { width = '100%', height = 500, coordinate } = props;
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
    <div className={classes.section}>
      <h2 className={classes.title}>위치</h2>
      <div id="kakao-map" style={{ width, height }} />
    </div>
  );
};

export default KakaoMap;
