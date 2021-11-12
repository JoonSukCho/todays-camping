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

const getSiteForms = (basedItem: _iBasedItem): string => {
  const siteForms = [];
  if (basedItem.siteBottomCl1 > 0) {
    siteForms.push('잔디');
  }

  if (basedItem.siteBottomCl2 > 0) {
    siteForms.push('파쇄석');
  }

  if (basedItem.siteBottomCl3 > 0) {
    siteForms.push('테크');
  }

  if (basedItem.siteBottomCl4 > 0) {
    siteForms.push('자갈');
  }

  if (basedItem.siteBottomCl5 > 0) {
    siteForms.push('맨흙');
  }

  return siteForms.join(',');
};

const getCampSiteFeatures = (basedItem: _iBasedItem): string => {
  const features = [];
  if (basedItem.sbrsCl) {
    const sbrsCls = basedItem.sbrsCl.split(',');

    for (let i = 0; i < sbrsCls.length; i += 1) {
      features.push(sbrsCls[i]);
    }
  }

  if (basedItem.animalCmgCl) {
    features.push(`애견동반 ${basedItem.animalCmgCl}`);
  }

  return features.join(', ');
};

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
      title: '홈페이지',
      contents: (
        <a href={basedItem.homepage} target="_blank">
          {basedItem.homepage}
        </a>
      ),
    },
    {
      icon: SearchIcon,
      title: '운영 기간',
      contents: `${basedItem.operPdCl || ''}`,
    },
    {
      icon: LocationOnIcon,
      title: '주소',
      contents: `${basedItem.addr1 || ''} ${basedItem.addr2 || ''}`,
    },
    {
      icon: SearchIcon,
      title: '사이트 형태',
      contents: getSiteForms(basedItem),
    },
    {
      icon: PhoneIcon,
      title: '전화번호',
      contents: `${basedItem.tel || ''}`,
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

export default IntroTabPage;
