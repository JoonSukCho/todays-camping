import { _iBasedItem } from 'models/api/goCamping/basedInfo';
import { IsValidatedURL } from 'util/validateUtil';

export const getHomePageURL = (basedItem: _iBasedItem): string => {
  if (IsValidatedURL(basedItem.homepage)) {
    return basedItem.homepage;
  }

  return `http://${basedItem.homepage}`;
};

export const getOperPd = (basedItem: _iBasedItem): string => {
  return `${basedItem.operPdCl || '정보 미제공'}`;
};

export const getDetailAddress = (basedItem: _iBasedItem): string => {
  return `${basedItem.addr1 || ''} ${basedItem.addr2 || ''}`;
};

export const getSiteForms = (basedItem: _iBasedItem): string => {
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

  if (siteForms.length === 0) {
    return '정보 미제공';
  }

  return siteForms.join(',');
};

export const getPhoneNumber = (basedItem: _iBasedItem): string => {
  return `${basedItem.tel || '정보 미제공'}`;
};

export const getCampSiteFeatures = (basedItem: _iBasedItem): string => {
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
