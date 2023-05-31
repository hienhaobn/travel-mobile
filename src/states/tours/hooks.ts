import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../index';
import { fetchPopularTours } from './index';
import { selectPopularTours } from './selectors';

export const useFetchPopularTours = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPopularTours());
    }, [dispatch]);
};

export const usePopularToursSelector = () => {
    return useSelector(selectPopularTours);
};
