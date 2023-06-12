import { BASE_URL } from 'configs/api';
import axiosInstance from 'services/api-requests';

export const fetchTourGuideById = async (tourGuideId: number) => {
    try {
        const response: tourGuide.TourGuideProfileResponse = await axiosInstance.get(
            `/tour-guide/guest/${tourGuideId}`
        );
        return response.returnValue;
    } catch (error) {
        console.log(error);
    }
};

export const checkIsLikedTourGuide = async (tourGuideId: number) => {
    const response = await axiosInstance.put(`${BASE_URL}/users/check-favorite`, { tourGuideId });
    return response.returnValue;
};

export const likeTourGuide = async (tourGuideId: number) => {
    const response = await axiosInstance.put(`${BASE_URL}/users/favorite`, { tourGuideId });
    return response;
};
