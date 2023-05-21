import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import MyTabBar from './MyTabBar';

import { RootNavigatorParamList } from 'navigation/types';

import { Screen } from 'screens/screens';
import { useFetchProvinces } from 'states/provinces/hooks';
import { useFetchMe } from 'states/user/hooks';

const Tab = createBottomTabNavigator<RootNavigatorParamList>();

const Main = () => {
    useFetchProvinces();
    useFetchMe();
    const renderTabBar = (bottomTabBarProps: BottomTabBarProps) => {
        return <MyTabBar {...bottomTabBarProps} />;
    };
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={renderTabBar}
        >
            <Tab.Screen name={'Home'} component={Screen.Home} />

            <Tab.Screen name={'Location'} component={Screen.Location} />

            <Tab.Screen name={'Messenger'} component={Screen.Messenger} />

            <Tab.Screen name={'Favorite'} component={Screen.Favorite} />

            <Tab.Screen name={'Account'} component={Screen.Account} />

        </Tab.Navigator>
    );
};

export default Main;
