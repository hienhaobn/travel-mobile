import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from 'services/api-requests';

const initialState: ProvincesState = {
    data: [],
    loadingKeys: {},
};

// Async thunk
export const fetchInitialProvincesData = createAsyncThunk(
    'provinces/fetchInitialProvincesDate',
    async () => {
        const res = axiosInstance
            .get('/provinces')
            .catch((err) => {
                console.log('error:: ', err)
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
            state.data = action.payload.returnValue;
        });
    },
});

export default provincesSlice.reducer;
