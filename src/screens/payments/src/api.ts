import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from 'configs/api';
import { IToken } from 'constants/global-variables';
import Storages, { KeyStorage } from 'utils/storages';

export const getTransaction = async () => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    let response;
    if (decoded.role === 'USER') {
        response = await axios.get(`${BASE_URL}/users/transaction?startDate=2015-01-01&endDate=2024-01-01&limit=100`, {
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        });
    } else if (decoded.role === 'TOURGUIDE') {
        response = await axios.get(
            `${BASE_URL}/tour-guide/transaction?startDate=2015-01-01&endDate=2024-01-01&limit=100`,
            { headers: { Authorization: `Bearer ${tokenInfo.accessToken}` } }
        );
    }
    return response.data;
};
