/* eslint-disable complexity */
import { Modal } from 'react-native';

import Dialog, { DialogType } from 'components/Dialog/Dialog';

import { EOrderStatus } from 'constants/order';

import { navigate } from 'navigation/utils';

export const goToTourStatus = () => navigate('TourStatus');

export const goToTourStatusDetail = (order: order.OrderDetail) => navigate('TourStatusDetail', { order });

export const getOrderStatus = (status: string, userStart?: boolean, tourGuideStart?: boolean) => {
    if (status === EOrderStatus.WAITING_TOUR_GUIDE) {
        return 'Hướng dẫn viên đang xử lý';
    } else if (status === EOrderStatus.PROCESSING) {
        return 'Đang tiến hành';
    } else if (status === EOrderStatus.WAITING_START) {
        // console.log(userStart, tourGuideStart);
        if (!userStart && !tourGuideStart) {
            return 'Đang chờ bắt đầu';
        } else if (!userStart && tourGuideStart) {
            return 'Đang chờ người dùng bắt đầu';
        } else {
            return 'Đang chờ hướng dẫn viên bắt đầu';
        }
    } else if (status === EOrderStatus.WAITING_PURCHASE) {
        return 'Đợi thanh toán';
    } else if (status === EOrderStatus.WAITING_PREPAID) {
        return 'Đợi đặt cọc';
    } else if (status === EOrderStatus.REJECTED) {
        return 'Chuyến đi bị huỷ';
    } else if (status === EOrderStatus.DONE) {
        return 'Hoàn thành';
    }
};

export const convertDate = (input: string) => {
    const parts = input.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
};
