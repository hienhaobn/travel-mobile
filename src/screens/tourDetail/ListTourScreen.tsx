import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { io } from 'socket.io-client';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { navigate } from 'navigation/utils';
import { getTours } from './src/api';
import { formatCurrency } from 'utils/number';

const ListTourScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const [socketInstance, setSocketInstance] = useState(null);
  const [tours, setTours] = useState([]);

  const getData = async () => {
    const [response] = await Promise.all([
      getTours(),
    ])
    setTours(response.returnValue.data);
    console.log(tours);
  }
  useEffect(() => {
    getData();
  }, []);
  const renderConvention = useCallback(({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.conventionContainer} onPress={() => navigate('TourDetail', item)} >
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: item.images[0].url }}
            style={{ width: scales(100), height: scales(100), borderRadius: scales(20) }}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.account} numberOfLines={3}>{item.name}</Text>
            <Text style={styles.tourGuide}>{item.tourGuide.name}</Text>

            <Text style={styles.message}>{formatCurrency(item.basePrice)} VNĐ</Text>
          </View>
        </View>
        {/* <View>
          <Text style={styles.time}>15:23</Text>
          <View style={styles.unreadContainer}>
            <Text style={styles.unread}>2</Text>
          </View>
        </View> */}
      </TouchableOpacity >
    );
  }, []);

  const renderHeader = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <Input
          placeholder="Tìm tour du lịch"
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
  return (
    <View style={styles.container}>
      {renderHeader()}
      {tours.length > 0 ?
        <FlatList
          data={tours}
          renderItem={(item) => renderConvention(item)}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}

        /> : null}
    </View>
  );
};
export default ListTourScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Sizes.statusBarHeight,
      backgroundColor: color.Color_Bg,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: scales(15),
      marginTop: scales(12),
      marginBottom: scales(10),
    },
    inputContainer: {
      flex: 1,
      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderRadius: 50,
    },
    conventionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: scales(15),
      marginTop: scales(15),
    },
    leftContainer: {
      flexDirection: 'row',
      width: Sizes.scrWidth - scales(100),
    },
    messageContainer: {
      marginLeft: scales(10),
    },
    account: {
      ...Fonts.inter700,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    message: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Color_Red,
    },

    tourGuide: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Color_Linear_Blue,
    },
    time: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    unread: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.white,
    },
    unreadContainer: {
      backgroundColor: color.Color_Primary,
      borderRadius: scales(100),
      width: scales(15),
      height: scales(15),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
    iconBack: {
      position: 'absolute',
      top: Sizes.statusBarHeight + scales(20),
      left: scales(15),
      backgroundColor: color.Color_Gray5,
      padding: scales(10),
      borderRadius: scales(80),
    },
  });
};
