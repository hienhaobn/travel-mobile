import { navigate } from 'navigation/utils';

export const goToTourDetail = (tour: tour.Tour) => navigate('TourDetail', { tour });
