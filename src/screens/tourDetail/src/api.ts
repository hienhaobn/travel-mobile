import axios from 'axios';
import { BASE_URL } from 'configs/api';
import Storages, { KeyStorage } from 'utils/storages';
import { IToken } from 'constants';

export const getTours = async (topics?: string, keyword?: string) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);
    const response = await axios.get(`${BASE_URL}/tours?limit=100`, {
        headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
    });
    console.log(response.data);
    return response.data;
};
