import { hideLoading, showLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const fetchDeposit = async (amount: number) => {
    try {
        showLoading();
        const res: common.Response = await axiosInstance.post('/users/deposit', { amount });
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
