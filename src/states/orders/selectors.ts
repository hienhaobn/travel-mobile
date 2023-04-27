import { GlobalState } from 'states/types';

export const selectOrderWaiting = (state: GlobalState) => state.orders.orderWaiting;

export const selectOrderProcessing = (state: GlobalState) => state.orders.orderProcessing;

export const selectOrderFinished = (state: GlobalState) => state.orders.orderFinished;
