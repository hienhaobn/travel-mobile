import axiosInstance from 'services/api-requests';

export const apiGetAvailableStatus = async () => {
    try {
        const res: { code: string, message: string, returnValue: boolean, statusCode: number } = await axiosInstance.get('/tour-guide/available-status');
        return res.returnValue;
    } catch (error) {
        console.log('apiGetAvailableStatus', error);
    }
}

export const apiToggleAvailableStatus = async (status: boolean) => {
    try {
        const res: { code: string, message: string, returnValue: boolean, statusCode: number } = await axiosInstance.put('/tour-guide/available-status', {
            status
        });
        return res.returnValue;
    } catch (error) {
        console.log('apiToggleAvailableStatus', error);
    }
}
