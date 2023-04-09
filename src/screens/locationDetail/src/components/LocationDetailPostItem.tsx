import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationDetailPostItem = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer}>
                <View style={styles.itemContentContainer}>
                    <Image source={Images.BacNinhImg} style={styles.itemImages} />
                    <Text style={styles.tourGuideName}>Đi về miền quan họ à ơi câu hát</Text>
                    <Text style={styles.textDesc} numberOfLines={3}>
                        Dân ca quan họ Bắc Ninh, đờn ca tài tử Nam bộ được tái hiện ở festival "Về miền quan họ",
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default memo(LocationDetailPostItem);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
        },
        itemContainer: {
        },
        itemContentContainer: {
            marginTop: scales(10),
        },
        itemImages: {
            width: '100%',
            height: Sizes.scrWidth / 3,
            borderRadius: scales(8),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        tourGuideName: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginTop: scales(15),
        },
        textDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_3,
        },
    });
};
