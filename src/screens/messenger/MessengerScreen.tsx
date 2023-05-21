import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const MessengerScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderConvention = useCallback(
        () => (
            <TouchableOpacity activeOpacity={0.9} style={styles.conventionContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        source={Images.Mountain}
                        style={{ width: scales(50), height: scales(50), borderRadius: scales(50) }}
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.account}>Nguyen Duy Khanh</Text>
                        <Text style={styles.message}>Thanks for contacting me!</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.time}>15:23</Text>
                    <View style={styles.unreadContainer}>
                        <Text style={styles.unread}>2</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ),
        []
    );

    const renderHeader = useCallback(
        () => (
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Tìm địa điểm"
                    leftIcon={
                        <SvgIcons.IcSearch color={getThemeColor().Text_Dark_1} width={scales(24)} height={scales(24)} />
                    }
                    leftIconStyle={{
                        paddingLeft: scales(10),
                    }}
                    containerStyle={styles.inputContainer}
                />
            </View>
        ),
        []
    );
    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                renderItem={renderConvention}
                keyExtractor={(item) => item.toString()}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MessengerScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: color.Color_Bg,
        },
        searchContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scales(15),
            marginTop: scales(12),
            marginBottom: scales(10),
        },
        inputContainer: {
            flex: 1,
            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderRadius: 50,
        },
        conventionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scales(15),
            marginTop: scales(15),
        },
        leftContainer: {
            flexDirection: 'row',
        },
        messageContainer: {
            marginLeft: scales(10),
        },
        account: {
            ...Fonts.inter700,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        message: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        time: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_3,
        },
        unread: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.white,
        },
        unreadContainer: {
            backgroundColor: color.Color_Primary,
            borderRadius: scales(100),
            width: scales(15),
            height: scales(15),
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
        },
    });
};
