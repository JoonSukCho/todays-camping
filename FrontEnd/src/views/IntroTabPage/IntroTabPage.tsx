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

// @material-ui
import {
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  Search as SearchIcon,
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

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const IntroTabPage = (props) => {
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
  });
  const [imageList, setImageList] = useState([]);
  const [introList] = useState([
    {
      icon: HomeIcon,
      iconColor: '#3182f6',
      title: '홈페이지',
      contents: (
        <a href={basedItem.homepage} target="_blank">
          {basedItem.homepage}
        </a>
      ),
    },
    {
      icon: LocationOnIcon,
      iconColor: '#3182f6',
      title: '주소',
      contents: `${basedItem.addr1 || ''} ${basedItem.addr2 || ''}`,
    },
    {
      icon: SearchIcon,
      iconColor: '#3182f6',
      title: '특징',
      contents: `${basedItem.siteBottomCl1 || ''}`,
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
                <IntroListItem
                  key={intro.title}
                  title={intro.title}
                  icon={{
                    icon: intro.icon,
                    color: intro.iconColor,
                  }}
                >
                  {intro.contents}
                </IntroListItem>
                {introList.length - 1 !== idx && <Divider />}
              </React.Fragment>
            );
          })}
        </IntroList>
        <IntroList>
          {introList.map((intro, idx) => {
            return (
              <React.Fragment key={intro.title}>
                <IntroListItem
                  key={intro.title}
                  title={intro.title}
                  icon={{
                    icon: intro.icon,
                    color: intro.iconColor,
                  }}
                >
                  {intro.contents}
                </IntroListItem>
                {introList.length - 1 !== idx && <Divider />}
              </React.Fragment>
            );
          })}
        </IntroList>
      </ListContainer>
    </>
  );
};

export default IntroTabPage;
