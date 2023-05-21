import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getThemeColor } from 'utils/getThemeColor';

function WithdrawScreen() {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <Header title='Rút tiền' />
        </View>
    );
}

export default WithdrawScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },

    });
};
