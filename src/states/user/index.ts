import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from 'services/api-requests';

const initialState: UserState = {
    profile: {
        id: null,
        email: '',
        username: '',
        phone: '',
        balance: '',
        availableBalance: '',
        voucherPoint: null,
        avatar: '',
        verifyStatus: '',
        isSetup: false,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        role: '',
    },
    userVouchers: [],
    userFavorites: [],
    orders: [],
    token: '',
    isLoading: false,
};

export const fetchMe = createAsyncThunk<{ returnValue: UserResponse }>('user/fetchMe', async () => {
    try {
        return await axiosInstance.get('/auth/me');
    } catch (error) {
        console.log(error);
    }
});

export const userSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                const { userVouchers, userFavorites, orders, ...others } = action.payload.returnValue;
                state.profile = others;
                state.orders = orders;
                state.userVouchers = userVouchers;
                state.userFavorites = userFavorites;
            });
    },
});

export default userSlice.reducer;
