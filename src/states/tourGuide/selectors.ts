import { GlobalState } from '../types';

export const selectTourGuides = (state: GlobalState) => state.tourGuides.data;
