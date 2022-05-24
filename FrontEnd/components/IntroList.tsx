import { useMemo, Fragment, useState } from 'react';
import styled from 'styled-components';

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import PhoneIcon from '@material-ui/icons/Phone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import OuterLink from 'components/Link/OuterLink';
import TelLink from 'components/Link/TelLink';
import ModalLink from 'components/Link/ModalLink';
import IntroListItem from 'components/IntroListItem';
import MapModalView from 'components/ModalView/MapModalView';
import Modal from '@material-ui/core/Modal';
import ModalContainer from 'components/Modal/ModalContainer';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalFooter from 'components/Modal/ModalFooter';
import ModalContent from 'components/Modal/ModalContent';
import useModal from 'Hooks/useModal';

import {
  getCampSiteFeatures,
  getSiteForms,
  getDetailAddress,
} from 'util/basedItem';
import { IsValidatedURL } from 'util/utils';
import { _tBasedInfo } from 'models/api/goCamping/basedInfo';

interface IntroListProps {
  basedItem: _tBasedInfo;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const IntroList = ({ basedItem }: IntroListProps) => {
  const classes = useStyles();
  const [mapModalOpenFlag, mapModalOpen, mapModalClose] = useModal();
  const [copyMessageAnchor, setCopyMessageAnchor] = useState(null);

  const openCopyMessage = (event) => {
    setCopyMessageAnchor(event.currentTarget);

    setTimeout(() => {
      setCopyMessageAnchor(null);
    }, 1000);
  };

  const homepageURL = (() => {
    if (IsValidatedURL(basedItem.homepage)) {
      return basedItem.homepage;
    }

    return `http://${basedItem.homepage}`;
  })();
  const detailAddress = getDetailAddress(basedItem.addr1, basedItem.addr2);
  const operPd = basedItem.operPdCl || '정보 미제공';
  const phoneNumber = basedItem.tel || '정보 미제공';

  const introList = useMemo(() => {
    return [
      {
        icon: <HomeIcon style={{ fontSize: 28 }} />,
        title: '홈페이지',
        contents: basedItem.homepage ? (
          <OuterLink href={homepageURL}>{homepageURL}</OuterLink>
        ) : (
          '정보 미제공'
        ),
      },
      {
        icon: <LocationOnIcon style={{ fontSize: 28 }} />,
        title: '주소',
        contents: <ModalLink onClick={mapModalOpen}>{detailAddress}</ModalLink>,
      },
      {
        icon: <PhoneIcon style={{ fontSize: 28 }} />,
        title: '전화번호',
        contents: basedItem.tel ? (
          <TelLink tel={phoneNumber}>{phoneNumber}</TelLink>
        ) : (
          '정보 미제공'
        ),
      },
      {
        icon: <ScheduleIcon style={{ fontSize: 28 }} />,
        title: '운영 기간',
        contents: operPd,
      },
      {
        icon: <FilterHdrIcon style={{ fontSize: 28 }} />,
        title: '사이트 형태',
        contents: getSiteForms({
          siteBottomCl1: basedItem.siteBottomCl1,
          siteBottomCl2: basedItem.siteBottomCl2,
          siteBottomCl3: basedItem.siteBottomCl3,
          siteBottomCl4: basedItem.siteBottomCl4,
          siteBottomCl5: basedItem.siteBottomCl5,
        }),
      },
      {
        icon: <SearchIcon style={{ fontSize: 28 }} />,
        title: '특징',
        contents: getCampSiteFeatures({
          sbrsCl: basedItem.sbrsCl,
          animalCmgCl: basedItem.animalCmgCl,
        }),
      },
    ];
  }, [basedItem]);

  return (
    <div>
      <GridList>
        {introList.map((intro, idx) => {
          return (
            <Fragment key={intro.title}>
              <IntroListItem
                key={intro.title}
                title={intro.title}
                icon={intro.icon}
              >
                {intro.contents}
              </IntroListItem>
            </Fragment>
          );
        })}
      </GridList>

      {/* 지도 Modal */}
      <Modal
        className={classes.modal}
        open={mapModalOpenFlag}
        onClose={mapModalClose}
      >
        <ModalContainer>
          <Popover
            open={Boolean(copyMessageAnchor)}
            anchorEl={copyMessageAnchor}
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                background: '#f5f6fa',
                padding: 8,
              },
            }}
          >
            <Typography variant="subtitle2">
              주소가 클립보드에 복사 되었습니다.
            </Typography>
          </Popover>
          <ModalHeader>
            <IconButton
              aria-describedby={open ? 'simple-popper' : undefined}
              size="small"
              style={{ marginRight: 8 }}
              onClick={(e) => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(detailAddress);
                  openCopyMessage(e);
                }

                return true;
              }}
            >
              <FileCopyIcon />
            </IconButton>
            <Typography variant="h6" variantMapping={{ h6: 'span' }}>
              {detailAddress}
            </Typography>
          </ModalHeader>
          <ModalContent>
            <MapModalView mapX={basedItem.mapX} mapY={basedItem.mapY} />
          </ModalContent>
          <ModalFooter>
            <Button autoFocus onClick={mapModalClose} color="primary">
              닫기
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </div>
  );
};

const GridList = styled(List)`
  @media (min-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

export default IntroList;
