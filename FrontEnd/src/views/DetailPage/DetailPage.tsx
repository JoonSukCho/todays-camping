import React, { useCallback, useEffect, useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
import styled from 'styled-components';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// tab view
import IntroTabPage from 'views/IntroTabPage/IntroTabPage';

// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import KakaoMap from 'components/Kakao/KakaoMap';

import styles from 'assets/jss/material-kit-react/views/landingPage.js';

const useStyles = makeStyles(styles);

const TabPannelContainer = styled.div`
  padding: 20px 0;
`;

const TabPannel = (props) => {
  const { children, id, value, index, ...other } = props;

  return (
    <TabPannelContainer role="tabpanel" hidden={value !== index} id={id} {...other}>
      {value === index && <div>{children}</div>}
    </TabPannelContainer>
  );
};

const DetailPage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const { basedItem } = props.location.state;
  const { mapX, mapY } = basedItem;

  // local state
  const [tabIdx, setTabIdx] = useState(0);

  const changeTab = useCallback((e, newIdx) => {
    setTabIdx(newIdx);
  }, []);

  return (
    <div>
      <Header color="white" brand="오늘의 캠핑" rightLinks={<HeaderLinks />} fixed {...rest} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} style={{ marginTop: 70, paddingTop: 20 }}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Tabs style={{ color: '#333' }} value={tabIdx} onChange={changeTab}>
                <Tab label="캠핑장 소개" id="introduce-tab" />
                <Tab label="캠핑장 위치" id="map-tab" />
              </Tabs>
              <TabPannel id="introduce-tab" value={tabIdx} index={0}>
                <IntroTabPage basedItem={basedItem} />
              </TabPannel>
              <TabPannel id="map-tab" value={tabIdx} index={1}>
                <KakaoMap coordinate={{ mapX, mapY }} />
              </TabPannel>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
