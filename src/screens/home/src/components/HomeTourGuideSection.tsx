import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../../../assets/images';

import { getTopTourGuides } from '../api';

import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const HomeTourGuideSection = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [tourGuides, setTourGuides] = useState([]);
    const getData = async () => {
        const response = await getTopTourGuides();

        setTourGuides(response.data);
    }
    useEffect(() => {
        getData();
    }, []);
    const renderHeader = useCallback(() => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.textTourGuide}>Hướng dẫn viên</Text>
                <TouchableOpacity style={styles.showAllContainer}>
                    <Text style={styles.textShowAll}>Xem tất cả</Text>
                    <SvgIcons.IcForward width={scales(17)} height={scales(17)} color={getThemeColor().Color_Primary} />
                </TouchableOpacity>
            </View>
        );
    }, []);

    const renderSection = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tourGuides.map((tourguide, index) => (
                    <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} key={index}>
                        <View style={styles.itemContentContainer}>
                            <FastImage source={tourguide?.tourGuideAvatar ? { uri: tourguide.tourGuideAvatar } : Images.Vourcher_2} style={styles.itemImages} />
                            <View style={styles.itemHeaderContainer}>
                                <Text style={styles.tourGuideName}>{tourguide.tourGuideName}</Text>
                                <View style={styles.rateContainer}>
                                    <Text style={styles.rate}>{tourguide.tourGuideStar ? tourguide.tourGuideStar : 5}</Text>
                                    <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
                                    <Text style={styles.rate}>{+tourguide.totalFavorite + 10}</Text>
                                    <SvgIcons.IcTabFavorite width={scales(12)} height={scales(12)} />
                                </View>
                            </View>
                            <View style={styles.locationContainer}>
                                <SvgIcons.IcLocation
                                    width={scales(17)}
                                    height={scales(17)}
                                    color={getThemeColor().Color_Primary}
                                />
                                <Text style={styles.textLocation}>{tourguide.provinceName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {tourGuides.length > 0 ? renderSection() : null}
        </View>
    );
};

export default HomeTourGuideSection;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {},
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
            marginHorizontal: scales(5),
        },
        itemContentContainer: {
            marginTop: scales(10),
        },
        itemImages: {
            width: Sizes.scrWidth / 2 - scales(25),
            height: Sizes.scrWidth / 3,
            borderRadius: scales(8),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        itemHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        rateContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: scales(8),
        },
        rate: {
            ...Fonts.inter400,
            fontSize: scales(11),
            color: color.Text_Dark_1,
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
        },
        textLocation: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_3,
            marginLeft: scales(5),
        },
    });
};
