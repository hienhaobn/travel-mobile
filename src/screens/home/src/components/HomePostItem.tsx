import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


import SvgIcons from 'assets/svgs';
import TouchableOpacity from 'components/TouchableOpacity';

import { EPostTopics } from 'constants/post';
import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { navigate } from 'navigation/utils';

const HomePostItem = (props) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { post } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} onPress={() => navigate('PostDetail', post)}>
        <View style={styles.itemContentContainer}>
          <View>
            <Image source={{ uri: post.image }} style={styles.itemImages} />
            <View style={styles.rateContainer}>
              <Text style={styles.rate}>{post.like + 10}</Text>
              <SvgIcons.IcHeartRed width={scales(12)} height={scales(12)} />
              <View style={styles.typeContainer}>
                <Text style={styles.desc}>{EPostTopics[post?.topic]}</Text>
              </View>
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
              {post.title}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.textLocation}>Tác giả:  </Text>
            <Text style={styles.startLocation}>{post.user ? post.user.username : post.tourGuide.name}</Text>
          </View>
        </View>
      </TouchableOpacity >
    </View>
  );
};

export default memo(HomePostItem);

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
      marginHorizontal: scales(5),
    },
    desc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(19),
    },
  });
};
