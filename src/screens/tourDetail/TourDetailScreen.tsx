import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TourDetailImages from './src/components/TourDetailImages';

import SvgIcons from 'assets/svgs';

import BottomSheet, { CustomBottomSheetRefType } from 'components/BottomSheet/BottomSheet';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { ETourTypesValue } from 'constants/tours';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import LocationDetailOrderTour from 'screens/tourDetail/src/TourDetailOrderTour';

import { fetchTourById } from 'states/tours/fetchTours';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';

interface ITourDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'TourDetail'>;
}

function TourDetailScreen(props: ITourDetailScreenProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { tour } = props.route.params;
    const [tourDetail, setTourDetail] = useState<tour.Tour>(null);
    const bottomSheetOrderTourRef = useRef<CustomBottomSheetRefType>(null);

    const showOrderTour = () => {
        if (bottomSheetOrderTourRef) {
            bottomSheetOrderTourRef.current?.open();
        }
    };

    const dismissBottomSheet = () => {
        if (bottomSheetOrderTourRef) {
            bottomSheetOrderTourRef.current?.dismiss();
        }
    };

    const renderOrderTour = () => (
        <BottomSheet
            isDynamicSnapPoints
            ref={bottomSheetOrderTourRef}
            handleCloseModal={dismissBottomSheet}
            enablePanDownToClose>
            <LocationDetailOrderTour tour={tourDetail} dismissBottomSheet={dismissBottomSheet} />
        </BottomSheet>
    );

    const getTourById = async () => {
        const response = await fetchTourById(tour.id);
        setTourDetail(response);
    };

    useEffect(() => {
        getTourById();
    }, []);

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.tourName}>{tour?.name}</Text>
            <View>
                <View style={styles.rateContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View>
                            <View style={styles.voteContainer}>
                                <Text
                                    style={{
                                        ...Fonts.inter600,
                                        fontSize: scales(16),
                                        color: getThemeColor().Text_Dark_1,
                                    }}>
                                    9
                                </Text>
                            </View>
                            <View style={styles.voteBka} />
                        </View>
                        <View
                            style={{
                                marginLeft: scales(8),
                            }}>
                            <Text style={styles.rate}>1553 đánh giá</Text>
                            <Text style={styles.care}>233 quan tâm</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{ETourTypesValue[tourDetail?.type]}</Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <Text>Số người tối đa: {tourDetail?.maxMember}</Text>
                    <View>
                        <Text>Phí phụ thu: {tourDetail?.numOfFreeMember}/người</Text>
                        <Text>(Khi vượt quá tối đa người)</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.priceTitle}>Giá: </Text>
                    <Text style={styles.priceTxt}>{formatCurrency(tourDetail?.basePrice)}đ</Text>
                </View>
            </View>
            <TourDetailImages />
            {/* Mo ta tour */}
            <View>
                <Text>{tourDetail?.description}</Text>
            </View>
            <View>
                <Text>{tourDetail?.overview}</Text>
            </View>
            {/* Lich trinh */}
            <View>
                {tourDetail?.tourSchedule?.map((element, index) => (
                    <View key={element.id}>
                        <Text style={styles.textBold}>
                            Ngày {index + 1}: {element.title}
                        </Text>
                        <Text>{element.content}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <FlatList data={[1]} renderItem={renderContent} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shopContainer} onPress={showOrderTour}>
                    <SvgIcons.IcShopOutline color={getThemeColor().white} width={scales(17)} height={scales(17)} />
                    <Text style={styles.sellNow}>Đặt ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showInfoContainer}>
                    <Text style={styles.textShowInfo}>Liên hệ tư vấn</Text>
                </TouchableOpacity>
            </View>
            {renderOrderTour()}
        </View>
    );
}

export default TourDetailScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        tourName: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Text_Dark_1,
        },
        rateContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        rate: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        care: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        shopContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: getThemeColor().Color_Red,
            paddingVertical: scales(10),
            paddingHorizontal: scales(20),
            borderRadius: scales(4),
        },
        sellNow: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: getThemeColor().white,
            paddingLeft: scales(3),
        },
        showInfoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scales(10),
            paddingHorizontal: scales(20),
            borderRadius: scales(4),
            borderWidth: 1,
            borderColor: getThemeColor().Color_Primary,
            marginLeft: scales(8),
        },
        textShowInfo: {
            ...Fonts.inter400,
            fontSize: scales(11),
            color: getThemeColor().Color_Primary,
        },
        buttonContainer: {
            flexDirection: 'row',
            paddingTop: scales(10),
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: Sizes.bottomSpace + scales(5),
        },
        priceTxt: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: getThemeColor().Color_Red,
        },
        priceTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: getThemeColor().Text_Dark_1,
        },
        image: {
            width: Sizes.scrWidth - scales(30),
            height: Sizes.scrHeight / 3,
            borderRadius: scales(10),
            marginRight: scales(12),
        },
        textBold: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: getThemeColor().Text_Dark_1,
            lineHeight: scales(25),
        },
        voteBka: {
            width: 0,
            height: 0,
            borderStyle: 'solid',
            overflow: 'hidden',
            borderTopWidth: 15,
            borderRightWidth: 10,
            borderBottomWidth: 0,
            borderLeftWidth: 16,
            borderTopColor: getThemeColor().Color_Secondary_Light_Yellow,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            transform: [{ rotate: '-10deg' }, { translateX: 2 }, { translateY: -3 }],
        },
        voteContainer: {
            backgroundColor: getThemeColor().Color_Secondary_Light_Yellow,
            width: scales(50),
            height: scales(40),
            borderRadius: scales(4),
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
