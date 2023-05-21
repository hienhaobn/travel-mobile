import axios from 'axios';

import { BASE_URL } from 'configs/api';

export const apiLogin = async (email: string, password: string) => {
    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
    );
    return response.data;
};

export const apiLoginTourGuide = async (email: string, password: string) => {
    const response = await axios.post(
        `${BASE_URL}/auth/login-tourguide`,
        { email, password },
    );
    return response.data;
};

