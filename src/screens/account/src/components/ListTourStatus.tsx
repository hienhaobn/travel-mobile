import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import UserTourStatusItem from './items/UserTourStatusItem';

import Images from 'assets/images';
import LoadingView from 'components/Loading/LoadingView';
import { useTheme } from 'hooks/useTheme';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import TourGuideTourStatusItem from './items/TourGuideTourStatusItem';

interface ListTourStatusProps {
  route: TourStatusScreenRouteProps;
  data: order.OrderDetail[];
  isLoading?: boolean;
}

const ListTourStatus = (props: ListTourStatusProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route, data, isLoading } = props;
  console.log(route);

  const renderNoData = useCallback(() => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.textNoData}>Chưa có chuyến đi</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <LoadingView />
        </View>
      ) : (
        <FlatList
          renderItem={(item) => route.role === 'USER' ? <UserTourStatusItem order={item.item} route={route} /> : <TourGuideTourStatusItem order={item.item} route={route} />}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderNoData}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ListTourStatus;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      backgroundColor: color.Color_Bg,
    },
    noDataContainer: {
      marginTop: scales(26),
      marginHorizontal: scales(15),
      marginBottom: scales(25),
      alignItems: 'center',
    },
    textNoData: {
      color: color.Color_Red_2,
      marginTop: scales(29),
      marginBottom: scales(15),
      ...Fonts.inter700,
      fontSize: scales(12),
      fontStyle: 'normal',
    },
    image: {
      width: Sizes.scrWidth - scales(30),
      height: scales(135),
      borderRadius: scales(20),
    },
  });
};
