import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { RootNavigatorParamList } from './types';
import { getCurrentRoute, navigationRef } from './utils';

import { EThemeColor, GlobalVariables } from 'constants/index';

import { useTheme } from 'hooks/useTheme';

import SplashScreen from 'screens/launch/LaunchScreen';
import MainScreen from 'screens/main';
import { Screen } from 'screens/screens';

import { getThemeColor } from 'utils/getThemeColor';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            initialRouteName="Splash"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="Main" component={MainScreen} />

            <Stack.Screen name="LocationDetail" component={Screen.LocationDetail} />

            <Stack.Screen name="TourDetail" component={Screen.TourDetail} />

            <Stack.Screen name="Login" component={Screen.Login} />

            <Stack.Screen name="Register" component={Screen.Register} />
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const { theme } = useTheme();
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
                barStyle={theme === EThemeColor.Light ? 'dark-content' : 'light-content'}
                translucent
            />
            <RootStack />
        </NavigationContainer>
    );
};

export default StackNavigator;
