import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goToLocationDetail } from 'screens/locationDetail/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IProps {
    province: location.Province;
}

const LocationData = (props: IProps) => {
    const { province } = props;
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <TouchableOpacity style={styles.itemSwipe} onPress={() => goToLocationDetail(province?.id)}>
            <FastImage
                source={
                    province?.images
                        ? {
                              uri: province?.images,
                          }
                        : Images.BacNinhImg
                }
                style={styles.image}
            />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>{province?.name?.trim()}</Text>
                <Text style={styles.tourText}>{province?.tours?.length} tour</Text>
            </View>
        </TouchableOpacity>
    );
};

export default LocationData;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        image: {
            width: Sizes.scrWidth - scales(30),
            height: scales(135),
            borderRadius: scales(20),
        },
        itemSwipe: {
            alignItems: 'center',
            paddingHorizontal: scales(15),
            paddingVertical: scales(10),
        },
        provinceText: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.white,
            left: scales(10),
        },
        tourText: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.white,
            left: scales(10),
        },
        tourInfo: {
            position: 'absolute',
            bottom: scales(8),
            left: scales(15),
            backgroundColor: '#8EC3B0AA',
            right: Sizes.scrWidth / 2 - scales(15),
            paddingTop: scales(5),
            borderTopRightRadius: scales(30),
        },
    });
};
