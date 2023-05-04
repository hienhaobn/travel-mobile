import axiosInstance from 'services/api-requests';

export const fetchOrderById = async (orderId: number) => {
    try {
        return await axiosInstance.get(`/orders/user/${orderId}`);
    } catch (error) {
        console.log(error);
    }
};
