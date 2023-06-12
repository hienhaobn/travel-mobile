import React, { useCallback } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';
import { goToTourGuideInfo } from 'screens/accountInfo/src/utils';
export enum Gender {
  FEMALE = '0',
  MALE = '1',
}
const TourGuideSection = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const tourGuides = props.route.tourGuide;
  const renderNoData = useCallback(() => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.textNoData}>Bạn chưa yêu thích tỉnh thành nào</Text>
      </View>
    );
  }, []);
  const renderItem = useCallback((item) => {
    console.log(item);

    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} onPress={() => goToTourGuideInfo(item.id)}>
        <View style={styles.itemContentContainer}>
          <Image source={{ uri: item.avatar }} style={styles.itemImages} />
          <View
            style={{
              flex: 1,
              marginLeft: scales(10),
            }}>
            <View style={styles.itemHeaderContainer}>
              <Text style={styles.tourGuideName}>{item.name}</Text>
              <View style={styles.rateContainer}>
                <Text style={styles.rate}>{item.numOfFavorites}</Text>
                <SvgIcons.IcHeartRed width={scales(16)} height={scales(16)} />
              </View>
            </View>
            <View style={styles.locationContainer}>
              <SvgIcons.IcLocation
                width={scales(17)}
                height={scales(17)}
                color={getThemeColor().Color_Primary}
              />
              <Text style={styles.textLocation}>{item.provinces.map(e => e.name.trim()).join(',')}</Text>

            </View>
            <View style={styles.locationContainer}>
              <Image source={Images.TimeTourGuide} style={{ width: scales(19), height: scales(19) }} />
              <Text style={styles.textLocation}>Tham gia: {item.interviewDate ? item.interviewDate.split('-')[0] : '2023'}</Text>
            </View>
            <View style={styles.locationContainer}>
              <SvgIcons.IcBirthday
                width={scales(17)}
                height={scales(17)}
                color={getThemeColor().Color_Primary}
              />
              <Text style={styles.textLocation}>Ngày sinh: {item.dob.split('-').reverse().join('-')}</Text>
            </View>
            <View style={styles.locationContainer}>
              <SvgIcons.IcGender
                width={scales(17)}
                height={scales(17)}
                color={getThemeColor().Color_Primary}
              />
              <Text style={styles.textLocation}>Giới tính: {item.gender === '0' ? 'Nữ' : 'Nam'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderSection = useCallback(() => (
    <FlatList
      renderItem={(item) => renderItem(item.item)}
      data={tourGuides}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={renderNoData}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}

    />
  ), []);

  return <View style={styles.container}>{renderSection()}</View>;
};

export default TourGuideSection;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {},
    textShowAll: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Color_Primary,
    },
    itemContainer: {
      marginHorizontal: scales(15),
    },
    itemContentContainer: {
      marginTop: scales(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemImages: {
      width: Sizes.scrWidth / 2 - scales(25),
      height: Sizes.scrWidth / 3,
      borderRadius: scales(8),

      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    itemHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rateContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: scales(8),
      right: 0,
      marginHorizontal: scales(5),
      backgroundColor: color.Color_Linear_Green,
      borderRadius: scales(50),
      paddingHorizontal: scales(10),
      paddingVertical: scales(3),
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: color.Text_Dark_1,
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
      margin: scales(3),
    },
    textLocation: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
      marginLeft: scales(5),
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
