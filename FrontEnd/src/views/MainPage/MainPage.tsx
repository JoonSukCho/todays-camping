import React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';
import SectionInfiniteList from 'views/Components/Sections/SectionInfiniteList';

import styles from 'assets/jss/material-kit-react/views/mainPage.js';

// Image
// import BackgroundImage from 'assets/img/main-background.jpg';
import BackgroundImage from 'assets/img/campfire-background.gif';

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="오늘의 캠핑"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax image={BackgroundImage}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>오늘의 캠핑</h1>
                <h3 className={classes.subtitle}>스크롤을 내려 다양한 캠핑지를 만나보세요.</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionInfiniteList />
      </div>
      <Footer />
    </div>
  );
}
