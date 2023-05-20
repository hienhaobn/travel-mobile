import { indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';


import { getInfor } from './src/api';

import TourFinishScene from './src/components/scenes/TourFinishScene';

import TourProcessScene from './src/components/scenes/TourProcessScene';

import TourWaitingConfirmScene from './src/components/scenes/TourWaitingConfirmScene';
import TourWaitingScene from './src/components/scenes/TourWaitingScene';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface TourStatusScreenRouteProps {
  key: string;
  title?: string;
  role: string;
}

const renderScene = SceneMap({
  tourWaitingConfirm: TourWaitingConfirmScene,
  tourWaitingPurchase: TourWaitingScene,
  tourProcess: TourProcessScene,
  tourFinish: TourFinishScene,
});

export enum ETourStatusScreenTabKey {
  tourWaitingConfirm = 'tourWaitingConfirm',
  tourWaitingPurchase = 'tourWaitingPurchase',
  tourProcess = 'tourProcess',
  tourFinish = 'tourFinish',
}

const TourStatusScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const layout = useWindowDimensions();
  const [role, setRole] = useState('');
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getInfor();
        setRole(response.role);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (role) {
      const updatedRoutes = [
        { key: ETourStatusScreenTabKey.tourWaitingConfirm, title: 'Chờ xác nhận', role },
        { key: ETourStatusScreenTabKey.tourWaitingPurchase, title: 'Chờ thanh toán', role },
        { key: ETourStatusScreenTabKey.tourProcess, title: 'Đã thanh toán', role },
        { key: ETourStatusScreenTabKey.tourFinish, title: 'Hoàn thành', role },
      ];
      setRoutes(updatedRoutes);
    }

  }, [role]);

  const renderTabItem = (tabProps: TabBarItemProps<TourStatusScreenRouteProps>) => {
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
    <TabBar {...tabbarProps} scrollEnabled={true} style={styles.tabview} renderIndicator={() => null} renderTabBarItem={renderTabItem} />
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
      <Header title="Chuyến đi" />
      {renderContent()}
    </View>
  );
};

export default TourStatusScreen;

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
  });
};
