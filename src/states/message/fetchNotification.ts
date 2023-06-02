import axiosInstance from 'services/api-requests';

export const routeName = {
    REGISTER_DEVICE: '/device/register',
    REMOVE_DEVICE: 'device/delete',
};

export const apiRegisterDevice = async (params: chat.RegisterDeviceParams): Promise<any> => {
    try {
        const res: any = await axiosInstance.post(routeName.REGISTER_DEVICE, params);
        console.log('res', res);
        return res || undefined;
    } catch (error) {
        // console.log('apiRegisterDevice - error: ', error);
        return undefined;
    }
};

export const apiRemoveDevice = async (params: chat.RegisterDeviceParams): Promise<any> => {
    try {
        const res: any = await axiosInstance.delete(routeName.REMOVE_DEVICE, {
            params: params
        });
        return res || undefined;
    } catch (error) {
        // console.log('apiRegisterDevice - error: ', error);
        return undefined;
    }
};
