import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import LocationItem from 'screens/location/src/components/LocationItem';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContent = useCallback(
        () => (
            <FlatList
                renderItem={(item) => <LocationItem province={item.item}/>}
                data={[1, 2, 3, 4]}
                keyExtractor={(item) => item.toString()}
            />
        ),
        []
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default LocationScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            marginHorizontal: scales(15),
        },
    });
};
