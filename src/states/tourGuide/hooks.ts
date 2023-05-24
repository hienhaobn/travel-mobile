import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../index';
import { fetchTourGuidePopular } from './index';
import { selectTourGuides } from './selectors';

export const useFetchTourGuidePopular = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTourGuidePopular());
    }, [dispatch]);
};

export const useTourGuideSelector = () => {
    return useSelector(selectTourGuides);
};
