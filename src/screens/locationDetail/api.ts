import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { hideLoading, showLoading } from 'components/Loading';
import { BASE_URL } from 'configs/api';
import { IToken } from 'constants/global-variables';
import axiosInstance from 'services/api-requests';
import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';

export const getInfor = async () => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    return decoded;
};

export const getTourListByProvince = async (provinceId: number) => {
    const url = `/tours?limit=100`;
    try {
        showLoading();
        const res: { returnValue: tour.Tour[] } = await axiosInstance.get(url, {
            params: {
                provinceId,
            },
        });
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const getTourguideByProvince = async (provinceId: number) => {
    const url = `/tour-guide?limit=100`;
    try {
        showLoading();
        const res: { returnValue: tour.Tour[] } = await axiosInstance.get(url, {
            params: {
                provinces: provinceId,
            },
        });
        hideLoading();
        console.log(res.returnValue);
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const likeProvince = async (provinceId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.put(
        `${BASE_URL}/users/favorite`,
        { provinceId },
        {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        }
    );
    return response.data.returnValue;
};

export const checkIsLiked = async (provinceId: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.put(
        `${BASE_URL}/users/check-favorite`,
        { provinceId },
        {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        }
    );
    return response.data.returnValue;
};
