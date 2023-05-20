import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { apiEndOrder, apiPaidOrder, apiPrepaid, apiStartOrder, getInfor } from '../../api';
import TourStatusConfirmPopup, { ITourStatusConfirmPopupRef } from '../TourStatusConfirmPopup';
import TourStatusRatePopup, { ITourStatusRatePopupRef } from '../TourStatusRatePopup';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';

import { EOrderStatus } from 'constants/order';

import { useTheme } from 'hooks/useTheme';

import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { convertDate, getOrderStatus, goToTourStatusDetail } from 'screens/account/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

interface TourStatusItemProps {
  order: order.OrderDetail;
  route: TourStatusScreenRouteProps;
}

const handlePrePaid = async (orderId: number) => {
  try {
    showLoading();
    const response = await apiPrepaid(orderId);
    hideLoading();
    showCustomToast('Đặt cọc thành công !');
  } catch (error) {
    hideLoading();
    showCustomToast(error?.response?.data?.info?.message);
  }
};

const handlePaid = async (orderId: number) => {
  try {
    showLoading();
    const response = await apiPaidOrder(orderId);
    hideLoading();
    showCustomToast('Thanh toán chuyến đi thành công !');
  } catch (error) {
    hideLoading();
    showCustomToast(error?.response?.data?.info?.message);
  }
};

const handleStartOrder = async (orderId: number) => {
  try {
    showLoading();
    const response = await apiStartOrder(orderId);
    hideLoading();
    showCustomToast('Bắt đầu chuyến đi !');
  } catch (error) {
    hideLoading();
    if (error?.response?.data?.code === 'ERR_ORDER_002') {
      showCustomToast('Chưa đến ngày bắt đầu!');
    } else {
      showCustomToast(error?.response?.data?.info?.message);
    }
  }
};

const handleEndOrder = async (orderId: number) => {
  try {
    showLoading();
    const response = await apiEndOrder(orderId);
    hideLoading();
    showCustomToast('Chuyến đi kết thúc thành công !');
  } catch (error) {
    hideLoading();
    if (error?.response?.data?.code === 'ERR_ORDER_002') {
      showCustomToast('Chưa đến ngày bắt đầu!');
    } else {
      showCustomToast(error?.response?.data?.info?.message);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let actionButton: any = {};

const UserTourStatusItem = (props: TourStatusItemProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { order, route } = props;
  const { tour } = order;
  const refTourStatusConfirmPopup = useRef<ITourStatusConfirmPopupRef>(null);
  const refTourStatusRatePopup = useRef<ITourStatusRatePopupRef>(null);
  const renderButtonLeft = () => {
    if (order.status === EOrderStatus.WAITING_TOUR_GUIDE) {
      return <View />;
    } else if (order.status === EOrderStatus.WAITING_PREPAID) {
      actionButton = {
        title: 'Đặt cọc chuyến đi',
        onConfirm: () => handlePrePaid(order.id),
        text: `Bạn có muốn đặt cọc số tiền ${formatCurrency(
          BigNumber(0.1).times(order.price).toString()
        )} VNĐ cho chuyến đi này ?`,
      };
      return (
        <TouchableOpacity style={styles.shopContainer} onPress={refTourStatusConfirmPopup?.current?.showModal}>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Đặt cọc</Text>
        </TouchableOpacity>
      );
    } else if (order.status === EOrderStatus.WAITING_PURCHASE) {
      actionButton = {
        title: 'Thanh toán chuyến đi',
        onConfirm: () => handlePaid(order.id),
        text: `Bạn có muốn thanh toán số tiền ${formatCurrency(
          BigNumber(order.price).minus(order.paid).toString()
        )} VNĐ cho chuyến đi này ?`,
      };
      return (
        <TouchableOpacity style={styles.shopContainer} onPress={refTourStatusConfirmPopup?.current?.showModal}>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Thanh toán</Text>
        </TouchableOpacity>
      );
    } else if (order.status === EOrderStatus.WAITING_START) {
      actionButton = {
        title: 'Bắt đầu chuyến du lịch',
        onConfirm: () => handleStartOrder(order.id),
        text: `Bắt đầu chuyến du lịch thú vị cùng hướng dẫn viên: ${order.tourGuide.name}`,
      };
      return (
        <TouchableOpacity style={styles.shopContainer} onPress={refTourStatusConfirmPopup?.current?.showModal}>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Bắt đầu</Text>
        </TouchableOpacity>
      );
    } else if (order.status === EOrderStatus.PROCESSING) {
      actionButton = {
        title: 'Kết thúc chuyến du lịch',
        onConfirm: () => handleEndOrder(order.id),
        text: `Cảm ơn bạn đã lựa chọn Ktravel.`,
      };
      return route.role === 'USER' ? (
        <TouchableOpacity style={styles.shopContainer} onPress={refTourStatusConfirmPopup?.current?.showModal}>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Kết thúc</Text>
        </TouchableOpacity>
      ) : (
        <View />
      );
    } else if (order.status === EOrderStatus.DONE) {
      return order.star === null ? (
        <TouchableOpacity style={styles.shopContainer} onPress={refTourStatusRatePopup?.current?.showModal}>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Đánh giá</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.disableButton} disabled>
          <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
          <Text style={styles.sellNow}>Đã đánh giá</Text>
        </TouchableOpacity>
      );
    } else if (order.status === EOrderStatus.REJECTED) {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer}>
        <View style={styles.itemContentContainer}>
          <View>
            <FastImage
              // source={r
              //     province?.images
              //         ? {
              //               uri: province?.images,
              //           }
              //         : Images.BacNinhImg
              // }
              source={{ uri: tour.images[Math.floor(Math.random() * tour.images.length)].url }}
              style={styles.itemImages}
            />
            <View style={styles.rateContainer}>
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
              <Text style={styles.rate}>4.8</Text>
            </View>
            <TouchableOpacity style={styles.heart}>
              <SvgIcons.IcHeartOutline
                color={getThemeColor().white}
                width={scales(17)}
                height={scales(17)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.timeStartContainer}>{convertDate(order?.startDate)}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusTxt}>
                {getOrderStatus(order.status, order.userStart, order.tourGuideStart)}
              </Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.tourGuideName} numberOfLines={3}>
              {tour.name}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.textLocation}>Thời gian: </Text>
            <Text style={styles.startLocation}>{order.startDate.split('-').reverse().join('-')} - {order.endDate.split('-').reverse().join('-')}</Text>
          </View>
          <Text style={styles.textPrice}>{formatCurrency(order.price)} đ</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: scales(10) }}>
            {renderButtonLeft()}
            <TouchableOpacity style={styles.showInfoContainer} onPress={() => goToTourStatusDetail(order)}>
              <Text style={styles.textShowInfo}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <TourStatusConfirmPopup
        ref={refTourStatusConfirmPopup}
        onConfirm={actionButton.onConfirm}
        title={actionButton.title}
        text={actionButton.text}
      />
      <TourStatusRatePopup
        ref={refTourStatusRatePopup}
        onConfirm={actionButton.onConfirm}
        title={actionButton.title}
      // text={actionButton.text}
      />
    </View>
  );
};

