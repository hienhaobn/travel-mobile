import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import stringify from 'fast-json-stable-stringify';

import { AppState } from './../index';

import axiosInstance from 'services/api-requests';

const initialState: ProvincesState = {
    data: [],
    userDataLoaded: false,
    loadingKeys: {},
};

// Async thunk
export const fetchInitialProvincesData = createAsyncThunk(
    'provinces/fetchInitialProvincesDate',
    async () => {
        const res = axiosInstance
            .get('/provinces')
            .catch((err) => {
                throw err;
            })
            .then((data) => data);
        return res;
    }
);

export const provincesSlice = createSlice({
    name: 'Provinces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInitialProvincesData.fulfilled, (state, action) => {
            console.log({ state, action });
        });
    },
});

export default provincesSlice.reducer;
