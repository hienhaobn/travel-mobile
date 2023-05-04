import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goToTourDetail } from 'screens/tourDetail/src/utils';

import { EventBusName, onPushEventBus } from 'services/event-bus';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ILocationDetailTourItemProps {
    tour: tour.Tour;
}

function LocationDetailTourItem(props: ILocationDetailTourItemProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { tour } = props;

    const onTourOrder = async () => {
        onPushEventBus(EventBusName.OPEN_BOTTOM_SHEET_ORDER_TOUR, tour);
    };

    const onGoToTourDetail = () => {
        goToTourDetail(tour);
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContentContainer}>
                <View>
                    <Image source={Images.Mountain} style={styles.itemImages} />
                    <View style={styles.rateContainer}>
                        <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
                        <Text style={styles.rate}>4.8</Text>
                    </View>
                    <TouchableOpacity style={styles.heart}>
                        <SvgIcons.IcHeartOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.timeStartContainer}>20/03/2023 - Giờ đi: 07:10 AM</Text>
                </View>
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.tourGuideName} numberOfLines={3}>
                        {tour.name}
                    </Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={styles.textLocation}>{tour.description}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={styles.textLocation}>Nơi khởi hành: </Text>
                    <Text style={styles.startLocation}>Hà Nội</Text>
                </View>
                <Text style={styles.textPrice}>7,690,000đ</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: scales(10) }}>
                    <View />
                    <TouchableOpacity style={styles.showInfoContainer} onPress={onGoToTourDetail}>
                        <Text style={styles.textShowInfo}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LocationDetailTourItem;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            marginHorizontal: scales(15),
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        showAllContainer: {
            flexDirection: 'row',
        },
        textTourGuide: {
            ...Fonts.inter700,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        textShowAll: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
        },
        itemContainer: {
            marginTop: scales(20),
            borderRadius: scales(8),
            backgroundColor: color.Color_Bg,

            // shadowColor: color.Text_Dark_1,
            // shadowOffset: { width: -1, height: 4 },
            // shadowOpacity: 0.3,
            // shadowRadius: 3,
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
    });
};
