import { indexOf } from 'lodash';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';


import SvgIcons from 'assets/svgs';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import LoginCommon from 'screens/login/src/components/LoginCommon';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface LoginScreenRouteProps {
  key: string;
  title?: string;
}

const renderScene = SceneMap({
  user: LoginCommon,
  tourGuide: LoginCommon,
});

export enum ELoginScreenTabKey {
  tourGuide = 'tourGuide',
  user = 'user',
}

const LoginScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: ELoginScreenTabKey.tourGuide, title: 'Hướng dẫn viên' },
    { key: ELoginScreenTabKey.user, title: 'Người dùng' },
  ]);

  const renderTabItem = (tabProps: TabBarItemProps<LoginScreenRouteProps>) => {
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
        }}
      >
        <Text
          style={[
            styles.labelTabText,
            active ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTabBar = (tabbarProps) => (
    <TabBar {...tabbarProps} style={styles.tabview} renderIndicator={() => null} renderTabBarItem={renderTabItem} />
  );

  const renderContent = () => (
    <View style={{ flex: 1 }}>
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

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.iconHeaderContainer}>
          <SvgIcons.IcLogoLaunch width={scales(150)} height={scales(150)} />
        </View>
      </View>
    );
  }, []);

  return (<View style={styles.container}>
    {renderHeader()}
    {renderContent()}
  </View>);
};

export default LoginScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
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
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.statusBarHeight + scales(40),
    },
    textHeader: {
      ...Fonts.inter700,
      color: color.Color_Primary,
      fontSize: scales(24),
    },
    iconHeaderContainer: {
      marginTop: scales(20),
    },
  });
};
