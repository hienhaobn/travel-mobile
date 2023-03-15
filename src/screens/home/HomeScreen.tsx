import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';

const HomeScreen = () => {
    const { t } = useTranslation();
    const { themeCurrent } = useTheme();
    const styles = myStyles(themeCurrent);
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    );
};

export default HomeScreen;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
