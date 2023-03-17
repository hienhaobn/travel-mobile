import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HomeBanner from './src/components/HomeBanner';
import HomeOptions from './src/components/HomeOptions';

import SvgIcons from 'assets/svgs';

import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';

const HomeScreen = () => {
    const { t } = useTranslation();
    const { themeCurrent } = useTheme();
    const styles = myStyles(themeCurrent);

    const renderHeader = useCallback(() => {
        return (
            <View style={styles.headerContainer}>
                {/* left */}
                <View style={styles.headerLeftContainer}>
                    <SvgIcons.IcLocation width={scales(17)} height={scales(17)} />
                    <TouchableOpacity style={styles.headerLeftContainer}>
                        <Text style={styles.headerLeftText}>Hà Đông, Hà Nội</Text>
                        <SvgIcons.IcForward
                            color={getThemeColor().Text_Dark_1}
                            width={scales(17)}
                            height={scales(17)}
                        />
                    </TouchableOpacity>
                </View>
                {/* right */}
                <View style={styles.headerRightContainer}>
                    <TouchableOpacity style={styles.icNotification}>
                        <SvgIcons.IcNotification
                            color={getThemeColor().Text_Dark_1}
                            width={scales(20)}
                            height={scales(20)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SvgIcons.IcMenu color={getThemeColor().Text_Dark_1} width={scales(20)} height={scales(20)} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }, []);

    const renderSearchComponent = useCallback(() => {
        return (
            <View style={styles.searchContainer}>
                <View style={styles.icScan}>
                    <SvgIcons.IcScan color={getThemeColor().Text_Dark_1} width={scales(17)} height={scales(17)} />
                </View>
                <Input
                    placeholder="Tìm kiếm"
                    leftIcon={
                        <SvgIcons.IcSearch color={getThemeColor().Text_Dark_1} width={scales(24)} height={scales(24)} />
                    }
                    leftIconStyle={{
                        paddingLeft: scales(10),
                    }}
                    icon={
                        <SvgIcons.IcScan color={getThemeColor().Text_Dark_1} width={scales(17)} height={scales(17)} />
                    }
                    containerStyle={styles.inputContainer}
                />
            </View>
        );
    }, []);

    const renderContent = () => {
        return (
            <View style={styles.contentContainer}>
                {/* Search */}
                {renderSearchComponent()}
                {<HomeOptions />}
                <HomeBanner />
            </View>
        );
    };

    return (
        <ScrollView
            style={{
                backgroundColor: getThemeColor().Color_Secondary_Green,
            }}>
            {renderHeader()}
            {renderContent()}
        </ScrollView>
    );
};

export default HomeScreen;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        contentContainer: {
            backgroundColor: color.Color_Bg,
            borderTopRightRadius: scales(6),
            borderTopLeftRadius: scales(6),
        },
        headerContainer: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: Sizes.statusBarHeight + scales(20),
            marginHorizontal: scales(15),
            paddingBottom: scales(12),
        },
        headerLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerLeftText: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginHorizontal: scales(5),
        },
        headerRightContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icNotification: {
            marginRight: scales(15),
        },
        searchContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scales(15),
            marginTop: scales(12),
        },
        icScan: {
            backgroundColor: color.Color_Bg,
            height: scales(46),
            justifyContent: 'center',
            paddingHorizontal: scales(20),
            borderRadius: scales(6),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        inputContainer: {
            flex: 1,
            marginLeft: scales(15),
            shadowColor: getThemeColor().Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        imageOptions: {
            width: scales(45),
            height: scales(45),
        },
        optionsContainer: {
            marginTop: scales(26),
            marginHorizontal: scales(15),
            flexDirection: 'row',
            marginBottom: scales(25),
        },
        optionItem: {
            alignItems: 'center',
            width: Sizes.scrWidth / 6,
        },
        optionText: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_2,
            marginTop: scales(8),
            textAlign: 'center',
        },
        mh5: {
            marginHorizontal: scales(5),
        },
    });
};
