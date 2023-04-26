import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectOrderFinished, selectOrderProcessing, selectOrderWaiting } from './selectors';

import { fetchOrderFinished, fetchOrderProcessing, fetchOrderWaiting } from '.';

import { useAppDispatch } from 'states';

export const useFetchOrderWaiting = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrderWaiting());
    }, [dispatch]);
};

export const useFetchOrderProcessing = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrderProcessing());
    }, [dispatch]);
};

export const useFetchOrderFinished = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrderFinished());
    }, [dispatch]);
};

export const useSelectOrderWaiting = () => {
    return useSelector(selectOrderWaiting);
};

export const useSelectOrderProcessing = () => {
    return useSelector(selectOrderProcessing);
};

export const useSelectOrderFinished = () => {
    return useSelector(selectOrderFinished);
};
