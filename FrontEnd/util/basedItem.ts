import { _iBasedItem } from 'models/api/goCamping/basedInfo';

interface GetSiteFormsParams {
  siteBottomCl1?: number;
  siteBottomCl2?: number;
  siteBottomCl3?: number;
  siteBottomCl4?: number;
  siteBottomCl5?: number;
}

interface GetCampSiteFeaturesParams {
  sbrsCl?: string;
  animalCmgCl?: string;
}

export const getDetailAddress = (addr1?: string, addr2?: string): string => {
  return `${addr1 || ''} ${addr2 || ''}`;
};

export const getSiteForms = ({
  siteBottomCl1,
  siteBottomCl2,
  siteBottomCl3,
  siteBottomCl4,
  siteBottomCl5,
}: GetSiteFormsParams): string => {
  const siteForms = [];
  if (siteBottomCl1 > 0) {
    siteForms.push('잔디');
  }

  if (siteBottomCl2 > 0) {
    siteForms.push('파쇄석');
  }

  if (siteBottomCl3 > 0) {
    siteForms.push('테크');
  }

  if (siteBottomCl4 > 0) {
    siteForms.push('자갈');
  }

  if (siteBottomCl5 > 0) {
    siteForms.push('맨흙');
  }

  if (siteForms.length === 0) {
    return '정보 미제공';
  }

  return siteForms.join(',');
};

export const getCampSiteFeatures = ({
  sbrsCl,
  animalCmgCl,
}: GetCampSiteFeaturesParams): string => {
  const features = [];
  if (sbrsCl) {
    const sbrsCls = sbrsCl.split(',');

    for (let i = 0; i < sbrsCls.length; i += 1) {
      features.push(sbrsCls[i]);
    }
  }

  if (animalCmgCl) {
    features.push(`애견동반 ${animalCmgCl}`);
  }

  return features.join(', ');
};
