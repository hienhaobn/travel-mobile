import axiosInstance from 'services/api-requests';

export const fetchTourGuideById = async (tourGuideId: number) => {
    try {
        const response: tourGuide.TourGuideProfileResponse = await axiosInstance.get(`/tour-guide/guest/${tourGuideId}`);
        return response.returnValue;
    } catch (error) {
        console.log(error);
    }
};
