import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from 'configs/api';
import Storages, { KeyStorage } from 'utils/storages';
import { IToken } from 'constants';

export const getFavorites = async () => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.get(`${BASE_URL}/users/favorite?limit=100`, {
        headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
    });
    return response.data;
};
