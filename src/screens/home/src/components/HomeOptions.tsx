import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { navigate } from 'navigation/utils';


const HomeOptions = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <ScrollView horizontal style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem}>
                <Image source={Images.IcAddressTour} style={styles.imageOptions} />
                <Text style={styles.optionText}>Địa điểm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem, styles.mh5]}>
                <Image source={Images.IcTour} style={styles.imageOptions} />
                <Text style={styles.optionText}>Tour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem, styles.mh5]}>
                <Image source={Images.IcTourGuide} style={styles.imageOptions} />
                <Text style={styles.optionText}>Hướng dẫn viên</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem, styles.mh5]}>
                <Image source={Images.IcHandbook} style={styles.imageOptions} />
                <Text style={styles.optionText}>Cẩm nang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
                <Image source={Images.IcReward} style={styles.imageOptions} />
                <Text style={styles.optionText}>Phần thưởng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default HomeOptions;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        imageOptions: {
            width: scales(45),
            height: scales(45),
        },
        optionsContainer: {
            marginTop: scales(40),
            flexDirection: 'row',
            marginBottom: scales(25),
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
    });
};
