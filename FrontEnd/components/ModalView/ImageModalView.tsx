import Image from 'next/image';
import { useEffect, useState } from 'react';
import Carousel from 'react-slick';
import type { Settings } from 'react-slick';
import styled from 'styled-components';

// Hooks
import useImageInfo from 'Hooks/api/useImageInfo';

// core components
import CarouselDot from 'components/CustomIcons/CarouselDot';

// @material-ui
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ImageModalViewProps {
  contentId: number;
}

const ImageModalView = ({ contentId }: ImageModalViewProps) => {
  const { data: imageInfo, isFetched: imageInfoIsFetched } = useImageInfo({
    contentId,
  });

  // local state
  const [carouselSettings] = useState<Settings>({
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
            <CarouselDot
              key={dot.key}
              active={dot.props.className === 'slick-active'}
            />
          ))}
        </ul>
      );
    },
  });
  const [imageList, setImageList] = useState([]);
  const [imageLoaded, setImageLoaded] = useState([]);

  useEffect(() => {
    if (imageInfoIsFetched) {
      setImageLoaded(imageInfo.itemList.map(() => false));
      setImageList(
        imageInfo.itemList.map((imageItem) => ({
          url: imageItem.imageUrl,
          serialNum: imageItem.serialnum,
        })),
      );
    }
  }, [imageInfoIsFetched]);

  return (
    <Container>
      {imageInfoIsFetched ? (
        <Carousel {...carouselSettings}>
          {imageList.length > 0 ? (
            imageList.map((imageItem, idx) => (
              <ImgContainer key={imageItem.serialNum}>
                <Image
                  loading="eager"
                  priority
                  src={imageItem.url}
                  alt="Image Not Found"
                  width={500}
                  height={500}
                  onLoadingComplete={() => {
                    setImageLoaded((prev) => {
                      prev[idx] = true;
                      return [...prev];
                    });
                  }}
                  onClick={() => {
                    window.open(imageItem.url, '_blank');
                  }}
                />
                {!imageLoaded[idx] && <ImageLoadProgress />}
              </ImgContainer>
            ))
          ) : (
            <ImgContainer>
              <Image
                src="/img/ready-image.jpg"
                alt="Image Not Found"
                layout="fill"
                objectFit="fill"
              />
            </ImgContainer>
          )}
        </Carousel>
      ) : (
        <ImgContainer>
          <ImageLoadProgress />
        </ImgContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  touch-action: pan-x;
`;

const ImgContainer = styled.div`
  display: flex !important;
  justify-content: center;
  position: relative;
  height: 300px;

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const ImageLoadProgress = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 13px);
  left: calc(50% - 20px);
`;

// const Image = styled.img`
//   width: 100%;
//   height: 102%;
// `;

export default ImageModalView;
