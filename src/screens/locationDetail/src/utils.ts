import { navigate } from 'navigation/utils';

export const goToLocationDetail = (provinceId: string) => navigate('LocationDetail', { provinceId });
