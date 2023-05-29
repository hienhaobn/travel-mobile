import { GlobalState } from '../types';

export const selectPopularTours = (state: GlobalState) => state.tours.popularTours.data;
