import React, { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';
import { goToTourGuideInfo } from 'screens/accountInfo/src/utils';
function formatNumber(number) {
  if (Number.isInteger(number)) {
    return number.toString();
  } else {
    return number.toFixed(1);
  }
}

const LocationDetailTourGuideScene = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const tourGuides = props.route.tourGuides;
  const renderItem = (
    item
  ) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} onPress={() => goToTourGuideInfo(item.tourGuideId)}>
        <View style={styles.itemContentContainer}>
          <Image source={{ uri: item.tourGuideAvatar }} style={styles.itemImages} />
          <View
            style={{
              flex: 1,
              marginLeft: scales(10),
            }}>
            <View style={styles.itemHeaderContainer}>
              <Text style={styles.tourGuideName}>{item.tourGuideName}</Text>
              <View style={styles.rateContainer}>
                <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
                <Text style={styles.rate}>{item.star ? formatNumber(+item.star) : 5}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <SvgIcons.IcLocation
                width={scales(17)}
                height={scales(17)}
                color={getThemeColor().Color_Primary}
              />
              <Text style={styles.textLocation}>{item.provinceName.trim()}</Text>
            </View>
            <View style={{ ...styles.locationContainer, marginTop: scales(3) }}>
              <Text style={styles.textLocation}>Số chuyến đi: {item.totalTour.trim()}</Text>
            </View>

            <View style={{ ...styles.locationContainer, marginTop: scales(3) }}>
              <Text style={styles.textLocation}>Số lượt yêu thích: {item.totalFavorite.trim()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = useCallback(() => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {tourGuides.length > 0 ? tourGuides.map((tourGuide, index) => <View key={index.toString()}>{renderItem(tourGuide)}</View>) : null}
      </ScrollView>
    );
  }, [])

  return <View style={styles.container}>{renderSection()}</View>;
};

export default LocationDetailTourGuideScene;

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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    },
    textLocation: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
      marginLeft: scales(5),
    },
  });
};
