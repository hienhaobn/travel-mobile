import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/api-requests';

const initialState: UserState = {
    token: '',
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
    userVouchers: [],
    userFavorites: [],
    orders: [],
    role: '',
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
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMe.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchMe.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(fetchMe.fulfilled, (state, action) => {
            const data = action.payload.returnValue;
            console.log('data', data)
            state = {
                ...data,
                isLoading: false,
            } as UserState;
        })
    },
});

export default userSlice.reducer;
