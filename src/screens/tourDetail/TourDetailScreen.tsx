import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ITourDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'TourDetail'>;
}

function TourDetailScreen(props: ITourDetailScreenProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { tour } = props.route.params;

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.tourName}>{tour?.name}</Text>
            <View style={styles.rateContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <View>
                        <View
                            style={{
                                backgroundColor: 'red',
                                width: scales(50),
                                height: scales(40),
                                borderRadius: scales(4),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    ...Fonts.inter600,
                                    fontSize: scales(16),
                                    color: getThemeColor().Text_Dark_1,
                                }}>
                                9
                            </Text>
                        </View>
                        <View
                            style={{
                                width: 0,
                                height: 0,
                                borderStyle: 'solid',
                                overflow: 'hidden',
                                borderTopWidth: 15,
                                borderRightWidth: 10,
                                borderBottomWidth: 0,
                                borderLeftWidth: 16,
                                borderTopColor: 'red',
                                borderRightColor: 'transparent',
                                borderBottomColor: 'transparent',
                                borderLeftColor: 'transparent',
                                transform: [{ rotate: '-10deg' }, { translateX: 2 }, { translateY: -3 }],
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: scales(8),
                    }}>
                        <Text style={styles.rate}>1553 đánh giá</Text>
                        <Text style={styles.care}>233 quan tâm</Text>
                    </View>
                </View>
                <View>
                    <SvgIcons.IcHeartOutline width={scales(20)} height={scales(20)} color={getThemeColor().Color_Red} />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            {renderContent()}
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
    });
};
