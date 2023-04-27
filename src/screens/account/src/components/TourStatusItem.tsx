import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { ETourStatusScreenTabKey, TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { getOrderStatus, goToTourStatusDetail } from 'screens/account/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';

interface TourStatusItemProps {
    order: order.OrderDetail;
    route: TourStatusScreenRouteProps;
}

const TourStatusItem = (props: TourStatusItemProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { order, route } = props;
    const { tour } = order;

    const renderButtonLeft = () => (
        <>
            {route.key === ETourStatusScreenTabKey.tourWaiting ? (
                <TouchableOpacity style={styles.shopContainer}>
                    <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
                    <Text style={styles.sellNow}>Thanh toán</Text>
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer}>
                <View style={styles.itemContentContainer}>
                    <View>
                        <FastImage
                            // source={
                            //     province?.images
                            //         ? {
                            //               uri: province?.images,
                            //           }
                            //         : Images.BacNinhImg
                            // }
                            source={Images.Mountain}
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
                            <Text style={styles.timeStartContainer}>{order?.startDate} - Giờ đi: 07:10 AM</Text>
                        <View style={styles.statusContainer}>
                            <Text style={styles.statusTxt}>{getOrderStatus(order.status)}</Text>
                        </View>
                    </View>
                    <View style={styles.itemHeaderContainer}>
                        <Text style={styles.tourGuideName} numberOfLines={3}>
                            {tour.name}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.textLocation}>Nơi khởi hành: </Text>
                        <Text style={styles.startLocation}>Hà Nội</Text>
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
        </View>
    );
};

export default TourStatusItem;

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
    });
};
