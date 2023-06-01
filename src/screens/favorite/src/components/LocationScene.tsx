import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import LocationItem from 'screens/location/src/components/LocationItem';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Images from 'assets/images';
import { Fonts, Sizes } from 'themes';

const LocationScene = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const provinces = props.route.province;
  console.log("provinces ", provinces)
  const renderNoData = useCallback(() => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.textNoData}>Bạn chưa yêu thích tỉnh thành nào</Text>
      </View>
    );
  }, []);

  const renderContent = useCallback(
    () => (
      <FlatList
        renderItem={(item) => <LocationItem province={item.item} />}
        data={provinces}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderNoData}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}

      />
    ),
    []
  );

  return <View style={styles.container}>{renderContent()}</View>;
};

export default LocationScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
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
    image: {
      width: Sizes.scrWidth - scales(30),
      height: scales(135),
      borderRadius: scales(20),
    },
  });
};
