import { indexOf } from 'lodash';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import ListVouchers from './src/components/ListVoucherScreen';

import MyListVoucher from './src/components/MyListVoucherScreen';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import AllVoucherScreen from './src/components/AllVoucherScreen';

export interface VoucherScreenRouteProps {
  key: string;
  title?: string;
}

const renderScene = SceneMap({
  listvouchers: AllVoucherScreen,
  myVouchers: MyListVoucher,
});

export enum EVoucherScreenTabKey {
  myVouchers = 'myVouchers',
  listVouchers = 'listvouchers',
}

const VoucherScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: EVoucherScreenTabKey.listVouchers, title: 'Mã giảm giá' },
    { key: EVoucherScreenTabKey.myVouchers, title: 'Mã giảm giá của tôi' },

  ]);

  const renderTabItem = (tabProps: TabBarItemProps<VoucherScreenRouteProps>) => {
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
      <Header title="Mã giảm giá" />
      {renderContent()}
    </View>
  );
};

export default VoucherScreen;

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
