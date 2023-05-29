import { GlobalState } from 'states/types';

export const selectProfile = (state: GlobalState) => state.users.profile;

export const selectTokenInfo = (state: GlobalState) => state.users.tokenInfo;
