import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';


import ClaimVoucherConfirmPopup, { IClaimVoucherConfirmPopupRef } from './ClaimVoucherConfirmPopup';
import { claimVoucher } from '../api';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';


import { useTheme } from 'hooks/useTheme';


import { EventBusName, onPushEventBus } from 'services/event-bus';
import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';





// eslint-disable-next-line @typescript-eslint/no-explicit-any
export enum DiscountType {
  RATE = '0',
  FIX = '1',
}

const handleClaim = async (voucherId: number) => {
  try {
    showLoading();
    const response = await claimVoucher(voucherId);
    hideLoading();
    if (response) {
      onPushEventBus(EventBusName.CLAIM_SUCCESS)
    }
    showCustomToast('Thu thập voucher thành công');
  } catch (error) {
    hideLoading();
    showCustomToast(error?.response?.data?.info?.message);
  }
}

const VoucherItem = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { voucher, route, user } = props;
  const refClaimVoucherConfirmPopup = useRef<IClaimVoucherConfirmPopupRef>(null);
  const userVoucher = user.userVouchers.map(e => e.voucher.id);
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer}>
        <View style={styles.itemContentContainer}>
          <View>
            <FastImage
              source={voucher.discountType === DiscountType.RATE ? Images.Vourcher_1 : Images.Vourcher_2}
              style={styles.itemImages}
            />
            <TouchableOpacity style={styles.heart}>
              <SvgIcons.IcHeartOutline
                color={getThemeColor().white}
                width={scales(17)}
                height={scales(17)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.voucherName}>{voucher.name}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.quantityTxt}>
                {route.key !== 'myVouchers' ? `${voucher.quantity - +voucher.claimed} / ${voucher.quantity}` : null}
              </Text>
            </View>
          </View>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.tourGuideName}>
              #{voucher.code}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.contentVoucher}>Giảm {(voucher.discountType === DiscountType.RATE) ? `${voucher.value}% giá trị chuyến đi của bạn` : `${formatCurrency(voucher.value)} VNĐ cho chuyến đi của bạn`}</Text>
          </View>
          <Text style={styles.textPrice}>Từ: {voucher.startDate.split('T')[0].split('-').reverse().join('-')} đến {voucher.endDate.split('T')[0].split('-').reverse().join('-')}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: scales(10) }}>
            {/* <View /> */}
            {route.key !== 'myVouchers' ? (<TouchableOpacity style={styles.activeButton} onPress={refClaimVoucherConfirmPopup?.current?.showModal} >
              <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
              <Text style={styles.sellNow}>Thu thập</Text>
            </TouchableOpacity>) : null}

          </View>
        </View>
      </TouchableOpacity >
      <ClaimVoucherConfirmPopup
        ref={refClaimVoucherConfirmPopup}
        onConfirm={() => handleClaim(voucher.id)}
        title={'Thu thập mã giảm giá này ?'}
        text={voucher.requirementPoint === 0 ? 'Mã giảm giá miễn phí' : `Bạn cần ${voucher.requirementPoint} KCoin để đổi mã giảm giá này`}
      />
    </View >
  );
};

export default VoucherItem;

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
      color: color.Text_Red_1,
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
    contentVoucher: {
      ...Fonts.inter600,
      fontSize: scales(14),
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
    voucherName: {
      ...Fonts.inter600,
      fontSize: scales(18),
      color: color.Text_Dark_1,
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
    activeButton: {
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
      fontSize: scales(14),
      color: getThemeColor().white,
      paddingLeft: scales(3),
      paddingVertical: scales(3),
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
    quantityTxt: {
      ...Fonts.inter600,
      fontSize: scales(14),
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
