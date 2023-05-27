import { showLoading, hideLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const getTourListByTourguide = async (tourGuideId: number) => {
    const url = `/tours?limit=100`;
    try {
        showLoading();
        const res: { returnValue: tour.Tour[] } = await axiosInstance.get(url, {
            params: {
                tourGuideId,
            },
        });
        hideLoading();
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const getListTourGuide = async () => {
    const url = `/tour-guide?limit=100`;
    try {
        showLoading();
        const res: { returnValue: tour.Tour[] } = await axiosInstance.get(url, {});
        hideLoading();
        console.log(res.returnValue, '222');
        return res.returnValue;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};
