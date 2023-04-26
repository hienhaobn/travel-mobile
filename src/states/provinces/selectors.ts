import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from 'states/types';

export const selectProvinces = (state: GlobalState) => state.provinces.data;

export const makeProvinceById = (provinceId: string) => createSelector([selectProvinces], (provinces: location.Province[]) => {
    return provinces.find(province => province.id === provinceId);
});
