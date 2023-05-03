import { BASE_URL } from 'configs/api';

import axiosInstance from 'services/api-requests';

export const apiGetTours = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/tours`);
    return response?.data.data;
};

export const apiPostOrder = async (body: OrderTourRequest) => {
    const response = await axiosInstance.post(`${BASE_URL}/orders`, body);
    return response;
};
