import { useSelectProfile } from './hooks';
import { hideLoading, showLoading } from 'components/Loading';
import { Role } from 'constants/user';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const fetchDeposit = async (amount: number, role: Role) => {
    try {
        showLoading();
        const res: common.Response = await axiosInstance.post(
            role === Role.USER ? '/users/deposit' : '/tour-guide/deposit',
            {
                amount,
            }
        );
        hideLoading();
        if (res.statusCode === 200) {
            showCustomToast('Nạp tiền thành công');
        }
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Nạp tiền thất bại');
        console.log(error);
    }
};
