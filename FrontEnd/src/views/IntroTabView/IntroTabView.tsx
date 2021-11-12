import React, { useEffect, useState } from 'react';
import Carousel from 'react-slick';
import styled from 'styled-components';
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// core components
// import Card from 'components/Card/Card.js';
import IntroList from 'components/List/IntroList';
import IntroListItem from 'components/List/IntroListItem';
import CarouselDot from 'components/CustomIcons/CarouselDot';

// modules
import {
  getCampSiteFeatures,
  getDetailAddress,
  getHomePageURL,
  getOperPd,
  getPhoneNumber,
  getSiteForms,
} from 'modules/getIntroInfo';

// @material-ui
import {
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import { Divider, Card } from '@material-ui/core';

// Image
import ReadyImage from 'assets/img/ready-image.jpg';

const ImgContainer = styled.div`
  height: 300px;

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 102%;
`;

const ListContainer = styled.div``;

const IntroTabView = (props) => {
  const basedItem: _iBasedItem = props.basedItem;

  const { data: imageInfo, isFetched: imageInfoIsFetched } = useImageInfo({
    contentId: basedItem.contentId,
  });

  // local state
  const [carouselSettings] = useState({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    appendDots: (dots: any[]) => {
      return (
        <ul>
          {dots.map((dot) => (
            <CarouselDot key={dot.key} active={dot.props.className === 'slick-active'} />
          ))}
        </ul>
      );
    },
  });
  const [imageList, setImageList] = useState([]);
  const [introList] = useState([
    {
      icon: HomeIcon,
      title: '홈페이지',
      contents: (
        <a href={getHomePageURL(basedItem)} target="_blank" rel="noreferrer">
          {getHomePageURL(basedItem)}
        </a>
      ),
    },
    {
      icon: SearchIcon,
      title: '운영 기간',
      contents: getOperPd(basedItem),
    },
    {
      icon: LocationOnIcon,
      title: '주소',
      contents: getDetailAddress(basedItem),
    },
    {
      icon: SearchIcon,
      title: '사이트 형태',
      contents: getSiteForms(basedItem),
    },
    {
      icon: PhoneIcon,
      title: '전화번호',
      contents: getPhoneNumber(basedItem),
    },
    {
      icon: SearchIcon,
      title: '특징',
      contents: getCampSiteFeatures(basedItem),
    },
  ]);

  useEffect(() => {
    if (imageInfoIsFetched) {
      setImageList(
        imageInfo.itemList.map((imageItem) => ({
          url: imageItem.imageUrl,
          serialNum: imageItem.serialnum,
        })),
      );
    }
  }, [imageInfoIsFetched]);

  return (
    <>
      <Card>
        {imageInfoIsFetched ? (
          <Carousel {...carouselSettings}>
            {imageList.length > 0 ? (
              imageList.map((imageItem) => (
                <ImgContainer key={imageItem.serialNum}>
                  <Image src={imageItem.url} alt="No Image" />
                </ImgContainer>
              ))
            ) : (
              <ImgContainer>
                <Image src={ReadyImage} alt="Ready Image" />
              </ImgContainer>
            )}
          </Carousel>
        ) : (
          <ImgContainer style={{ background: '#eee' }} />
        )}
      </Card>
      <ListContainer>
        <IntroList>
          {introList.map((intro, idx) => {
            return (
              <React.Fragment key={intro.title}>
                <IntroListItem key={intro.title} title={intro.title} Icon={intro.icon}>
                  {intro.contents}
                </IntroListItem>
                {/* {introList.length - 1 !== idx && <Divider />} */}
              </React.Fragment>
            );
          })}
        </IntroList>
      </ListContainer>
    </>
  );
};

export default IntroTabView;
