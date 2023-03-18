import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { RootNavigatorParamList } from './types';
import { getCurrentRoute, navigationRef } from './utils';

import { EThemeColor, GlobalVariables } from 'constants/index';

import { useTheme } from 'hooks/useTheme';

import SplashScreen from 'screens/launch/LaunchScreen';
import MainScreen from 'screens/main';

import { getThemeColor } from 'utils/getThemeColor';
import LocationScreen from 'screens/location/LocationScreen';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            initialRouteName="Splash"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="Main" component={MainScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Location" component={LocationScreen} />
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const { themeCurrent } = useTheme();
    const onSetStatusBar = (screenName: string) => {
        if (!screenName) {
            return;
        }
    };

    const onStateChange = (): void => {
        const screenName = getCurrentRoute();
        if (screenName) {
            onSetStatusBar(screenName);
            GlobalVariables.activeRouteKey = screenName;
        }
    };

    return (
        <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
            <StatusBar
                backgroundColor={getThemeColor().Color_Bg}
                barStyle={themeCurrent === EThemeColor.Light ? 'dark-content' : 'light-content'}
                translucent
            />
            <RootStack />
        </NavigationContainer>
    );
};

export default StackNavigator;
