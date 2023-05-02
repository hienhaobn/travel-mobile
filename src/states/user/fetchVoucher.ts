import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const fetchVouchers = async (discountType?: '0' | '1') => {
    try {
        const url = discountType? `/vourchers/${discountType}` : '/vourchers'
        showLoading();
        const res: user.VoucherResponse = await axiosInstance.get(url);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};
