import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { apiGetTours } from '../api';

import { useTheme } from 'hooks/useTheme';

import LocationDetailTourItem from 'screens/locationDetail/src/components/LocationDetailTourItem';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationDetailTourScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [tours, setTours] = useState([]);

    const getTours = async () => {
        try {
            const response = await apiGetTours();
            if (response) {
                setTours(response);
            }
        } catch (error) {
            console.log('error get tour', error.message);
        }
    };

    useEffect(() => {
        getTours();
    }, []);

    const renderSection = useCallback(() => {
        return (
            <FlatList
                renderItem={(item) => <LocationDetailTourItem tour={item.item}/>}
                contentContainerStyle={{
                    paddingBottom: scales(20),
                }}
                data={tours}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }, [tours]);

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
