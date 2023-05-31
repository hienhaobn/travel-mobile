import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile, selectTokenInfo } from 'states/user/selectors';

import { fetchMe } from '.';

import { useAppDispatch } from 'states';

export const useFetchMe = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMe());
    }, []);
};

export const useSelectProfile = () => {
    return useSelector(selectProfile);
}

export const useTokenInfoSelector = () => {
    return useSelector(selectTokenInfo);
}
