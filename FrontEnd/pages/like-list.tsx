import styled from 'styled-components';
import { _tBasedInfo } from 'models/api/goCamping/basedInfo';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import AppLayout from 'components/Layout/AppLayout';
import Parallax from 'components/Parallax/Parallax';
import ParallaxContent from 'components/Parallax/ParallaxContent';
import MainSection from 'components/MainSection';
import LikeListComponent from 'components/LikeList';

const LikeList = () => {
  return (
    <AppLayout>
      <Parallax height={170} bgColor="#fb3958">
        <ParallaxContent>
          <GridContainer>
            <GridItem>
              <TitleContainer>
                <Title>좋아요 리스트</Title>
              </TitleContainer>
            </GridItem>
          </GridContainer>
        </ParallaxContent>
      </Parallax>
      <MainSection>
        <LikeListComponent />
      </MainSection>
    </AppLayout>
  );
};

const TitleContainer = styled.div`
  color: #ffffff;
  text-align: left;
  margin-top: 59px;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
`;

export default LikeList;
