import React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';

// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';
import SectionInfiniteList from 'views/Components/Sections/SectionInfiniteList';
import SectionBasics from 'views/Components/Sections/SectionBasics.js';
import SectionNavbars from 'views/Components/Sections/SectionNavbars.js';
import SectionTabs from 'views/Components/Sections/SectionTabs.js';
import SectionPills from 'views/Components/Sections/SectionPills.js';
import SectionNotifications from 'views/Components/Sections/SectionNotifications.js';
import SectionTypography from 'views/Components/Sections/SectionTypography.js';
import SectionJavascript from 'views/Components/Sections/SectionJavascript.js';
import SectionCarousel from 'views/Components/Sections/SectionCarousel.js';
import SectionCompletedExamples from 'views/Components/Sections/SectionCompletedExamples.js';
import SectionLogin from 'views/Components/Sections/SectionLogin.js';
import SectionExamples from 'views/Components/Sections/SectionExamples.js';
import SectionDownload from 'views/Components/Sections/SectionDownload.js';

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
        <SectionBasics />
        <SectionInfiniteList />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        {/* <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem> */}
        {/* <SectionExamples /> */}
        {/* <SectionDownload /> */}
      </div>
      <Footer />
    </div>
  );
}