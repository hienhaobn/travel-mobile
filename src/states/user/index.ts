import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/api-requests';
import { GlobalVariables } from '../../constants';
import { resetStack } from '../../navigation/utils';
import Storages, { KeyStorage } from '../../utils/storages';
import { showCustomToast } from '../../utils/toast';

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
    tokenInfo: {
        accessToken: '',
        refreshToken: '',
    },
    isLoading: false,
};

export const fetchMe = createAsyncThunk<{ returnValue: UserResponse }>('user/fetchMe', async () => {
    try {
        return await axiosInstance.get('/auth/me');
    } catch (error) {
        console.log(error);
    }
});

export const apiLoginUser = createAsyncThunk<user.UserLoginResponse, { email: string, password: string }>('user/loginUser',async ({ email, password }) => {
    try {
        const response: user.UserLoginResponse = await axiosInstance.post(
            '/auth/login',
            { email, password },
        );
        if (response?.data?.statusCode === 400) {
            showCustomToast(response?.data?.info?.message[0]);
            return;
        }
        if (response?.returnValue?.accessToken) {

            GlobalVariables.tokenInfo = {
                accessToken: response?.returnValue?.accessToken,
                refreshToken: response?.returnValue?.refreshToken,
            };
            Storages.saveObject(KeyStorage.Token, GlobalVariables.tokenInfo);
            resetStack('Main');
        }
        return response;
    } catch (error) {
        console.log('login user', error);
    }
});

export const apiLoginTourGuide = createAsyncThunk<user.UserLoginResponse, { email: string, password: string }>('user/loginTourGuide',async ({ email, password }) => {
    try {
        const response: user.UserLoginResponse = await axiosInstance.post(
            '/auth/login-tourguide',
            { email, password },
        );
        if (response?.data?.statusCode === 400) {
            showCustomToast(response?.data?.info?.message[0])
            return;
        }
        if (response?.returnValue?.accessToken) {

            GlobalVariables.tokenInfo = {
                accessToken: response?.returnValue?.accessToken,
                refreshToken: response?.returnValue?.refreshToken,
            };
            Storages.saveObject(KeyStorage.Token, GlobalVariables.tokenInfo);
            resetStack('Main');
        }
        return response;
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
            })
            .addCase(apiLoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(apiLoginUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(apiLoginUser.fulfilled, (state, action) => {
                state.tokenInfo.accessToken = action.payload?.returnValue?.accessToken;
                state.tokenInfo.refreshToken = action.payload?.returnValue?.refreshToken;
                state.isLoading = false;
            })
            .addCase(apiLoginTourGuide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(apiLoginTourGuide.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(apiLoginTourGuide.fulfilled, (state, action) => {
                console.log('action.payload', action.payload);
                state.tokenInfo.accessToken = action.payload?.returnValue?.accessToken;
                state.tokenInfo.refreshToken = action.payload?.returnValue?.refreshToken;
                state.isLoading = false;
            })
    },
});

export default userSlice.reducer;
