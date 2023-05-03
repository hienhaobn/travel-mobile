import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from 'services/api-requests';

const initialState: OrdersState = {
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

export const fetchOrderWaiting = createAsyncThunk<{ returnValue: order.OrderDetail[] }>('tours/fetchOrderWaiting', async () => {
    try {
        return await axiosInstance.get('/orders/user', {
            params: {
                type: 'waiting',
            },
        });
    } catch (error) {
        console.log(error);
    }
});

export const fetchOrderProcessing = createAsyncThunk<{ returnValue: order.OrderDetail[] }>('tours/fetchOrderProcessing', async () => {
    try {
        return await axiosInstance.get('/orders/user', {
            params: {
                type: 'waiting',
            },
        });
    } catch (error) {
        console.log(error);
    }
});


export const fetchOrderFinished = createAsyncThunk<{ returnValue: order.OrderDetail[] }>('tours/fetchOrderDone', async () => {
    try {
        return await axiosInstance.get('/orders/user', {
            params: {
                type: 'waiting',
            },
        });
    } catch (error) {
        console.log(error);
    }
});

export const toursSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderWaiting.pending, (state, action) => {
            state.orderWaiting.data = [];
            state.orderWaiting.isLoading = true;
        })
        .addCase(fetchOrderWaiting.rejected, (state, action) => {
            state.orderWaiting.data = [];
            state.orderWaiting.isLoading = false;
        })
        .addCase(fetchOrderWaiting.fulfilled, (state, action) => {
            state.orderWaiting.data = action.payload?.returnValue;
            state.orderWaiting.isLoading = false;
        })
        .addCase(fetchOrderProcessing.pending, (state, action) => {
            state.orderProcessing.data = [];
            state.orderProcessing.isLoading = true;
        })
        .addCase(fetchOrderProcessing.rejected, (state, action) => {
            state.orderProcessing.data = [];
            state.orderProcessing.isLoading = false;
        })
        .addCase(fetchOrderProcessing.fulfilled, (state, action) => {
            state.orderProcessing.data = action.payload?.returnValue;
            state.orderProcessing.isLoading = false;
        })
        .addCase(fetchOrderFinished.pending, (state, action) => {
            state.orderFinished.data = [];
            state.orderFinished.isLoading = true;
        })
        .addCase(fetchOrderFinished.rejected, (state, action) => {
            state.orderFinished.data = [];
            state.orderFinished.isLoading = false;
        })
        .addCase(fetchOrderFinished.fulfilled, (state, action) => {
            state.orderFinished.data = action.payload?.returnValue;
            state.orderFinished.isLoading = false;
        })
    },
});

export default toursSlice.reducer;
