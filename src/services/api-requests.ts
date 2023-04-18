import axios from 'axios';

import { EventBusName, onPushEventBus } from './event-bus';

import { BASE_URL } from 'configs/api';
import { GlobalVariables } from 'constants/index';

const TIME_OUT = 60 * 1000;
const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: TIME_OUT,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (GlobalVariables?.tokenInfo?.accessToken) {
            config.headers['Authorization'] = `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    async (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        try {
            if (!error.response) {
                // noti.error(errorMessage.AUTHEN);
                return Promise.reject(error);
            }

            switch (error.response?.status) {
                case 401:
                    onPushEventBus(EventBusName.LOGOUT);
                    break;
                case 500:
                    // noti.error(errorMessage.SERVER_INTERNAL_ERROR);
                    break;

                case 400:
                    return error.response;

                case 403:
                    onPushEventBus(EventBusName.LOGOUT);
                    return Promise.reject({ ...error });

                case 302:
                    return error.response;

                default:
                    break;
            }

            return Promise.reject(error);
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export default axiosInstance;
