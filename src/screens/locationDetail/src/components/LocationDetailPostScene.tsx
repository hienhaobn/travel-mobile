import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import LocationDetailPostItem from './LocationDetailPostItem';

import { useTheme } from 'hooks/useTheme';

import { Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationDetailPostScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderItem = () => <LocationDetailPostItem />;
    return (
        <View style={styles.container}>
            <FlatList
                data={[1, 2, 3, 4, 5]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.contentListStyle}
            />
        </View>
    );
};

export default LocationDetailPostScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            marginHorizontal: scales(15),
        },
        contentListStyle: {
            paddingBottom: Sizes.bottomSpace,
        },
    });
};
