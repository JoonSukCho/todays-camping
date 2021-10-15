import React, { useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

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

const DetailPage = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const { basedItem } = props.location.state;
  const { mapX, mapY } = basedItem;

  return (
    <div>
      <Header color="white" brand="오늘의 캠핑" rightLinks={<HeaderLinks />} fixed {...rest} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <KakaoMap coordinate={{ mapX, mapY }} />
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
