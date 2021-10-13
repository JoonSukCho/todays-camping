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
import InfoArea from 'components/InfoArea/InfoArea.js';

import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

declare global {
  interface Window {
    kakao: any;
  }
}

const useStyles = makeStyles(styles);

const MapSection = () => {
  const classes = useStyles();

  useEffect(() => {
    const container = document.getElementById('kakao-map');

    // new 로 생성해주지 않으면 CORS 에러로 리턴시켜버린다.
    const options = {
      center: new window.kakao.maps.LatLng(37.664856652682275, 127.0615836709799),
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPos = new window.kakao.maps.LatLng(37.664856652682275, 127.0615836709799);
    const marker = new window.kakao.maps.Marker({
      position: markerPos,
    });

    marker.setMap(map);
  }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>위치</h2>
          <div id="kakao-map" style={{ width: '100%', height: 500 }} />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default MapSection;
