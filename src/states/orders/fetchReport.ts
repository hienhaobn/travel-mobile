import axiosInstance from 'services/api-requests';

export const apiReportTourGuide = async ({ content, orderId }: { content: string, orderId: number }) => {
    try {
        const response = await axiosInstance.post(`/reports/tourguide`, {
            content,
            orderId,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
