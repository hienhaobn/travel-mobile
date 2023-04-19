import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { makeProvinceById, selectProvinces } from './selectors';

import { fetchInitialProvincesData } from '.';
import { useAppDispatch } from 'states';

export const useFetchProvinces = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchInitialProvincesData());
    }, [dispatch]);
};

export const useSelectProvinces = () => {
    return useSelector(selectProvinces);
};

export const useProvinceById = (provinceId: string) => {
    const provinceById = useMemo(() => makeProvinceById(provinceId), [provinceId]);
    return useSelector(provinceById);
};
