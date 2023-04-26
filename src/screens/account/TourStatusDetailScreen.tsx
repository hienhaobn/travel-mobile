import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getThemeColor } from 'utils/getThemeColor';

const TourStatusDetailScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <Header title='Chi tiết chuyến đi' />
            <Text>TourStatusDetailScreen</Text>
        </View>
    );
};

export default TourStatusDetailScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
