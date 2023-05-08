import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { BASE_URL } from 'configs/api';

import { IToken } from 'constants/global-variables';

import Storages, { KeyStorage } from 'utils/storages';

export const getInfor = async () => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    return decoded;
};

export const apiPrepaid = async (orderId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    // return;
    const response = await axios.put(
        `${BASE_URL}/orders/prepaid`,
        { orderId },
        { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
    );
    return response.data;
};

export const apiPaidOrder = async (orderId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    // return;
    const response = await axios.put(
        `${BASE_URL}/orders/paid`,
        { orderId },
        { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
    );
    return response.data;
};

export const apiStartOrder = async (orderId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    let response;
    if (decoded.role === 'USER') {
        response = await axios.put(
            `${BASE_URL}/orders/start-user/${orderId}`,
            {},
            { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
        );
    } else if (decoded.role === 'TOURGUIDE') {
        response = await axios.put(
            `${BASE_URL}/orders/start-tourguide/${orderId}`,
            {},
            { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
        );
    }
    return response.data;
};

export const apiEndOrder = async (orderId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const response = await axios.put(
        `${BASE_URL}/orders/end-order`,
        { orderId },
        { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
    );
    return response.data;
};
