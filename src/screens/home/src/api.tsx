import { hideLoading, showLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const getTopProvinces = async () => {
  const url = `/provinces/top`;
  try {
    showLoading();
    const res: { returnValue: [] } = await axiosInstance.get(url, {

    });
    hideLoading();
    return res.returnValue;
  } catch (error) {
    hideLoading();
    showCustomToast('Thất bại');
    console.log(error);
  }
};

export const getTopTourGuides = async () => {
  const url = `/tour-guide?totalFavorite=DESC&limit=5`;
  try {
    showLoading();
    const res: { returnValue: [] } = await axiosInstance.get(url, {

    });
    hideLoading();
    return res.returnValue;
  } catch (error) {
    hideLoading();
    showCustomToast('Thất bại');
    console.log(error);
  }
};

export const getTopTours = async () => {
  const url = `/tours?limit=5`;
  try {
    showLoading();
    const res: { returnValue: [] } = await axiosInstance.get(url, {

    });
    hideLoading();
    return res.returnValue;
  } catch (error) {
    hideLoading();
    showCustomToast('Thất bại');
    console.log(error);
  }
};
