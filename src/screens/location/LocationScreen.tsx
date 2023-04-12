import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { apiGetProvinces } from './src/api';
import LocationItem from './src/components/LocationItem';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Input from 'components/Input';


import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const LocationScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [provinces, setProvinces] = useState<location.Province[]>([]);

    const getLocation = async () => {
        try {
            const response: location.ProvincesResponse = await apiGetProvinces();
            setProvinces(response.data);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        try {
            getLocation();
        } catch (error) {
            console.log(error);
            return;
        }
    }, []);

    const renderNoData = useCallback(() => {
        return (
            <View style={styles.noDataContainer}>
                <Image source={Images.NoData} style={styles.image} resizeMode={'contain'} />
                <Text style={styles.textNoData}>Chưa có dữ liệu về địa điểm</Text>
                <Text style={styles.textInputData}>Vui lòng nhập địa điểm muốn thăm quan</Text>
            </View>
        );
    }, []);

    const renderHeader = useCallback(
        () => (
            <View style={styles.searchContainer}>
                <Input
                    placeholder="Tìm địa điểm"
                    leftIcon={
                        <SvgIcons.IcSearch color={getThemeColor().Text_Dark_1} width={scales(24)} height={scales(24)} />
                    }
                    leftIconStyle={{
                        paddingLeft: scales(10),
                    }}
                    containerStyle={styles.inputContainer}
                />
            </View>
        ),
        []
    );

    const renderContent = useCallback(
        () => (
            <FlatList
                renderItem={(item) => <LocationItem province={item.item} />}
                data={provinces}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={renderNoData}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
        ),
        [provinces]
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};
const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingTop: Sizes.statusBarHeight,
        },
        searchContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scales(15),
            marginTop: scales(12),
        },
        inputContainer: {
            flex: 1,
            shadowColor: getThemeColor().Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderRadius: 50,
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
        textInputData: {
            color: color.Color_Gray3,
            fontWeight: '300',
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
export default LocationScreen;
