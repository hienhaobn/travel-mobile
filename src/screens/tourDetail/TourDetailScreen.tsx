import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getThemeColor } from 'utils/getThemeColor';

function TourDetailScreen() {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => (
        <Header title={'Tour'} />
    )
    return (
        <View style={styles.container}>
            {renderHeader()}
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
        }
    });
};
