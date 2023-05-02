import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchTourById = async (tourId: number) => {
    try {
        showLoading();
        const res: { returnValue: tour.Tour } = await axiosInstance.get(`/tours/${tourId}`);
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};
