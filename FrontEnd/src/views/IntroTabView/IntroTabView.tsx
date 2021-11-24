import React, { useEffect, useState } from 'react';
import Carousel from 'react-slick';
import styled from 'styled-components';
import { _iBasedItem } from 'models/api/goCamping/basedInfo';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// core components
import CarouselDot from 'components/CustomIcons/CarouselDot';

// @material-ui
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
    lazyLoad: 'progressive',
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
  );
};

export default IntroTabView;
