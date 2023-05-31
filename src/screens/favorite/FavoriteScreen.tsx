import { indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
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
import PostScene from './src/components/PostScene';
import { getFavorites } from './src/api';
import { hideLoading, showLoading } from 'components/Loading';
import { useIsFocused } from '@react-navigation/native';

interface RouteProps {
  key: string;
  title?: string;
}

const renderScene = SceneMap({
  location: LocationScene,
  tour: TourScene,
  tourGuide: TourGuideScene,
  post: PostScene
});

const FavoriteScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = myStyles(theme);
  const layout = useWindowDimensions();
  const [favorites, setFavorites] = useState({});
  const [routes, setRoutes] = React.useState([]);
  const isFocused = useIsFocused();
  const getData = async () => {
    // showLoading();
    const response = await getFavorites();
    // hideLoading();
    setFavorites(response.returnValue);
  }
  useEffect(() => {
    if (isFocused) {

      getData();
    }
  }, [isFocused]);
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    if (favorites) {
      const updatedRoutes = [
        { key: 'location', title: 'Tỉnh thành', province: favorites ? favorites.provinceFavorites : null },
        { key: 'tour', title: 'Tour', tour: favorites ? favorites.tourFavorites : null },
        { key: 'tourGuide', title: 'Hướng dẫn viên', tourGuide: favorites ? favorites.tourGuideFavorites : null },
        { key: 'post', title: 'Bài viết', post: favorites ? favorites.postFavorites : null },
      ];
      setRoutes(updatedRoutes);
    }

  }, [favorites]);

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
    <TabBar {...tabbarProps} style={styles.tabview} scrollEnabled renderIndicator={() => null} renderTabBarItem={renderTabItem} />
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
