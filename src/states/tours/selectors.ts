import { GlobalState } from 'states/types';

export const selectOrderWaiting = (state: GlobalState) => state.tours.orderWaiting;
