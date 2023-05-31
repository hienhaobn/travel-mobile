import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SvgIcons from 'assets/svgs';
import TouchableOpacity from 'components/TouchableOpacity';
import { ETourTypesValue } from 'constants/tours';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';

interface IHomeTourGuideItemProps {
    tour: tour.Tour
}

function HomeTourGuideItem(props: IHomeTourGuideItemProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const { tour } = props;

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer}>
            <View style={styles.itemContentContainer}>
                <View>
                    <Image source={{ uri: tour.images[Math.floor(Math.random() * tour.images.length)].url }} style={styles.itemImages} />
                    <View style={styles.rateContainer}>
                        <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
                        <Text style={styles.rate}>4.8</Text>
                        <View style={styles.typeContainer}>
                            <Text style={styles.desc}>{ETourTypesValue[tour?.type]}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.heart}>
                        <SvgIcons.IcHeartOutline
                            color={getThemeColor().white}
                            width={scales(17)}
                            height={scales(17)}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.timeStartContainer}>Chuyến đi {tour.tourSchedule.length - 1 == 0 ? 'trong ngày' : tour.tourSchedule.length + ' ngày'}</Text>
                </View>
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.tourGuideName} numberOfLines={3}>
                        {tour.name}
                    </Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={styles.textLocation}>Hướng dẫn viên: </Text>
                    <Text style={styles.startLocation}>{tour.tourGuide.name}</Text>
                </View>
                <Text style={styles.textPrice}>Giá cơ bản: {formatCurrency(tour.basePrice)} VNĐ</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: scales(10) }}>
                    <View />
                    <TouchableOpacity style={styles.showInfoContainer}>
                        <Text style={styles.textShowInfo}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default HomeTourGuideItem;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            marginTop: scales(20),
        },
        itemContainer: {
            marginTop: scales(5),
            marginHorizontal: scales(10),
            width: Sizes.scrWidth - scales(40),
            borderRadius: scales(8),
        },
        itemContentContainer: {
        },
        itemImages: {
            width: Sizes.scrWidth - scales(40),
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
        textPrice: {
            ...Fonts.inter600,
            fontSize: scales(13),
            color: color.Color_Red,
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
        typeContainer: {
            backgroundColor: color.Color_Gray2,
            paddingHorizontal: scales(10),
            paddingVertical: scales(2),
            borderRadius: scales(8),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: getThemeColor().Text_Dark_1,
            lineHeight: scales(19),
        },
    });
};
