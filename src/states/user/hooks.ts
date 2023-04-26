import { useEffect } from 'react';

import { fetchMe } from '.';

import { useAppDispatch } from 'states';

export const useFetchMe = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMe());
    }, []);
};
