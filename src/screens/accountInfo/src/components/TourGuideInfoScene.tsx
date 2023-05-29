import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { Fonts } from '../../../../themes';

function TourGuideInfoScene(props) {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Tên:</Text>
                <Text style={styles.value}>Duy Khánh Vy</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Tuổi::</Text>
                <Text style={styles.value}>28</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Địa điểm:</Text>
                <Text style={styles.value}>Hà Nam; Nam Định; Ninh Bình</Text>
            </View>
            <View>
                <Text style={styles.title}>Về bản thân:</Text>
                <Text style={styles.value}>Là một hướng dẫn viên giàu nhiệt huyết, biết nhiều địa điểm ăn uống nổi tiếng trong khu vực.</Text>
            </View>
        </View>
    );
}

export default TourGuideInfoScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(8),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        value: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};
