import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { apiGetTours } from '../api';

import { useTheme } from 'hooks/useTheme';

import { LocationDetailScreenRouteProps } from 'screens/locationDetail/LocationDetailScreen';
import LocationDetailTourItem from 'screens/locationDetail/src/components/LocationDetailTourItem';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Images from 'assets/images';

interface LocationDetailTourSceneProps {
  route: LocationDetailScreenRouteProps;
}

const LocationDetailTourScene = (props: LocationDetailTourSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { tours } = props.route;
  const renderNoData = useCallback(() => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.textNoData}>Chưa có dữ liệu tour</Text>
      </View>
    );
  }, []);

  const renderSection = () => {
    return (
      <FlatList
        renderItem={(item) => <LocationDetailTourItem tour={item.item} />}
        contentContainerStyle={{
          paddingBottom: scales(20),
        }}
        data={tours}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderNoData()}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return <View style={styles.container}>{renderSection()}</View>;
};

export default LocationDetailTourScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: scales(15),
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
    textInputData: {
      color: color.Color_Gray3,
      fontWeight: '300',
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
