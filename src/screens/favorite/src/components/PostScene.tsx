import React, { useCallback } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';
import { EPostTopics } from 'constants/post';
import { navigate } from 'navigation/utils';

const PostScene = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const renderItem = useCallback((item) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} onPress={() => navigate('PostDetail', item)}>
        <View style={styles.itemContentContainer}>
          <View>
            <Image source={{ uri: item.image }} style={styles.itemImages} />
            <View style={styles.rateContainer}>
              <Text style={styles.rate}>{item.like}</Text>
              <SvgIcons.IcHeartRed width={scales(16)} height={scales(16)} />
            </View>
            <TouchableOpacity style={styles.heart}>
              <SvgIcons.IcHeartOutline
                color={getThemeColor().white}
                width={scales(17)}
                height={scales(17)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.tourGuideName} numberOfLines={3}>
              {item.title}
            </Text>
          </View>
          <View>
            <Text style={styles.timeStartContainer}>{EPostTopics[item?.topic]}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.textLocation}>Tác giả: </Text>
            <Text style={styles.startLocation}>{item.user ? item.user.username : item.tourGuide.name}</Text>
          </View>
          {/* <Text style={styles.textPrice}>7,690,000đ</Text> */}
        </View>
      </TouchableOpacity>
    );
  }, []);
  const renderNoData = useCallback(() => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.textNoData}>Bạn chưa yêu thích bài viết nào</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={(item) => renderItem(item.item)}
        data={props.route.post}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderNoData}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
      />
    </View>);
};

export default PostScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      marginHorizontal: scales(15),
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
      marginTop: scales(20),
      borderRadius: scales(8),
    },
    itemContentContainer: {},
    itemImages: {
      width: Sizes.scrWidth - scales(30),
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
      marginHorizontal: scales(5),
      backgroundColor: color.Color_Linear_Green,
      borderRadius: scales(50),
      paddingHorizontal: scales(10),
      paddingVertical: scales(3),
    },
    rate: {
      ...Fonts.inter700,
      fontSize: scales(14),
      color: color.Color_White,
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
      ...Fonts.inter600,
      fontSize: scales(14),
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
