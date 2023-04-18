import { useEffect } from 'react';

import { fetchInitialProvincesData } from '.';

import { useAppDispatch } from 'states';

export const useFetchProvinces = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchInitialProvincesData());
    }, [dispatch]);
};
