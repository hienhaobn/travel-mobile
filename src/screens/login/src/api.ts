import axios from 'axios';

import { BASE_URL } from 'configs/api';

export const apiLogin = async (email: string, password: string) => {
    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    );
    return response.data;
};
