import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { useFetchOrderWaiting, useSelectOrderWaiting } from 'states/orders/hooks';
import { getThemeColor } from 'utils/getThemeColor';

interface TourWaitingSceneProps {
    route: TourStatusScreenRouteProps
}

const TourWaitingScene = (props: TourWaitingSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    useFetchOrderWaiting();
    const { data, isLoading } = useSelectOrderWaiting();

    return (
        <ListTourStatus route={route} data={data} isLoading={isLoading} />
    );
};

export default TourWaitingScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
