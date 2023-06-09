import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from 'configs/api';
import Storages, { KeyStorage } from 'utils/storages';
import { IToken } from 'constants';

export const createWithdrawReq = async (amount: number) => {
    const tokenInfo: IToken | null = await Storages.getObject(KeyStorage.Token);

    const decoded: any = jwt_decode(tokenInfo.accessToken);
    let response;
    if (decoded.role === 'USER') {
        response = await axios.post(
            `${BASE_URL}/transactions/user-withdraw`,
            { amount },
            {
                headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
            }
        );
    } else if (decoded.role === 'TOURGUIDE') {
        response = await axios.post(
            `${BASE_URL}/transactions/tourguide-withdraw`,
            { amount },
            {
                headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
            }
        );
    }
    return response.data;
};
