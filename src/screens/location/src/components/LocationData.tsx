import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { navigate } from 'navigation/utils';

interface Props {
    data?: [];
}
const LocationData = (props: Props) => {
    const { data } = props;
    const { themeCurrent } = useTheme();
    const styles = myStyles(themeCurrent);
    return data.length === 0 ? (
        <View style={styles.optionsContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode={'cover'} />
            <Text style={styles.textNoData}>Chưa có dữ liệu về địa điểm</Text>
            <Text style={styles.textInputData}>Vui lòng nhập địa điểm muốn thăm quan</Text>
        </View>
    ) : <ScrollView style={{marginTop: scales(10)}}>
        <Pressable style={styles.itemSwipe}>
            <Image source={Images.BacNinhImg} style={styles.image} resizeMode={'cover'} />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>Bắc Ninh</Text>
                <Text style={styles.tourText}>5 tour</Text>
            </View>
        </Pressable>
        <Pressable style={styles.itemSwipe}>
            <Image source={Images.HaGiangImg} style={styles.image} resizeMode={'cover'} />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>Hà Giang</Text>
                <Text style={styles.tourText}>5 tour</Text>
            </View>
        </Pressable>
        <Pressable style={styles.itemSwipe}>
            <Image source={Images.DaNangImg} style={styles.image} resizeMode={'cover'} />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>Đà Nẵng</Text>
                <Text style={styles.tourText}>5 tour</Text>
            </View>
        </Pressable>
        <Pressable style={styles.itemSwipe}>
            <Image source={Images.NinhBinhImg} style={styles.image} resizeMode={'cover'} />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>Bắc Ninh</Text>
                <Text style={styles.tourText}>5 tour</Text>
            </View>
        </Pressable>
    </ScrollView>;
};

export default LocationData;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        imageOptions: {
            width: scales(45),
            height: scales(45),
        },
        optionsContainer: {
            marginTop: scales(26),
            marginHorizontal: scales(15),
            flexDirection: 'column',
            marginBottom: scales(25),
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
        },
        optionItem: {
            alignItems: 'center',
            width: Sizes.scrWidth / 6,
        },
        optionText: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_2,
            marginTop: scales(8),
            textAlign: 'center',
        },
        mh5: {
            marginHorizontal: scales(5),
        },
        image: {
            width: Sizes.scrWidth - scales(30),
            height: scales(135),
            borderRadius: scales(20),
        },
        textNoData: {
            color: '#F03800',
            marginTop: scales(29),
            marginBottom: scales(15),
            fontWeight: '500',
            fontFamily: 'roboto',
            fontSize: scales(12),
            fontStyle: 'normal',
        },
        textInputData: {
            color: '#425884',

            fontWeight: '300',
            fontFamily: 'roboto',
            fontSize: scales(12),
            fontStyle: 'normal',
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
        gradient: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
    });
};
