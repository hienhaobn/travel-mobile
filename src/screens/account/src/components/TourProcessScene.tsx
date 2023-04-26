import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { useFetchOrderProcessing, useSelectOrderProcessing } from 'states/tours/hooks';
import { getThemeColor } from 'utils/getThemeColor';

interface TourProcessSceneProps {
    route: TourStatusScreenRouteProps
}

const TourProcessScene = (props: TourProcessSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    useFetchOrderProcessing();
    const { data, isLoading } = useSelectOrderProcessing();

    return (
        <View style={styles.container}>
            <ListTourStatus route={route} data={data} isLoading={isLoading} />
        </View>
    );
};

export default TourProcessScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
