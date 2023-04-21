import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TourFinishScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderNoData = useCallback(() => {
        return (
            <View style={styles.noDataContainer}>
                <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
                <Text style={styles.textNoData}>Chưa có chuyến đi</Text>
            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                renderItem={(item) => <View />}
                data={[]}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={renderNoData}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TourFinishScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        noDataContainer: {
            marginTop: scales(26),
            marginHorizontal: scales(15),
            marginBottom: scales(25),
            alignItems: 'center',
        },
        textNoData: {
            color: color.Color_Red_2,
            marginTop: scales(29),
            marginBottom: scales(15),
            ...Fonts.inter700,
            fontSize: scales(12),
            fontStyle: 'normal',
        },
        image: {
            width: Sizes.scrWidth - scales(30),
            height: scales(135),
            borderRadius: scales(20),
        },
    });
};
