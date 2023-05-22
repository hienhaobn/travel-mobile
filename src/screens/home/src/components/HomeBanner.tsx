<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React from 'react';
>>>>>>> 26cf787746a423f6ccab55b7fe5d0cbe8f2c3258
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { getTopProvinces } from '../api';

const HomeBanner = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const [provinces, setProvinces] = useState([]);
  const getData = async () => {
    const response = await getTopProvinces();

    setProvinces(response);
    console.log(response);

  }
  useEffect(() => {
    getData();
  }, []);
  return (
    provinces ?
      <View style={styles.swiperContainer}>
        <Swiper
          loop={true}
          autoplay
          removeClippedSubviews={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
          {provinces.map((province, index) => (
            <Pressable style={styles.itemSwipe} key={index}>
              <Image source={{ uri: province.images }} style={styles.image} resizeMode={'cover'} />
              <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>{province.name}</Text>
                <Text style={styles.tourText}>{`${province.tourCount} tour`}</Text>
              </View>
            </Pressable>
          ))}
        </Swiper>
      </View> : null
  );
};

export default React.memo(HomeBanner);

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    itemPage: {
      flexDirection: 'row',
      paddingHorizontal: scales(10),
    },
    banner: {
      flex: 1,
      height: scales(103),
    },
    swiperContainer: {
      height: scales(150),
      flex: 1,
    },
    dot: {
      backgroundColor: color.Color_Gray,
      width: scales(4),
      height: scales(4),
      borderRadius: scales(2),
      marginLeft: scales(2),
      marginRight: scales(2),
    },
    activeDot: {
      backgroundColor: color.white,
      width: scales(4),
      height: scales(4),
      borderRadius: scales(2),
      marginLeft: scales(2),
      marginRight: scales(2),
    },
    itemSwipe: {
      alignItems: 'center',
      paddingHorizontal: scales(15),
    },
    image: {
      width: Sizes.scrWidth - scales(30),
      height: scales(135),
      borderRadius: scales(20),
    },
    provinceText: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: color.white,
    },
    tourText: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.white,
    },
    tourInfo: {
      position: 'absolute',
      bottom: scales(10),
      left: scales(30),
    },
  });
};
