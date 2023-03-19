import { indexOf } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import LocationScene from './src/components/LocationScene';
import TourGuideScene from './src/components/TourGuideScene';
import TourScene from './src/components/TourScene';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';

interface RouteProps {
    key: string;
    title?: string;
}

const renderScene = SceneMap({
    location: LocationScene,
    tour: TourScene,
    tourGuide: TourGuideScene,
});

const FavoriteScreen = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = myStyles(theme);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'location', title: 'Địa điểm' },
        { key: 'tour', title: 'Tour' },
        { key: 'tourGuide', title: 'Hướng dẫn viên' },
    ]);

    const renderTabItem = (tabProps: TabBarItemProps<RouteProps>) => {
        const { title } = tabProps.route;
        const active = indexOf(routes, tabProps.route) === tabProps.navigationState.index;
        return (
            <TouchableOpacity
                style={{
                    marginRight: scales(20),
                    paddingVertical: scales(16),
                }}
                onPress={() => {
                    setIndex(indexOf(routes, tabProps.route));
                }}>
                <Text
                    style={[
                        styles.labelTabText,
                        active ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderTabBar = (tabbarProps) => (
        <TabBar {...tabbarProps} style={styles.tabview} renderIndicator={() => null} renderTabBarItem={renderTabItem} />
    );

    return (
        <View style={styles.container}>
            <TabView
                lazy
                navigationState={{ index, routes }}
                style={{ backgroundColor: getThemeColor().Color_Bg }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default FavoriteScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: color.Color_Bg,
        },
        labelTabText: {
            ...Fonts.inter700,
            fontSize: scales(17),
            color: color.Text_Dark_1,
        },
        tabview: {
            backgroundColor: color.Color_Bg,
            marginLeft: scales(15),
            shadowColor: 'transparent',
        },
    });
};
