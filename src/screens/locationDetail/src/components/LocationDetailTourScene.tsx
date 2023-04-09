import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import LocationDetailTourItem from 'screens/locationDetail/src/components/LocationDetailTourItem';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationDetailTourScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderItem = useCallback(() => <LocationDetailTourItem />, []);

    const renderSection = useCallback(() => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: scales(20),
                }}>
                {renderItem()}
                {renderItem()}
                {renderItem()}
            </ScrollView>
        );
    }, []);

    return <View style={styles.container}>{renderSection()}</View>;
};

export default LocationDetailTourScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            marginHorizontal: scales(15),
        },
    });
};
