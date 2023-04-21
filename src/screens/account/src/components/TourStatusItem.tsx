import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TourStatusItem = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <Text>TourStatusItem</Text>
        </View>
    );
};

export default TourStatusItem;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
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
    });
};
