import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectOrderWaiting } from './selectors';

import { fetchOrderWaiting } from '.';

import { useAppDispatch } from 'states';

export const useFetchOrderWaiting = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOrderWaiting());
    }, [dispatch]);
};

export const useSelectOrderWaiting = () => {
    return useSelector(selectOrderWaiting);
};
