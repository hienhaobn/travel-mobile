import axios from 'axios';

import { BASE_URL } from 'configs/api';

import { IToken } from 'constants/global-variables';

import Storages, { KeyStorage } from 'utils/storages';

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
