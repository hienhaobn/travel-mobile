import { GlobalState } from 'states/types';

export const selectProfile = (state: GlobalState) => state.users.profile;
