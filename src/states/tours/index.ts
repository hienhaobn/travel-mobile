import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from 'services/api-requests';

const initialState: ToursState = {
    data: [],
    orderWaiting: {
        data: [],
        isLoading: false,
    },
    orderProcessing: {
        data: [],
        isLoading: false,
    },
    orderFinished: {
        data: [],
        isLoading: false,
    },
    loadingKeys: {},
};

export const fetchOrderWaiting = createAsyncThunk<{ returnValue: tour.Tour[] }>('tours/fetchOrderWaiting', async () => {
    try {
        return await axiosInstance.get('/orders', {
            params: {
                type: 'waiting',
            },
        });
    } catch (error) {
        console.log(error);
    }
});

export const toursSlice = createSlice({
    name: 'Tours',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderWaiting.pending, (state, action) => {
            state.orderWaiting.data = [];
            state.orderWaiting.isLoading = true;
        });
        builder.addCase(fetchOrderWaiting.rejected, (state, action) => {
            state.orderWaiting.data = [];
            state.orderWaiting.isLoading = false;
        });
        builder.addCase(fetchOrderWaiting.fulfilled, (state, action) => {
            state.orderWaiting.data = action.payload?.returnValue;
            state.orderWaiting.isLoading = false;
        });
    },
});

export default toursSlice.reducer;