export default UserTourStatusItem;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      marginBottom: scales(24),
      marginLeft: scales(5),
    },
    tabview: {
      backgroundColor: color.Color_Bg,
      marginLeft: scales(15),
      shadowColor: 'transparent',
    },
    labelTabText: {
      ...Fonts.inter700,
      fontSize: scales(17),
      color: color.Text_Dark_1,
    },
    itemContainer: {
      marginTop: scales(5),
      marginHorizontal: scales(10),
      width: Sizes.scrWidth - scales(30),
      borderRadius: scales(8),
    },
    itemContentContainer: {},
    itemImages: {
      width: Sizes.scrWidth - scales(30),
      height: Sizes.scrWidth / 3,
      borderRadius: scales(8),
    },
    itemHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scales(10),
    },
    rateContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: scales(8),
      right: 0,
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.white,
      marginRight: scales(5),
    },
    tourGuideName: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scales(10),
    },
    textLocation: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    startLocation: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    heart: {
      position: 'absolute',
      top: scales(10),
      left: scales(10),
      backgroundColor: getThemeColor().Text_Color_Opacity_30,
      padding: scales(2),
      borderRadius: scales(3),
    },
    timeStartContainer: {
      marginTop: scales(10),
    },
    timeStartText: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: color.Text_Dark_5,
    },
    textPrice: {
      ...Fonts.inter600,
      fontSize: scales(13),
      color: color.Color_Red,
    },
    shopContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Red,
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
    },
    disableButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Gray,
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
    },
    sellNow: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().white,
      paddingLeft: scales(3),
    },
    showInfoContainer: {
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
      borderWidth: 1,
      borderColor: getThemeColor().Color_Primary,
    },
    textShowInfo: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: getThemeColor().Color_Primary,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scales(8),
    },
    statusContainer: {
      paddingVertical: scales(5),
      paddingHorizontal: scales(5),
      backgroundColor: color.Text_Color_Opacity_30,
      borderRadius: scales(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusTxt: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
};
