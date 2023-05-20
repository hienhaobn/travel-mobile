import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { hideLoading, showLoading } from 'components/Loading';

import { BASE_URL } from 'configs/api';

import { IToken } from 'constants/global-variables';

import axiosInstance from 'services/api-requests';
import { EventBusName, onPushEventBus } from 'services/event-bus';

import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';

export const getInfor = async () => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    return decoded;
};

export const userFetchOrderByStatus = async (status: string, role: string) => {
    const url = role === 'TOURGUIDE' ? `/orders/tourguide` : `/orders/user`;
    try {
        showLoading();
        const res: { returnValue: order.OrderDetail[] } = await axiosInstance.get(url, {
            params: {
                type: status,
            },
        });
        if (res) {
            onPushEventBus(EventBusName.ACTION_ORDER);
        }
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
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

export const apiConfirmOrder = async (orderId: number, action: string) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.put(
        `${BASE_URL}/orders/tourguide/approve-order`,
        { orderId, action },
        { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
    );
    return response.data;
};
