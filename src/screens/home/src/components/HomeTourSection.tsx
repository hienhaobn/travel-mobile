import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TourSectionItem from 'screens/home/src/components/TourSectionItem';

import { getTopTours } from '../api';

import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { navigate } from 'navigation/utils';

const HomePostSection = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const [tours, setTours] = useState<tour.Tour[]>([]);
  const getData = async () => {
    const response = await getTopTours();
    setTours(response.data);
  }
  useEffect(() => {
    getData();
  }, []);

  console.log('tours', tours);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textTourGuide}>Tour phổ biến</Text>
        <TouchableOpacity style={styles.showAllContainer} onPress={() => navigate('ListTourScreen')}>
          <Text style={styles.textShowAll}>Xem tất cả</Text>
          <SvgIcons.IcForward width={scales(17)} height={scales(17)} color={getThemeColor().Color_Primary} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={tours}
        renderItem={(item) => <TourSectionItem tour={item.item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomePostSection;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      marginTop: scales(20),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    showAllContainer: {
      flexDirection: 'row',
    },
    textTourGuide: {
      ...Fonts.inter700,
      fontSize: scales(16),
      color: color.Text_Dark_1,
    },
    textShowAll: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Color_Primary,
    },
    itemContainer: {
      marginTop: scales(5),
      marginHorizontal: scales(10),
      width: Sizes.scrWidth - scales(40),
      borderRadius: scales(8),
    },
    itemContentContainer: {
    },
    itemImages: {
      width: Sizes.scrWidth - scales(40),
      height: Sizes.scrWidth / 3,
      borderRadius: scales(8),
    },
    itemHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scales(10),
    },
    rateContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: scales(8),
      right: 0,
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.white,
      marginRight: scales(5),
    },
    tourGuideName: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scales(10),
    },
    textLocation: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    startLocation: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    heart: {
      position: 'absolute',
      top: scales(10),
      left: scales(10),
      backgroundColor: getThemeColor().Text_Color_Opacity_30,
      padding: scales(2),
      borderRadius: scales(3),
    },
    timeStartContainer: {
      marginTop: scales(10),
    },
    timeStartText: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: color.Text_Dark_5,
    },
    textPrice: {
      ...Fonts.inter600,
      fontSize: scales(13),
      color: color.Color_Red,
    },
    shopContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Red,
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
    },
    sellNow: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().white,
      paddingLeft: scales(3),
    },
    showInfoContainer: {
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
      borderWidth: 1,
      borderColor: getThemeColor().Color_Primary,
    },
    textShowInfo: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: getThemeColor().Color_Primary,
    },
    typeContainer: {
      backgroundColor: color.Color_Gray2,
      paddingHorizontal: scales(10),
      paddingVertical: scales(2),
      borderRadius: scales(8),
    },
    desc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(19),
    },
  });
};
