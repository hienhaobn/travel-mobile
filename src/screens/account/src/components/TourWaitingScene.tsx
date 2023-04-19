import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';

const TourWaitingScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <Text>TourWaitingScene</Text>
        </View>
    );
};

export default TourWaitingScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
