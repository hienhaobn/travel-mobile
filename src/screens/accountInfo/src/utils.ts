import { navigate } from 'navigation/utils';
import TourGuideInfoScreen from '../TourGuideInfoScreen';

export const goToAccountInfo = () => navigate('AccountInfo');

export const goToTourGuideInfo = (tourGuideId: string) => navigate('TourGuideInfo', { tourGuideId });
