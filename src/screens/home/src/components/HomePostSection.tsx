import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import HomePostItem from './HomePostItem';

import { getTopPosts, getTopTours } from '../api';

import Images from 'assets/images';
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
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    const response = await getTopPosts();
    setPosts(response);
  }
  useEffect(() => {
    getData();
  }, []);
  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textTourGuide}>Bài viết phổ biến</Text>
        <TouchableOpacity style={styles.showAllContainer} onPress={() => navigate('ListPostScreen')}>
          <Text style={styles.textShowAll}>Xem tất cả</Text>
          <SvgIcons.IcForward width={scales(17)} height={scales(17)} color={getThemeColor().Color_Primary} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const renderItem = useCallback((post) => { return (<HomePostItem post={post} key={post.id} />) }, []);

  const renderSection = useCallback(() => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {posts.length > 0 ? posts.map((post, index) => {
          return (
            renderItem(post)
          )
        }) : null}
      </ScrollView>
    )
  }, [posts.length]);

  return (
    <View style={styles.container}>
      {renderHeader()}
      {posts.length > 0 ? renderSection() : null}
    </View>
  );
};

export default HomePostSection;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      marginVertical: scales(20),
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
      width: Sizes.scrWidth - scales(30),
      marginHorizontal: scales(10),
    },
    itemContentContainer: {
      marginTop: scales(10),
    },
    itemImages: {
      width: '95%',
      height: Sizes.scrWidth / 3,
      borderRadius: scales(8),

      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: scales(8),
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
      marginTop: scales(15),
    },
    textDesc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
  });
};
