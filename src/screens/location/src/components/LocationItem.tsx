import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';

interface Props {
    data?: [];
}
const LocationData = (props: Props) => {
    const { data } = props;
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <Pressable style={styles.itemSwipe}>
            <Image source={Images.BacNinhImg} style={styles.image} resizeMode={'cover'} />
            <View style={styles.tourInfo}>
                <Text style={styles.provinceText}>Bắc Ninh</Text>
                <Text style={styles.tourText}>5 tour</Text>
            </View>
        </Pressable>
        // <ScrollView style={{ marginTop: scales(10) }}>
        //     <Pressable style={styles.itemSwipe}>
        //         <Image source={Images.BacNinhImg} style={styles.image} resizeMode={'cover'} />
        //         <View style={styles.tourInfo}>
        //             <Text style={styles.provinceText}>Bắc Ninh</Text>
        //             <Text style={styles.tourText}>5 tour</Text>
        //         </View>
        //     </Pressable>
        //     <Pressable style={styles.itemSwipe}>
        //         <Image source={Images.HaGiangImg} style={styles.image} resizeMode={'cover'} />
        //         <View style={styles.tourInfo}>
        //             <Text style={styles.provinceText}>Hà Giang</Text>
        //             <Text style={styles.tourText}>5 tour</Text>
        //         </View>
        //     </Pressable>
        //     <Pressable style={styles.itemSwipe}>
        //         <Image source={Images.DaNangImg} style={styles.image} resizeMode={'cover'} />
        //         <View style={styles.tourInfo}>
        //             <Text style={styles.provinceText}>Đà Nẵng</Text>
        //             <Text style={styles.tourText}>5 tour</Text>
        //         </View>
        //     </Pressable>
        //     <Pressable style={styles.itemSwipe}>
        //         <Image source={Images.NinhBinhImg} style={styles.image} resizeMode={'cover'} />
        //         <View style={styles.tourInfo}>
        //             <Text style={styles.provinceText}>Bắc Ninh</Text>
        //             <Text style={styles.tourText}>5 tour</Text>
        //         </View>
        //     </Pressable>
        // </ScrollView>
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
