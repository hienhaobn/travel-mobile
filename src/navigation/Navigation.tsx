import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';

import { RootNavigatorParamList } from './types';
import { getCurrentRoute, navigationRef } from './utils';

import LoadingManager from 'components/Loading/loadingManager';
import LoadingModal, { LoadingModalRef } from 'components/Loading/LoadingModal';

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

      <Stack.Screen name="TourStatus" component={Screen.TourStatus} />

      <Stack.Screen name="TourStatusDetail" component={Screen.TourStatusDetail} />

      <Stack.Screen name="Voucher" component={Screen.Voucher} />

    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { theme } = useTheme();
  const loadingRef = useRef<LoadingModalRef | null>(null);
  useEffect(() => {
    return () => {
      if (loadingRef?.current) {
        LoadingManager.unregister(loadingRef.current);
      }
    };
  }, []);

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

  const renderLoadingModal = () => (
    <LoadingModal
      ref={(ref) => {
        loadingRef.current = ref;
        LoadingManager.register(loadingRef.current!);
      }}
    />
  );

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <StatusBar
        backgroundColor={getThemeColor().Color_Bg}
        barStyle={theme === EThemeColor.Light ? 'dark-content' : 'light-content'}
        translucent
      />
      <RootStack />
      {renderLoadingModal()}
    </NavigationContainer>
  );
};

export default StackNavigator;
