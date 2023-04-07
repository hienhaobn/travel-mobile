import { indexOf } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import LocationDetailPostScene from './src/components/LocationDetailPostScene';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goBack } from 'navigation/utils';

import TourGuideScene from 'screens/favorite/src/components/TourGuideScene';
import TourScene from 'screens/favorite/src/components/TourScene';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface RouteProps {
    key: string;
    title?: string;
}

const renderScene = SceneMap({
    tourGuide: TourGuideScene,
    tour: TourScene,
    post: LocationDetailPostScene,
});

const LocationDetailScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'tourGuide', title: 'Hướng dẫn viên' },
        { key: 'tour', title: 'Tour' },
        { key: 'post', title: 'Bài viết' },
    ]);

    const renderHeader = () => (
        <View>
            <Image source={Images.BacNinhImg} style={styles.imageHeader} resizeMode="cover" />
            <TouchableOpacity style={styles.iconBack} activeOpacity={1} onPress={goBack}>
                <SvgIcons.IcBack width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.titleHeader}>Bắc Ninh</Text>
                    <View style={styles.infoTour}>
                        <Text style={styles.tour}>234 tour</Text>
                        <Text style={styles.tour}>234 Lượt tìm</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.iconTourContainer}>
                        <SvgIcons.IcHeartOutline
                            width={scales(17)}
                            height={scales(17)}
                            color={getThemeColor().Text_Dark_1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconTourContainer}>
                        <SvgIcons.IcMoreInfo
                            width={scales(17)}
                            height={scales(17)}
                            color={getThemeColor().Text_Dark_1}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

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

    const renderContent = () => (
        <TabView
            lazy
            navigationState={{ index, routes }}
            style={{ backgroundColor: getThemeColor().Color_Bg }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default LocationDetailScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        imageHeader: {
            width: Sizes.scrWidth,
            height: Sizes.statusBarHeight + Sizes.scrHeight / 4,
        },
        iconBack: {
            position: 'absolute',
            top: Sizes.statusBarHeight + scales(20),
            left: scales(15),
            backgroundColor: color.Color_Gray5,
            padding: scales(10),
            borderRadius: scales(80),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(20),
            color: color.white,
        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: scales(20),
            width: Sizes.scrWidth - scales(30),
            marginHorizontal: scales(15),
        },
        infoTour: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: scales(10),
        },
        tour: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.white,
        },
        iconTourContainer: {
            padding: scales(5),
            backgroundColor: color.Color_Gray4,
            borderRadius: scales(100),
            marginTop: scales(10),
        },
        tabview: {
            backgroundColor: color.Color_Bg,
            marginLeft: scales(15),
            shadowColor: 'transparent',
        },
        labelTabText: {
            ...Fonts.inter700,
            fontSize: scales(17),
            color: color.Text_Dark_1,
        },
    });
};