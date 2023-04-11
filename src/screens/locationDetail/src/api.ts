import axios from 'axios';

import { BASE_URL } from 'configs/api';

export const apiGetTours = async () => {
    const response = await axios.get(`${BASE_URL}/tours`);
    return response?.data.data;
};

export const apiPostOrder = async (body: OrderTourRequest) => {
    const response = await axios.post(`${BASE_URL}/orders`, body);
    return response;
};
