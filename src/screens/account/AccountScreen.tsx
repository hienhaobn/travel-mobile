import Images from 'assets/images';
import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Sizes, Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const AccountScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <>
            <Header iconLeft={<Text style={styles.textTitle}>Tài khoản</Text>}/>
        </>
    );
};
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
            borderRadius: 50,
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
        textTitle: {
            ...Fonts.inter700,
            fontSize: scales(32),
            color: color.Text_Dark_2,
        },
    });
};
export default AccountScreen;
