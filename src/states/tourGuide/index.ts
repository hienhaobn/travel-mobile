import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api-requests';

const initialState: tourGuide.State = {
    data: [],
    total: 1,
    currentPage: 1,
    totalPages: 1,
    limit: 1,
    isLoading: false,
}

export const fetchTourGuidePopular = createAsyncThunk<{ returnValue: {
        data: tourGuide.TourGuide[];
        total: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    };}>('user/fetchTourGuide', async () => {
    try {
        return await axiosInstance.get('/tour-guide');
    } catch (error) {
        console.log(error);
    }
});

export const tourGuideSlice = createSlice({
    name: 'TourGuide',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(fetchTourGuidePopular.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(fetchTourGuidePopular.rejected, (state) => {
                state = initialState;
                state.isLoading = false;
            })
            .addCase(fetchTourGuidePopular.fulfilled, (state, action) => {
                const { returnValue } = action.payload;
                state.data = returnValue.data;
                state.total = returnValue.total;
                state.currentPage = returnValue.currentPage;
                state.totalPages = returnValue.totalPages;
                state.limit = returnValue.limit;
                state.isLoading = false;
            });
    }),
});

export default tourGuideSlice.reducer;
