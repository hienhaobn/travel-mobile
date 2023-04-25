import { EOrderStatus } from 'constants/order';
import { navigate } from 'navigation/utils';

export const goToTourStatus = () => navigate('TourStatus');

export const goToTourStatusDetail = () => navigate('TourStatusDetail');

export const getOrderStatus = (status: string) => {
    if (status === EOrderStatus.WAITING_TOUR_GUIDE) {
        return 'Hướng dẫn viên đang xử lý';
    } else if (status === EOrderStatus.PROCESSING) {
        return 'Đang xử lý';
    } else if (status === EOrderStatus.WAITING_START) {
        return 'Đang bắt đầu'
    } else if (status === EOrderStatus.WAITING_PURCHASE) {
        return 'Đợi thanh toán'
    } else if (status === EOrderStatus.REJECTED) {
        return 'Chuyến đi bị huỷ';
    } else if (status === EOrderStatus.DONE) {
        return 'Hoàn thành';
    }
}
