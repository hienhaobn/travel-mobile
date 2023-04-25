import { GlobalState } from 'states/types';

export const selectOrderWaiting = (state: GlobalState) => state.tours.orderWaiting;

export const selectOrderProcessing = (state: GlobalState) => state.tours.orderProcessing;

export const selectOrderFinished = (state: GlobalState) => state.tours.orderFinished;
