import axios from 'axios';

import { BASE_URL } from 'configs/api';

export const apiGetProvinces = async () => {
    const res = await axios.get(`${BASE_URL}/provinces`);
    return res.data;
};
