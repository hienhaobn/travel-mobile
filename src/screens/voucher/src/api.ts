import axios from 'axios';

import { hideLoading, showLoading } from 'components/Loading';

import { BASE_URL } from 'configs/api';

import axiosInstance from 'services/api-requests';

import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';

import { IToken } from 'constants';

export const fetchVouchers = async (discountType?: '0' | '1') => {
    try {
        const url = discountType ? `/vouchers?limit=100&discountType=${discountType}` : '/vouchers?limit=100';
        showLoading();
        const res: { returnValue: voucher.Voucher[] } = await axiosInstance.get(url);
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchMyVouchers = async () => {
    try {
        const url = `/vouchers/available`;

        showLoading();
        const res: { returnValue: voucher.Voucher[] } = await axiosInstance.get(url);
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const claimVoucher = async (voucherId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    // return;
    const response = await axios.put(
        `${BASE_URL}/vouchers/${voucherId}`,
        {},
        {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        }
    );
    return response.data;
};
