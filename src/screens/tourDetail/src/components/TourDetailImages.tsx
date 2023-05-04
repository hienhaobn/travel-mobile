import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TourDetailImages = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.swiperContainer}>
            <Swiper
                loop={true}
                autoplay
                removeClippedSubviews={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}>
                <Pressable style={styles.itemSwipe}>
                    <Image source={Images.BacNinhImg} style={styles.image} resizeMode={'cover'} />
                </Pressable>
                <Pressable style={styles.itemSwipe}>
                    <Image source={Images.HaGiangImg} style={styles.image} resizeMode={'cover'} />
                </Pressable>
                <Pressable style={styles.itemSwipe}>
                    <Image source={Images.NinhBinhImg} style={styles.image} resizeMode={'cover'} />
                </Pressable>
                <Pressable style={styles.itemSwipe}>
                    <Image source={Images.DaNangImg} style={styles.image} resizeMode={'cover'} />
                </Pressable>
            </Swiper>
        </View>
    );
};

export default React.memo(TourDetailImages);

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
    });
};
