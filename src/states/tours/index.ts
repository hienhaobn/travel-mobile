import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api-requests';
import { fetchTourGuidePopular } from '../tourGuide';

const initialState: tour.State = {
    popularTours: {
        data: [],
        total: 1,
        currentPage: 1,
        totalPages: 1,
        limit: 1,
    },
    isLoading: false,
};

export const fetchPopularTours = createAsyncThunk<{ returnValue: {
        data: tour.Tour[];
        total: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    };}>('user/fetchPopularTours', async () => {
    try {
        return await axiosInstance.get('/tours');
    } catch (error) {
        console.log(error);
    }
});

export const tourSlice = createSlice({
    name: 'Tours',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(fetchPopularTours.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPopularTours.rejected, (state) => {
                state = initialState;
                state.isLoading = false;
            })
            .addCase(fetchPopularTours.fulfilled, (state, action) => {
                const { returnValue } = action.payload;
                state.popularTours.data = returnValue.data;
                state.popularTours.total = returnValue.total;
                state.popularTours.currentPage = returnValue.currentPage;
                state.popularTours.totalPages = returnValue.totalPages;
                state.popularTours.limit = returnValue.limit;
                state.isLoading = false;
            });
    }),
});

export default tourSlice.reducer;
