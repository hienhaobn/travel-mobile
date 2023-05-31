import { navigate } from 'navigation/utils';

export const goToAccountInfo = () => navigate('AccountInfo');

export const goToTourGuideInfo = (tourGuideId: string) => navigate('TourGuideInfo', { tourGuideId });
